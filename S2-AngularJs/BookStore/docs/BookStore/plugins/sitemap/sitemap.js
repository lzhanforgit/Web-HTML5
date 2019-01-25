// use this to isolate the scope
(function () {

    var SHOW_HIDE_ANIMATION_DURATION = 0;

    $(document).ready(function () {
        $axure.player.createPluginHost({
            id: 'sitemapHost',
            context: 'interface',
            title: 'Sitemap'
        });

        generateSitemap();

        $('.sitemapPlusMinusLink').toggle(collapse_click, expand_click);
        $('.sitemapPageLink').click(node_click);

        $('#sitemapLinksAndOptionsContainer').hide();
        $('#sitemapToggleLinks').click(links_click);
        $('.sitemapLinkField').click(function () { this.select() });

        //        $('#sitemapHost').parent().resize(function () {
        //            $('#sitemapHost').height($(this).height());
        //        });

        // bind to the page load
        $axure.page.bind('load.sitemap', function () {
            var pageLoc = $axure.page.location.split("#")[0];
            var decodedPageLoc = decodeURI(pageLoc);
            var nodeUrl = decodedPageLoc.substr(decodedPageLoc.lastIndexOf('/') ? decodedPageLoc.lastIndexOf('/') + 1 : 0);

            $('.sitemapPageLink').removeClass('sitemapHighlight');
            $('.sitemapPageLink[nodeUrl="' + nodeUrl + '"]').addClass('sitemapHighlight');


            $('#sitemapLinksPageName').html('Links to ' + $('.sitemapHighlight > .sitemapPageName').html());

            var playerLoc = $(location).attr('href').split("#")[0].split("?")[0];
            var qString = "?Page=" + nodeUrl.substr(0, nodeUrl.lastIndexOf('.'));
            $('#sitemapLinkWithPlayer').val(playerLoc + qString);
            $('#sitemapLinkWithoutPlayer').val(pageLoc);

            $('#sitemapClosePlayer').unbind('click');
            $('#sitemapClosePlayer').click(function () { window.location.href = pageLoc; });

            return false;
        });


    });

    function collapse_click(event) {
        $(this)
            .children('.sitemapMinus').removeClass('sitemapMinus').addClass('sitemapPlus').end()
            .closest('li').children('ul').hide(SHOW_HIDE_ANIMATION_DURATION);
    }

    function expand_click(event) {
        $(this)
            .children('.sitemapPlus').removeClass('sitemapPlus').addClass('sitemapMinus').end()
            .closest('li').children('ul').show(SHOW_HIDE_ANIMATION_DURATION);
    }

    function node_click(event) {
        var preserveVars = !$('#sitemapVariableOption').is(':checked');
        $axure.page.navigate(this.getAttribute('nodeUrl'), preserveVars);
    }

    function links_click(event) {
        $('#sitemapLinksAndOptionsContainer').toggle();
        if ($('#sitemapLinksAndOptionsContainer').is(":visible")) {
            $('#sitemapToggleLinks').html('Hide Links and Options');
        } else {
            $('#sitemapToggleLinks').html('Show Links and Options');
        }
    }

    function generateSitemap() {
        var treeUl = "<div id='sitemapTreeContainer'>";
        treeUl += "<div class='sitemapToolbar'><a id='sitemapToggleLinks' class='sitemapToolbarButton'>Show Links and Options</a><div id='sitemapLinksAndOptionsContainer'>";
        treeUl += "<div id='sitemapLinksContainer'><span id='sitemapLinksPageName'>Page Name</span>";
        treeUl += "<div class='sitemapLinkContainer'><span class='sitemapLinkLabel'>with sitemap</span><input id='sitemapLinkWithPlayer' type='text' class='sitemapLinkField'/></div>";
        treeUl += "<div class='sitemapLinkContainer'><span class='sitemapLinkLabel'>without sitemap - </span><a id='sitemapClosePlayer'>link</a><input id='sitemapLinkWithoutPlayer' type='text' class='sitemapLinkField'/></div></div>";
        treeUl += "<div id='sitemapOptionsContainer'><span id='sitemapOptionsHeader'>Variable Options</span>";
        treeUl += "<div class='sitemapOptionContainer'><input id='sitemapVariableOption' type='checkbox' value='checkbox' /><label id='sitemapVariableOptionLabel' for='sitemapVariableOption'><span class='optionLabel'>Sitemap links clear variables</span></label></div></div>";
        treeUl += "</div></div>";
        treeUl += "<ul class='sitemapTree'>";
        var rootNodes = sitemap.rootNodes;
        for (var i = 0; i < rootNodes.length; i++) {
            treeUl += generateNode(rootNodes[i]);
        }
        treeUl += "</ul></div>";

        $('#sitemapHost').html(treeUl);
    }

    function generateNode(node) {
        var hasChildren = (node.children && node.children.length > 0);
        if (hasChildren) {
            var returnVal = "<li class='sitemapNode sitemapExpandableNode'><div><a class='sitemapPlusMinusLink'><span class='sitemapMinus'></span></a>";
        } else {
            var returnVal = "<li class='sitemapNode sitemapLeafNode'><div>";
        }
        returnVal += "<a class='sitemapPageLink' nodeUrl='" + node.url + "'><span class='sitemapPageIcon";
        if (node.type == "Flow") { returnVal += " sitemapFlowIcon"; }
        returnVal += "'></span><span class='sitemapPageName'>"
        returnVal += $('<div/>').text(node.pageName).html();
        returnVal += "</span></a></div>";
        if (hasChildren) {
            returnVal += "<ul>";
            for (var i = 0; i < node.children.length; i++) {
                var child = node.children[i];
                returnVal += generateNode(child);
            }
            returnVal += "</ul>";
        }
        returnVal += "</li>";
        return returnVal;
    }

})();
