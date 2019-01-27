io.modalAuth = function (){
	return {
		open: function(){
			if($('#ioModalAuthBox').length<1){io.modalAuth.createPanel();}
		},
		createPanel: function(){
			$('body').prepend('<div id="ioModalAuthBox"><div class="inner"><div id="ioModalAuth"><div class="authTitle">Авторизация</div><div id="authFormReturn"></div><form method="post" action="./_authentication/" target="authFormReturn" name="auth" onsubmit="$SUBMIT();return false;"><button style="display:none;"></button><input type="text"  placeholder="Логин"  value="" name="LOGIN"><br><input type="password"  value="" placeholder="Пароль" autocomplete="off" name="PASS"><br/><center><a class="button blue" href="" onclick="$SUBMIT();return false;">Вход</a></center></form></div></div></div>');
		},
		close: function(){
			$('#ioModalAuthBox').remove();
		},
	};
}();