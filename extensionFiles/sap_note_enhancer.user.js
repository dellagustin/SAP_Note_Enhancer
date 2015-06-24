$( document ).ready(function() {
	$('div.urTxtStd > p').each(function(index) {
		var myElement = $( this );

		if( myElement.text().search('KORREKTURANLEITUNG') >= 0 || myElement.text().search('Correction Inst.') >= 0)
		{
			var newHtmlForElement = '<pre class="language-abap"><code>' + myElement.html() + '</code></pre>';
			myElement.html(newHtmlForElement.replace(new RegExp('<br>', 'g'), '\n'));
			Prism.highlightAll();
		}
	});
});
