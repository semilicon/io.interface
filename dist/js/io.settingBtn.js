io.settingBtn = function (){
	return {
		onPageLoad:function(){
			$('.ioTopMenuBar #ioSettings>a').attr('href','');
			$('.ioTopMenuBar #ioSettings').css('display','none');
			if($('.ioContainer settings').length>0){
				var settingsLink=$('.ioContainer settings').text();
				$('.ioTopMenuBar #ioSettings>a').attr('href',settingsLink);
				$('.ioTopMenuBar #ioSettings').css('display','');
			}
		},
	};
}();
$(window).bind('onPageLoad',io.settingBtn.onPageLoad);