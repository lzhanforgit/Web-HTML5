// ************************** GLOBAL VARS *********************************//

// A table to cache the outerHTML of the _rtf elements before the rollover
// state is applied.
var gv_OriginalTextCache = new Object();

// A table to cache the src image before the rollover
// state is applied.
var gv_OriginalImgSrc = new Object();

// A table to store all the vertical alignments of all the parents of the text
// objects.
var gv_vAlignTable = new Object();


// ************************************************************************//
//stored on each browser event
var windowEvent;

//Check if IE
var bIE = false;
if ((index = navigator.userAgent.indexOf("MSIE")) >= 0) {
    bIE = true;
}

var Forms = document.getElementsByTagName("FORM");
for (var i = 0; i < Forms.length; i++) {
    var Form = Forms[i];
    Form.onclick = SuppressBubble;
}

function SuppressBubble(event) {
    if (bIE) {
        window.event.cancelBubble = true;
        window.event.returnValue = false;
    }
    else {
        if (event) {
            event.stopPropagation();
        }
    }
}

function InsertAfterBegin(dom, html) {
    if (!bIE) {
        var phtml; var range = dom.ownerDocument.createRange();
        range.selectNodeContents(dom);
        range.collapse(true);
        phtml = range.createContextualFragment(html);
        dom.insertBefore(phtml, dom.firstChild);
    } else {
        dom.insertAdjacentHTML("afterBegin", html);
    }
}

function InsertBeforeEnd(dom, html) {
    if (!bIE) {
        var phtml; var range = dom.ownerDocument.createRange();
        range.selectNodeContents(dom);
        range.collapse(dom);
        phtml = range.createContextualFragment(html);
        dom.appendChild(phtml);
    } else {
        dom.insertAdjacentHTML("beforeEnd", html);
    }
}

var MaxZIndex = 1000;
var MinZIndex = -1000;

//Get the id of the Workflow Dialog belonging to element with id = id
function Workflow(id) {
    return id + 'WF';
}

function BringToFront(id, skipFixed) {
    BringToFrontHelper(id);
    if (!skipFixed) BringFixedToFront();
}

function BringToFrontHelper(id) {
    var target = document.getElementById(id);
    if (target == null) return;
    MaxZIndex = MaxZIndex + 1;
    target.style.zIndex = MaxZIndex;
};

function BringFixedToFront() {
    $axure(function (diagramObject) { return diagramObject.fixedKeepInFront; }).each(function (diagramObject) {
        $.each(diagramObject.scriptIds, function (index, item) {
            BringToFrontHelper(item);
        });
    });
}

function SendToBack(id) {
    var target = document.getElementById(id);
    if (target == null) return;
    MinZIndex = MinZIndex - 1;
    target.style.zIndex = MinZIndex;
}

function HideElement(id) {
    var source = document.getElementById(id);
    source.style.visibility = "hidden";
    RefreshScreen();
}

function RefreshScreen() {
    var oldColor = document.body.style.backgroundColor;
    var setColor = (oldColor == "rgb(0,0,0)") ? "#FFFFFF" : "#000000";
    document.body.style.backgroundColor = setColor;
    document.body.style.backgroundColor = oldColor;
}

function getAbsoluteLeft(node) {
    var currentNode = node;
    var left = 0;
    var fixed = false;
    while (currentNode != null && currentNode.tagName != "BODY") {
        left += currentNode.offsetLeft;
        if (currentNode.id != '' && $('#' + currentNode.id).css('position') == 'fixed') fixed = true;
        currentNode = currentNode.offsetParent;
    }
    if (fixed) left += document.body.scrollLeft;
    return left;
}

function getAbsoluteTop(node) {
    var currentNode = node;
    var top = 0;
    var fixed = false;
    while (currentNode != null && currentNode.tagName != "BODY") {
        top += currentNode.offsetTop;
        if (currentNode.id != '' && $('#' + currentNode.id).css('position') == 'fixed') fixed = true;
        currentNode = currentNode.offsetParent;
    }
    if (fixed) top += document.body.scrollTop;
    return top;
}

// ******************  Annotation and Link Functions ****************** //

function GetAnnotationHtml(annJson) {
    var retVal = "";
    for (var noteName in annJson) {
        if (noteName != "label") {
            retVal += "<div class='annotationName'>" + noteName + "</div>";
            retVal += "<div class='annotation'>" + annJson[noteName] + "</div>";
        }
    }
    return retVal;
}

var dialogs = new Object();

function ToggleWorkflow(event, id, width, height, hasWorkflow) {

    if (dialogs[id]) {
        var $dialog = dialogs[id];
        // reset the dialog
        dialogs[id] = undefined;
        if ($dialog.dialog("isOpen")) {
            $dialog.dialog("close");
            return;
        }
    }
    
    // we'll need to save the scroll position just for stupid IE which will skip otherwise
    var win = $(window);
    var scrollY = win.scrollTop();
    var scrollX = win.scrollLeft();

	var target = document.getElementById(Workflow(id));
	var bufferH = 10;
	var bufferV = 10;
	var blnLeft = false;
	var blnAbove = false;
	var sourceTop = event.pageY - document.body.scrollTop;
	var sourceLeft = event.pageX - document.body.scrollLeft;

	if (sourceLeft > width + bufferH + document.body.scrollLeft) {
		blnLeft = true;
	}
	if (sourceTop > height + bufferV + document.body.scrollTop) {
		blnAbove = true;
	}

	var top = 0;
	var left = 0;
	if (blnAbove) top = sourceTop - height - 20;
	else top = sourceTop + 10;
	if (blnLeft) left = sourceLeft - width - 4;
	else left = sourceLeft - 6;
	
    if (bIE) height += 50;

    var dObj = $axure.pageData.scriptIdToObject[id];
    var ann = dObj.annotation;
    var $dialog = $('<div></div>')
        .appendTo('body')
		.html(GetAnnotationHtml(ann))
		.dialog({
		    title: dObj.label,
		    width: width,
		    height: height,
		    minHeight: 150,
            position: [left, top],
		    dialogClass: 'dialogFix'
		});
		dialogs[id] = $dialog;

    // scroll ... just for IE
    window.scrollTo(scrollX, scrollY);

    
}

function ToggleLinks(event, linksid) {
    var links = document.getElementById(linksid);
    if (links.style.visibility == "visible") { HideElement(linksid); }
    else {
        if (bIE) {
            links.style.top = window.event.clientY + document.body.scrollTop;
            links.style.left = window.event.clientX + document.body.scrollLeft;
        }
        else {
            links.style.top = event.pageY;
            links.style.left = event.pageX;
        }
        links.style.visibility = "visible";
        BringToFront(linksid, true);
    }
    RefreshScreen();
}

// ******************  Utils for Interaction Action Functions ****************** //

function IsTrueMouseOut(idNoSpace, e) {
    if (!e) e = window.event;
    var target = window.event ? e.srcElement : e.target;

    while (target.nodeName != 'HTML') {
        if (target.style.visibility == 'hidden') return false;
        target = target.parentNode;
    }

    return IsTrueMouseEvent(idNoSpace, e.relatedTarget || e.toElement);
}

function IsTrueMouseOver(idNoSpace, e) {
    if (!e) e = window.event;
    return IsTrueMouseEvent(idNoSpace, e.relatedTarget || e.toElement);
}

function IsTrueMouseEvent(idNoSpace, relTarget) {
    while (relTarget != null && relTarget.nodeName != 'HTML') {
        var id = relTarget.id;
        var index = id.indexOf('Links');
        if (index > 0 && id.substring(0, index) == idNoSpace) return false;

        relTarget = relTarget.parentNode;
        if (relTarget == null || relTarget.id == idNoSpace) return false;
    }
    return true;
}

// ******************  Interaction Action Functions ****************** //

function NewTab(hyperlink, name) {
    window.open(hyperlink, name);
}

function NewWindow(hyperlink, name, features, center, width, height) {
    if (center) {
        var winl = (screen.width - width) / 2;
        var wint = (screen.height - height) / 2;
        features = features + ', left=' + winl + ', top=' + wint;
    }
    window.open(hyperlink, name, features);
}

function ParentWindowNeedsReload(newPageName) {
    var reload = false;
    try {
        var oldParentUrl = top.opener.window.location.href.split("#")[0];
        var lastslash = oldParentUrl.lastIndexOf("/");
        if (lastslash > 0) {
            oldParentUrl = oldParentUrl.substring(lastslash + 1, oldParentUrl.length);
            if (oldParentUrl == encodeURI(newPageName)) {
                reload = true;
            }
        }
    } catch (e) { }
    return reload;
}

function FrameWindowNeedsReload(iframe, newPageName) {
    var reload = false;
    try {
        var oldFrameUrl = iframe.contentWindow.location.href.split("#")[0];
        var lastslash = oldFrameUrl.lastIndexOf("/");
        if (lastslash > 0) {
            oldFrameUrl = oldFrameUrl.substring(lastslash + 1, oldFrameUrl.length);
            if (oldFrameUrl == encodeURI(newPageName)) {
                reload = true;
            }
        }
    } catch (e) { }
    return reload;
}

function GetScrollable(target) {
    var $target = $(target);
    var inScrollable = false;
    var current = $target;
    var last = $target;
    while (!current.is('body')) {
        var elementId = current.attr('id');
        var diagramObject = elementId && $axure.pageData.scriptIdToObject[elementId];
        if (diagramObject && diagramObject.type == 'dynamicPanel' && diagramObject.scrollbars != 'none') {
            //returns the panel diagram div which handles scrolling
            return document.getElementById(last.attr('id'));
        }
        last = current;
        current = current.parent();
    }
    return document.body;
}

function ScrollToWidget(id, scrollX, scrollY, easing, duration) {
    var target = document.getElementById(id);
    var scrollable = GetScrollable(target);
    var targetLeft = getRelativeLeft(target, scrollable);
    var targetTop = getRelativeTop(target, scrollable);
    if (!scrollX) targetLeft = scrollable.scrollLeft;
    if (!scrollY) targetTop = scrollable.scrollTop;

    if (easing == 'none') {
        if (scrollY) scrollable.scrollTop = targetTop;
        if (scrollX) scrollable.scrollLeft = targetLeft;
    } else {
        var $scrollable = $(scrollable);
        if ($(target).is('body')) { $scrollable = $('html,body'); }
        if (!scrollX) { $scrollable.animate({ scrollTop: targetTop }, duration, easing);
        } else if (!scrollY) { $scrollable.animate({ scrollLeft: targetLeft }, duration, easing);
        } else { $scrollable.animate({ scrollTop: targetTop, scrollLeft: targetLeft }, duration, easing); }
    }    
}

function getRelativeLeft(node, parent) {
    var currentNode = node;
    var left = 0;
    while (currentNode != null && currentNode.tagName != "BODY") {
        left += currentNode.offsetLeft;
        currentNode = currentNode.offsetParent;
        if (currentNode == parent) break;
    }
    return left;
}

function getRelativeTop(node, parent) {
    var currentNode = node;
    var top = 0;
    while (currentNode != null && currentNode.tagName != "BODY") {
        top += currentNode.offsetTop;
        currentNode = currentNode.offsetParent;
        if (currentNode == parent) break;
    }
    return top;
}

// ******************  Visibility and State Functions ****************** //

var widgetIdToShowFunction = new Object();
var widgetIdToHideFunction = new Object();

function SetPanelVisibility(dpId, value, easing, duration) {
    var dp = $('#' + dpId);
    var dpVisibility = document.getElementById(dpId).style.visibility;
    //cannot use dp.css('visibility') because that gets the effective visiblity
    //i.e. won't be able to set visibility on panels inside hidden panels

    if (value == 'toggle') {
        if (dpVisibility == 'hidden') {
            value = '';
        } else {
            value = 'hidden';
        }
    }

    if ((dpVisibility == 'hidden' && value == 'hidden') ||
        (dpVisibility == '' && value == '')) {
        return;
    }

    if (easing == 'none') {
        dp.css('display', '');
        dp.css('visibility', value);
    } else if (easing == 'fade') {
        if (value == 'hidden') {
            if (dpVisibility != 'hidden') {
                dp.fadeOut(duration, function () {
                    dp.css('visibility', 'hidden');
                });
            }
        } else {
            if (dpVisibility == 'hidden') {
                dp.css('display', 'none');
                dp.css('visibility', '');
                dp.fadeIn(duration, function () { });
            }
        }
    }

    if (value == 'hidden') {
        var hideFunction = widgetIdToHideFunction[dpId];
        if (hideFunction) {
            hideFunction();
        }
    } else {
        var showFunction = widgetIdToShowFunction[dpId];
        if (showFunction) {
            showFunction();
        }
    }
}

var widgetIdToPanelStateChangeFunction = new Object();

function SetPanelState(dpId, stateid, easingOut, directionOut, durationOut, easingIn, directionIn, durationIn) {
    var dpWasHidden = $('#' + dpId).css('visibility') == "hidden";
    if ($('#' + stateid).css('visibility') != "hidden" && !dpWasHidden) {
        return;
    }

    var width = $('#' + dpId).width();
    var height = $('#' + dpId).height();

    var oldStateId = GetPanelState(dpId);
    if (oldStateId == '') {
        $('#' + dpId + '> div[visibility!=hidden]').css('visibility', 'hidden');
        $('#' + dpId + '> div[visibility!=hidden]').css('display', '');
    } else {
        var oldState = $('#' + oldStateId);

        if (easingOut == 'none') {
            oldState.css('visibility', 'hidden');
            oldState.css('display', '');
            BringPanelStateToFront(dpId, stateid);
        } else if (easingOut == 'fade') {
            oldState.fadeOut(durationOut, function () {
                oldState.css('visibility', 'hidden');
                BringPanelStateToFront(dpId, stateid);
            });
        } else {
            var oldTop = oldState.css('top');
            var oldLeft = oldState.css('left');

            var onComplete = function () {
                oldState.css('visibility', 'hidden');
                oldState.css('top', oldTop);
                oldState.css('left', oldLeft);
                BringPanelStateToFront(dpId, stateid);
            };

            if (directionOut == "right") {
                MoveWidgetBy(oldStateId, width, 0, easingOut, durationOut, onComplete);
            } else if (directionOut == "left") {
                MoveWidgetBy(oldStateId, -width, 0, easingOut, durationOut, onComplete);
            } else if (directionOut == "up") {
                MoveWidgetBy(oldStateId, 0, -height, easingOut, durationOut, onComplete);
            } else if (directionOut == "down") {
                MoveWidgetBy(oldStateId, 0, height, easingOut, durationOut, onComplete);
            }

        }
    }

    var dp = $('#' + dpId);
    dp.css('display', '');
    dp.css('visibility', '');

    var newState = $('#' + stateid);
    if (easingIn == 'none') {
        newState.css('visibility', '');
        newState.css('display', '');
    } else if (easingIn == 'fade') {
        newState.css('display','none');
        newState.css('visibility', '');
        newState.fadeIn(durationIn, function () {});
    } else {
        var oldTop = Number(newState.css('top').replace("px", ""));
        var oldLeft = Number(newState.css('left').replace("px", ""));

        if (directionIn == "right") {
            newState.css('left', oldLeft - width + 'px');
        } else if (directionIn == "left") {
            newState.css('left', oldLeft + width + 'px');
        } else if (directionIn == "up") {
            newState.css('top', oldTop + height + 'px');
        } else if (directionIn == "down") {
            newState.css('top', oldTop - height + 'px');
        }

        newState.css('display', '');
        newState.css('visibility', '');

        if (directionIn == "right") {
            MoveWidgetBy(stateid, width, 0, easingIn, durationIn);
        } else if (directionIn == "left") {
            MoveWidgetBy(stateid, -width, 0, easingIn, durationIn);
        } else if (directionIn == "up") {
            MoveWidgetBy(stateid, 0, -height, easingIn, durationIn);
        } else if (directionIn == "down") {
            MoveWidgetBy(stateid, 0, height, easingIn, durationIn);
        }
    }

    var panelStateChangeFunction = widgetIdToPanelStateChangeFunction[dpId];
    if (panelStateChangeFunction) {
        panelStateChangeFunction();
    }

    if (dpWasHidden) {
        var showFunction = widgetIdToShowFunction[dpId];
        if (showFunction) {
            showFunction();
        }
    }
}

function SetPanelStateNext(dpId, loop, easingOut, directionOut, durationOut, easingIn, directionIn, durationIn) {
    var oldStateId = GetPanelState(dpId);
    if (oldStateId != '') {
        var index = Number(oldStateId.substring(2, oldStateId.indexOf('u'))) + 1;
        if (index >= $('#' + dpId).children().length) {
            if (loop) index = 0;
            else return;
        }
        var stateid = 'pd' + index + dpId;
        SetPanelState(dpId, stateid, easingOut, directionOut, durationOut, easingIn, directionIn, durationIn);
    }
}

function SetPanelStatePrevious(dpId, loop, easingOut, directionOut, durationOut, easingIn, directionIn, durationIn) {
    var oldStateId = GetPanelState(dpId);
    if (oldStateId != '') {
        var index = Number(oldStateId.substring(2, oldStateId.indexOf('u'))) - 1;
        if (index < 0) {
            if (loop) index = $('#' + dpId).children().length - 1;
            else return;
        }
        var stateid = 'pd' + index + dpId;
        SetPanelState(dpId, stateid, easingOut, directionOut, durationOut, easingIn, directionIn, durationIn);
    }
}

function SetPanelStateByValue(dpId, value, easingOut, directionOut, durationOut, easingIn, directionIn, durationIn) {
    var toMatch = $.trim(value).toLowerCase();
    var stateId;
    $('#' + dpId).children('*[data-label]').each(function (index, element) {
        // the || is to make sure it matches only the first one
        if (!stateId && element.getAttribute('data-label').toLowerCase() == toMatch) stateId = element.id;
    });
    if (stateId) {
        SetPanelState(dpId, stateId, easingOut, directionOut, durationOut, easingIn, directionIn, durationIn);
    } else if (isNaN(value)) {
        return;
    } else {
        var index = value - 1;
        var stateId = 'pd' + index + dpId;
        if ($('#' + dpId).children('[id="' + stateId + '"]').length > 0)
            SetPanelState(dpId, stateId, easingOut, directionOut, durationOut, easingIn, directionIn, durationIn);
    }
}

function BringPanelStateToFront(dpId, stateid) {
    $('#' + stateid).appendTo($('#' + dpId));
}

// ******************  Move Functions ****************** //
var widgetIdToMoveFunction = new Object();
var widgetMoveInfo = new Object();

function MoveWidgetTo(id, x, y, easing, duration) {
    var widget = $('#' + id);
    var deltaX = x - Number(widget.css('left').replace("px", ""));
    var deltaY = y - Number(widget.css('top').replace("px", ""));
    MoveWidgetBy(id, deltaX, deltaY, easing, duration);
}

function MoveWidgetBy(id, x, y, easing, duration, animationCompleteCallback) {
    LogMovedWidgetForDrag(id);

    var widget = $('#' + id);

    var horzProp = 'left';
    var vertProp = 'top';
    var horzX = x;
    var vertY = y;

    if (widget.css('left') == 'auto') {
        horzProp = 'right';
        horzX = -x;
    } else if (widget.css('left') == '50%') {
        horzProp = 'margin-left';
    }

    if (widget.css('top') == 'auto') {
        vertProp = 'bottom';
        vertY = -y;
    } else if (widget.css('top') == '50%') {
        vertProp = 'margin-top';
    }
    var cssStyles = {};
    cssStyles[horzProp] = '+=' + horzX;
    cssStyles[vertProp] = '+=' + vertY;

    if (easing == 'none') {
        $('#' + id).animate(cssStyles, 0);
    } else {
        $('#' + id).animate(cssStyles, duration, easing, animationCompleteCallback);
    }
    
    var moveInfo = new Object();
    moveInfo.x = x;
    moveInfo.y = y;
    moveInfo.easing = easing;
    moveInfo.duration = duration;
    widgetMoveInfo[id] = moveInfo;

    var moveFunction = widgetIdToMoveFunction[id];
    if (moveFunction) {
        moveFunction();
    }
}

function MoveWidgetWithThis(id, srcId) {
    var moveInfo = widgetMoveInfo[srcId];
    if (moveInfo) {
        MoveWidgetBy(id, moveInfo.x, moveInfo.y, moveInfo.easing, moveInfo.duration);
    }
}

function MoveWidgetToLocationBeforeDrag(id, easing, duration) {
    if (widgetDragInfo.movedWidgets[id]) {
        var loc = widgetDragInfo.movedWidgets[id];
        MoveWidgetTo(id, loc.x, loc.y, easing, duration);
    }
}

function LogMovedWidgetForDrag(id) {
    if (widgetDragInfo.hasStarted) {
        var widget = $('#' + id);
        var y = Number(widget.css('top').replace("px", ""));
        var x = Number(widget.css('left').replace("px", ""));
        var movedWidgets = widgetDragInfo.movedWidgets;
        if (!movedWidgets[id]) {
            movedWidgets[id] = new Location(x, y);
        }
    }
}

// ******************  Drag Functions ****************** //

var widgetIdToStartDragFunction = new Object();
var widgetIdToDragFunction = new Object();
var widgetIdToDragDropFunction = new Object();
var widgetIdToSwipeLeftFunction = new Object();
var widgetIdToSwipeRightFunction = new Object();

var widgetDragInfo = new Object();

function StartDragWidget(event, id) {
    var x, y;
    var tg;
    if (bIE) {
        x = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
        y = window.event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
        tg = window.event.srcElement;
    }
    else {
        if (event.changedTouches) {
            x = event.changedTouches[0].pageX;
            y = event.changedTouches[0].pageY;
        } else {
            x = event.pageX;
            y = event.pageY;
            event.preventDefault();
        }
        tg = event.target;
    }
    widgetDragInfo.hasStarted = false;
    widgetDragInfo.widgetId = id;
    widgetDragInfo.cursorStartX = x;
    widgetDragInfo.cursorStartY = y;
    widgetDragInfo.lastX = x;
    widgetDragInfo.lastY = y;
    widgetDragInfo.currentX = x;
    widgetDragInfo.currentY = y;
    widgetDragInfo.movedWidgets = new Object();
    widgetDragInfo.startTime = (new Date()).getTime();
    widgetDragInfo.targetWidget = tg;

    if (bIE) {
        document.attachEvent("onmousemove", DragWidget);
        document.attachEvent("onmouseup", StopDragWidget);
    }
    else {
        document.addEventListener("mousemove", DragWidget, true);
        document.addEventListener("mouseup", StopDragWidget, true);
        document.addEventListener("touchmove", DragWidget, true);
        document.addEventListener("touchend", StopDragWidget, true);
    }
    SuppressBubble(event);
}

function DragWidget(event) {
    var x, y;
    if (bIE) {
        x = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
        y = window.event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
    }
    else {
        if (event.changedTouches) {
            x = event.changedTouches[0].pageX;
            y = event.changedTouches[0].pageY;
            //allow scroll (defaults) if only swipe events have cases and delta x is less than 5px and not blocking scrolling
            var deltaX = x - widgetDragInfo.currentX;
            if (widgetIdToDragFunction[widgetDragInfo.widgetId] || (deltaX * deltaX) > 25 || $axure.pageData.options.preventScroll) {
                event.preventDefault();
            }
        } else {
            x = event.pageX;
            y = event.pageY;
        }
    }
    widgetDragInfo.xDelta = x - widgetDragInfo.currentX;
    widgetDragInfo.yDelta = y - widgetDragInfo.currentY;
    widgetDragInfo.lastX = widgetDragInfo.currentX;
    widgetDragInfo.lastY = widgetDragInfo.currentY;
    widgetDragInfo.currentX = x;
    widgetDragInfo.currentY = y;
    widgetDragInfo.currentTime = (new Date()).getTime();
    
    SuppressBubble(event);

    if (!widgetDragInfo.hasStarted) {
        widgetDragInfo.hasStarted = true;
        var startFunction = widgetIdToStartDragFunction[widgetDragInfo.widgetId];
        if (startFunction) {
            startFunction();
        }
        widgetDragInfo.oldBodyCursor = document.body.style.cursor;
        document.body.style.cursor = 'move';
        var widget = document.getElementById(widgetDragInfo.widgetId);
        widgetDragInfo.oldCursor = widget.style.cursor;
        widget.style.cursor = 'move';
    }

    var dragFunction = widgetIdToDragFunction[widgetDragInfo.widgetId];
    if (dragFunction) {
        dragFunction();
    }
}

function SuppressClickAfterDrag(event) {
    if (bIE) { window.event.srcElement.detachEvent("onclick", SuppressClickAfterDrag);
    } else { document.removeEventListener("click", SuppressClickAfterDrag, true); }
    SuppressBubble(event);
}

function StopDragWidget(event) {

    var tg;
    if (bIE) {
        document.detachEvent("onmousemove", DragWidget);
        document.detachEvent("onmouseup", StopDragWidget);
        tg = window.event.srcElement;
    }
    else {
        document.removeEventListener("mousemove", DragWidget, true);
        document.removeEventListener("mouseup", StopDragWidget, true);
        document.removeEventListener("touchmove", DragWidget, true);
        document.removeEventListener("touchend", StopDragWidget, true);
        tg = event.target;
    }

    if (widgetDragInfo.hasStarted) {
        widgetDragInfo.currentTime = (new Date()).getTime();
        var dragDropFunction = widgetIdToDragDropFunction[widgetDragInfo.widgetId];
        if (dragDropFunction) {
            dragDropFunction();
        }

        if (GetGlobalVariableValue('TotalDragX') < -30 && GetGlobalVariableValue('DragTime') < 1000) {
            var swipeLeftFunction = widgetIdToSwipeLeftFunction[widgetDragInfo.widgetId];
            if (swipeLeftFunction) {
                swipeLeftFunction();
            }
        }

        if (GetGlobalVariableValue('TotalDragX') > 30 && GetGlobalVariableValue('DragTime') < 1000) {
            var swipeRightFunction = widgetIdToSwipeRightFunction[widgetDragInfo.widgetId];
            if (swipeRightFunction) {
                swipeRightFunction();
            }
        }

        document.body.style.cursor = widgetDragInfo.oldBodyCursor;
        var widget = document.getElementById(widgetDragInfo.widgetId);
        widget.style.cursor=widgetDragInfo.oldCursor;

        if (widgetDragInfo.targetWidget == tg && !event.changedTouches) {
            // suppress the click after the drag on desktop browsers
            if (bIE && widgetDragInfo.targetWidget) { widgetDragInfo.targetWidget.attachEvent("onclick", SuppressClickAfterDrag); }
            else { document.addEventListener("click", SuppressClickAfterDrag, true); }
        }
    }
        
    widgetDragInfo.hasStarted = false;
    widgetDragInfo.movedWidgets=new Object();

    return false;
}

function GetDragX() {
    if (widgetDragInfo.hasStarted) return widgetDragInfo.xDelta;
    return 0;
}

function GetDragY() {
    if (widgetDragInfo.hasStarted) return widgetDragInfo.yDelta;
    return 0;
}

function GetTotalDragX() {
    if (widgetDragInfo.hasStarted) return widgetDragInfo.currentX - widgetDragInfo.cursorStartX;
    return 0;
}

function GetTotalDragY() {
    if (widgetDragInfo.hasStarted) return widgetDragInfo.currentY - widgetDragInfo.cursorStartY;
    return 0;
}

function GetDragTime() {
    if (widgetDragInfo.hasStarted) return widgetDragInfo.currentTime - widgetDragInfo.startTime;
    return 600000;
}

function GetDragCursorRectangles() {
    var rects = new Object();
    rects.lastRect = new Rectangle(widgetDragInfo.lastX, widgetDragInfo.lastY, 1, 1);
    rects.currentRect = new Rectangle(widgetDragInfo.currentX, widgetDragInfo.currentY, 1, 1);
    return rects;
}

function GetWidgetRectangles(id) {
    var widget = document.getElementById(id);
    var rects = new Object();
    rects.lastRect = new Rectangle(getAbsoluteLeft(widget), getAbsoluteTop(widget), Number($('#' + id).css('width').replace("px", "")), Number($('#' + id).css('height').replace("px", "")));
    rects.currentRect = rects.lastRect;
    return rects;
}

function IsEntering(movingRects, targetRects) {
    return !movingRects.lastRect.IntersectsWith(targetRects.currentRect) && movingRects.currentRect.IntersectsWith(targetRects.currentRect);
}

function IsLeaving(movingRects, targetRects) {
    return movingRects.lastRect.IntersectsWith(targetRects.currentRect) && !movingRects.currentRect.IntersectsWith(targetRects.currentRect);
}

function IsOver(movingRects, targetRects) {
    return movingRects.currentRect.IntersectsWith(targetRects.currentRect);
}

function IsNotOver(movingRects, targetRects) {
    return !IsOver(movingRects, targetRects);
}

function Rectangle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.right = x + width;
    this.bottom = y + height;

    this.IntersectsWith = IntersectsWith;

    function IntersectsWith(rect) {
        return this.x < rect.right && this.right > rect.x && this.y < rect.bottom && this.bottom > rect.y;
    }
}

function Location(x, y) {
    this.x = x;
    this.y = y;
}

// ******************  String Function ****************** //

function ValueContains(inputString, value) {
    return inputString.indexOf(value) > -1;
}

function ValueNotContains(inputString, value) {
    return !ValueContains(inputString, value);
}

// ******************  Date Functions ****************** //

function GetDayString(day) {
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    return weekday[day];
}

function GetMonthString(m) {
    var month = new Array(12);
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    return month[m];
}

// ******************  Sim Functions ****************** //
function SetCheckState(id, value) {
    var boolValue = Boolean(value);
    if (value == 'false') {
        boolValue = false;
    }
    document.getElementById(id).checked = boolValue;
}

function SetSelectedOption(id, value) {
    document.getElementById(id).value = value;
}

function SetGlobalVariableValue(id, value) {
    $axure.globalVariableProvider.setVariableValue(id, value);
}

function SetWidgetFormText(id, value) {
    document.getElementById(id).value = value;
}

function SetFocusedWidgetText(value) {
    if (lastFocusedControl) {
        lastFocusedControl.focus();
        lastFocusedControl.value = value;
    }
}

function GetRtfElementHeight(rtfElement) {
    if (rtfElement.innerHTML == '') rtfElement.innerHTML = '&nbsp;';
    return rtfElement.offsetHeight;
}

function SetWidgetRichText(id, value) {
    //use the .visibility property instead of jquery's effective visibility
    var rtfVisibility = document.getElementById(id).style.visibility;
    if (rtfVisibility == 'hidden') $('#' + id).css('visibility', '');

    var rtfElement = document.getElementById(id + '_rtf');
    var oldHeight = GetRtfElementHeight(rtfElement);

    //Replace any newlines with line breaks
    value = value.replace(/\n/g, '<br/>');
    
    rtfElement.innerHTML = value;
    var newHeight = GetRtfElementHeight(rtfElement);

    var oldTop = Number($('#' + id).css('top').replace("px", ""));
    var vAlign = gv_vAlignTable[id];

    if (vAlign == "center") {
        var newTop = oldTop - (newHeight - oldHeight) / 2;
        $('#' + id).css('top', newTop + 'px');
    } else if (vAlign == "bottom") {
        var newTop = oldTop - newHeight + oldHeight;
        $('#' + id).css('top', newTop + 'px');
    } // do nothing if the alignment is top  

    if (gv_OriginalTextCache[id]) {
        CacheOriginalText(id);
    }
}

function GetCheckState(id) {
    return document.getElementById(id).checked;
}

function GetSelectedOption(id) {
    return document.getElementById(id).value;
}

function GetNum(str) {
    //Setting a GlobalVariable to some blank text then setting a widget to the value of that variable would result in 0 not ""
    //I have fixed this another way so commenting this should be fine now
    //if (!str) return "";
    return isNaN(str) ? str : Number(str);
}

function GetGlobalVariableValue(id) {
    return $axure.globalVariableProvider.getVariableValue(id);
}

function GetGlobalVariableLength(id) {
    return GetGlobalVariableValue(id).length;
}

function GetWidgetText(id) {
    var idQuery = $('#' + id);
    if (idQuery.is('div')) {
        var $rtfObj = idQuery.find('div[id$="_rtf"]');
        if ($rtfObj.length == 0) return;

        var textOut = '';
        $rtfObj.children('p').each(function (index) {
            if (index != 0) textOut += '\n';

            //Replace line breaks (set in SetWidgetRichText) with newlines and nbsp's with regular spaces.
            var htmlContent = $(this).html().replace(/<br\/*>/ig, '\n').replace(/&nbsp;/ig, ' ');
            textOut += $(htmlContent).text();
        });

        return textOut;
    } else if (idQuery.is('input') &&
        (idQuery.attr('type') == 'checkbox' || idQuery.attr('type') == 'radio')) {
        return idQuery.parent().find('label').find('div[id$="_rtf"]').text();
    } else {
        return idQuery.val();
    }
}

function GetFocusedWidgetText(id) {
    if (lastFocusedControl) {
        return lastFocusedControl.value;
    } else {
        return "";
    }
}

function GetWidgetValueLength(id) {
    return document.getElementById(id).value.length;
}

function GetWidgetVisibility(id) {
    if (document.getElementById(id).style.visibility == 'hidden') {
        return false;
    } else { return true; }
}

function GetPanelState(id) {
    var el = document.getElementById(id);
    if (el.style.visibility == 'hidden') { return ''; }

    var children = el.childNodes;
    for (var i = 0; i < children.length; i++) {
        if (children[i].style) {
            if (children[i].style.visibility != 'hidden') {
                return children[i].id;
            }
        }
    }
    return '';
}

// *****************  Validation Functions ***************** //

function IsValueAlpha(val) {
    var isAlphaRegex = new RegExp("^[a-z\\s]+$", "gi");
    return isAlphaRegex.test(val);
}

function IsValueNumeric(val) {
    var isNumericRegex = new RegExp("^[0-9,\\.\\s]+$", "gi");
    return isNumericRegex.test(val);
}

function IsValueAlphaNumeric(val) {
    var isAlphaNumericRegex = new RegExp("^[0-9a-z\\s]+$", "gi");
    return isAlphaNumericRegex.test(val);
}

function IsValueOneOf(val, values) {
    for (i = 0; i < values.length; i++) {
        var option = values[i];
        if (val == option) return true;
    }
    // by default, return false
    return false;
}

function IsValueNotAlpha(val) {
    return !IsValueAlpha(val);
}

function IsValueNotNumeric(val) {
    return !IsValueNumeric(val);
}

function IsValueNotAlphaNumeric(val) {
    return !IsValueAlphaNumeric(val);
}

function IsValueNotOneOf(val, values) {
    return !IsValueOneOf(val, values);
}

// ******************  Rollover Functions ****************** //

var gv_hoveredObject = '';

function HookHover(id, bringFront) {
//    return;
//    
//    $('.' + id + '_container').hover(
//		function (e) { // mouseenter
//		    if (id == gv_hoveredObject) return;
//		    gv_hoveredObject = id;
//		    SetWidgetHover(id, bringFront);
//		},
//		function () { // mouseleave
//		    if (id == gv_hoveredObject) gv_hoveredObject = '';
//		    SetWidgetNotHover(id, bringFront);
//		}
//	);
}

function HookClick(id, bringFront) {
//    
//    $('.' + id + '_container')
//		.mousedown(function () {
//		    SetWidgetMouseDown(id, bringFront);
//		})
//		.mouseup(function () {
//		    SetWidgetNotMouseDown(id, bringFront);
//		})
//	;
}


function SetWidgetOriginal(id, bringFront) {
    ApplyImageAndTextJson(id, 'normal', bringFront, true);
}

function SetWidgetHover(id, bringFront) {
    if (IsWidgetSelected(id) || IsWidgetDisabled(id)) { return; }
    
    ApplyImageAndTextJson(id, 'mouseOver', bringFront, false);
}

function SetWidgetNotHover(id, bringFront) {
    if (IsWidgetSelected(id) || IsWidgetDisabled(id)) { return; }

    SetWidgetOriginal(id, bringFront);
}

function GetWidgetCurrentState(id) {
    if (IsWidgetDisabled(id)) return "disabled";
    if (IsWidgetSelected(id)) return "selected";
    if ($axure.eventManager.mouseOverObjectId == id ||
        $axure.eventManager.mouseOverLinkId) return "mouseOver";
    if ($axure.eventManager.mouseDownObjectId == id ||
        $axure.eventManager.mouseDownLinkId) return "mouseDown";

    return "normal";
}

function SetLinkStyle(id, parentId, styleName) {
    var style = GetStyleOverridesForState(id, parentId, styleName);
    if ($.isEmptyObject(style)) return;

    var textId = GetTextIdFromLink(id);

    if (!gv_OriginalTextCache[textId]) { CacheOriginalText(textId); }
    var parentObjectCache = gv_OriginalTextCache[textId].styleCache;

    TextTransformWithVerticalAlignment(textId, function () {
        var cssProps = GetCssStyleProperties(style);
        $('#' + id).find('*').andSelf().each(function (index, element) {
            element.setAttribute('style', parentObjectCache[element.id]);
            ApplyCssProps(element, cssProps);
        });
    });
}

function ResetLinkStyle(id) {
    var textId = GetTextIdFromLink(id);
    var parentObjectCache = gv_OriginalTextCache[textId].styleCache;

    TextTransformWithVerticalAlignment(textId, function () {
        $('#' + id).find('*').andSelf().each(function (index, element) {
            element.style.cssText = parentObjectCache[element.id];
        });
    });
    if ($axure.eventManager.mouseDownObjectId) {
        SetWidgetMouseDown($axure.eventManager.mouseDownObjectId);
    } else if ($axure.eventManager.mouseOverObjectId) {
        SetWidgetHover($axure.eventManager.mouseOverObjectId);
    }    
}

function SetLinkHover(id) {
    var parentId = $axure.eventManager.mouseOverObjectId;
    SetLinkStyle(id, parentId, "mouseOver");
}

function SetLinkNotHover(id) {
    ResetLinkStyle(id);
}

function SetLinkMouseDown(id) {
    var parentId = $axure.eventManager.mouseOverObjectId;
    SetLinkStyle(id, parentId, "mouseDown");
}

function SetLinkNotMouseDown(id) {
    ResetLinkStyle(id);
    
    var style = GetStyleOverridesForState(id, $axure.eventManager.mouseOverObjectId, "mouseOver");
    if(!$.isEmptyObject(style)) {
        SetLinkHover(id);
    } // we dont do anything here bocause the widget not mouse down has taken over here
}

function SetWidgetMouseDown(id, bringFront) {
    if (IsWidgetSelected(id) || IsWidgetDisabled(id)) { return; }
    var widgetObject = $axure.pageData.scriptIdToObject[id];
    
    if (!(widgetObject && widgetObject.style && widgetObject.style.stateStyles &&
        widgetObject.style.stateStyles.mouseDown)) return;
    
    ApplyImageAndTextJson(id, 'mouseDown', bringFront, false);
}

function SetWidgetNotMouseDown(id, bringFront) {
    if (IsWidgetSelected(id) || IsWidgetDisabled(id)) { return; }
    var widgetObject = $axure.pageData.scriptIdToObject[id];
    var hasMouseOver = widgetObject && widgetObject.style && widgetObject.style.stateStyles && widgetObject.style.stateStyles.mouseOver;
    if(hasMouseOver) {
        SetWidgetHover(id, bringFront);
    } else {
        SetWidgetOriginal(id, bringFront);
    }
}

var gv_SelectedWidgets = new Object();

function SetWidgetSelected(id) {
    var group = $('#' + id).attr('selectiongroup');
    if (group) {
        $("[selectiongroup='" + group + "'][visibility!='hidden']").each(function (i, obj) {
            SetWidgetNotSelected($(obj).attr('id'));
        });
    }

    var widgetObject = $axure.pageData.scriptIdToObject[id];
    if (widgetObject) {
        while (widgetObject.isContained) widgetObject = widgetObject.parent;
        var hasSelected = widgetObject && widgetObject.style && widgetObject.style.stateStyles && widgetObject.style.stateStyles.selected;
        if (hasSelected) ApplyImageAndTextJson(id, 'selected', false, false);
    }
    
    gv_SelectedWidgets[id] = 'true';
}

function SetWidgetNotSelected(id) {
    var widgetObject = $axure.pageData.scriptIdToObject[id];
    if (widgetObject) {
        while (widgetObject.isContained) widgetObject = widgetObject.parent;
        var hasSelected = widgetObject && widgetObject.style && widgetObject.style.stateStyles && widgetObject.style.stateStyles.selected;
        if (hasSelected) SetWidgetOriginal(id, false);
    }
    
    gv_SelectedWidgets[id] = 'false';
}

function IsWidgetSelected(id) {    
    if (gv_SelectedWidgets[id] && gv_SelectedWidgets[id] == 'true') { return true; }
    return false;
}

var gv_DisabledWidgets = new Object();

function DisableImageWidget(id) {
    gv_DisabledWidgets[id] = true;

    ApplyImageAndTextJson(id, 'disabled', false, false);
    $('#' + id).find('a').css('cursor', 'default');    
}

function EnableImageWidget(id) {
    //document.getElementById(id).style.visibility = '';
    gv_DisabledWidgets[id] = false;

    SetWidgetOriginal(id, false);
    $('#' + id).find('a').css('cursor', 'pointer');
}

function IsWidgetDisabled(id) {
    return Boolean(gv_DisabledWidgets[id]);
}

function GetTextIdFromShape(id) {
    return $.grep(
        $('#' + id).children().map(function (i, obj) { return obj.id; }), // all the child ids
        function (item) { return item.indexOf(id) < 0; })[0]; // that are not similar to the parent
}

function GetTextIdFromLink(id) {
    var rtfElementId = $('#' + id).parentsUntil('[id^="u"][id$="_rtf"]').last().parent().attr('id');
    return rtfElementId ? rtfElementId.replace('_rtf', '') : '';
}

function GetShapeIdFromText(textId) {
    return $('#' + textId).parent().attr('id');
}

function ApplyImageAndTextJson(id, event, bringToFront, isOriginal) {
    var obj = document.getElementById(id);
    if (obj && obj.style.visibility == 'hidden' && isOriginal) { return; }

    var textid = GetTextIdFromShape(id);
    
    ResetImagesAndTextJson(id, textid);

    if (event != '') {
        var e = $('#' + id + '_img').data('events');
        if (e && e[event]) {
            $('#' + id + '_img').trigger(event);
        }
        var style = GetStyleOverridesForState(id, null, event);
        ApplyImageStyle(id, event, style);
        if(!$.isEmptyObject(style)) ApplyTextStyle(textid, style);
    }

    if (bringToFront) { BringToFront(id + '_container'); BringToFront(id); BringToFront(id + 'ann'); }
}

function GetStyleOverridesForState(id, parentId, state) {
    var stateStyles = { };

    if(parentId) {
        var parent = $axure.pageData.scriptIdToObject[parentId];
        $.extend(stateStyles, parent && parent.getStateStyleOverrides(state));
    }

    var diagramObject = $axure.pageData.scriptIdToObject[id];
    var isHyperlink = $('#' + id).is('a');
    if(isHyperlink) {
        if(state == 'mouseOver') {
            $.extend(stateStyles, $axure.pageData.stylesheet.defaultStyles.hyperlinkMouseOver);
            $.extend(stateStyles, diagramObject && GetFullStateStyle(diagramObject.style, 'mouseOver'));
        } else if(state == 'mouseDown') {
            $.extend(stateStyles, $axure.pageData.stylesheet.defaultStyles.hyperlinkMouseOver);
            $.extend(stateStyles, diagramObject && GetFullStateStyle(diagramObject.style, 'mouseOver'));
            $.extend(stateStyles, $axure.pageData.stylesheet.defaultStyles.hyperlinkMouseDown);
            $.extend(stateStyles, diagramObject && GetFullStateStyle(diagramObject.style, 'mouseDown'));
        } else $.extend(stateStyles, diagramObject && diagramObject.getStateStyleOverrides(state));
    } else $.extend(stateStyles, diagramObject && diagramObject.getStateStyleOverrides(state));
    return stateStyles;
}

function GetFullStateStyle(style, state) {
    var stateStyle = style && style.stateStyles && style.stateStyles[state];
    if(stateStyle) {
        // acount for the custom style property
        var customStyle = stateStyle.baseStyle && $axure.pageData.stylesheet.stylesById[stateStyle.baseStyle];
        return $.extend(customStyle || {}, stateStyle);
    }
    return { };
}

function ApplyImageStyle(id, event, style) {
    if (!(style && event)) return;
    CacheOriginalImgSrc(id);

    var diagramObject = $axure.pageData.scriptIdToObject[id];
    var img = $('#' + id + '_img');
    if (diagramObject.type != 'imageBox' || (style.image && style.image.cssStyle)) {
        var styleName = style.image ? style.image.cssStyle : (id + "_" + event);
        img.removeClass().empty().addClass(styleName);
    } else if (style.image && style.image.url) {
        //If this is a basic link (only for axure.com), then set the image border to none
        //Resolves issue of blue borders around basic link images in Firefox 3.x
        var basicLinkNoBorder = (img.parents('a.basiclink').length > 0) ? " style='border:none;' " : "";
        
        img.removeClass().html("<IMG src='" + style.image.url + "'" + basicLinkNoBorder + " class='raw_image'>");
    }
}

function CacheOriginalImgSrc(id) {
    if (!gv_OriginalImgSrc[id + '_img']) {
        var src = $('#' + id + '_img > img').attr('src');
        if (src) gv_OriginalImgSrc[id + '_img'] = src;
        else gv_OriginalImgSrc[id + '_img'] = 'none';
    }
}

function ResetImagesAndTextJson(id, textid) {
    CacheOriginalImgSrc(id);

    var img = $('#' + id + '_img'), e = img.data('events');
    if (e && e['_normal']) {
        img.trigger('_normal');
    } else {
        img.removeClass().empty();
        if (gv_OriginalImgSrc[id + '_img'] && gv_OriginalImgSrc[id + '_img'] != 'none') {
            //If this is a basic link (only for axure.com), then set the image border to none
            //Resolves issue of blue borders around basic link images in Firefox 3.x
            var basicLinkNoBorder = (img.parents('a.basiclink').length > 0) ? " style='border:none;' " : "";

            img.html("<IMG src='" + gv_OriginalImgSrc[id + '_img'] + "'" + basicLinkNoBorder + " class='raw_image'>");
        } else {
            img.addClass(id + '_normal');
        }
    }

    var cacheObject = gv_OriginalTextCache[textid];
    if (cacheObject) {
        var styleCache = cacheObject.styleCache;
        $('#' + textid + "_rtf").find('*').each(function (index, element) {
            element.style.cssText = styleCache[element.id];
        });
        var container = document.getElementById(textid);
        container.style.top = cacheObject.top;
        
    }
}

// Preserves the alingment for the element textid after executing transformFn
function TextTransformWithVerticalAlignment(textId, transformFn) {
    if (!gv_OriginalTextCache[textId]) { CacheOriginalText(textId); }

    var rtfElement = document.getElementById(textId + '_rtf');
    if (!rtfElement) return;

    var oldHeight = GetRtfElementHeight(rtfElement);

    transformFn();

    // now handle vertical alignment
    var newHeight = GetRtfElementHeight(rtfElement);
    var oldTop = Number($('#' + textId).css('top').replace("px", ""));
    var vAlign = gv_vAlignTable[textId];

    if (vAlign == "center") {
        var newTop = oldTop - (newHeight - oldHeight) / 2;
        $('#' + textId).css('top', newTop + 'px');
    } else if (vAlign == "bottom") {
        var newTop = oldTop - newHeight + oldHeight;
        $('#' + textId).css('top', newTop + 'px');
    } // do nothing if the alignment is top
}

//-------------------------------------------------------------------------
// ApplyTextRollover
//
// Applies a rollover style to a text element.
//       id : the id of the text object to set.
//       styleProperties : an object mapping style properties to values. eg:
//                         { 'fontWeight' : 'bold',
//                           'fontStyle' : 'italic' }
//-------------------------------------------------------------------------
function ApplyTextStyle(id, style) {
    TextTransformWithVerticalAlignment(id, function () {
        var styleProperties = GetCssStyleProperties(style);
        $('#' + id + "_rtf").find('*').each(function (index, element) {
            ApplyCssProps(element, styleProperties);
        });
    });
}

function ApplyCssProps(element, styleProperties) {
    var nodeName = element.nodeName.toLowerCase();
    if(nodeName == 'p') {
        var parProps = styleProperties.parProps;
        for(var prop in parProps) element.style[prop] = parProps[prop];
    } else if(nodeName != 'a') {
        var runProps = styleProperties.runProps;
        for(prop in runProps) element.style[prop] = runProps[prop];
    }
}

function GetCssStyleProperties(style) {
    var toApply = {};
    toApply.runProps = {};
    toApply.parProps = {};

    if(style.italic !== undefined) toApply.runProps.fontStyle = style.italic ? 'italic' : 'normal';
    if(style.bold !== undefined) toApply.runProps.fontWeight = style.bold ? 'bold' : 'normal';
    if(style.underline !== undefined) toApply.runProps.textDecoration = style.underline ? 'underline' : 'none';
    if(style.fontName) toApply.runProps.fontFamily = style.fontName;
    if(style.fontSize) toApply.runProps.fontSize = style.fontSize;
    if(style.foreGroundFill) {
        var colorString = '00000' + style.foreGroundFill.color.toString(16);
        toApply.runProps.color = '#' + colorString.substring(colorString.length - 6);
    }

    if(style.horizontalAlignment) toApply.parProps.textAlign = style.horizontalAlignment;
    if(style.lineSpacing) toApply.parProps.lineHeight = style.lineSpacing;

    return toApply;
}

//    //--------------------------------------------------------------------------
//    // ApplyStyleRecursive
//    //
//    // Applies a style recursively to all span and div tags including elementNode
//    // and all of its children.
//    //
//    //     element : the element to apply the style to
//    //     styleName : the name of the style property to set (eg. 'font-weight')     
//    //     styleValue : the value of the style to set (eg. 'bold')
//    //--------------------------------------------------------------------------
//    function ApplyStyleRecursive(element, styleName, styleValue) {
//        var nodeName = element.nodeName.toLowerCase();

//        if (nodeName == 'div' || nodeName == 'span' || nodeName == 'p') {
//            element.style[styleName] = styleValue;
//        }

//        for (var i = 0; i < element.childNodes.length; i++) {
//            ApplyStyleRecursive(element.childNodes[i], styleName, styleValue);
//        }
//    }

//    //---------------------------------------------------------------------------
//    // ApplyTextProperty
//    //
//    // Applies a text property to rtfElement.
//    //
//    //     rtfElement : the the root text element of the rtf object (this is the
//    //                  element named <id>_rtf
//    //     prop : the style property to set.
//    //     value : the style value to set.
//    //---------------------------------------------------------------------------
//    function ApplyTextProperty(rtfElement, prop, value) {
//        /*
//        var oldHtml = rtfElement.innerHTML;
//        if (prop == 'fontWeight') {
//            rtfElement.innerHTML = oldHtml.replace(/< *b *\/?>/gi, "");
//        } else if (prop == 'fontStyle') {
//            rtfElement.innerHTML = oldHtml.replace(/< *i *\/?>/gi, "");
//        } else if (prop == 'textDecoration') {
//            rtfElement.innerHTML = oldHtml.replace(/< *u *\/?>/gi, "");
//        }
//        */

//        for (var i = 0; i < rtfElement.childNodes.length; i++) {
//            ApplyStyleRecursive(rtfElement.childNodes[i], prop, value);
//        }
//    }
//}

//---------------------------------------------------------------------------
// GetAndCacheOriginalText
//
// Gets the html for the pre-rollover state and returns the Html representing
// the Rich text.
//---------------------------------------------------------------------------
var CACHE_COUNTER = 0;
function CacheOriginalText(id) {
    var rtfQuery = $('#' + id + "_rtf");
    if (rtfQuery.length > 0) {

        var styleCache = {};
        rtfQuery.find('*').each(function (index, element) {
            var elementId = element.id;
            if (!elementId) element.id = elementId = 'cache' + CACHE_COUNTER++;
            styleCache[elementId] = element.style.cssText;
        });
        
        var cacheObject = {
            top: $('#' + id).css('top'),
            styleCache:styleCache
        };
        
        gv_OriginalTextCache[id] = cacheObject;        
    }
}
