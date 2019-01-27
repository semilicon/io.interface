io.loading = function (){
	return {
		onTimeout:false,
		on: function(){
			if($('#loadingGroup').length<1){io.loading.createLG();}
			$('#loadingGroup').addClass('show');
			io.loading.onTimeout = setTimeout(function(){
				$('#loadingGroup').addClass('bg');		
			},1000);
			io.loading.onTimeout2 = setTimeout(function(){
				$('#loadingGroup').addClass('on');		
			},600);
		},
		off: function(){
			$('#loadingGroup').removeClass('show bg on');
			clearTimeout(io.loading.onTimeout);
			clearTimeout(io.loading.onTimeout2);
		},
		createLG: function(){
			$('body').prepend('<div id="loadingGroup" class="show"><div class="impuls"><div class="loadingImpuls"><div id="fountainG_1" class="fountainG"></div><div id="fountainG_2" class="fountainG"></div><div id="fountainG_3" class="fountainG"></div><div id="fountainG_4" class="fountainG"></div><div id="fountainG_5" class="fountainG"></div><div id="fountainG_6" class="fountainG"></div></div></div></div>');
		},
	};
}();