// ==UserScript==
// @name       		Replace Editor on eBay.de
// @description		Replace eBay auctioneditor with TinyMCE and Dropbox integration
// @namespace		https://github.com/Netzvamp/tinymce-ebay
// @version			0.2
// @author			Robert Lieback (netzvamp)
// @supportURL 		https://github.com/Netzvamp/tinymce-ebay/issues
// @updateURL		https://rawgit.com/Netzvamp/tinymce-ebay/master/tinymce-ebay.de.user.js
// @downloadURL		https://rawgit.com/Netzvamp/tinymce-ebay/master/tinymce-ebay.de.user.js
// @match      		*://*.ebay.de/ws/eBayISAPI.dll*
// @copyright  		2015, Robert Lieback
// @require 		http://code.jquery.com/jquery-latest.js
// @require 		http://tinymce.cachefly.net/4.1/tinymce.min.js
// @require 		https://rawgit.com/Netzvamp/tinymce-ebay/master/langs/de.js
// ==/UserScript==

$(document).ready(function() {
    if ($("#description_secGrp").length) { // Check that we are on the right page
        
        $('#description').css('visibility', 'visible'); // Make textarea visible before adding tinymce to prevent problems
        $('#description').show();

        // Remove ebay editor
        $('#rte').hide();
        $('#rte_toolbar_inpGrp').hide();
        $('#descTabs').hide();
        
        // Add dropbox api
        $('head').append('<script type="text/javascript" src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key="38g68cf3tzqsqjs"></script>'); // Replace with you own appkey
		
        tinyMCE.baseURL = 'http://tinymce.cachefly.net/4.1';
		tinymce.init({
			selector: 'textarea#description',
			relative_urls: false,
			width: '100%',
			height: 600,
			theme: "modern",
			fontsize_formats: "8pt 9pt 10pt 11pt 12pt 26pt 36pt",
			plugins: [
				"advlist autolink lists link image charmap print preview hr anchor pagebreak",
				"searchreplace wordcount visualblocks visualchars code fullscreen",
				"insertdatetime media nonbreaking save table contextmenu directionality",
				"emoticons paste textcolor colorpicker textpattern",
			],
			toolbar1: "insertfile undo redo | styleselect | fontselect | fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
			toolbar2: "print preview media | forecolor backcolor emoticons | db_template | db_image",
			image_advtab: true,
			allow_script_urls: true,
			valid_elements : '*[*]',
			valid_children : "+body[style],+body[link]",
			file_browser_callback: function(field_name, url, type, win) {
				Dropbox.choose({
					success: function(files) {
						$('#' + field_name).val(files[0].link.replace("dl=0", "dl=1"));
					},
					linkType: "direct",
					multiselect: false,
					extensions: ['.jpg', '.jpeg', '.png', '.gif'],
				});
			},
			setup: function(editor) { // We add an button to insert template from Dropbox
				editor.addButton('db_template', {
					text: 'Template einf\u00fcgen',
					title: 'Insert Template',
					icon: 'dropin-icon',
					onclick: function() {
						Dropbox.choose({
							success: function(files) {
								$.get(files[0].link, function(data) {
                                    // Load template in editor and replace {title} and {subtitle} in template with values from page
                                    editor.insertContent(data.replace('{title}', $('#title').val()).replace('{subtitle}', $('#subtitle').val()));
								});
							},
							linkType: "direct",
							multiselect: false,
							extensions: ['.txt', '.htm', '.html', '.tpl'],
						});
					}
				});
				editor.addButton('db_image', { // We add an button to insert image from Dropbox
					text: 'Bild einf\u00fcgen',
					title: 'insert',
					icon: 'dropin-icon',
					onclick: function() {
						Dropbox.choose({
							success: function(files) {
								editor.insertContent('<img src="' + files[0].link.replace("dl=0", "dl=1") + '">'); // replace dl=0 to dl=1 to get imagefile and no preview page
							},
							linkType: "preview", // We have to use preview links, cause directlinks expire after some minutes
							multiselect: false,
							extensions: ['.jpg', '.jpeg', '.png', '.gif'],
						});
					}
				});
				editor.on('init', function(e) {
					$('.mce-i-dropin-icon').css({ // Add the dropbox icon to the buttons
						'display': 'inline-block',
						'vertical-align': 'middle',
						'background': 'transparent url("https://www.dropbox.com/static/images/widgets/dbx-saver-status.png") no-repeat',
					});
				});
			}
        });
         
    }
});