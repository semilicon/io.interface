io.leftMenuBar={};
io.leftMenuBar.select=function(url){
	var eachStop=false;
	$('.ioLeftMenuBar>.inner>ul li').removeClass('open');
	$('.ioLeftMenuBar>.inner>ul a').each(function(index) {
		if(!eachStop){
			var a_module=io.extractModuleName($(this).attr('href'));
			var c_module=io.extractModuleName(url);
			if(a_module==c_module){
				$('.ioLeftMenuBar>.inner>ul .selected').removeClass('selected');
				$(this).parents('li').addClass('selected').addClass('open');
				eachStop=true;
			}
		}
	});
	$('.ioLeftMenuBar>.inner>ul li').removeClass('hover');
};
io.leftMenuBar.toggle=function(){
	$('body').toggleClass('ioShowLeftMenuBar');
};
io.leftMenuBar.hide=function(){
	$('body').removeClass('ioShowLeftMenuBar');
};
$(window).bind('onPageLoad',io.leftMenuBar.hide);
$(function () {
	$('.ioLeftMenuBar>.inner>ul>li').hoverIntent({over: function() {$(this).addClass('hover');},out: function(){$(this).removeClass('hover');},timeout: 200,sensitivity: 7,interval: 90});
	$('.ioLeftMenuBar>.inner>ul>li>span').click(function(){
		$('.ioLeftMenuBar>.inner>ul li').removeClass('open');
		$(this).parent().addClass('open');
	});
	$('.ioLeftMenuBar>.inner').pinScroll();
	io.leftMenuBar.select(document.location.href);
	
	if(typeof Hammer=="function"){
		Hammer($('.ioLeftMenuBar')[0],{domEvents: true}).on("swipeleft", function(e) {
			$('body').removeClass('ioShowLeftMenuBar');
			$('.ioTopMenuBar>ul>li').trigger('mouseout');
		});
		Hammer($('body')[0],{touchAction: "auto",domEvents: true}).on("swiperight", function() {
			$('body').addClass('ioShowLeftMenuBar');
			$('.ioTopMenuBar>ul>li').trigger('mouseout');
		});
	}
});
