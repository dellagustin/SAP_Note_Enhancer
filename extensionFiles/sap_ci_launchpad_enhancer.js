$( document ).on('DOMNodeInserted', 'pre', function(eventObject) {
	var thisElement = $(this);

	if(!thisElement.hasClass('language-abap')) {
		changingPres = true;

		thisElement.addClass('language-abap');

		var newHtmlForElement = thisElement.html();
		newHtmlForElement = replaceAll(newHtmlForElement,	'<br>',	'\n');

		thisElement.html('<code>' + newHtmlForElement + '</code>');
		Prism.highlightAll();

		commonCIPostProcessing(thisElement, function(noteNumber) {
			return '/#/notes/' + noteNumber;
		});
	}
});
