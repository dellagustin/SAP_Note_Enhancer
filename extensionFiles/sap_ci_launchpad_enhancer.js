$( document ).on('DOMNodeInserted', 'pre', function(eventObject) {
	var thisElement = $(this);

	if(!thisElement.hasClass('code-highlighted')) {
		changingPres = true;

		thisElement.addClass('code-highlighted');

		var newHtmlForElement = thisElement.html();
		newHtmlForElement = replaceAll(newHtmlForElement,	'<br>',	'\n');

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
