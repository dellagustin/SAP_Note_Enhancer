function forEachCorrectionInstruction(callback) {
	$('div.urTxtStd > p').each(function(index) {
		var myElement = $( this );

		if( myElement.text().search('KORREKTURANLEITUNG') >= 0 || myElement.text().search('Correction Inst.') >= 0)
		{
			callback(myElement);
		}
	});
}

$( document ).ready(function() {

	forEachCorrectionInstruction(function(myElement) {
		var newHtmlForElement = myElement.html();

		newHtmlForElement = replaceAll(newHtmlForElement,	'<br>',	'\n');

		newHtmlForElement = '<div class="ci_block"><pre class="language-abap"><code>' + newHtmlForElement + '</code></pre><div>';

		// Prevents Highlighting of non ABAP comments
    newHtmlForElement = replaceAll(newHtmlForElement,	'*\n&gt;&gt;&gt;',	'*\n</code><code class="language-none">&gt;&gt;&gt;');
		newHtmlForElement = replaceAll(newHtmlForElement,	'&lt;&lt;&lt;\n\n*&amp;',	'&lt;&lt;&lt;</code><code class="language-abap">\n\n*&amp;');

		myElement.html(newHtmlForElement);
	});

	Prism.highlightAll();

	forEachCorrectionInstruction(commonCIPostProcessing);
});
