io.checkboxController = function (){
	return {
		shiftSelectLastChecked:null,
		add: function(idController,idForm,idFormActions){
			var controller=$(idController);
			var form=$(idForm);
			idFormActions=idFormActions||null;
			if(idFormActions!=null){
				var formActions=$(idFormActions);
				formActions.addClass('hide');
			}else var formActions=false;
			if(form.find('input[type=checkbox]').length<1){
				if(controller.length>0)controller.hide();
				return;
			}
			form.find('input[type=checkbox]').bind('click',function(event){
				if($(this).parents('.item').length>0)$(this).parents('.item').eq(0).toggleClass('selected');
				var items=form.find('input[type=checkbox]');
				if(!io.checkboxController.shiftSelectLastChecked) {
					io.checkboxController.shiftSelectLastChecked=this;
				}else{
					if(event.shiftKey){
						var start = items.index(this);
						var end = items.index(io.checkboxController.shiftSelectLastChecked);
						items.slice(Math.min(start,end), Math.max(start,end)+1).prop('checked', io.checkboxController.shiftSelectLastChecked.checked);
					}
					io.checkboxController.shiftSelectLastChecked=this;
				}
				io.checkboxController.scan(controller,items,formActions);
			});
			controller.bind('click',function(event){
				var items=form.find('input[type=checkbox]');
				items.prop('checked',this.checked);
				if(form.find('.item').has("input[type=checkbox]").length>0){
					if(this.checked==true){
						form.find('.item').has("input[type=checkbox]").addClass('selected');
					}else{
						form.find('.item').has("input[type=checkbox]").removeClass('selected');
					}
				}
				io.checkboxController.scan($(this),items,formActions);
			});
			
		},
		scan: function(controller,items,formActions){
			var selected=false;
			var selectedCount=0;
			items.each(function() {
			  if($(this).prop("checked")){
				  selected=true;
				  selectedCount++;
			  }
			});
			if(selectedCount==items.length)var selectedall=true;
			else var selectedall=false;
			controller.removeClass('selected').removeClass('selectedall');
			if(selected&&selectedall){
				controller.addClass('selected').addClass('selectedall');
				controller.prop('checked',true);
				if(formActions)formActions.removeClass('hide');
			}else if(selected){
				controller.addClass('selected');
				controller.prop('checked',true);
				if(formActions)formActions.removeClass('hide');
			}else if(selectedall){
				controller.addClass('selectedall');
				controller.prop('checked',true);
				if(formActions)formActions.removeClass('hide');
			}else{
				controller.prop('checked',false);
				if(formActions)formActions.addClass('hide');
			}
		},
		close: function(idController,idForm,idFormActions){
			var controller=$(idController);
			var form=$(idForm);
			idFormActions=idFormActions||null;
			if(idFormActions!=null){
				var formActions=$(idFormActions);
			}else var formActions=false;
			var items=form.find('input[type=checkbox]');
			io.checkboxController.scan(controller,items,formActions);
		},
	};
}();