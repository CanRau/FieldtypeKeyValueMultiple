$(document).ready(function() {	

	/**
	 * Make the lists sortable and hoverable
	 *
	 * @todo make sortable if sort option set to manually
	 */
	// function initSortable($keyValueList) { 

	// 	$keyValueList.each(function() {
			
	// 		var $this = $(this);
	// 		var qty = $this.children("li").length;
	// 		if($this.closest('.InputfieldRenderValue').length) return;
			
	// 		var $inputfield = $this.closest('.Inputfield')
		
	// 		if(qty < 2) {
	// 			// added to support additional controls when multiple items are present 
	// 			// and to hide them when not present
	// 			if(qty == 0) $inputfield.addClass('InputfieldEmpty').removeClass('InputfieldMultiple InputfieldSingle');
	// 				else $inputfield.addClass('InputfieldSingle').removeClass('InputfieldEmpty InputfieldMultiple');
	// 			// if we're dealing with a single item list, then don't continue with making it sortable
	// 			return;
	// 		} else {
	// 			$this.closest('.Inputfield').removeClass('InputfieldSingle InputfieldEmpty').addClass('InputfieldMultiple');
	// 		}

	// 		$this.sortable({
	// 			//axis: 'y', 
	// 			start: function(e, ui) {
	// 				ui.item.children(".InputfieldFileInfo").addClass("ui-state-highlight"); 
	// 			}, 
	// 			stop: function(e, ui) {
	// 				$(this).children("li").each(function(n) {
	// 					$(this).find(".InputfieldFileSort").val(n); 
	// 				}); 
	// 				ui.item.children(".InputfieldFileInfo").removeClass("ui-state-highlight"); 
	// 				// Firefox has a habit of opening a lightbox popup after a lightbox trigger was used as a sort handle
	// 				// so we keep a 500ms class here to keep a handle on what was a lightbox trigger and what was a sort
	// 				$inputfield.addClass('InputfieldFileJustSorted InputfieldStateChanged'); 
	// 				setTimeout(function() { $inputfield.removeClass('InputfieldFileJustSorted'); }, 500); 
	// 			}
	// 		});

	// 	}).find(".ui-widget-header, .ui-state-default").hover(function() {
	// 		$(this).addClass('ui-state-hover'); 
	// 	}, function() {
	// 		$(this).removeClass('ui-state-hover'); 
	// 	});
	// }

	$(document).on("click", ".InputfieldKeyValueMultipleAdd", function(e) {
		$(this).removeClass('ui-state-active'); 
		var $row = $(this).parents(".InputfieldKeyValueMultiple").find("tr.KeyValueTemplate"); 
		$row.parent('tbody').append($row.clone().hide().removeClass('KeyValueTemplate').css('display', 'table-row').fadeIn()); 
		var id = $(this).attr('id'); 
		setTimeout("$('#" + id + "').removeClass('ui-state-active')", 500); 
		return false; 
	});	

	$(document).on("click", ".InputfieldKeyValueMultiple a.KeyValueClone", function(e) {
		var $row = $(this).parents("tr.KeyValue"); 
		var $table = $(this).parents("table.InputfieldKeyValueMultiple"); 
		$table.append($row.clone().hide().css('display', 'table-row').fadeIn()); 
		return false; 
	}); 

	$(document).on("click", ".InputfieldKeyValueMultiple a.KeyValueDel", function(e) {
		var $row = $(this).parents("tr.KeyValue"); 
		if($row.size() == 0) {
			// delete all
			$(this).parents("thead").next("tbody").find('.KeyValueDel').click();
			return false; 	
		}
		var $input = $(this).next('input'); 
		if($input.val() == 1) {
			$input.val(0); 
			$row.removeClass("KeyValueTBD"); 
			$row.removeClass('ui-state-error'); 
		} else {
			$input.val(1); 
			$row.addClass("KeyValueTBD"); 
			$row.addClass('ui-state-error');
		}
		return false; 
	}); 

	$(document).on("focus", ".InputfieldKeyValueMultiple .datepicker", function() {
		$(this).datepicker({
			dateFormat: 'yy-mm-dd'
		}); 
	}); 

}); 
