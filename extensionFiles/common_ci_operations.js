function commonCIPostProcessing(myElement) {
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
}
