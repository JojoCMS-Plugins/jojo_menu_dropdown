$("document").ready(function() {
    if ($("#menu .hassubmenu").length>0) {
        $("#menu").initMenu();
    }
});

function MenuController( rootElement ) {

	this.rootElement = rootElement;

	function checkRootElement() {
		var rootNodeName = jQuery(rootElement).get(0).tagName;
		if(!rootNodeName == "DIV" || !rootNodeName == "nav") {
			throw "Type of main menu root element should be div or nav";
		}
	}

	function setCssForTopbarItems( topList ) {
		topList.children("li").each( function() {
			topItem = jQuery(this);
			topItem.addClass("topbar-menu-item");
			topItem.children(":not(ul)").each( function() {
				jQuery(this).addClass("topbar-menu-item");
			});
		});
	}

	function setCssForSubItems( topList ) {
		topList.find(":not(.topbar-menu-item)").each( function() {
			var subItem = jQuery(this);
			var subItemTagName = subItem.get(0).tagName;
			if( subItemTagName == "UL" || subItemTagName == "LI" || subItemTagName == "A" ){
				jQuery(this).addClass("sub-menu-item");
			}
		});
	}

	function setCssClasses() {
		rootElement.addClass("topbar-menu-item");
		var topList = rootElement.find("ul:first");
		topList.addClass("topbar-menu-item");
		setCssForTopbarItems(topList);
		setCssForSubItems(topList);
	}

	function hideAllSubMenus() {
		rootElement.find("ul.sub-menu-item").each( function() {
			if (!jQuery(this).hasClass('nohide')) {
			    jQuery(this).css({
				    "display": "none"
			    });
			}
		});
	}

	function updateStyle(element, style) {
		for(var entry in style) {
			element.css( entry, style[entry] );
		}
	}

	function setMouseEventHandlers() {
		rootElement.find("li.topbar-menu-item, li.sub-menu-item").hover( function() {
			var parent = jQuery(this);
			if(parent.hasClass("topbar-menu-item")) {
				updateStyle( parent.find("a:first"), topbarItemSelectedStyle );
			}
			if(parent.hasClass("sub-menu-item")) {
				updateStyle( parent.find("a:first"), subItemSelectedStyle );
			}
			jQuery(this).find("ul:first").each( function() {
				if(parent.hasClass("sub-menu-item")) {
					jQuery(this).css("left", parent.width()+1);
					jQuery(this).css("top", 0);
				}
				jQuery(this).css({visibility: "visible",display: "none"}).show();
			});
		}, function() {
			var parent = jQuery(this);
			if(parent.hasClass("topbar-menu-item")) {
				updateStyle( parent.find("a:first"), topbarItemStyle );
			}
			if(parent.hasClass("sub-menu-item")) {
				updateStyle( parent.find("a:first"), subItemStyle );
			}
			parent.find("ul:first").css({
				"visibility": "hidden"
			});
		});
	}

	function refresh() {
		var maxHeight = 1;
		rootElement.find("li.topbar-menu-item").each( function() {
			if(jQuery(this).height() > maxHeight) {
				maxHeight = jQuery(this).height();
			}
		});
		if(maxHeight == 0) {
			maxHeight = 58;
		}
		rootElement.height(maxHeight);
	}

	this.doSearch = function() {
		var searchString = getSearchString();
		searchButton.action.call(null, searchString);
	}

	function refreshSearchPanel() {

		if(!showSearchPanel) {
			return;
		}

		var searchTable = rootElement.find("table.topbar-search");
		var searchPanelHtml = "";
		searchPanelHtml += "<tr>";
		searchPanelHtml += "<td class=\"topbar-search\">";
		searchPanelHtml += "<input class=\"topbar-search\" type=\"text\"/>";
		searchPanelHtml += "</td>";
		searchPanelHtml += "<td class=\"topbar-search\">";
		var searchAction = "";
		if(searchButton.type == "button") {
			searchPanelHtml += "<input type=\"button\" class=\"topbar-search\" value=\"" + searchButton.caption + "\" onclick=\"jQuery(\'div#" + rootElement.attr("id") + "\').doSearch()\"/>";
			searchAction = searchButton.action;
		} else if(searchButton.type == "image") {
			searchPanelHtml += "<a class=\"topbar-search\" href=\"javascript:jQuery(\'div#" + rootElement.attr("id") + "\').doSearch();\">";
			searchPanelHtml += "<img src=\"" + searchButton.imageSource + "\" class=\"topbar-search\"/>";
			searchPanelHtml += "</a";
			searchAction = searchButton.action;
		} else {
			searchPanelHtml += "<input type=\"button\" class=\"topbar-search\" value=\"Search\"/>";
		}
		searchPanelHtml += "</td>";
		searchPanelHtml += "</tr>";
		if( jQuery(searchTable).size() == 0 ) {
			searchPanelHtml = "<table class=\"topbar-search\">" + searchPanelHtml + "</table>";
			rootElement.append(searchPanelHtml);
		} else {
			jQuery(searchTable).html(searchPanelHtml);
		}
		if(searchAction != "") {
			jQuery("input[type='text'].topbar-search").keypress( function(event) {
				if (event.which == '13') {
					event.preventDefault();
					eval(searchAction);
				}
			});
		}
	}

	function addArrow( arrow, selector ) {
		if( arrow == "") {
			return;
		}
		rootElement.find(selector).each( function() {
			var topbarItem = jQuery(this);
			if(topbarItem.find("li").size() > 0) {
				topbarItem.children("a").each( function() {
					jQuery(this).find("img.menu-arrow").remove();
					jQuery(this).append("<img src=\"" + arrow + "\" class=\"menu-arrow\"/>");
				});
			}
		});
	}

	function addArrows() {
		addArrow( topbarArrow, "li.topbar-menu-item" );
		addArrow( submenuArrow, "li.sub-menu-item" );
	}

	this.init = function() {
		checkRootElement();
		setCssClasses();
		hideAllSubMenus();
		setMouseEventHandlers();
		addArrows();
		refresh();
	};

	this.setRootStyle = function(style) {
		rootElement.css(style);
		refresh();
	};

	this.setStyle = function(selector, style) {
		rootElement.find(selector).each( function() {
			jQuery(this).css(style);
		});
		refresh();
	};

	var topbarItemStyle = "";
	this.setTopbarItemStyle = function(style) {
		topbarItemStyle = style;
	};

	var topbarItemSelectedStyle = "";
	this.setTopbarItemSelectedStyle = function(style) {
		topbarItemSelectedStyle = style;
	};

	var subItemStyle = "";
	this.setSubItemStyle = function(style) {
		subItemStyle = style;
	};

	var subItemSelectedStyle = "";
	this.setSubItemSelectedStyle = function(style) {
		subItemSelectedStyle = style;
	};

	var topbarArrow = "";
	var submenuArrow = "";
	this.setArrows = function(topbar, submenu) {
		topbarArrow = topbar;
		submenuArrow = submenu;
		addArrows();
	};

	var showSearchPanel = false;
	this.setShowSearchPanel = function(value) {
		showSearchPanel = value;
		refreshSearchPanel();
	};

	var searchButton = "";
	this.setSearchButton = function(value) {
		searchButton = value;
		refreshSearchPanel();
	};

	this.getSearchText = function() {
		var searchString = getSearchString();
		return searchString;
	};

	function getSearchString() {
		var searchString = "";
		rootElement.find("input:text.topbar-search").each( function() {
			searchString = jQuery(this).val();
		});
		return searchString;
	}

	this.setSearchText = function(value) {
		rootElement.find("input:text.topbar-search").each( function() {
			jQuery(this).val(value);
		});
	};
}

var controller;

jQuery.fn.initMenu = function() {
	controller = new MenuController(jQuery(this));
	controller.init();
};

jQuery.fn.setTopbarStyle = function(style) {
	controller.setRootStyle(style);
};

jQuery.fn.setTopbarItemStyle = function(style) {
	controller.setStyle("a.topbar-menu-item", style);
	controller.setTopbarItemStyle(style);
};

jQuery.fn.setTopbarItemSelectedStyle = function(style) {
	controller.setTopbarItemSelectedStyle(style);
};

jQuery.fn.setSubMenuStyle = function(style) {
	controller.setStyle("ul.sub-menu-item", style);
};

jQuery.fn.setSubItemStyle = function(style) {
	controller.setStyle("a.sub-menu-item", style);
	controller.setSubItemStyle(style);
};

jQuery.fn.setSubItemSelectedStyle = function(style) {
	controller.setSubItemSelectedStyle(style);
};

jQuery.fn.setArrows = function(topbar, submenu) {
	controller.setArrows(topbar, submenu);
};

jQuery.fn.setSearchTextStyle = function(style) {
	controller.setStyle("input[type=\"text\"].topbar-search", style);
};

jQuery.fn.setSearchButtonStyle = function(style) {
	controller.setStyle("input[type=\"button\"].topbar-search", style);
};

jQuery.fn.setSearchImageStyle = function(style) {
	controller.setStyle("img.topbar-search", style);
};

jQuery.fn.setShowSearchPanel = function(value) {
	controller.setShowSearchPanel(value);
};

jQuery.fn.setSearchButton = function(value) {
	controller.setSearchButton(value);
};

jQuery.fn.getSearchText = function() {
	return controller.getSearchText();
};

jQuery.fn.setSearchText = function(value) {
	return controller.setSearchText(value);
};

jQuery.fn.doSearch = function() {
	controller.doSearch();
};
