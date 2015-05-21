'use strict';

$(function() {

	$(document.body).on('change', '.radio input', function() {
		var $this = $(this);

		if ($this.prop('checked') === false) {
			if ($this.val() === 'N') {
				$this.parents('.evidence').removeClass('conditional');
			} else {
				$this.parents('.evidence').addClass('conditional');
			}
		}
	});

});