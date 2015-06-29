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

	forEachCorrectionInstruction(function(myElement) {
		var newHtmlForElement = myElement.html();

		// Build insertion and deletion DIVs
		newHtmlForElement = replaceAll(
			newHtmlForElement,
			'<span class="token comment" spellcheck="true">*&gt;&gt;&gt;&gt; START OF DELETION &lt;&lt;&lt;&lt;&lt;',
			'<div class="ci_deletion"><span class="token comment" spellcheck="true"><b>*&gt;&gt;&gt;&gt; START OF DELETION &lt;&lt;&lt;&lt;&lt;</b>'
		);

		newHtmlForElement = replaceAll(
			newHtmlForElement,
			'*&gt;&gt;&gt;&gt; END OF DELETION &lt;&lt;&lt;&lt;&lt;&lt;&lt;</span>',
			'<b>*&gt;&gt;&gt;&gt; END OF DELETION &lt;&lt;&lt;&lt;&lt;&lt;&lt;</b></span></div>'
		);

		newHtmlForElement = replaceAll(
			newHtmlForElement,
			'<span class="token comment" spellcheck="true">*&gt;&gt;&gt;&gt; START OF INSERTION &lt;&lt;&lt;&lt;',
			'<div class="ci_insertion"><span class="token comment" spellcheck="true"><b>*&gt;&gt;&gt;&gt; START OF INSERTION &lt;&lt;&lt;&lt;&lt;</b>'
		);

		newHtmlForElement = replaceAll(
			newHtmlForElement,
			'*&gt;&gt;&gt;&gt; END OF INSERTION &lt;&lt;&lt;&lt;&lt;&lt;</span>',
			'<b>*&gt;&gt;&gt;&gt; END OF INSERTION &lt;&lt;&lt;&lt;&lt;&lt;</b></span></div>'
		);

		myElement.html(newHtmlForElement);
	});
});
