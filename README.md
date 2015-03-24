# tinymce-ebay

Javascript-Snippet to replace the very limited eBay auctioneditor with the mighty TinyMCE Editor. It's extended with Dropbox integration to insert images and load templates hostet on Dropbox. It's also replaces the placeholders {title} and {subtitle} with the values from the ebay form fields on load.

### Usage 
* You need an Userscriptmanager for your Browser: 
	* [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=de)
    * [Greasemonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) (Doesn't working for now, see the known issues :( )
* Click on this link and the Scriptmanager ask you about installation: 
https://rawgit.com/Netzvamp/tinymce-ebay/master/tinymce-ebay.de.user.js
* Go to [ebay.de](http://www.ebay.de) and start an new auction to see the editor in action

### Known Issues / Todo
* Doesn't work with Firefox/Greasemonkey: TinyMCE gets injected but doesn't respond on any action
* Can't dynamic load different language files for TinyMCE on runtime, only one with the @require from the scriptmanager. __Cause of that it's german and ebay.de only for now.__ Next easy step could be to copy the script for different languages/urls or we find an better to dynamic load the correct language.
