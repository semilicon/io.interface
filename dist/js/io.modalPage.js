io.modalPage = function (){
	return {
		open: function(url){
			$('#ioModalPageBox').stop().animate({scrollTop:'0px'}, 500);
			url=url||'';
			if(url!=''){
				if($('#ioModalPageBox').length<1){io.modalPage.createPanel();}
				if(typeof io.loading!='undefined'){io.loading.on();}
				$POST(url,'ioModalPage',Array(),function(){
						var w1=$('body').width();
						$('body').css('overflow','hidden');
						var w2=$('body').width();
						$('html').css('padding-right',(w2-w1)+'px');
						$('.ioTopMenuBar>.ioBarRight').css('padding-right',(w2-w1)+'px');
				});
			}
		},
		html: function(html){
			$('#ioModalPageBox').stop().animate({scrollTop:'0px'}, 500);
			if($('#ioModalPageBox').length<1){io.modalPage.createPanel();}
			$('#ioModalPage').html(html);
			var w1=$('body').width();
			$('body').css('overflow','hidden');
			var w2=$('body').width();
			$('html').css('padding-right',(w2-w1)+'px');
			$('.ioTopMenuBar>.ioBarRight').css('padding-right',(w2-w1)+'px');
		},
		createPanel: function(){
			$('body').prepend('<div id="ioModalPageBox"><div class="inner" onclick="event.cancelBubble=true;event.stopPropagation();"><div class="close"></div><div id="ioModalPage"><div class="loadingImpuls"><div id="fountainG_1" class="fountainG"></div><div id="fountainG_2" class="fountainG"></div><div id="fountainG_3" class="fountainG"></div><div id="fountainG_4" class="fountainG"></div><div id="fountainG_5" class="fountainG"></div><div id="fountainG_6" class="fountainG"></div></div></div></div></div>');
			$('#ioModalPageBox').bind('click',function(){io.modalPage.close();});
			$('#ioModalPageBox .close').bind('click',function(){io.modalPage.close();});
			if(typeof Hammer=="function"){
				Hammer(document.getElementById("ioModalPageBox"),{touchAction: "auto",domEvents: true}).on("swiperight", function(e) {
					e.srcEvent.stopPropagation();
				});
			}
		},
		close: function(){
			$('#ioModalPageBox').remove();
			$('.ioTopMenuBar>.ioBarRight').css('padding-right','');
			$('html').css('padding-right','');
			$('body').css('overflow','');
		},
	};
}();