io.ajax = function (){
	return {
		BLOCK:false,
		popstate: function() {setTimeout(function(){if(history.pushState){if(!io.ajax.isHaveChanges())return;$GET(io.ajax.extractUrl());}},50);},
		ReturnFalse: function() {return false;},
		callElement: function(func){if(func.caller){if(func.caller.arguments){var e = func.caller.arguments[0] || window.event;if(e){var t = e.target || e.srcElement;}return t;}}},
		extractUrl:function(url){url=url||'';if(url!=''){if(url.indexOf('http://')==0||url.indexOf('https://')==0||url.indexOf('//')==0){if($('base').length>0){var basehref=$('base').attr('href');if(url.indexOf(basehref)==0){url='./'+url.substr(basehref.length);}}else{url='.'+url.slice(url.indexOf('/')+2);url='./'+url.slice(url.indexOf('/')+1);}}return url;}else{url=document.location.href;if($('base').length>0){var basehref=$('base').attr('href');if(url.indexOf(basehref)==0){url='./'+url.substr(basehref.length)}return url;}if(url.indexOf('http://')==0||url.indexOf('https://')==0||url.indexOf('//')==0){url='.'+url.slice(url.indexOf('/')+2);}url='./'+url.slice(url.indexOf('/')+1);return url;}},
		generateID: function(len){var chars = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0'];var ID = '';for (var n = 0; n < len; n++) {ID += chars[Math.floor(Math.random()*35)];}return ID;},
		onPageLoad:function(){
			$('a[onclick]').unbind('click',io.ajax.ReturnFalse).bind('click',io.ajax.ReturnFalse);
		},
		onPageUnload:function(){},
		$GO: function(url) {
			if(!io.ajax.isHaveChanges())return;
			url=url||'none';
			if(url=='none'){
				var call=io.ajax.callElement($GO);
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
			if(history.pushState){
				if(url==''){url='./';}
				url=io.ajax.extractUrl(url);
				var currentUrl=io.ajax.extractUrl(document.location.href);
				var stateData=null;
				if(typeof io.workMenu!='undefined'){
					var module=io.extractModuleName(url);
					if(window.history.state!=null && window.history.state.menu==true && window.history.state.module==module){
						var stateData=window.history.state;
					}
				}
				if(currentUrl!=url)history.pushState(stateData, null, url);
				$(window).trigger('popstate');
			}
			return false;
		},
		$GET: function(url){
			url=url||'';
			if(typeof io.leftMenuBar!='undefined'){
				io.leftMenuBar.select(url);
			}
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
					io.ajax.GETDATA(html,url);
				},
				error:  function (errors){
					if(errors.status==404){
						io.ajax.GETDATA('<h1>404 Not Found</h1>',url);
					}else{
						console.log('Error:loadingError');
						if(typeof io.loading!='undefined'){io.loading.off();}
					}
				}
			});
			return false;
		},
		GETDATA: function(html,url){
			if(io.ajax.extractUrl()!=io.ajax.extractUrl(url)){return false;}
			$(window).trigger('onPageUnload');
			try{
				$('.ioContent').html(html);
				$('body,html').scrollTop(0);
			}catch(err){
				console.log('Error:'+err);
			}
			if($('.ioContent title').length>0){
				var TITLE=$('.ioContent title').text();
				$('.ioContent title').remove();
			}else var TITLE='';
			if($('head>title').length>0){$('head>title').html(TITLE);}else{document.title=TITLE;}
			if(typeof io.workMenu!='undefined'){io.workMenu.detect(url);}
			setTimeout(function(){$(window).trigger('onPageLoad');},100);
		},
		$POST: function(var_url,el,var_data,to,onfinish){
			io.ajax.BLOCK=true;
			if(typeof to=='function'){
				onfinish=to;
				to=null;
			}else if(typeof var_data=='function'){
				onfinish=var_data;
				var_data=Array();
			}else if(typeof el=='function'){
				onfinish=el;
				el='system'
			}
			var_data = var_data || Array();
			var url = var_url;
			el = el || 'system';
			var_url=io.ajax.extractUrl(var_url);
			var_data.push({
				name: "ajax",
				value: "1"
			});
			var_data.push({
				name: "post",
				value: "1"
			});
			$.ajax({
				type: "POST",
				url: var_url,
				data: var_data,
				success: function(html){
					io.ajax.BLOCK=false;
					if(typeof io.loading!='undefined'){io.loading.off();}
					io.ajax.POSTDATA(html,url,el,to,onfinish);
				},
				error:  function (errors){
					io.ajax.BLOCK=false;
					console.log('Error:loadingError');
					if(typeof io.loading!='undefined'){io.loading.off();}
				}
			});
			return false;
		},
		POSTDATA: function(html,url,element,to,onfinish){
			if(element=='system'||element=='#system'){
				if(!$('#system').length) {
					$('body').prepend('<div id="system" style="display:none;"></div>');
				}
			}
			if(html.indexOf('io.modalAuth.open()')>=0){
				io.modalAuth.open();
				if(typeof io.modalSettings!='undefined'){
					if($('#ioModalSettingsBox').length>0){
						io.modalSettings.close();
					}
				}
				return false;
			}
			if(element[0]!='#'&&element[0]!='.')element='#'+element;
			if ($(element).length>0){
				if(to==null||to=='html'){
					$(element).html(html);
				}else if(to=='append'){
					$(element).append(html);
				}else if(to=='prepend'){
					$(element).prepend(html);
				}else if(to=='before'){
					$(element).before(html);
				}else if(to=='after'){
					$(element).after(html);
				}
				if(typeof onfinish=='function'){
					onfinish();
				}
				setTimeout(function() {$(window).trigger('onPageLoad');}, 300);
			}
		},
		$SUBMIT: function(){
			if(io.ajax.BLOCK==true){return false;}
			io.ajax.BLOCK=true;
			var call=$(io.ajax.callElement($SUBMIT));
			if(call.is('form')){
				var form=call;
			}else{
				var form=call.parents('form');if(!form.length){io.ajax.BLOCK=false;return false;}
			}
			var url=io.ajax.extractUrl(form.attr('action'));
			if(url==''){io.ajax.extractUrl();}
			var target=form.attr('target');
			target = target || '';
			var time = new Date();
			if(target==''){
				var new_target=io.ajax.generateID(20);
				while($('#'+new_target).length>0){
					new_target=io.ajax.generateID(20);
				}
				form.prepend('<div id='+new_target+'></div>');
				form.attr('target',new_target);
				target=new_target;
			}
			if(target[0]!='#'&&target[0]!='.')target='#'+target;
			form.find('*[save]').each(function(index) {
				eval($(this).attr('save'));
			});
			var form_data = form.serializeArray();
			form_data.unshift({
				name: "form",
				value: "1"
			});
			var onfinish=function(){
				if(target[0]!='#'&&target[0]!='.')target='#'+target;
				if($('.ioWrapper '+target).length>0){
					if($(target).offset().top<0){
						$('body').animate({scrollTop: $(target).offset().top-10}, 300);
					}
				}else if($('.ioModalPage '+target).length>0){
					if($(target).offset().top<0){
						$('.ioModalPageBox').animate({scrollTop: $(target).offset().top-10}, 300);
					}
				}else if($('.ioModalPage '+target).length>0){
					if($(target).offset().top<0){
						$('.ioModalPageBox').animate({scrollTop: $(target).offset().top-10}, 300);
					}
				}
			};
			if(typeof io.loading!='undefined'){io.loading.on();}
			$POST(url,target,form_data,onfinish);
			return false;
		},
		beforeunload: function(evt){
			if(io.changed==true){
				var message = "Вы уверены, что хотите покинуть страницу не сохранив изменения?";
				if (typeof evt == "undefined") evt = window.event;
				if (evt) evt.returnValue = message;
				return message;
			}
		},
		isHaveChanges: function(evt){
			if(io.changed==true){
				if(confirm("Вы уверены, что хотите покинуть страницу не сохранив изменения?")==true){
					io.changed=false;
					return true;
				}
				return false;
			}
			return true;
		},
	};
}();
window.$GO		=	io.ajax.$GO;
window.$GET		=	io.ajax.$GET;
window.$POST	=	io.ajax.$POST;
window.$SUBMIT	=	io.ajax.$SUBMIT;
$(window).on('beforeunload', io.ajax.beforeunload);
$(window).bind('popstate',io.ajax.popstate);
$(window).bind('onPageLoad',io.ajax.onPageLoad);
$(window).bind('onPageUnload',io.ajax.onPageUnload);
$(function () {
	setTimeout(function(){$(window).trigger('onPageLoad');}, 100);
});