io.modalSettings = function (){
	return {
		onPageUnload:function(){if($('#ioModalSettingsBox').length>0){io.modalSettings.close();}},
		toggle: function(url){
			url=url||'';
			if($('#ioModalSettingsBox').length<1){
				if(url!=''){
					io.modalSettings.createPanel();
					if(typeof io.loading!='undefined'){io.loading.on();}
					$POST(url,'ioModalSettings',Array(),function(){
					setTimeout(function(){
						$('#ioModalSettingsBox').addClass('show');
						$('body').addClass('ioSettingsShow');
						var w1=$('body').width();
						$('body').css('overflow','hidden');
						var w2=$('body').width();
						$('html').css('padding-right',(w2-w1)+'px');
						$('.ioTopMenuBar>.ioBarRight').css('padding-right',(w2-w1)+'px');
						
					},50);
				});}
			}else{
				io.modalSettings.close();
			}
		},
		open: function(url){
			url=url||'';
			if($('#ioModalSettingsBox').length>0 && $('#ioModalSettingsBox').hasClass('show')){
				$('#ioModalSettingsBox').remove();
				$('.ioTopMenuBar>.ioBarRight').css('padding-right','');
				$('html').css('padding-right','');
				$('body').css('overflow','');
			}
			if($('#ioModalSettingsBox').length<1){
				if(url!=''){
					io.modalSettings.createPanel();
					if(typeof io.loading!='undefined'){io.loading.on();}
					$POST(url,'ioModalSettings',Array(),function(){
						setTimeout(function(){
							$('#ioModalSettingsBox').addClass('show');
							$('body').addClass('ioSettingsShow');
							var w1=$('body').width();
							$('body').css('overflow','hidden');
							var w2=$('body').width();
							$('html').css('padding-right',(w2-w1)+'px');
							$('.ioTopMenuBar>.ioBarRight').css('padding-right',(w2-w1)+'px');
						},50);
					});
				}
			}else{
				$('#ioModalSettingsBox').removeClass('show');
				setTimeout(function(){
					if(url!=''){
						if(typeof io.loading!='undefined'){io.loading.on();}
						$POST(url,'ioModalSettings',Array(),function(){
						setTimeout(function(){
							$('#ioModalSettingsBox').addClass('show');
						},50);
					});}
				},500);
			}
		},
		createPanel: function(){
			$('body').prepend('<div id="ioModalSettingsBox"><div class="close"></div><div class="view" onclick="event.cancelBubble=true;event.stopPropagation();"><div class="inner"><div id="ioModalSettings"></div></div></div></div>');
			$('#ioModalSettingsBox').bind('click',function(){io.modalSettings.close();});
			$('#ioModalSettingsBox .close').bind('click',function(){io.modalSettings.close();});
			if(typeof Hammer=="function"){
				Hammer(document.getElementById("ioModalSettingsBox"),{domEvents: true}).on("swiperight", function(e) {
					io.modalSettings.close();
					e.srcEvent.stopPropagation();
				});
			}
		},
		close: function(){
			$('#ioModalSettingsBox').removeClass('show');
			$('body').removeClass('ioSettingsShow');
			$('.ioTopMenuBar>.ioBarRight').css('padding-right','');
			$('html').css('padding-right','');
			$('body').css('overflow','');
			setTimeout(function(){
				$('#ioModalSettingsBox').remove();
			},500);
			
			
		},
	};
}();
$(window).bind('onPageUnload',io.modalSettings.onPageUnload);