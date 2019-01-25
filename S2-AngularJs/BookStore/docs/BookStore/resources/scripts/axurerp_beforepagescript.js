//Check if IE
var bIE = false;
if ((index = navigator.userAgent.indexOf("MSIE")) >= 0) {
    bIE = true;
}

$axure = function (query) {
    return $axure.query(query);
};

// ******* AxQuery and Page metadata ******** //
(function () {
    var _pageData;
    var _pageNameToFileName = {};

    var _fn = {};
    $axure.fn = _fn;
    $axure.fn.jQuery = function() {
        var scriptIds = this.getIds();
        var idSelectors = jQuery.map(scriptIds, function(id) { return '#' + id; });
        var jQuerySelectorText = (scriptIds.length > 0) ? idSelectors.join(', ') : '';
        return $(jQuerySelectorText);
    };
    $axure.fn.$ = $axure.fn.jQuery;


    var _initializePageFragment = function(pageFragment) {
        var _idToObject = { };
        pageFragment.idToObject = _idToObject;

        var objectArrayHelper = function(objects, parent) {
            for (var i = 0; i < objects.length; i++) {
                diagramObjectHelper(objects[i], parent);
            }
        };

        var diagramObjectHelper = function(diagramObject, parent) {
            $axure.initializeObject('diagramObject', diagramObject);
            _idToObject[diagramObject.id] = diagramObject;
            diagramObject.parent = parent;
            diagramObject.owner = pageFragment;
            diagramObject.scriptIds = [];
            
            if (diagramObject.diagrams) { // dynamic panel
                for (var i = 0; i < diagramObject.diagrams.length; i++) {
                    var diagram = diagramObject.diagrams[i];
                    objectArrayHelper(diagram.objects, diagram);
                }
            }
            if (diagramObject.objects) objectArrayHelper(diagramObject.objects, diagramObject);
        };

        objectArrayHelper(pageFragment.diagram.objects, pageFragment.diagram);
    };

    var _initalizeStylesheet = function(stylesheet) {
        var stylesById = { };
        stylesheet.stylesById = stylesById;
        var customStyles = stylesheet.customStyles;
        for(var key in customStyles) {
            var style = customStyles[key];
            stylesById[style.id] = style;
        }
    };
    
    var _initializePageData = function () {
        if (!_pageData || !_pageData.page || !_pageData.page.diagram) return;

        _initializePageFragment(_pageData.page);
        for(var masterId in _pageData.masters) {
            var master = _pageData.masters[masterId];
            _initializePageFragment(master);
        }

        _initalizeStylesheet(_pageData.stylesheet);

        var _scriptIdToObject = { };
        _pageData.scriptIdToObject = _scriptIdToObject;
        
        for (var i = 0; i < _pageData.objectPathToScriptId.length; i++) {
            var path = _pageData.objectPathToScriptId[i].idPath;
            var scriptId = _pageData.objectPathToScriptId[i].scriptId;
            
            var currentPageFragment = _pageData.page;
            for (var j = 0; j < path.length - 1; j++) {
                var id = path[j];
                var object = currentPageFragment.idToObject[id];
                currentPageFragment = _pageData.masters[object.masterId];
            }
            var diagramObject = currentPageFragment.idToObject[path[path.length - 1]];
            diagramObject.scriptIds[diagramObject.scriptIds.length] = scriptId;
            _scriptIdToObject[scriptId] = diagramObject;
        }
    };

    var _loadCurrentPage = function (pageData) {
        $axure.pageData = _pageData = pageData;
        _initializePageData();
    };
    $axure.loadCurrentPage = _loadCurrentPage;

    var _query = function(queryText) {
        var returnVal = {};
        returnVal.query = queryText;

        var axureFn = $axure.fn;
        for (var key in axureFn) {
            returnVal[key] = axureFn[key];
        }
        return returnVal;
    };
    $axure.query = _query;

    $axure.fn.each = function(fn) {
        // TODO: label queries
        var filterAndApply = function(pageFragment, filter) {
            for (var id in pageFragment.idToObject) {
                var diagramObject = pageFragment.idToObject[id];
                if (filter(diagramObject)) fn.apply(diagramObject, [diagramObject]);
            }
        };

        var filter = this.query;
        filterAndApply($axure.pageData.page, filter);
        jQuery.each($axure.pageData.masters, function(index, value) {
            filterAndApply(value, filter);
        });
    };
    
    $axure.fn.getIds = function() {
        var scriptIds = [];

        var filter;

        if (typeof(this.query) === 'function') {
            filter = this.query;
        } else {
            // this is a text query
            var searchStringMatch = /(label|type)=([^;]*)/ .exec(this.query);
            if (!searchStringMatch) return $();
            var searchType = searchStringMatch[1];
            var searchTerm = searchStringMatch[2];

            filter = function(diagramObject) {
                if(searchType == 'label') {
                    if(typeof diagramObject.label != 'undefined' && diagramObject.label == searchTerm) {
                        return true;
                    }
                } else if(searchType == 'type') {
                    if(typeof diagramObject.type != 'undefined' && diagramObject.type == searchTerm) {
                        return true;
                    }
                }

                return false;
            };
        }

        var filterObjects = function(pageFragment, returnVal) {
            for (var id in pageFragment.idToObject) {
                var diagramObject = pageFragment.idToObject[id];
                if (filter(diagramObject)) {
                    jQuery.merge(returnVal, diagramObject.scriptIds);
                }
            }
        };
        filterObjects($axure.pageData.page, scriptIds);
        jQuery.each($axure.pageData.masters, function(index, value) {
            filterObjects(value, scriptIds);
        });

        return scriptIds;
    };

    $axure.getPageUrl = function(pageName, matchNumber) {
        //Note: Match number is 1 based....Undefined returns first filename
        //Out of bounds match number returns undefined.
        
        var pageFileNameArray = _pageNameToFileName[pageName];

        if(pageFileNameArray){
            if(matchNumber === undefined){
                return pageFileNameArray[0];
            } else if(matchNumber > 0 && matchNumber <= pageFileNameArray.length) {
                return pageFileNameArray[matchNumber - 1];
            }
        }

        return undefined;
    };

    $axure.navigate = function(url, includeVariables) {
        var targetUrl = (includeVariables === false) ? url : $axure.globalVariableProvider.getLinkUrl(url);

        window.location.href = targetUrl;
    };

    $axure.back = function() {
        history.go(-1);
    };

    $axure.reload = function(includeVariables) {
        var targetUrl = (includeVariables === false) 
            ? window.location.href 
            : $axure.globalVariableProvider.getLinkUrl($axure.pageData.url);

        window.location.href = targetUrl;
        window.location.reload();
    };

    $axure.popup = function(url, name, options, includeVariables) {
        var defaultOptions = {
            toolbars: true,
            scrollbars: true,
            locationbar: true,
            statusbar: true,
            menubar: true,
            directories: true,
            resizable: true,
            centerwindow: true,
            left: -1,
            top: -1,
            height: -1,
            width: -1
        };

        var selectedOptions = $.extend({}, defaultOptions, options);

        var optionsList = [];
        optionsList.push('toolbar=' + (selectedOptions.toolbars ? '1' : '0'));
        optionsList.push('scrollbars=' + (selectedOptions.scrollbars ? '1' : '0'));
        optionsList.push('location=' + (selectedOptions.locationbar ? '1' : '0'));
        optionsList.push('status=' + (selectedOptions.statusbar ? '1' : '0'));
        optionsList.push('menubar=' + (selectedOptions.menubar ? '1' : '0'));
        optionsList.push('directories=' + (selectedOptions.directories ? '1' : '0'));
        optionsList.push('resizable=' + (selectedOptions.resizable ? '1' : '0'));

        if(selectedOptions.centerwindow == false){
            if(selectedOptions.left > -1){
                optionsList.push('left=' + selectedOptions.left);
            }

            if(selectedOptions.top > -1){
                optionsList.push('top=' + selectedOptions.top);
            }
        }

        var height = 0;
        var width = 0;
        if(selectedOptions.height > 0){
            optionsList.push('height=' + selectedOptions.height);
            height = selectedOptions.height;
        }

        if(selectedOptions.width > 0){
            optionsList.push('width=' + selectedOptions.width);
            width = selectedOptions.width;
        }

        var targetUrl = (includeVariables === false) ? url : $axure.globalVariableProvider.getLinkUrl(url);

        NewWindow(targetUrl, name, optionsList.join(','), selectedOptions.centerwindow, width, height);
    };

    $axure.navigateParent = function(url, includeVariables){
        var targetUrl = (includeVariables === false) ? url : $axure.globalVariableProvider.getLinkUrl(url);

        window.parent.location.href = targetUrl;
    };

    $axure.setGlobalVariable = function(name, value) {
        if(!name || !value){
            return;
        }

        $axure.globalVariableProvider.setVariableValue(name, value);
    };

    $axure.getGlobalVariable = function(name) {
        $axure.globalVariableProvider.getVariableValue(name);
    };

    $axure.getTypeFromScriptId = function(scriptId) {
        var scriptIdInput = scriptId.charAt(0) == '#' ? scriptId.substring(1) : scriptId;

        if(_pageData.scriptIdToObject[scriptIdInput]) {
            return _pageData.scriptIdToObject[scriptIdInput].type;
        }
    };


    //Following function and its helper create a Page name to Url (file name)
    //table, for use with getPageUrl function.
    var loadPageNameToFileNameTable = function() {
        var rootNodes = sitemap.rootNodes;
        for(var i = 0; i < rootNodes.length; i++) {
            _loadPageNameToFileNameTableHelper(rootNodes[i]);
        }
    };

    var _loadPageNameToFileNameTableHelper = function(node) {
        var fileNameArray = _pageNameToFileName[node.pageName];
        if(!fileNameArray) _pageNameToFileName[node.pageName] = fileNameArray = [];
        fileNameArray[fileNameArray.length] = node.url;

        if(node.children && node.children.length > 0) {
            for(var i = 0; i < node.children.length; i++) {
                var child = node.children[i];
                _loadPageNameToFileNameTableHelper(child);
            }
        }
    };

    loadPageNameToFileNameTable();
})();

// ******* AxQuery Plugins ******** //
(function() {
    var DYNAMIC_PANEL_TYPE = 'dynamicPanel';
    var TEXT_BOX_TYPE = 'textBox';
    var TEXT_AREA_TYPE = 'textArea';
    var LIST_BOX_TYPE = 'listBox';
    var COMBO_BOX_TYPE = 'comboBox';
    var CHECK_BOX_TYPE = 'checkbox';
    var RADIO_BUTTON_TYPE = 'radioButton';
    var IMAGE_MAP_REGION_TYPE = 'imageMapRegion';
    var IMAGE_BOX_TYPE = 'imageBox';
    var BUTTON_SHAPE_TYPE = 'buttonShape';
    var TREE_NODE_OBJECT_TYPE = 'treeNodeObject';
    var TABLE_CELL_TYPE = 'tableCell';

    var _addJQueryFunction = function(name) {
        $axure.fn[name] = function() {
            var val = $.fn[name].apply(this.jQuery(), arguments);
            return arguments[0] ? this : val;
        };
    };
    var _jQueryFunctionsToAdd = ['text', 'val', 'css'];
    for (var i = 0; i < _jQueryFunctionsToAdd.length; i++) _addJQueryFunction(_jQueryFunctionsToAdd[i]);
    
    var _addJQueryEventFunction = function(name) {
        $axure.fn[name] = function() {
            $.fn[name].apply(this.jQuery(), arguments);
            return this;
        };
    };
    var _jQueryEventFunctionsToAdd = ['click', 'hover', 'mousedown', 'mouseup'];
    for (var i = 0; i < _jQueryEventFunctionsToAdd.length; i++) _addJQueryEventFunction(_jQueryEventFunctionsToAdd[i]);


    $axure.fn.openLink = function(url, includeVariables){
        this.jQuery().each(function () {
            if(!($(this).is('iframe'))) {
                return;
            }

            var objIframe = $(this).get(0);

            var newSrcUrl = (includeVariables === false) ? url : $axure.globalVariableProvider.getLinkUrl(url);
            
            var reload = FrameWindowNeedsReload(objIframe, newSrcUrl);

            if(!reload) {
                objIframe.src = newSrcUrl;
            } else {
                objIframe.src = "resources/reload.html#" + encodeURI(newSrcUrl);
            }
        });

        return this;
    };
    
    $axure.fn.setPanelState = function(stateNumber, options) {
        var easingIn = 'none';
        var easingOut = 'none';
        var directionIn = '';
        var directionOut = '';    
        var durationIn = 500;
        var durationOut = 500;

        if(options && options.animateIn) {
            easingIn = 'fade';
            
            if(options.animateIn.easing) {
                if(options.animateIn.easing == 'slideLeft'){
                    directionIn = 'left';
                }else if(options.animateIn.easing == 'slideRight'){
                    directionIn = 'right';
                }else if(options.animateIn.easing == 'slideUp'){
                    directionIn = 'up';
                }else if(options.animateIn.easing == 'slideDown'){
                    directionIn = 'down';
                }

                if(directionIn != ''){
                    easingIn = 'swing';
                }
            }

            if(options.animateIn.duration){
                durationIn = options.animateIn.duration;
            }
        }

        if(options && options.animateOut) {
            easingOut = 'fade';
            
            if(options.animateOut.easing) {
                if(options.animateOut.easing == 'slideLeft') {
                    directionOut = 'left';
                } else if(options.animateOut.easing == 'slideRight') {
                    directionOut = 'right';
                } else if(options.animateOut.easing == 'slideUp') {
                    directionOut = 'up';
                } else if(options.animateOut.easing == 'slideDown') {
                    directionOut = 'down';
                }

                if(directionOut != '') {
                    easingOut = 'swing';
                }
            }

            if(options.animateOut.duration){
                durationOut = options.animateOut.duration;
            }
        }

        var ids = this.getIds();

        for(var index in ids) {
            if($axure.getTypeFromScriptId(ids[index]) == DYNAMIC_PANEL_TYPE) {
                var stateName = 'pd' + (parseInt(stateNumber) - 1) + ids[index];
                SetPanelState(ids[index], stateName, easingIn, directionIn, durationIn, easingOut, directionOut, durationOut);
            }
        }

        return this;
    };

    $axure.fn.show = function(duration) {
        var easing = 'none';

        if(duration && duration > 0) {
            easing = 'fade';
        }
        
        var ids = this.getIds();

        for(var index in ids){
            if($axure.getTypeFromScriptId(ids[index]) == DYNAMIC_PANEL_TYPE) {
               SetPanelVisibility(ids[index], '', easing, duration);
            }
        }

        return this;
    };

    $axure.fn.hide = function(duration) {
        var easing = 'none';

        if(duration && duration > 0) {
            easing = 'fade';
        }

        var ids = this.getIds();

        for(var index in ids){
            if($axure.getTypeFromScriptId(ids[index]) == DYNAMIC_PANEL_TYPE) {
                SetPanelVisibility(ids[index], 'hidden', easing, duration);
            }
        }

        return this;
    };

    $axure.fn.toggleVisibility = function(duration) {
        var easing = 'none';

        if(duration && duration > 0){
            easing = 'fade';
        }

        var ids = this.getIds();

        for(var index in ids){
            if($axure.getTypeFromScriptId(ids[index]) == DYNAMIC_PANEL_TYPE) {
                SetPanelVisibility(ids[index], 'toggle', easing, duration);
            }
        }

        return this;
    };

    $axure.fn.moveTo = function(x, y, options) {
        var easing = 'none';
        var duration = 500;

        if(options && options.easing){
            easing = options.easing;

            if(options.duration){
                duration = options.duration;
            }
        }

        var ids = this.getIds();

        for(var index in ids){
            if($axure.getTypeFromScriptId(ids[index]) == DYNAMIC_PANEL_TYPE) {
                MoveWidgetTo(ids[index], x, y, easing, duration);
            }
        }

        return this;
    };

    $axure.fn.moveBy = function(x, y, options) {
        var easing = 'none';
        var duration = 500;

        if(options && options.easing){
            easing = options.easing;

            if(options.duration){
                duration = options.duration;
            }
        }

        var ids = this.getIds();

        for(var index in ids){
            if($axure.getTypeFromScriptId(ids[index]) == DYNAMIC_PANEL_TYPE) {
                MoveWidgetBy(ids[index], x, y, easing, duration);
            }
        }

        return this;
    };

    $axure.fn.bringToFront = function() {
        var ids = this.getIds();

        for(var index in ids){
            if($axure.getTypeFromScriptId(ids[index]) == DYNAMIC_PANEL_TYPE) {
                BringToFront(ids[index]);
            }
        }

        return this;
    };

    $axure.fn.sendToBack = function() {
        var ids = this.getIds();

        for(var index in ids){
            if($axure.getTypeFromScriptId(ids[index]) == DYNAMIC_PANEL_TYPE) {
                SendToBack(ids[index]);
            }
        }

        return this;
    };

    $axure.fn.text = function() {
        if (arguments[0] == undefined) {
            var firstId = this.getIds()[0];

            if(!firstId) {
                return;
            }

            return GetWidgetText(firstId);
        } else {
            var ids = this.getIds();

            for(var index in ids){
                var currentItem = ids[index];

                var widgetType = $axure.getTypeFromScriptId(currentItem);

                if(widgetType == TEXT_BOX_TYPE || widgetType == TEXT_AREA_TYPE) { //For non rtf
                    SetWidgetFormText(currentItem, arguments[0]);
                } else {
                    var idRtf = '#' + currentItem + '_rtf';

                    if ($(idRtf).length == 0){
                        idRtf = '#u' + (parseInt(currentItem.substring(1)) + 1) + '_rtf';
                    }

                    if ($(idRtf).length != 0){
                        //If the richtext div already has some text in it,
                        //preserve only the first style and get rid of the rest
                        //If no pre-existing p-span tags, don't do anything
                        if ($(idRtf).children('p').find('span').length > 0) {
                            $(idRtf).children('p:not(:first)').remove();
                            $(idRtf).children('p').find('span:not(:first)').remove();
                            
                            //Replace new-lines with NEWLINE token, then html encode the string,
                            //finally replace NEWLINE token with linebreak
                            var textWithLineBreaks = arguments[0].replace(/\n/g, '--NEWLINE--');
                            var textHtml = $('<div/>').text(textWithLineBreaks).html();
                            $(idRtf).find('span').html(textHtml.replace(/--NEWLINE--/g, '<br/>'));
                        }
                    }
                }
            }

            return this;
        }
    };

    $axure.fn.setRichTextHtml = function() {
        if (arguments[0] == undefined) {
            //No getter function, so just return undefined
            return;
        } else {
            var ids = this.getIds();

            for(var index in ids){
                var currentItem = ids[index];

                var widgetType = $axure.getTypeFromScriptId(currentItem);

                if(widgetType == TEXT_BOX_TYPE || widgetType == TEXT_AREA_TYPE) { //Do nothing for non rtf
                    continue;
                } else {
                    var idRtf = '#' + currentItem + '_rtf';

                    if ($(idRtf).length == 0){
                        idRtf = '#u' + (parseInt(currentItem.substring(1)) + 1) + '_rtf';
                    }

                    if ($(idRtf).length != 0){
                        var rtfIdWithoutHashAndSuffix = idRtf.substring(1);
                        var indexOfSuffix = rtfIdWithoutHashAndSuffix.indexOf('_rtf');
                        rtfIdWithoutHashAndSuffix = rtfIdWithoutHashAndSuffix.substring(0, indexOfSuffix);

                        SetWidgetRichText(rtfIdWithoutHashAndSuffix, arguments[0]);    
                    }
                }
            }

            return this;
        }
    };

    $axure.fn.value = function() {
        if (arguments[0] == undefined) {
            var firstId = this.getIds()[0];

            if(!firstId) {
                return;
            }

            var widgetType = $axure.getTypeFromScriptId(firstId);

            if(widgetType == COMBO_BOX_TYPE || widgetType == LIST_BOX_TYPE) { //for select lists and drop lists
                return $('#' + firstId + ' :selected').text();
            } else if (widgetType == CHECK_BOX_TYPE || widgetType == RADIO_BUTTON_TYPE) { //for radio/checkboxes
                return this.jQuery().first().is(':checked');
            } else { //for text based form elements
                return this.jQuery().first().val();
            }
        } else {
            var ids = this.getIds();

            for(var index in ids){
                var widgetType = $axure.getTypeFromScriptId(ids[index]);

                var idWithHash = '#' + ids[index];

                if (widgetType == CHECK_BOX_TYPE || widgetType == RADIO_BUTTON_TYPE) { //for radio/checkboxes
                    if(arguments[0] == true){
                        $(idWithHash).attr('checked', true);
                    } else if (arguments[0] == false){
                        $(idWithHash).removeAttr('checked');
                    }
                } else { //For select lists, drop lists, text based form elements
                    $(idWithHash).val(arguments[0]);
                }
            }

            return this;
        }        
    };

    $axure.fn.checked = function() {
        if (arguments[0] == undefined) {
            return this.jQuery().attr('checked');
        } else {
            this.jQuery().attr('checked', arguments[0]);
            return this;
        }
    };

    $axure.fn.scroll = function(scrollOption) {
        var easing = 'none';
        var duration = 500;

        if(scrollOption && scrollOption.easing){
            easing = scrollOption.easing;

            if(scrollOption.duration){
                duration = scrollOption.duration;
            }
        }

        var scrollX = true;
        var scrollY = true;

        if(scrollOption.direction == 'vertical') {
            scrollX = false;
        } else if(scrollOption.direction == 'horizontal') {
            scrollY = false;
        }

        var ids = this.getIds();
        for(var index in ids){
            if($axure.getTypeFromScriptId(ids[index]) == IMAGE_MAP_REGION_TYPE) {            
                ScrollToWidget(ids[index], scrollX, scrollY, easing, duration);
            }
        }

        return this;
    };

    $axure.fn.enabled = function() {
        if (arguments[0] == undefined) {
            var firstId = this.getIds()[0];

            if(!firstId){
                return;
            }

            var widgetType = $axure.getTypeFromScriptId(firstId);

            if(widgetType == IMAGE_BOX_TYPE || widgetType == BUTTON_SHAPE_TYPE) { //for img/btnshape/rectangle/placeholder
                return !(gv_DisabledWidgets[firstId]);
            } else { //for all else
                return this.jQuery().first().not(':disabled').length > 0;
            }
        } else {
            var ids = this.getIds();

            for(var index in ids){
                var widgetType = $axure.getTypeFromScriptId(ids[index]);

                if(arguments[0] == true) {
                    if(widgetType == IMAGE_BOX_TYPE || widgetType == BUTTON_SHAPE_TYPE) { //for img/btnshape/rect/placeholder
                        EnableImageWidget(ids[index]);
                    } else { //for all else
                        $('#' + ids[index]).removeAttr('disabled');
                    }
                } else if(arguments[0] == false) {
                    if(widgetType == IMAGE_BOX_TYPE || widgetType == BUTTON_SHAPE_TYPE) { //for img/btnshape/rect/placeholder
                        DisableImageWidget(ids[index]);
                    } else { //for all else
                        $('#' + ids[index]).attr('disabled', 'disabled');
                    }
                }
            }

            return this;
        }
    };

    $axure.fn.selected = function() {
        if (arguments[0] == undefined) {
            var firstId = this.getIds()[0];

            if(!firstId) return;

            var widgetType = $axure.getTypeFromScriptId(firstId);
            var idToCheck = '';

            if (widgetType == TREE_NODE_OBJECT_TYPE) {
                var treeNodeButtonShapeId = '';
                for(var scriptId in $axure.pageData.scriptIdToObject) {
                    var currObj = $axure.pageData.scriptIdToObject[scriptId];

                    if(currObj.type == BUTTON_SHAPE_TYPE && currObj.parent && 
                        currObj.parent.scriptIds && currObj.parent.scriptIds[0] == firstId) {
                        treeNodeButtonShapeId = scriptId;
                        break;
                    }
                }

                if(treeNodeButtonShapeId == '') return;

                idToCheck = treeNodeButtonShapeId;
            } else if (widgetType == IMAGE_BOX_TYPE || widgetType == BUTTON_SHAPE_TYPE || widgetType == TABLE_CELL_TYPE) {
                idToCheck = firstId;
            }

            if(idToCheck != '') return IsWidgetSelected(idToCheck);
        } else {
            var ids = this.getIds();

            for(var index in ids){
                var widgetType = $axure.getTypeFromScriptId(ids[index]);

                if (widgetType == TREE_NODE_OBJECT_TYPE) { //for tree node
                    var treeRootId = $('#' + ids[index]).parents('.treeroot').attr('id');

                    var treeNodeButtonShapeId = '';
                    for(var scriptId in $axure.pageData.scriptIdToObject) {
                        var currObj = $axure.pageData.scriptIdToObject[scriptId];
                        
                        if(currObj.type == BUTTON_SHAPE_TYPE && currObj.parent && 
                            currObj.parent.scriptIds && currObj.parent.scriptIds[0] == ids[index]) {
                            treeNodeButtonShapeId = scriptId;
                            break;
                        }
                    }
                    
                    if(treeNodeButtonShapeId == '') continue;
                    var treeNodeButtonShapeTextId = 'u' + (parseInt(treeNodeButtonShapeId.substring(1)) + 1);

                    if(arguments[0] == true) {
                        eval('SelectTreeNode(currentSelected' + treeRootId + ', true, \'' + treeNodeButtonShapeId + '\', \'' + treeNodeButtonShapeTextId + '\')');
                    } else if (arguments[0] == false) {
                        eval('DeSelectTreeNode(currentSelected' + treeRootId + ', true, \'' + treeNodeButtonShapeId + '\', \'' + treeNodeButtonShapeTextId + '\')');
                    }
                } else if(widgetType == IMAGE_BOX_TYPE || widgetType == BUTTON_SHAPE_TYPE || widgetType == TABLE_CELL_TYPE) { //Image boxes, buttonshapes, tablecells/menuitem
                    if(arguments[0] == true) {
                        SetWidgetSelected(ids[index]);
                    } else if (arguments[0] == false) {
                        SetWidgetNotSelected(ids[index]);
                    }
                }
            }

            return this;
        } 
    };

    $axure.fn.focus = function() {
        this.jQuery().focus();
        return this;
    };

    $axure.fn.expanded = function() {
        if (arguments[0] == undefined) {
            var firstId = this.getIds()[0];

            if(!firstId) {
                return;
            }

            if($axure.getTypeFromScriptId(firstId) !== TREE_NODE_OBJECT_TYPE) {
                return;
            }

            var childContainerId = 'cnc' + firstId;

            var container = document.getElementById(childContainerId);
            if (!container) {
                return false;
            }

            if(container.style.visibility != 'hidden') {
                return true;
            } else {
                return false;
            } 
        } else {
            var ids = this.getIds();
           
            for(var index in ids){
                if($axure.getTypeFromScriptId(ids[index]) == TREE_NODE_OBJECT_TYPE) {
                    var treeNodeId = ids[index];
                    var childContainerId = 'cnc' + ids[index];
                    var plusMinusId = 'u' + (parseInt(ids[index].substring(1)) + 1);
                    
                    if($('#' + childContainerId).length == 0) {
                        plusMinusId = '';
                    }

                    if(arguments[0] == true) {
                        ExpandNode(treeNodeId, childContainerId, plusMinusId);
                    } else if(arguments[0] == false) {
                        CollapseNode(treeNodeId, childContainerId, plusMinusId);
                    }
                }
            }

            return this;
        }
    };
})();


// ******* Object Model ******** //
(function() {
    var _implementations = { };

    var _initializeObject = function(type, obj) {
        $.extend(obj, _implementations[type]);
    };
    $axure.initializeObject = _initializeObject;

    // ********** diagramObject ********* //
    var _diagramObjectBase = {
        getStateStyleOverrides: function(state) {
            var styleObject = this;
            while(styleObject.isContained) styleObject = styleObject.parent;

            var stateStyle = { };
            if(state == 'mouseDown') $.extend(stateStyle, GetFullStateStyle(styleObject.style, 'mouseOver'));
            $.extend(stateStyle, GetFullStateStyle(styleObject.style, state));
            return stateStyle;
        }
    };
    _implementations['diagramObject'] = _diagramObjectBase;
})();

// ******* GLOBAL VARIABLE PROVIDER ******** //
(function () {
    var _globalVariableValues = {};
    
    var _globalVariableProvider = {};
    $axure.globalVariableProvider = _globalVariableProvider;

    var setVariableValue = function(variable, value, suppressBroadcast) {
        var stringVal = value.toString();
        // truncate values to prevent overflows.
        if (stringVal.length > 300) {
           stringVal = value.substring(0, 300);
        }
        _globalVariableValues[variable] = stringVal;

        if(suppressBroadcast !== true){
            var varData = {
                globalVarName : variable,
                globalVarValue : stringVal
            };

            $axure.messageCenter.postMessage('setGlobalVar', varData);
        }
    };
    _globalVariableProvider.setVariableValue = setVariableValue;

    var getVariableValue = function(variable) {
        if(_globalVariableValues[variable] !== undefined) return _globalVariableValues[variable];
        switch (variable) {
        case "PageName": return $axure.pageData.page.name;

        case "GenYear": return $axure.pageData.generationDate.getFullYear();
        case "GenMonth": return $axure.pageData.generationDate.getMonth() + 1;
        case "GenMonthName": return GetMonthString($axure.pageData.generationDate.getMonth());
        case "GenDay": return $axure.pageData.generationDate.getDate();
        case "GenDayOfWeek": return GetDayString($axure.pageData.generationDate.getDay());
        case "GenTime": return $axure.pageData.generationDate.toLocaleTimeString();
        case "GenHours": return $axure.pageData.generationDate.getHours();
        case "GenMinutes": return $axure.pageData.generationDate.getMinutes();
        case "GenSeconds": return $axure.pageData.generationDate.getSeconds();

        case "Year": return new Date().getFullYear();
        case "Month": return new Date().getMonth() + 1;
        case "MonthName": return GetMonthString(new Date().getMonth());
        case "Day": return new Date().getDate();
        case "DayOfWeek": return GetDayString(new Date().getDay());
        case "Time": return new Date().toLocaleTimeString();
        case "Hours": return new Date().getHours();
        case "Minutes": return new Date().getMinutes();
        case "Seconds": return new Date().getSeconds();

        case "DragX": return GetDragX();
        case "DragY": return GetDragY();
        case "TotalDragX": return GetTotalDragX();      
        case "TotalDragY": return GetTotalDragY();
        case "DragTime": return GetDragTime();

        default: return '';
        }
    };
    _globalVariableProvider.getVariableValue = getVariableValue;

    var load = function() {
        var csum = false;

        var query = (window.location.href.split("#")[1] || ''); //hash.substring(1); Firefox decodes this so & in variables breaks
            if (query.length > 0) {
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                var varName = pair[0];
                var varValue = pair[1];
                if (varName) {
                    if (varName == 'CSUM') {
                        csum = true;
                    } else setVariableValue(varName, decodeURIComponent(varValue), true);
                }
            }

            if (!csum && query.length > 250) {
                alert('Prototype Warning: The variable values were too long to pass to this page.\nIf you are using IE, using Firefox will support more data.');
            }
        }
    };

    var getLinkUrl = function(baseUrl) {
        var toAdd = '';
        var definedVariables = getDefinedVariables();
        for (var i = 0; i < definedVariables.length; i++) {
            var key = definedVariables[i];
            var val = getVariableValue(key);
            if (val != null && val.length > 0) {
                if (toAdd.length > 0) toAdd += '&';
                toAdd += key + '=' + encodeURIComponent(getVariableValue(key));
            }
        }
        return toAdd.length > 0 ? baseUrl + '#' + toAdd + "&CSUM=1" : baseUrl;
    };
    _globalVariableProvider.getLinkUrl = getLinkUrl;

    var getDefinedVariables = function() {
        return $axure.pageData.variables;
    };
    _globalVariableProvider.getDefinedVariables = getDefinedVariables;

    load();
})();

// ******* EVENT MANAGER ******** //
(function() {
    var _objectIdToEventHandlers = { };
    
    var _eventManager = { };
    $axure.eventManager = _eventManager;

    var _pageLoadFunctions = [];

    // initilize state
    _eventManager.mouseOverObjectId = '';
    _eventManager.mouseOverLinkId = '';
    _eventManager.mouseDownObjectId = '';
    _eventManager.mouseDownLinkId = '';

    var EVENT_NAMES = ['click', 'mouseover', 'mouseout', 'change', 'keyup', 'focus', 'blur' ];
    for(var i = 0; i < EVENT_NAMES.length; i++) {
        var eventName = EVENT_NAMES[i];
        // we need the function here to circumvent closure modifying eventName
        _eventManager[eventName] = (function(event) {
            return function(scriptId, fn) {
                var idQuery = $('#' + scriptId);
                
                // we need specially track link events so we can enable and disable them along with
                // their parent widgets
                if (idQuery.is('a')) _attachCustomObjectEvent(scriptId, event, fn);
                // see notes below
                else if($axure.getTypeFromScriptId(scriptId) == 'treeNodeObject') _attachTreeNodeEvent(scriptId, event, fn);
                else _attachDefaultObjectEvent(idQuery, scriptId, event, fn);
            };
        })(eventName);
    }

    var _attachTreeNodeEvent = function(id, eventName, fn) {
        // we need to set the cursor here because we want to make sure that every tree node has the default
        // cursor set and then it's overridden if it has a click
        if (eventName == 'click') document.getElementById(id).style.cursor = 'pointer';

        _attachCustomObjectEvent(id, eventName, fn);
    };

    var _attachDefaultObjectEvent = function(idQuery, scriptId, eventName, fn) {
        idQuery[eventName](function () {
            if (!IsWidgetDisabled(scriptId)) fn.apply(this, arguments);
        });
    };

    var _attachCustomObjectEvent = function(id, eventName, fn) {
        var handlers = _objectIdToEventHandlers[id];
        if (!handlers) _objectIdToEventHandlers[id] = handlers = { };

        var fnList = handlers[eventName];
        if (!fnList) handlers[eventName] = fnList = [];

        fnList[fnList.length] = fn;
    };
    
    var _fireObjectEvent = function(id, event, originalArgs) {
        var element = document.getElementById(id);

        var handlerList = _objectIdToEventHandlers[id] && _objectIdToEventHandlers[id][event];
        if (handlerList) {
            for (var i = 0; i < handlerList.length; i++) handlerList[i].apply(element, originalArgs);
        }
    };

    var _initialize = function() {
        // attach button shape alternate styles
        $axure(function(obj) {
            return obj.type != 'hyperlink' &&
                obj.style &&
                    obj.style.stateStyles &&
                        obj.style.stateStyles.mouseOver;
        }).hover(
            function() {
                var id = this.id;
                if (id == _eventManager.mouseOverObjectId) return;
                _eventManager.mouseOverObjectId = id;
                SetWidgetHover(id, false);
                $axure.annotationManager.updateLinkLocations(GetTextIdFromShape(id));
            },
            function() {
                var id = this.id;
                if (id == _eventManager.mouseOverObjectId) {
                    _eventManager.mouseOverLinkId = '';
                    _eventManager.mouseOverObjectId = '';
                }
                SetWidgetNotHover(id, false);
                $axure.annotationManager.updateLinkLocations(GetTextIdFromShape(id));
            });
        
        // initialize disabled elements
        $axure(function(obj) {
            return (obj.type == 'buttonShape' || obj.type == 'imageBox') && obj.disabled;
        }).enabled(false);
        
        // attach hyperlink mouse events
        $axure(function(obj) {
            return obj.type != 'hyperlink' &&
                obj.style &&
                    obj.style.stateStyles &&
                        obj.style.stateStyles.mouseDown;
        })
            .mousedown(function() {
                $axure.annotationManager.updateLinkLocations(GetTextIdFromShape(this.id));
    
                _eventManager.mouseDownObjectId = this.id;
                SetWidgetMouseDown(this.id, false);        })
            .mouseup(function() {
                var mouseDownId = _eventManager.mouseDownObjectId;  
                _eventManager.mouseDownObjectId = '';
                
                SetWidgetNotMouseDown(this.id, false);
                $axure.annotationManager.updateLinkLocations(GetTextIdFromShape(this.id));

                // we need to make images click, because swapping out the images prevents the click
                var diagramObject = $axure.pageData.scriptIdToObject[mouseDownId];
                if (mouseDownId == this.id && diagramObject.type == 'imageBox'
                    && diagramObject.style.stateStyles.mouseDown.image 
                        && diagramObject.style.stateStyles.mouseDown.image.url) {
                    $('#' + mouseDownId).click();
                }
            });
        
        // attach handlers for button shape and tree node mouse over styles
        $axure(function(obj) {
            return obj.type == 'buttonShape' &&
                obj.parent.type == 'treeNodeObject' &&
                    obj.parent.style &&
                        obj.parent.style.stateStyles &&
                            obj.parent.style.stateStyles.mouseOver;
        }).hover(
            function() {
                SetWidgetHover(this.id, false);
            },
            function() {
                SetWidgetNotHover(this.id, false);
            });
        
        // handle treeNodeObject events and prevent them from bubbling up. this is necessary because otherwise
        // both a sub menu and it's parent would get a click
        $axure(function(obj) {
            return obj.type == 'treeNodeObject';
        }).click(function() {
            _fireObjectEvent(this.id, 'click', arguments);

            return false;
        }).$().each(function() {
            if(!this.style.cursor) {
                this.style.cursor = 'default';
            }
        });

        // attach link alternate styles
        $('a[id^="u"]').hover(
            function() {
                var id = this.id;
                var mouseOverObjectId = _eventManager.mouseOverObjectId;
                if (mouseOverObjectId && IsWidgetDisabled(mouseOverObjectId)) return;
                
                _eventManager.mouseOverLinkId = id;
                SetLinkHover(id);

                _fireObjectEvent(id, 'mouseover', arguments);

                $axure.annotationManager.updateLinkLocations(GetTextIdFromLink(id));
            },
            function() {
                var id = this.id;
                var mouseOverObjectId = _eventManager.mouseOverObjectId;
                if (id == _eventManager.mouseOverLinkId) _eventManager.mouseOverLinkId = '';
                
                if (mouseOverObjectId && IsWidgetDisabled(mouseOverObjectId)) return;
                
                SetLinkNotHover(id);
                
                _fireObjectEvent(id, 'mouseout', arguments);
                
                $axure.annotationManager.updateLinkLocations(GetTextIdFromLink(id));
            })
            .mousedown(function() {
                var id = this.id;
                var mouseOverObjectId = _eventManager.mouseOverObjectId;
                if (IsWidgetDisabled(mouseOverObjectId)) return undefined;
                
                if (mouseOverObjectId) SetWidgetMouseDown(mouseOverObjectId);
                SetLinkMouseDown(id);
                
                $axure.annotationManager.updateLinkLocations(GetTextIdFromLink(id));
                
                return false;
            })
            .mouseup(function() {
                var id = this.id;
                var mouseOverObjectId = _eventManager.mouseOverObjectId;
                if (mouseOverObjectId && IsWidgetDisabled(mouseOverObjectId)) return;
                
                if (mouseOverObjectId) SetWidgetNotMouseDown(mouseOverObjectId);
                SetLinkNotMouseDown(id);
                
                $axure.annotationManager.updateLinkLocations(GetTextIdFromLink(id));
                
            }).click(function () {
                var id = this.id;
                var mouseOverObjectId = _eventManager.mouseOverObjectId;
                if (mouseOverObjectId && IsWidgetDisabled(mouseOverObjectId)) return;
                    
                _fireObjectEvent(id, 'click', arguments);

                return false;
            });
        // finally, process the pageload
        _pageLoad();
    };
    _eventManager.initialize = _initialize;

    var _pageLoad = function() {
        if (arguments.length == 0) {
            $.each(_pageLoadFunctions, function(index, fn) {
                fn();
            });
        } else {
            _pageLoadFunctions[_pageLoadFunctions.length] = arguments[0];
        }
    };
    _eventManager.pageLoad = _pageLoad;
    
})();


// ******* Annotation MANAGER ******** //
(function() {
    var NOTE_SIZE = 10;

    var _annotationManager = { };
    $axure.annotationManager = _annotationManager;

    var _updateLinkLocations = function(textId) {
        var diagramObject = $axure.pageData.scriptIdToObject[textId];
        var rotation = (diagramObject && diagramObject.rotation);
        var shapeId = GetShapeIdFromText(textId);
      
        // we have to do this because webkit reports the post-transform position but when you set
        // positions it's pre-transform
        if (WEBKIT && rotation) {
            $('#' + shapeId).css('-webkit-transform', 'scale(1)');
            $('#' + textId).css('-webkit-transform', 'scale(1)');
        }

        $('#' + textId).find('span[id$="ann"]').each(function (index, value) {
            var id = value.id.replace('ann', '');
            
            var annPos = $(value).position();
            var left = annPos.left - NOTE_SIZE;
            var top = annPos.top;

            $('#' + id + 'Note').css('left', left).css('top', top);
        });
        
        // undo the transform reset
        if (WEBKIT && rotation) {
            $('#' + shapeId).css('-webkit-transform', '');
            $('#' + textId).css('-webkit-transform', '');
        }


    };
    _annotationManager.updateLinkLocations = _updateLinkLocations;

    $(document).ready(function() {
        $axure(function(dObj) { return dObj.annotation; }).each(function(dObj) {

            if (dObj.type == 'hyperlink') {
                var scriptIds = dObj.scriptIds;
                for (var i = 0; i < scriptIds.length; i++) {
                    
                    var id = scriptIds[i];
                    var textId = GetTextIdFromLink(id);

                    var idQuery = $('#' + id);
                    idQuery.after("<span id='" + id + "ann'>&#8203;</span>");

                    if ($axure.pageData.options.useLabels) {
                        var label = $('#' + id).attr("data-label");
                        if (!label || label == "") label = "?";
                        $('#' + textId).append("<div id='" + id + "Note' class='annnotelabel' >" + label + "</div>");
                    } else {
                        $('#' + textId).append("<div id='" + id + "Note' class='annnoteimage' ></div>");
                    }
                    $('#' + id + 'Note').click(function(e) { ToggleWorkflow(e, id, 300, 150, false); return false; });

                    _updateLinkLocations(textId);
                }
            } else {
                var scriptIds = dObj.scriptIds;
                for (var i = 0; i < scriptIds.length; i++) {
                    var id = scriptIds[i];
                    if ($axure.pageData.options.useLabels) {
                        var label = $('#' + id).attr("data-label");
                        if (!label || label == "") label = "?";
                        $('#' + id + "ann").append("<div id='" + id + "Note' class='annnotelabel' style='left:0;top:0;'>" + label + "</div>");
                    } else {
                        $('#' + id + "ann").append("<div id='" + id + "Note' class='annnoteimage' style='left:0;top:0;'></div>");
                    }
                    $('#' + id + 'Note').click(function(e) { ToggleWorkflow(e, id, 300, 150, false); return false; });
                }
            }
        });

    });

})();



// ******* Internet Explorer MANAGER ******** //
// this is to handle all the stupid IE Stuff
(function() {
    if (!bIE) return;

    var _applyIEFixedPosition = function() {
        $axure(function(diagramObject) { return diagramObject.fixedVertical; }).$()
            .appendTo($('body'))
            .css('position', 'absolute').css('margin-left', 0 + 'px').css('margin-top', 0 + 'px');
        
        var handleScroll = function() {
            $axure(function(diagramObject) { return diagramObject.fixedVertical; }).each(function(diagramObject) {
                $.each(diagramObject.scriptIds, function(index, id) {
                    var win = $(window);
                    var windowWidth = win.width();
                    var windowHeight = win.height();
                    var windowScrollLeft = win.scrollLeft();
                    var windowScrollTop = win.scrollTop();
                    
                    var newLeft = 0;
                    var newTop = 0;
                    var elementQuery = $('#' + id);
                    var width = elementQuery.width();
                    var height = elementQuery.height();

                    var horz = diagramObject.fixedHorizontal;
                    if (horz == 'left') {
                        newLeft = windowScrollLeft + diagramObject.fixedMarginHorizontal;
                    } else if (horz == 'center') {
                        newLeft = windowScrollLeft + ((windowWidth - width) / 2) + diagramObject.fixedMarginHorizontal;
                    } else if (horz == 'right') {
                        newLeft = windowScrollLeft + windowWidth - width - diagramObject.fixedMarginHorizontal;
                    }
                    
                    var vert = diagramObject.fixedVertical;
                    if (vert == 'top') {
                        newTop = windowScrollTop + diagramObject.fixedMarginVertical;
                    } else if (vert == 'middle') {
                        newTop = windowScrollTop + ((windowHeight - height) / 2) + diagramObject.fixedMarginVertical;
                    } else if (vert == 'bottom') {
                        newTop = windowScrollTop + windowHeight - height - diagramObject.fixedMarginVertical;
                    }
                    elementQuery.css('top', newTop + 'px').css('left', newLeft + 'px');

                });
            });
        };

        $(window).scroll(handleScroll).resize(handleScroll);
        handleScroll();
    };

    var getIEOffset = function(transform, rect) {
        var translatedVertexes = [
            _axUtils.Vector2D(0, 0), // we dont translate, so the orgin is fixed
            transform.mul(_axUtils.Vector2D(0, rect.height)),
            transform.mul(_axUtils.Vector2D(rect.width, 0)),
            transform.mul(_axUtils.Vector2D(rect.width, rect.height))];

        var minX = 0, minY = 0, maxX = 0, maxY = 0;
        $.each(translatedVertexes, function(index, p) {
            minX = Math.min(minX, p.x);
            minY = Math.min(minY, p.y);
            maxX = Math.max(maxX, p.x);
            maxY = Math.max(maxY, p.y);
        });

        return _axUtils.Vector2D(
            (maxX - minX - rect.width) / 2, 
            (maxY - minY - rect.height) / 2);
    };

    var _filterFromTransform = function(transform) {
        return "progid:DXImageTransform.Microsoft.Matrix(M11=" + transform.m11 +
            ", M12=" + transform.m12 + ", M21=" + transform.m21 +
                ", M22=" + transform.m22 + ", SizingMethod='auto expand')";                        
    };

    var _applyIERotation = function() {
        $axure(function(diagramObject) {
            return diagramObject.rotation && Math.abs(diagramObject.rotation) > 0.1
                && !diagramObject.isContained;
        }).each(function(diagramObject) {
            var rotation = diagramObject.rotation;
            var transform = _axUtils.Matrix2D.identity().rotate(rotation);
            $.each(diagramObject.scriptIds, function(index, id) {
                var filter = _filterFromTransform(transform);
                var elementQuery = $('#' + id);
                var width = elementQuery.width();
                var height = elementQuery.height();
                elementQuery.css('filter', filter)
                    .width(width + 1)
                    .height(height + 1);

                var ieOffset = getIEOffset(transform, { width: width, height: height });
                elementQuery.css("margin-left", -ieOffset.x).css("margin-top", -ieOffset.y);

                var textId = $.grep(
                    $('#' + id).children().map(function(i, obj) { return obj.id; }), // all the child ids
                    function(item) { return item.indexOf(id) < 0; })[0]; // that are not similar to the parent
                var textRotation = -rotation;
                var textObject = $axure.pageData.scriptIdToObject[textId];
                if (textObject && textObject.rotation) {
                    textRotation = textObject.rotation - rotation;
                }

                var textTransform = _axUtils.Matrix2D.identity().rotate(textRotation);
                var textQuery = $('#' + textId);
                var textWidth = textQuery.width();
                var textHeight = textQuery.height();
                var textIEOffset = getIEOffset(textTransform, { width: textWidth, height: textHeight });
                textQuery.css('filter',                    
                    _filterFromTransform(textTransform));
                textQuery.css("margin-left", -textIEOffset.x).css("margin-top", -textIEOffset.y);
            });
        });
    };
    
    $(document).ready(function() {
        _applyIEFixedPosition();
        _applyIERotation();
    });
    
    
})();


$(document).ready(function () {
    // this is because the page id is not formatted as a guid
    var pageId = $axure.pageData.page.packageId;

    var pageData = {
        id: pageId,
        pageName: $axure.pageData.page.name,
        location: window.location.toString(),
        notes: $axure.pageData.page.notes
    };

    // only trigger the page.data setting if the window is on the mainframe
    if (window.name == 'mainFrame' ||
        (!CHROME_5_LOCAL && window.parent.$ && window.parent.$('#mainFrame').length > 0)) {
        $axure.messageCenter.setState('page.data', pageData);
    }

    $('input[type=text], input[type=password], textarea').focus(function () {
        window.lastFocusedControl = this;
    });

    $('iframe').each(function () {
        var origSrc = $(this).attr('basesrc');

        if (origSrc) {
            var newSrcUrl = origSrc.toLowerCase().indexOf('http://') == -1 ? $axure.globalVariableProvider.getLinkUrl(origSrc) : origSrc;

            $(this).attr('src', newSrcUrl);
        }
    });

    $axure.messageCenter.addMessageListener(function (message, data) {
        if (message == 'setGlobalVar') {
            $axure.globalVariableProvider.setVariableValue(data.globalVarName, data.globalVarValue, true);
        }
    });

    var lastFocusedClickable;
    var shouldOutline = true;

    $('div[tabIndex=0]').mousedown(function () {
        shouldOutline = false;
    });

    $(document).mouseup(function () {
        shouldOutline = true;
    });

    $('div[tabIndex=0],a').focus(function () {
        if (shouldOutline) {
            $(this).css('outline', '');
        } else {
            $(this).css('outline', 'none');
        }

        lastFocusedClickable = this;
    });

    $('div[tabIndex=0],a').blur(function () {
        lastFocusedClickable = null;
    });

    $(document).bind('keyup', function (e) {
        if (e.keyCode == '13' || e.keyCode == '32') {
            if (lastFocusedClickable) $(lastFocusedClickable).click();
        };
    });

    $('[axSubmit]').keyup(function (event) {
        if (event.keyCode == '13') {
            var submitButton = $(this).attr('axSubmit')
            $('#' + submitButton).click();
        };
    }).keydown(function (event) {
        if (event.keyCode == '13') {
            event.preventDefault();
        }
    });

    if ($axure.pageData.options.hideAddress) {
        $(window).load(function () {
            setTimeout(function () {
                window.scrollTo(0, 0.9);
            }, 0);
        });
    }

    if ($axure.pageData.options.preventScroll) {
        $(document).bind('touchmove', function (event) {
            //if nothing in the targets parent chain is scrollable
            var $target = $(event.target);
            var inScrollable = false;
            var current = $target;
            while (!current.is('body')) {
                var elementId = current.attr('id');
                var diagramObject = elementId && $axure.pageData.scriptIdToObject[elementId];
                if (diagramObject && diagramObject.type == 'dynamicPanel' && diagramObject.scrollbars != 'none') {
                    inScrollable = true;
                    break;
                }
                current = current.parent();
            }

            if (!inScrollable) {
                event.preventDefault();
            }
        });

        $axure(function (diagramObject) {
            return diagramObject.type == 'dynamicPanel' && diagramObject.scrollbars != 'none';
        }).$().children().bind('touchstart', function (event) {
            var target = this;
            var top = target.scrollTop;
            if (top <= 0) target.scrollTop = 1;
            if (top + target.offsetHeight >= target.scrollHeight)
                target.scrollTop = target.scrollHeight - target.offsetHeight - 1;
        });
    }

    BringFixedToFront();

    $axure.eventManager.initialize();
});

function InitializeSubmenu(submenudivid, tablecellid) {
    var $submenudiv = $(document.getElementById(submenudivid));

    // mouseenter and leave for parent table cell
    $(document.getElementById(tablecellid)).mouseenter(function (e) {
        // hide sibling submenus
        $submenudiv.siblings('[id^="sm"]').css('visibility', 'hidden');

        // show current submenu
        $submenudiv.css('visibility', '');
        BringToFront(submenudivid);
    }).mouseleave(function (e) {
        var submenucontainer = $submenudiv.children('[id$="container"]');

        var offset = submenucontainer.offset();
        var subcontwidth = submenucontainer.width();
        var subcontheight = submenucontainer.height();
        //If mouse is not within the submenu (added 3 pixel margin to top and left calculations), then close the submenu...
        if (e.pageX + 3 < offset.left || e.pageX > offset.left + subcontwidth || e.pageY + 3 < offset.top || e.pageY > offset.top + subcontheight) {
            $submenudiv.find('[id^="sm"]').andSelf().css('visibility', 'hidden');
            if(!IsWidgetSelected(tablecellid)) SetWidgetOriginal(tablecellid, false);
        }
    });

    // mouseleave for submenu
    $submenudiv.mouseleave(function (e) {
        //close this menu and all menus below it
        $(this).find('[id^="sm"]').andSelf().css('visibility', 'hidden');
        if(!IsWidgetSelected(tablecellid)) SetWidgetOriginal(tablecellid, false);
    });
}

function getAbsoluteNodeTop(node)
{
   var currentNode=node;
   var top=0;
   while(currentNode.tagName!="BODY"){
      top+=currentNode.offsetTop;
      currentNode=currentNode.offsetParent;
   }
   return top;
}

function IsNodeVisible(nodeId) {
    var current = document.getElementById(nodeId);
    var parent = current.parentNode;

    //move all the parent's children that are below the node and their annotations
    while (current.className != "treeroot") {
        if (parent.style.visibility == 'hidden') return false;
        current = parent; 
        parent = parent.parentNode;
    }
    return true;
}

function ExpandNode(nodeId, childContainerId, plusMinusId) {
    var container = document.getElementById(childContainerId);
    if (!container || container.style.visibility != 'hidden') {
        return;
    }
    container.style.visibility = '';

    if (plusMinusId != '') {
        SetWidgetSelected(plusMinusId);
    }

    var delta = GetExpandCollapseDelta(nodeId, childContainerId);

    var isVisible = IsNodeVisible(nodeId);
    var current = document.getElementById(nodeId);
    var parent = current.parentNode;

    //move all the parent's children that are below the node and their annotations
    while (current.className != "treeroot") {
        var after = false;
        var i = 0;
        for (i=0;i<parent.childNodes.length;i++) {
            var child = parent.childNodes[i];
            if (after && child.id && child.className.indexOf("treenode") > -1) {
		        var id = child.id.substring(2);
	            child.style.top = Number(child.style.top.replace("px","")) + delta;
                var tn = document.getElementById(id);
                if (tn) tn.style.top = Number(tn.style.top.replace("px","")) + delta;
                var ann = document.getElementById(id + "ann");
                if (ann) ann.style.top = Number(ann.style.top.replace("px","")) + delta;
            }
            if (child == current) after = true;
        }
        current = parent; 
        parent = parent.parentNode;
        if (!isVisible && parent.style.visibility != 'hidden') break;
    }
}

function CollapseNode(nodeId, childContainerId, plusMinusId) {
    var container = document.getElementById(childContainerId);
    if (!container || container.style.visibility == 'hidden') {
        return;
    }
    container.style.visibility = 'hidden';

    if (plusMinusId != '') {
        SetWidgetNotSelected(plusMinusId);
    }

    var delta = GetExpandCollapseDelta(nodeId, childContainerId);

    var isVisible = IsNodeVisible(nodeId);
    var current = document.getElementById(nodeId);
    var parent = current.parentNode;

    //move all the parent's children that are below the node and their annotations
    while (current.className != "treeroot") {
        var after = false;
        var i = 0;
        for (i=0;i<parent.childNodes.length;i++) {
            var child = parent.childNodes[i];
            if (after && child.id && child.className.indexOf("treenode") > -1) {
		        var id = child.id.substring(2);
	            child.style.top = Number(child.style.top.replace("px","")) - delta;
                var tn = document.getElementById(id);
                if (tn) tn.style.top = Number(tn.style.top.replace("px","")) - delta;
                var ann = document.getElementById(id + "ann");
                if (ann) ann.style.top = Number(ann.style.top.replace("px","")) - delta;
            }
            if (child == current) after = true;
        }
        current = parent; 
        parent = current.parentNode;
        if (!isVisible && parent.style.visibility != 'hidden') break;
    }
}

function GetExpandCollapseDelta(nodeId, childContainerId) {
    //find the distance by diffing the bottom of the node to the bottom of the last child
    var node = document.getElementById(nodeId);
    var lastNode = GetLastVisibleChild(childContainerId);

    var nodetop = getAbsoluteNodeTop(node);
    var nodebottom = nodetop + Number(node.style.height.replace("px",""));
    var lastNodeTop = getAbsoluteNodeTop(lastNode);
    var lastNodeBottom = lastNodeTop + Number(lastNode.style.height.replace("px",""));
    var delta = lastNodeBottom - nodebottom;
    return delta;
}

function GetLastVisibleChild(containerId) {
    var container = document.getElementById(containerId);
    
    //get the last node that's not an annotation
    var lastNode = container.lastChild;
    while (!lastNode.id || lastNode.className.indexOf("treenode") < 0) {
        lastNode = lastNode.previousSibling;
    }
    var lastNodeId = lastNode.id;

    //see if it has a visible container for child nodes
    var subContainer = document.getElementById('cnc' + lastNodeId);
    if (subContainer && subContainer.style.visibility != 'hidden') {
        return GetLastVisibleChild(subContainer.id);  
    }

    return lastNode;
}


var initializedTreeNodes = new Object();

function InitializeTreeNode(nodeId, plusminusid, childContainerId, selectText) {
    if (initializedTreeNodes[nodeId]) return;

    $('#' + plusminusid).click(function() {
        var container = document.getElementById(childContainerId);
        if (container.style.visibility != 'hidden')
            CollapseNode(nodeId, childContainerId, plusminusid);
        else
            ExpandNode(nodeId, childContainerId, plusminusid);
        eval(selectText);

        return false;
    }).css('cursor', 'default');

    initializedTreeNodes[nodeId] = true;
}

function SelectTreeNode(currentSelected, applySelected, buttonShapeId, buttonShapeTextId) {
    if (currentSelected.buttonShapeId && currentSelected.buttonShapeId != '') {
        SetWidgetNotSelected(currentSelected.buttonShapeId);
    }    
    if (applySelected) {
        SetWidgetSelected(buttonShapeId);
    }
    currentSelected.buttonShapeId = buttonShapeId;
    currentSelected.buttonShapeTextId = buttonShapeTextId;        
}

function DeSelectTreeNode(currentSelected, applySelected, buttonShapeId, buttonShapeTextId) {
    if (currentSelected.buttonShapeId && currentSelected.buttonShapeId == buttonShapeId) {
        SetWidgetNotSelected(currentSelected.buttonShapeId);
        currentSelected.buttonShapeId = '';
        currentSelected.buttonShapeTextId = '';
    }
}

function ToggleSelectTreeNode(currentSelected, applySelected, buttonShapeId, buttonShapeTextId) {
    if (currentSelected.buttonShapeId && currentSelected.buttonShapeId == buttonShapeId) {
        DeSelectTreeNode(currentSelected, applySelected, buttonShapeId, buttonShapeTextId);
    } else {
        SelectTreeNode(currentSelected, applySelected, buttonShapeId, buttonShapeTextId);
    }
}

/* extend canvas */
var gv_hasCanvas = false;
(function(){
	var _canvas = document.createElement('canvas'), proto, abbrev;
	if (gv_hasCanvas = !!(_canvas.getContext && _canvas.getContext('2d')) && typeof(CanvasGradient) !== 'undefined') {
		function chain(func) {
		    return function() {
		        return func.apply(this, arguments) || this;
		    };
		}

		with (proto = CanvasRenderingContext2D.prototype) for (var func in abbrev = {
			a: arc,
			b: beginPath,
			n: clearRect,
			c: clip,
			p: closePath,
			g: createLinearGradient,
			f: fill,
			j: fillRect,
			z: function(s){ this.fillStyle = s;},
			l: lineTo,
			w: function(w){ this.lineWidth = w;},
			m: moveTo,
			q: quadraticCurveTo,
			h: rect,
			r: restore,
			o: rotate,
			s: save,
			x: scale,
			y: function(s){this.strokeStyle=s},
			u: setTransform,
			k: stroke,
			i: strokeRect,
			t: translate
		}) proto[func] = chain(abbrev[func]);
		CanvasGradient.prototype.a = chain(CanvasGradient.prototype.addColorStop);
	}
})();
