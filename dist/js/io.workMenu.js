io.workMenu = function (){
	return {
		modules:[],
		current:null,
		detect: function(url){
			if(window.history.state!=null && window.history.state.menu==true && io.workMenu.current!=window.history.state.menu_url){
				var module=window.history.state.module;
				io.workMenu.modules[module]=true;
				url=window.history.state.menu_url;
				io.workMenu.current=url;
				io.workMenu.loadMenuLink(url,function(response,error){
					if(error) return false;
					io.workMenu.openMenu(module,response);
				});
				return;
			}
			var module=io.extractModuleName(url);
			if(typeof io.workMenu.modules[module]=='undefined'){
				io.workMenu.destroyMenu();
				io.workMenu.loadMenu(module,function(response,error){
					if(error){
						console.log('Error:'+error);
						return false;
					}
					io.workMenu.modules[module]={};
					var menuData=document.createElement("div");
					var menuDataEl=$(menuData);
					menuDataEl.html(response);
					if(menuDataEl.find('iomenu').length>0){
						io.workMenu.modules[module].menu=true;
						window.history.replaceState({'module': module, 'menu': true, 'menu_url': './'+module+'/_menu/'}, null);
						io.workMenu.current='./'+module+'/_menu/';
						io.workMenu.openMenu(module,response);
					}else{
						console.log('Info:noModuleMenu');
						io.workMenu.modules[module].menu=false;
					}
					menuDataEl.remove();
				});
			}else{
				if(io.workMenu.modules[module].menu==false){
					io.workMenu.destroyMenu();
					return false;
				}
				if($('.ioWorkMenu').length<1){
					io.workMenu.loadMenu(module,function(response,error){
						if(error) return false;
						window.history.replaceState({'module': module, 'menu': true, 'menu_url': './'+module+'/_menu/'}, null);
						io.workMenu.current='./'+module+'/_menu/';
						io.workMenu.openMenu(module,response);
					});
				}else{
					var act=io.extractActName(url);
					if(act=='default'){
						io.workMenu.loadMenu(module,function(response,error){
							if(error) return false;
							window.history.replaceState({'module': module, 'menu': true, 'menu_url': './'+module+'/_menu/'}, null);
							io.workMenu.current='./'+module+'/_menu/';
							io.workMenu.openMenu(module,response);
						});
					}
				}
			}
		},
		openMenu: function(module,response){
			var menuData=document.createElement("div");
			var menuDataEl=$(menuData);
			menuDataEl.html(response);
			if(menuDataEl.find('iomenu').length>0){
				if($('.ioWorkMenu').length<1){
					io.workMenu.createMenu();
				}
				var width=menuDataEl.find('iomenu').attr('width');
				width=width||'';
				if(width!=''){
					if(!width.indexOf('px')){
						width=width+'px';
					}
					$('.ioWrapper').css('padding-left',width);
					$('.ioWorkMenu').css('width',width);
				}else{
					$('.ioWrapper').css('padding-left','');
					$('.ioWorkMenu').css('width','');
				}
				menuDataEl.find('iomenu').removeAttr('width');
				$('.ioWorkMenu .ioMenuContent').html('');
				menuDataEl.find('iomenu').appendTo($('.ioWorkMenu .ioMenuContent'));
				$('body').addClass('ioShowWorkMenu');
				setTimeout(function(){$(window).trigger('onPageLoad');},100);
			}else{
				console.log('Warring:noModuleMenu');
				$('body').removeClass('ioShowWorkMenu');
				io.workMenu.destroyMenu();
			}
			menuDataEl.remove();
		},
		destroyMenu: function(){
			$('.ioWorkMenu').remove();
			$('.ioWrapper').removeClass('ioActiveWorkMenu');
			$('.ioWrapper').css('padding-left','');
		},
		loadMenuLink: function(url,callback){
			var var_url=url;
			var var_data=Array();
			var_data.push({
				name: "ajax",
				value: "1"
			});
			if(typeof io.loading!='undefined'){io.loading.on();}
			$.ajax({
				type: "POST",
				url: var_url,
				data: var_data,
				success: function(html){
					if(typeof io.loading!='undefined'){io.loading.off();}
					if(typeof callback=='function'){callback(html,null);}
				},
				error:  function (errors){
					if(typeof io.loading!='undefined'){io.loading.off();}
					if(typeof callback=='function'){callback('','Error:loadingError');}
				}
			});
		},
		loadMenu: function(module,callback){
			var var_url='./'+module+'/_menu/';
			var var_data=Array();
			var_data.push({
				name: "ajax",
				value: "1"
			});
			if(typeof io.loading!='undefined'){io.loading.on();}
			$.ajax({
				type: "POST",
				url: var_url,
				data: var_data,
				success: function(html){
					if(typeof io.loading!='undefined'){io.loading.off();}
					if(typeof callback=='function'){callback(html,null);}
				},
				error:  function (errors){
					if(typeof io.loading!='undefined'){io.loading.off();}
					if(typeof callback=='function'){callback('','Error:loadingError');}
				}
			});
		},
		createMenu: function(){
			$('.ioContainer').before('<div class="ioWorkMenu"><div class="pinnedWorkMenu"><div class="ioMenuContent"></div></div></div>');
			$('.pinnedWorkMenu').pinScroll();
			$('.ioWrapper').addClass('ioActiveWorkMenu');
			if(typeof Hammer=="function"){
				Hammer(document.getElementsByClassName("ioWorkMenu")[0],{domEvents: true}).on("swipeleft", function() {
					$('body').removeClass('ioShowWorkMenu');
				});
				if($('.ioLeftMenuBar').length>0){
					Hammer(document.getElementsByClassName("ioWorkMenu")[0],{domEvents: true}).on("swiperight", function() {
						$('body').addClass('ioShowLeftMenuBar');
					});
				}
			}
		},
		$MENU: function(url){
			url=url||'none';
			if(url=='none'){
				var call=io.ajax.callElement($MENU);
				if(typeof call!='undefined'){
					if(typeof call.tagName!='undefined'){
						call=$(call);
						if(call.length>0){
							if(typeof call.get(0).tagName!=='undefined'){
								while(call.get(0).tagName.toLowerCase()!='a'){
									call=call.parent();
									if(typeof call=='undefined'){break;}
									if(typeof call.get(0)=='undefined'){break;}
								}
							}
						}
					}
				}
				if(call){
					url=call.attr('href');
				}else{
					return;
				}
			}
			if(url=='')return;
			url=io.ajax.extractUrl(url);
			var module=io.extractModuleName(url);
			var var_url=url;
			var var_data=Array();
			var_data.push({
				name: "ajax",
				value: "1"
			});
			history.pushState({'module': module, 'menu': true, 'menu_url': url}, null, io.ajax.extractUrl(document.location.href));
			io.workMenu.current=url;
			if(typeof io.loading!='undefined'){io.loading.on();}
			$.ajax({
				type: "POST",
				url: var_url,
				data: var_data,
				success: function(html){
					if(typeof io.loading!='undefined'){io.loading.off();}
					io.workMenu.openMenu(module,html);
				},
				error:  function (errors){
					if(typeof io.loading!='undefined'){io.loading.off();}
					return false;
				}
			});
		},
		toggle:function(){
			$('body').toggleClass('ioShowWorkMenu');
		},
		hide:function(){
			$('body').removeClass('ioShowWorkMenu');
		}
	};
}();
$(window).bind('onPageUnload',io.workMenu.hide);
window.$MENU=io.workMenu.$MENU;
$(function(){
	io.workMenu.detect(document.location.href);
	if(typeof Hammer=="function"){
		Hammer(document.getElementsByClassName("ioContainer")[0],{touchAction: "auto",domEvents: true}).on("swiperight", function(e) {
			if($('.ioWorkMenu').length>0 && !$('body').hasClass('ioShowWorkMenu')){
				$('body').addClass('ioShowWorkMenu');
			}else if($('.ioLeftMenuBar').length>0){
				$('body').addClass('ioShowLeftMenuBar');
			}
			$('.ioTopMenuBar>ul>li').trigger('mouseout');
			e.srcEvent.stopPropagation();
		});
	}
});
