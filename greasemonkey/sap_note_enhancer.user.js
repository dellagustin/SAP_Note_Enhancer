// ==UserScript==
// @name         SAP Note Enhancer
// @namespace    https://github.com/dellagustin/SAP_Note_Enhancer
// @version      1.0.0
// @description  Highlights correction instruction code from SAP Notes showed in the New Note Framework
// @author       Guilherme Dellagustin (i827833)
// @downloadURL  https://raw.githubusercontent.com/dellagustin/SAP_Note_Enhancer/firefox_gm_user_script/greasemonkey/sap_note_enhancer.user.js
// @match        https://*/*/bc/bsp/sno/ui/main.do
// @run-at       document-end
// @resource     css_SAP_Note_Enhancer https://raw.githubusercontent.com/dellagustin/SAP_Note_Enhancer/firefox_gm_user_script/extensionFiles/sap_note_enhancer.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @require      http://code.jquery.com/jquery-2.1.4.min.js
// @require      https://raw.githubusercontent.com/dellagustin/SAP_Note_Enhancer/firefox_gm_user_script/extensionFiles/prismABAP.js
// @require      https://raw.githubusercontent.com/dellagustin/SAP_Note_Enhancer/firefox_gm_user_script/extensionFiles/string_operations.js
// @require      https://raw.githubusercontent.com/dellagustin/SAP_Note_Enhancer/firefox_gm_user_script/extensionFiles/common_ci_operations.js
// ==/UserScript==

var newCSS = GM_getResourceText ("css_SAP_Note_Enhancer");
GM_addStyle (newCSS);

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
});

document.addEventListener('DOMContentLoaded', function(){
	forEachCorrectionInstruction(commonCIPostProcessing);
});
