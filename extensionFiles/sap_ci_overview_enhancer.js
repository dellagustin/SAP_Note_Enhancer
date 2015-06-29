function forEachCorrectionInstruction(callback) {
	$('pre').each(function(index) {
		var myElement = $( this );

		if( myElement.text().search('KORREKTURANLEITUNG') >= 0 || myElement.text().search('Correction Inst.') >= 0)
		{
			callback(myElement);
		}
	});
}

$( document ).ready(function() {

	forEachCorrectionInstruction(function(myElement) {
		myElement.addClass('language-abap');

    var newHtmlForElement = myElement.html();

    // Remove the two front spaces
    newHtmlForElement = replaceAll(newHtmlForElement, '  *$*$', '*$*$');
    newHtmlForElement = replaceAll(newHtmlForElement, '\n  ', '\n');

    newHtmlForElement = '<code>' + newHtmlForElement + '</code>';

		// Prevents Highlighting of non ABAP comments
    newHtmlForElement = replaceAll(newHtmlForElement,	'*\n&gt;&gt;&gt;',	'*\n</code><code class="language-none">&gt;&gt;&gt;');
		newHtmlForElement = replaceAll(newHtmlForElement,	'&lt;&lt;&lt;\n\n*&amp;',	'&lt;&lt;&lt;</code><code class="language-abap">\n\n*&amp;');

		myElement.html(newHtmlForElement);

    myElement.wrap('<div class="ci_block"></div>')
	});

	Prism.highlightAll();

	forEachCorrectionInstruction(commonCIPostProcessing);
});
