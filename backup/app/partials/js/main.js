var OS_ANDROID = !!navigator.userAgent.match(/android/i);
var OS_IOS = !!navigator.userAgent.match(/iphone|ipod|ipad/i);
var IS_MOBILE = $(window).width() <= 768 || /ipod|ipad|iphone|android/i.test(navigator.userAgent);

var $ = jQuery;
var $win = $(window);

$.fn.stickyControls = function() {
	if (IS_MOBILE) return;

	$(this).each(function() {
		var $this = $(this);
		var $sticker = $(this).find('.sticker');

		var stickPointHeight = $this.height();
		var topScroll = $this.position().top;

		var _func = function() {
			var viewportBottom  = $win.height() + $win.scrollTop() - stickPointHeight + 5;
			$this.css('height', stickPointHeight);
			$sticker[(viewportBottom >= topScroll ? 'remove' : 'add') + 'Class']('stuck');
		};

		$win.scroll(_func).resize(_func).trigger('scroll');
	});
};

function couldBeRadio(s) {
	var $tmp = $(s);
	return ['radio','checkbox'].indexOf($tmp.attr('type'))>=0 ? $tmp.filter(':checked').val() : $tmp.val();
}

function codiceFiscaleSuggerito(element) {
	var $element 		= $(element);
	var $form 			= $element.closest('form');
	var CFparts 		= [
	$form.find("input[data-cf='nome']"),
	$form.find("input[data-cf='cognome']"),
	$form.find("input[data-cf='sesso']"),
	$form.find("input[data-cf='data']"),
	$form.find("input[data-cf='cittanascita']")
	];

	function fieldsFilled() {
		var r = true;
		$.each(CFparts, function(){
			if (!r) return;
			var $this = $(this);

			if (['hidden','radio','checkbox'].indexOf($this.attr('type')) === -1 && ($this.val().length === 0 ||  !$this.is('.valid'))) {
				r = false;
			}
		});
		return r;
	}

	function calculate() {
		if (fieldsFilled()) {
			var d = CFparts[3].val().split('/');
			var newCode = CodFiscale.calcola(CFparts[0].val(), CFparts[1].val(), couldBeRadio(CFparts[2]), d[0], d[1], d[2], CodFiscale.input_dateCode);
			$element.val(newCode).valid();
		}
	}

	$.each(CFparts, function() {
		if (['radio','checkbox'].indexOf(this.attr('type'))>=0) {
			this.on('change', calculate);
		} else {
			this.on({ keyup: calculate, blur: calculate });
		}
	});

}

// Overrides the default autocomplete filter function to search only from the beginning of the string
$.ui.autocomplete.filter = function (array, term) {
	var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
	return $.grep(array, function (value) {
		return matcher.test(value.label || value.value || value);
	});
};

// Datepicker opener

$(".datepicker-opener").click(function () {
	$(this).parent('div').find('input').focus();
});


// Funzionamento input CAP che rende visibile il fieldset Indirizzo all'evento focuout
$('.focus-out-show').on('focusout', function(){
	var $this = $(this);
	setTimeout(function() {
		if (!$this.hasClass('error')) {
			$('.focus-out-hidden').show();
		} else {
			$('.focus-out-hidden').hide();
		}
	}, 100);
});


if (/ipad/i.test(navigator.userAgent)) $(document.body).addClass('isIpad');
if (IS_MOBILE) $(document.body).addClass('isMobile');

if ( ! ('placeholder' in document.createElement('input'))) {
	$.fn.domval = $.fn.val;
	$.fn.val = function(v) {
		var $this = $(this);
		if (v) {
			$this.uiplacehold(false);
			return $this.domval(v);
		} else {
			if ($this.data('placeholder')) return '';
			return $this.domval();
		}
	};

	$.fn.uiplacehold = function(s) {
		var $this = $(this);
		if (s) $this.val($this.attr('placeholder')).css('color','#ccc').data('placeholder', s);
		else $this.css('color','#000').data('placeholder', s);
	};

	$('input[placeholder]').each(function() {
		$(this).focus(function(){
			var $this = $(this);
			if ($this.data('placeholder')) $this.domval('').uiplacehold(false);
		}).blur(function(){
			var $this = $(this);
			$this.uiplacehold(!$this.domval().length);
		}).uiplacehold(!$(this).domval());
	});
}

$('select').selectpicker();
$('[data-datepicker]').datepicker();
$('.stickPoint').stickyControls();

$('[data-autocomplete-comune]').autocomplete({
	source: function(request, response) {
		var $this = $(this.element);
		$.getJSON($this.data('autocomplete-comune'), function(data) {
			response($.map(data, function(item) {
				return {
					value: item.Descrizione,
					code: item.dataCode
				};
			}));
		});
	},
	select: function( event, ui ) {
		CodFiscale.dataCode = ui.item.code;
		$(event.target).addClass('valid').trigger('keyup');
	},
	minLength: 2
});

$('[data-autocomplete-via]').autocomplete({
	source: function(request, response) {
		var $this = $(this.element);
		$.getJSON($this.data('autocomplete-via'), function(data) {
			response($.map(data, function(item) {
				return {
					value: item.address
				};
			}));
		});
	},
	select: function( event, ui ) {
		$(event.target).trigger('keyup');
	},
	minLength: 2
});

if (window.__BANKS__) $('[data-autocomplete-banca]').autocomplete({
	source: $.map(__BANKS__, function(item) {
		return {
			value: item.Descrizione
		};
	}),
	select: function( event, ui ) {
		$(event.target).trigger('keyup');
	},
	minLength: 2
});

if ( ! IS_MOBILE) {
	codiceFiscaleSuggerito('.codicefiscale');

	$(document.body).on('keyup, change', '[name="cap"]', function(){
		if ( $('.residenza_fieldset').length > 0 && $(this).val().length === 5 ) {
			$('.residenza_fieldset').show();
		} else if ($(this).val().length < 5 ) {
			$('.residenza_fieldset').hide();
		}
	});

	$('#recuperoPassword').on('click', function(event) {
		event.preventDefault();
		var $this = $(this);

		$.get($this.data('url-recupero'), function() {
			$t.hide();
			$t.parent().find('.recuperoPasswordConfirm').show();
		});

	});

	$('input.input_date:not(.no_mask)').mask('99/99/99?99', { placeholder:'' });

} else /*if(IS_MOBILE)*/ {

	$('input.input_date:not(.no_mask)').each(function() {
		var $div = $('<div/>');
		var $real = $(this);
		var name = $real.attr('name');

		$div.append('<div style="width:31%;margin-right:2%;float:left"><input data-number="2" placeholder="GG" style="width:100%" type="number" id="'+name+'_day" data-date="day"></div>');
		$div.append('<div style="width:31%;margin-right:2%;float:left"><input data-number="2" placeholder="MM" style="width:100%"type="number" id="'+name+'_month" data-date="month"></div>');
		$div.append('<div style="width:33%;float:left"><input data-number="4" placeholder="AAAA" style="width:100%" type="number" id="'+name+'_year" data-date="year"></div>');
		$div.append('<div style="clear:both">');

		var $day = $div.find('[data-date=day]');
		var $month = $div.find('[data-date=month]');
		var $year = $div.find('[data-date=year]');
		$div.on('keyup', 'input', function() {
			var $this = $(this), val = $(this).val(), max = $this.data('number');
			if (val.length > max) {
				$this.val( val.substr(0, max) );
			}

			$real.val( $day.val()+"/"+$month.val()+"/"+$year.val() ).valid();
		});

		$real.parent().prepend($div);
		$real.css({
			opacity: 0.01,
			height: 0,
			padding: 0,
			'min-height': 0,
			margin: 0
		});
	});

$('input.number').attr('type','number');
$('input.cap').attr('type', 'number');
$('input.ncivico').attr('type', 'number').keyup(function() {
	$(this).attr('type', 'text');
});
}

// On accordion click set accordion heading class to collapsed

$('.accordion .panel').on('show.bs.collapse', function () {
	$(this).find('.accordion-panel-heading').removeClass('collapsed');
});

$('.accordion .panel').on('hide.bs.collapse', function () {
	$(this).find('.accordion-panel-heading').addClass('collapsed');
});

// Data-show, data-hide
$(document.body).on('change', '.radio input', function(){
	var $this = $(this);
	var show_id = $this.data('show');
	var hide_id = $this.data('hide');
	if (show_id != null) $(show_id).slideDown();
	if (hide_id != null) $(hide_id).slideUp();
});