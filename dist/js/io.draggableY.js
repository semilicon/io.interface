if(typeof io.draggable=='undefined')io.draggable={};
io.draggable.Y=function(){return{
	disableSelection: function(){
		return false;
	},
	add: function(ul){
		var el_list=$('>*',ul).not(".io_drag");
		el_list.addClass('io_drag');
		el_list.each(io.draggable.Y.addItem);
	},
	addItem: function(){
		if($('>handle',this).length>0){
			$('>handle',this).append('<div class="fa fa-bars io_drag_hand" aria-hidden="true" onclick="event.cancelBubble=true;"></div>');
		}else{
			$(this).append('<div class="fa fa-bars io_drag_hand" aria-hidden="true" onclick="event.cancelBubble=true;"></div>');
		}
		$('>.io_drag_hand,>handle>.io_drag_hand',this).mousedown(io.draggable.Y.mousedown);
		$('>.io_drag_hand,>handle>.io_drag_hand',this).on('touchstart',io.draggable.Y.touchstart);
		
	},
	mousedown: function(e){
		var io_drag_hand = $(this);
		var drag = $(this).parent();
		if(!drag.hasClass('io_drag'))drag = drag.parent();
		
		var const_dragparentoffsettop= drag.parent().offset().top;
		var const_dragparentheight= drag.parent().height();
		var posOld= drag.offset().top;
		var posOldCorrection = e.pageY - posOld;
		drag.addClass('io_dragActive');
		var mouseMove = function(e){
			var posParentTop = const_dragparentoffsettop;
			var posParentBottom = posParentTop + const_dragparentheight;
			var posParentTop_new = drag.parent().offset().top;
			if(posParentTop!=posParentTop_new){
				var correct = posParentTop-posParentTop_new;
			}else{var correct =0;}
			
			var posNew = e.pageY - posOldCorrection;
			if (posNew < posParentTop-correct){
				if (drag.prev().length > 0 ) {
					drag.insertBefore(drag.prev().css({'top':-drag.outerHeight()}).animate({'top':0}, 100));
				}
				drag.offset({'top': posParentTop-correct});
			} else if (posNew + drag.outerHeight() > posParentBottom-correct){
				if (drag.next().length > 0 ) {
					drag.insertAfter(drag.next().css({'top':drag.outerHeight()}).animate({'top':0}, 100));
				}
				drag.offset({'top': posParentBottom-correct - drag.outerHeight()});
			} else {
				drag.offset({'top': posNew});
				if (posOld - posNew-correct > drag.prev().outerHeight()*0.90){
					var ph=drag.prev().outerHeight();
					drag.insertBefore(drag.prev().css({'top':-drag.outerHeight()}).animate({'top':0}, 100));
					drag.offset({'top': posNew});
					posOld = posOld-ph;
					posOldCorrection = e.pageY - drag.offset().top;
				} else if (posNew - posOld+correct > drag.next().outerHeight()*0.90){
					var nh=drag.next().outerHeight();
					drag.insertAfter(drag.next().css({'top':drag.outerHeight()}).animate({'top':0}, 100));
					drag.offset({'top': posNew});
					posOld = posOld+nh;
					posOldCorrection = e.pageY - drag.offset().top;
				}
				
			}
		};
		var mouseUp = function(){
			$(document).off('mousemove', mouseMove).off('mouseup', mouseUp).off('contextmenu', mouseUp);
			$(document).off('mousedown', io.draggable.Y.disableSelection);
			$(window).off('blur', mouseUp);
			drag.animate({'top':0}, 100, function(){
				drag.removeClass('io_dragActive');
			});
			var prev=drag.prev().attr('id') || '';
			var item=drag.attr('id');
			var next=drag.next().attr('id') || '';
			var sort={'prev':prev,'item':item,'next':next};
			if(drag.parent().attr('onsort')!=undefined && drag.parent().attr('onsort')!=''){
				eval(drag.parent().attr('onsort'));
			}
		};
		$(document).on('mousemove', mouseMove).on('mouseup', mouseUp).on('contextmenu', mouseUp);
		$(document).on('mousedown', io.draggable.Y.disableSelection);
		$(window).on('blur', mouseUp);
	},
	touchstart: function(e){
		event.preventDefault();
		var io_drag_hand = $(this);
		var drag = $(this).parent();
		if(!drag.hasClass('io_drag'))drag = drag.parent();
		var const_dragparentoffsettop= drag.parent().offset().top;
		var const_dragparentheight= drag.parent().height();
		var posOld= drag.offset().top;
		var posOldCorrection = event.touches[0].pageY - posOld;
		drag.addClass('io_dragActive');
		var touchmove  = function(e){
			var posParentTop = const_dragparentoffsettop;
			var posParentBottom = posParentTop + const_dragparentheight;
			var posParentTop_new = drag.parent().offset().top;
			if(posParentTop!=posParentTop_new){
				var correct = posParentTop-posParentTop_new;
			}else{var correct =0;}
			
			var posNew = event.touches[0].pageY - posOldCorrection;
			if (posNew < posParentTop-correct){
				if (drag.prev().length > 0 ) {
					drag.insertBefore(drag.prev().css({'top':-drag.outerHeight()}).animate({'top':0}, 100));
				}
				drag.offset({'top': posParentTop-correct});
			} else if (posNew + drag.outerHeight() > posParentBottom-correct){
				if (drag.next().length > 0 ) {
					drag.insertAfter(drag.next().css({'top':drag.outerHeight()}).animate({'top':0}, 100));
				}
				drag.offset({'top': posParentBottom-correct - drag.outerHeight()});
			} else {
				drag.offset({'top': posNew});
				if (posOld - posNew-correct > drag.prev().outerHeight()*0.90){
					var ph=drag.prev().outerHeight();
					drag.insertBefore(drag.prev().css({'top':-drag.outerHeight()}).animate({'top':0}, 100));
					drag.offset({'top': posNew});
					posOld = posOld-ph;
					posOldCorrection = event.touches[0].pageY - drag.offset().top;
				} else if (posNew - posOld+correct > drag.next().outerHeight()*0.90){
					var nh=drag.next().outerHeight();
					drag.insertAfter(drag.next().css({'top':drag.outerHeight()}).animate({'top':0}, 100));
					drag.offset({'top': posNew});
					posOld = posOld+nh;
					posOldCorrection = event.touches[0].pageY - drag.offset().top;
				}
				
			}
		};
		var touchend = function(){
			$(document).off('touchmove', touchmove).off('touchend', touchend).off('touchcancel', touchend);
			drag.animate({'top':0}, 100, function(){
				drag.removeClass('io_dragActive');
			});
			var prev=drag.prev().attr('id') || '';
			var item=drag.attr('id');
			var next=drag.next().attr('id') || '';
			var sort={'prev':prev,'item':item,'next':next};
			if(drag.parent().attr('onsort')!=undefined && drag.parent().attr('onsort')!=''){
				eval(drag.parent().attr('onsort'));
			}
		};
		$(document).on('touchmove', touchmove).on('touchend', touchend).on('touchcancel', touchend);
	},
};}();
$.fn.draggableY = function(){
	$(this).each(function(index) {
		io.draggable.Y.add(this);
	});
}