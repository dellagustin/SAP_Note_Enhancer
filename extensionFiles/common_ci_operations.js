function replaceNoteInCIHeaderLine(headerLine, replaceCallback) {
  return headerLine.replace(/(Note|Hinweis)\s\d{10}/, function(sapNote) {
    return sapNote.replace(/\d{10}/, replaceCallback);
  });
}

function commonCIPostProcessing(myElement, noteLinkBuilder) {
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

	// Add links to Notes in ci header
	newHtmlForElement = newHtmlForElement.replace(/\*\$\s.*\$\*/g, function(headerLine) {
		return replaceNoteInCIHeaderLine(headerLine, function(sapNoteNumber) {
			var linkToNote;
			if(noteLinkBuilder) {
				linkToNote = noteLinkBuilder(sapNoteNumber);
			}
			else {
				linkToNote = '/sap/support/notes/' + sapNoteNumber;
			}

			sapNoteNumber =
				'<a href="' + linkToNote +'">' + sapNoteNumber + '</a>';

			return sapNoteNumber;
		});
	});

	myElement.html(newHtmlForElement);
}
