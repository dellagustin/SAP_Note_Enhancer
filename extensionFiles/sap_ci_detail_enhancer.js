function forEachCorrectionInstruction(callback) {
	$('pre').each(function(index) {
		var myElement = $( this );

    callback(myElement);
	});
}

$( document ).ready(function() {

	forEachCorrectionInstruction(function(myElement) {
    myElement.addClass('language-abap');

    var newHtmlForElement = myElement.html();

    newHtmlForElement = '<code>' + newHtmlForElement + '</code>';

    /* Strip the script for generating new lines. If we don't do it, the following
       html replacement fails and the page becomes inconsistent.
    */
    newHtmlForElement = replaceAll(newHtmlForElement, '<script>document.write(\'\\r\\n\');</script>', '');

		myElement.html(newHtmlForElement);
	});

	Prism.highlightAll();
});
