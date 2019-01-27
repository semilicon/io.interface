if(typeof io.draggable=='undefined')io.draggable={};
io.draggable.X=function(){return{
	disableSelection: function(){
		return false;
	},
	add: function(ul){
		var el_list=$('>*',ul).not(".io_drag");
		el_list.addClass('io_drag');
		el_list.each(io.draggable.X.addItem);
	},
	addItem: function(){
		if($('>handle',this).length>0){
			$('>handle',this).append('<div class="fa fa-bars io_drag_hand" aria-hidden="true" onclick="event.cancelBubble=true;"></div>');
		}else{
			$(this).append('<div class="fa fa-bars io_drag_hand" aria-hidden="true" onclick="event.cancelBubble=true;"></div>');
		}
		$('>.io_drag_hand,>handle>.io_drag_hand',this).mousedown(io.draggable.X.mousedown);
		$('>.io_drag_hand,>handle>.io_drag_hand',this).on('touchstart',io.draggable.X.touchstart);
	},
	mousedown: function(e){
		var io_drag_hand = $(this);
		var drag = $(this).parent();
		if(!drag.hasClass('io_drag'))drag = drag.parent();
		
		var const_dragparentoffsetleft= drag.parent().offset().left;
		var const_dragparentwidth= drag.parent().width();
		var posOld= drag.offset().left;
		var posOldCorrection = e.pageX - posOld;
		drag.addClass('io_dragActive');
		var mouseMove = function(e){
			var posParentLeft = const_dragparentoffsetleft;
			var posParentRight = posParentLeft + const_dragparentwidth;
			var posParentLeft_new = drag.parent().offset().left;
			if(posParentLeft!=posParentLeft_new){
				var correct = posParentLeft-posParentLeft_new;
			}else{var correct =0;}
			
			var posNew = e.pageX - posOldCorrection;
			if (posNew < posParentLeft-correct){
				if (drag.prev().length > 0 ) {
					drag.insertBefore(drag.prev().css({'left':-drag.outerWidth()}).animate({'left':0}, 100));
				}
				drag.offset({'left': posParentLeft-correct});
			} else if (posNew + drag.outerWidth() > posParentRight-correct){
				if (drag.next().length > 0 ) {
					drag.insertAfter(drag.next().css({'left':drag.outerWidth()}).animate({'left':0}, 100));
				}
				drag.offset({'left': posParentRight-correct - drag.outerWidth()});
			} else {
				drag.offset({'left': posNew});
				if (posOld - posNew-correct > drag.prev().outerWidth()*0.90){
					var ph=drag.prev().outerWidth();
					drag.insertBefore(drag.prev().css({'left':-drag.outerWidth()}).animate({'left':0}, 100));
					drag.offset({'left': posNew});
					posOld = posOld-ph;
					posOldCorrection = e.pageX - drag.offset().left;
				} else if (posNew - posOld+correct > drag.next().outerWidth()*0.90){
					var nh=drag.next().outerWidth();
					drag.insertAfter(drag.next().css({'left':drag.outerWidth()}).animate({'left':0}, 100));
					drag.offset({'left': posNew});
					posOld = posOld+nh;
					posOldCorrection = e.pageX - drag.offset().left;
				}
				
			}
		};
		var mouseUp = function(){
			$(document).off('mousemove', mouseMove).off('mouseup', mouseUp).off('contextmenu', mouseUp);
			$(document).off('mousedown', io.draggable.Y.disableSelection);
			$(window).off('blur', mouseUp);
			drag.animate({'left':0}, 100, function(){
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
		
		var const_dragparentoffsetleft= drag.parent().offset().left;
		var const_dragparentwidth= drag.parent().width();
		var posOld= drag.offset().left;
		var posOldCorrection = event.touches[0].pageX - posOld;
		drag.addClass('io_dragActive');
		var touchmove = function(e){
			var posParentLeft = const_dragparentoffsetleft;
			var posParentRight = posParentLeft + const_dragparentwidth;
			var posParentLeft_new = drag.parent().offset().left;
			if(posParentLeft!=posParentLeft_new){
				var correct = posParentLeft-posParentLeft_new;
			}else{var correct =0;}
			
			var posNew = event.touches[0].pageX - posOldCorrection;
			if (posNew < posParentLeft-correct){
				if (drag.prev().length > 0 ) {
					drag.insertBefore(drag.prev().css({'left':-drag.outerWidth()}).animate({'left':0}, 100));
				}
				drag.offset({'left': posParentLeft-correct});
			} else if (posNew + drag.outerWidth() > posParentRight-correct){
				if (drag.next().length > 0 ) {
					drag.insertAfter(drag.next().css({'left':drag.outerWidth()}).animate({'left':0}, 100));
				}
				drag.offset({'left': posParentRight-correct - drag.outerWidth()});
			} else {
				drag.offset({'left': posNew});
				if (posOld - posNew-correct > drag.prev().outerWidth()*0.90){
					var ph=drag.prev().outerWidth();
					drag.insertBefore(drag.prev().css({'left':-drag.outerWidth()}).animate({'left':0}, 100));
					drag.offset({'left': posNew});
					posOld = posOld-ph;
					posOldCorrection = event.touches[0].pageX - drag.offset().left;
				} else if (posNew - posOld+correct > drag.next().outerWidth()*0.90){
					var nh=drag.next().outerWidth();
					drag.insertAfter(drag.next().css({'left':drag.outerWidth()}).animate({'left':0}, 100));
					drag.offset({'left': posNew});
					posOld = posOld+nh;
					posOldCorrection = event.touches[0].pageX - drag.offset().left;
				}
				
			}
		};
		var touchend = function(){
			$(document).off('touchmove', touchmove).off('touchend', touchend).off('touchcancel', touchend);
			drag.animate({'left':0}, 100, function(){
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
$.fn.draggableX = function(){
	$(this).each(function(index) {
		io.draggable.X.add(this);
	});
}
