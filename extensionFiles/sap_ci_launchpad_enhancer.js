$( document ).on('DOMNodeInserted', 'pre', function(eventObject) {
	var thisElement = $(this);

	if(!thisElement.hasClass('language-abap')) {
		changingPres = true;

		thisElement.addClass('language-abap');

		var newHtmlForElement = thisElement.html();
		newHtmlForElement = replaceAll(newHtmlForElement,	'<br>',	'\n');

		newHtmlForElement = '<code>' + newHtmlForElement + '</code>';

		// Prevents Highlighting of non ABAP comments
		newHtmlForElement = replaceAll(newHtmlForElement, '*\n&gt;&gt;&gt;', '*\n</code><code class="language-none">&gt;&gt;&gt;');
		newHtmlForElement = replaceAll(newHtmlForElement, '&lt;&lt;&lt;\n\n*&amp;', '&lt;&lt;&lt;</code><code class="language-abap">\n\n*&amp;');

		thisElement.html(newHtmlForElement);
		Prism.highlightAll();

		commonCIPostProcessing(thisElement, function(noteNumber) {
			return '/#/notes/' + noteNumber;
		});
	}
});
