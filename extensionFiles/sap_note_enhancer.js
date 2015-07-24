function forEachCorrectionInstruction(callback) {
	$('div.urTxtStd > p').each(function(index) {
		var myElement = $( this );

		if( myElement.text().search('KORREKTURANLEITUNG') >= 0 || myElement.text().search('Correction Inst.') >= 0)
		{
			callback(myElement);
		}
	});
}

function getPakID() {
	var pakID = '';

	// pakid is necessary to create the links to other correction instructions.
	// the only way to get A (not THE) pakid is from the link to the current
	// CI that is present in the note.
	// This may not be the correct pakid for every CI, but as it seems to be
	// related to software component, there is a big chance it is correct.
	$('a').each(function(){
		var linkElement = $(this);

		if(linkElement.attr('href')) {
			var pakIdParam = linkElement.attr('href').match(/(_CPAKID|pv_pakid)=\d*/i);

			pakIdParam && pakIdParam[0] && (pakID = pakIdParam[0].match(/\d+/)[0]);

			if(pakID !== '') {
				return false;
			}
		}
	});

	return pakID;
}

$( document ).ready(function() {

	forEachCorrectionInstruction(function(myElement) {
		var newHtmlForElement = myElement.html();

		newHtmlForElement = replaceAll(newHtmlForElement,	'<br>',	'\n');

		newHtmlForElement = '<div class="ci_block"><pre class="language-abap"><code>' + newHtmlForElement + '</code></pre><div>';

		// Prevents Highlighting of non ABAP comments
		newHtmlForElement = replaceAll(newHtmlForElement,	'*\n&gt;&gt;&gt;', '*\n</code><code class="language-none">&gt;&gt;&gt;');
		newHtmlForElement = replaceAll(newHtmlForElement,	'&lt;&lt;&lt;\n\n*&amp;', '&lt;&lt;&lt;</code><code class="language-abap">\n\n*&amp;');

		myElement.html(newHtmlForElement);
	});

	Prism.highlightAll();

	// Look for the packid
	var ciPakID = getPakID();

	if(ciPakID !== '') {
		// Add links to CIs in CI header
		forEachCorrectionInstruction(function(myElement) {
			var newHtmlForElement = myElement.html();

			newHtmlForElement = newHtmlForElement.replace(/\*\$\s.*\$\*/g, function(headerLine) {
				return headerLine.replace(/\d{10}\s\d{10}/, function(correctionInstruction) {
					var ciNumbers = correctionInstruction.match(/\d{10}/g);

					correctionInstruction =
						'<a href="/sap/bc/bsp/spn/sno_corr/corr_inst_details.htm?_CINSTA=' + ciNumbers[0] +
						'&_CALEID=' + ciNumbers[1] + '&_CPAKID=' + ciPakID + '">' + correctionInstruction + '</a>';

					return correctionInstruction
				});
			});

			myElement.html(newHtmlForElement);
		});
	}

	forEachCorrectionInstruction(commonCIPostProcessing);
});
