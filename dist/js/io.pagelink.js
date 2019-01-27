io.pagelink = function (){
	return {
		onPageLoad:function(){
			$('.ioTopMenuBar #ioPageLink>a').attr('href','');
			$('.ioTopMenuBar #ioPageLink').css('display','none');
			if($('.ioContainer pagelink').length>0){
				var settingsLink=$('.ioContainer pagelink').text();
				$('.ioTopMenuBar #ioPageLink>a').attr('href',settingsLink);
				$('.ioTopMenuBar #ioPageLink').css('display','');
			}
		},
	};
}();
$(window).bind('onPageLoad',io.pagelink.onPageLoad);