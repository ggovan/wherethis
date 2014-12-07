var self = require("sdk/self");
var contextMenu = require("sdk/context-menu");

var menuItem = contextMenu.Item({
  label: "Where This?",
  context: contextMenu.SelectionContext(),
  contentScript: 'self.on("click", function () {' +
                 '  var text = window.getSelection().toString();' +
                 '  self.postMessage(text);' +
                 '});',
  image: self.data.url("icon-16.png"),
  accessKey: "w",

  onMessage: function (selectionText) {
	//We'll only use terms that begin with [A-z0-9-] and end with [A-z0-9]. strip everything else.
	var re = /[^A-z0-9-]*([-A-z0-9].*[A-z0-9])[^A-z0-9]*/g ;
    var trimmed = selectionText.replace(re, "$1");
	var encoded = encodeURI(trimmed);

	var panel = require("sdk/panel").Panel({
      width: 600,
      height: 400,
      contentURL: "https://www.google.co.uk/maps/place/" + encoded
	});

	panel.show();
  }
});
