function escapeRegExp(string) {
  return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(string, find, replace) {
  return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

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
