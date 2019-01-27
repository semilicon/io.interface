io.toolbar = function (){
	return {
		onPageLoad:function(){
			$('.ioWrapper').css({'padding-top':''});
			$('.ioContent').css({'padding-bottom':''});
			if($('.ioContent toolbar').length>0){
				$('.ioContent toolbar').each(function(){
					if($(this).find('>.inner').length>0)return;
					$(this).wrapInner("<div class=\"inner\"></div>");
					if(typeof Hammer=="function"){
						Hammer($('.ioContent toolbar>.inner')[0],{touchAction: "auto",domEvents: true}).on("swiperight", function(e) {
							e.srcEvent.stopPropagation();
						});
					}
				});
			}
			if($('.ioContent toolbar>.inner').length>0){
				$('.ioWrapper').css('padding-top',$('.ioContent toolbar>.inner').height()+'px');
				$('.ioContent toolbar>.inner').width($('.ioContent toolbar').width());
			}
			if($('.ioContent toolbarbottom').length>0){
				$('.ioContent toolbarbottom').each(function(){
					if($(this).find('>.inner').length>0)return;
					$(this).wrapInner("<div class=\"inner\"></div>");
					if(typeof Hammer=="function"){
						Hammer($('.ioContent toolbarbottom>.inner')[0],{touchAction: "auto",domEvents: true}).on("swiperight", function(e) {
							e.srcEvent.stopPropagation();
						});
					}
				});
			}
			if($('.ioContent toolbarbottom>.inner').length>0){
				$('.ioContent').css('padding-bottom',($('.ioContent toolbarbottom>.inner').height()+parseInt($('.ioContent').css('padding-bottom')))+'px');
				$('.ioContent toolbarbottom>.inner').width($('.ioContent toolbarbottom').width());
			}
		},
		onResize:function(){
			if($('.ioContent toolbar>.inner').length>0){
				$('.ioContent toolbar>.inner').width($('.ioContent toolbar').width());
			}
			if($('.ioContent toolbarbottom>.inner').length>0){
				$('.ioContent toolbarbottom>.inner').width($('.ioContent toolbarbottom').width());
			}
		},
	};
}();
$(window).bind('onPageLoad',io.toolbar.onPageLoad);
$(window).bind('resize',io.toolbar.onResize);