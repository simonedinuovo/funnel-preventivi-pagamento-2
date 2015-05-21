'use strict';

$(function() {

	$(document.body).on('change', '.radio input', function() {
		if ( $('[type=radio][value=posta]:checked').length > 0)  {
			$('#ricevoperposta').slideDown();
		} else {
			$('#ricevoperposta').slideUp();
		}
	});

	$('[name="indirizzodiversoposta"]').change(function(e) {
		var checked = $('#indirizzodiversoposta2').prop('checked');
		if (checked === false) {
			$('#indirizzodiversoposta').find('input[type=text]').each(function(){
				this.value = '';
			});

			// Reset Select
			var selectAddr = $('select:not(#address_type)');
			selectAddr[0].selectedIndex = 0;
			selectAddr.trigger('chosen:updated');

			$('#indirizzodiversoposta').find('input[type=text], select:not(#address_type)').parent().find('label').remove();
			$('#indirizzodiversoposta .error').delay(400).removeClass('error');
		}
	});

});