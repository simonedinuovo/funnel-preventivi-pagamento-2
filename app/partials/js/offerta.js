'use strict';

Number.prototype.numberFormat = function(c, d, t){
	var n = this,
	c = isNaN(c = Math.abs(c)) ? 2 : c,
	d = d == undefined ? "." : d,
	t = t == undefined ? "," : t,
	s = n < 0 ? "-" : "",
	i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
	j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

_.mixin({
	euro: function(v) {
		if (v != +v) return v;
		return (v/100).numberFormat(2, ',', '.') + ' €';
	}
});

var Off = {
	activated: [],
	BASE: 51400,
	boxes: 0,

	/**
	 * [guaranteeIsInList description]
	 * @param  {[type]} id [description]
	 * @return {[type]}    [description]
	 */
	guaranteeIsInList: function(id) {
		return _.indexOf(Off.activated, id) >= 0;
	},

	/**
	 * [getGuarantee description]
	 * @param  {[type]} id [description]
	 * @return {[type]}    [description]
	 */
	getGuarantee: function(id) {
		var g = Guarantees[id];
		return _.extend(g, {
			id: id,
			editable: (_.isArray(g.massimale) || _.isArray(g.franchigia)),
			price_string: _.euro(g.price),
			ui: {
				box: $('.offerta-box[data-guarantee-id="' + id + '"]'),
				recapRow: $('.offerta-recap-row[data-guarantee-id="' + id + '"]')
			}
		});
	},

	/**
	 * [uiAddGuaranteeBox description]
	 * @param  {[type]} id [description]
	 * @return {[type]}    [description]
	 */
	uiAddGuaranteeBox: function(id) {
		var g = Off.getGuarantee(id);
		g.index = Off.boxes++;
		Off.ui[ g.consigliata ? 'boxesRecommended' : 'boxesOther' ].append(Off.tpl.guaranteeBox(g));
	},

	/**
	 * [realAddGuarantee description]
	 * @param  {[type]} id [description]
	 * @return {[type]}    [description]
	 */
	realAddGuarantee: function(id) {
		var g = Off.getGuarantee(id);
		g.ui.box.addClass('selected');
		Off.activated.push(id);
		Off.ui.list.find('>.nano-content').append(Off.tpl.guaranteeRecapRow(g));
		Off.ui.list.nanoScroller();

		if (g.required && !Off.guaranteeIsInList(g.required)) {
			Off.realAddGuarantee(g.required);
		}

		Off.calculateTotalsOfGuarantees();
		Off.ui.list.nanoScroller();
	},

	addGuarantee: function(id) {
		if (_.indexOf(Off.activated, id) >= 0) return;

		var g = Off.getGuarantee(id);

		if (g.required && !Off.guaranteeIsInList(g.required)) {
			Off.openGuaranteeModalRequired(id, g.required);
		} else {
			Off.realAddGuarantee(id);
		}
	},

	editGuarantee: function(id, o) {
		var g = Off.getGuarantee(id);
		_.extend(g.data, o);

		if (g.data.massimale) {
			g.ui.box.find('[data-massimale]').text( _.euro(g.data.massimale) );
		}
		if (g.data.franchigia) {
			g.ui.box.find('[data-franchigia]').text( _.euro(g.data.franchigia) );
		}
	},

	realRemoveGuaranteee: function(id) {
		var g = Off.getGuarantee(id);

		Off.activated.splice(_.indexOf(Off.activated, id), 1);

		g.ui.box.removeClass('selected');
		g.ui.recapRow.addClass('hide-animated');
		setTimeout(function() { g.ui.recapRow.remove(); }, 200);

		_.each(Guarantees, function(e) {
			if (e.required === g.id) {
				Off.removeGuarantee(e.id);
			}
		});

		Off.calculateTotalsOfGuarantees();
		Off.ui.list.nanoScroller();
	},

	removeGuarantee: function(id) {
		var g = Off.getGuarantee(id);

		if (g.on_delete) {
			Off.ui.onDeleteModal.find('.modal-title').html(g.title);
			Off.ui.onDeleteModal.find('.modal-body').html( Off.tpl.guaranteeOnDelete(g) );
			Off.ui.onDeleteModal.find('[data-guarantee-ondelete-delete]').data('guarantee-ondelete-delete', id);
			Off.ui.onDeleteModal.modal('show');
		} else {
			Off.realRemoveGuaranteee(id);
		}
	},

	calculateTotalsOfGuarantees: function() {
		//var sum = Off.BASE + _.reduce(Off.activated, function(_c, gid) { return _c + Guarantees[gid].price; }, 0);
		//var discount_percentage = $('[data-total-discount]').data('total-discount');
		//var discount_value = sum * discount_percentage / 100;
		//var sum_with_discount = sum - discount_value;
		//$('[data-total-standard]').text(_.euro(sum));
		//$('[data-total-discount]').text('-' + _.euro(discount_value));
		//$('[data-total]').text(_.euro(sum_with_discount));
		$('[data-buy-text]').text('Ricalcola');
		$('[data-save]').fadeOut();
	},

	openGuaranteeModalEdit: function(id) {
		var g = Off.getGuarantee(id);
		Off.ui.editModal.find('[data-guarantee-edit-add]').data('guarantee-edit-add', id);
		Off.ui.editModal.find('.modal-title').html(g.title);
		Off.ui.editModal.find('.modal-body').html( Off.tpl.guaranteeEdit(g) );
		Off.ui.editModal.modal('show');
	},

	openGuaranteeModalInfo: function(id) {
		var g = Off.getGuarantee(id);
		$.get('app/partials/html/guarantee.html').success(function(html) {
			Off.ui.infoModal.find('.modal-title').html(g.title);
			Off.ui.infoModal.find('.modal-body').html(html);
			Off.ui.infoModal.modal('show');
		});
	},

	openGuaranteeModalRequired: function(wid, required_id) {
		var html = Off.tpl.guaranteeRequired({
			want: Off.getGuarantee(wid),
			required: Off.getGuarantee(required_id)
		});
		Off.ui.requiredModal.find('.modal-body').html(html);
		Off.ui.requiredModal.find('[data-guarantee-required-add]').attr('data-guarantee-required-add', wid);
		Off.ui.requiredModal.modal('show');
	},

	init: function() {

		Off.tpl = {
			guaranteeRecapRow: _.template( $('#tpl-offerta-recap-row').html() ),
			guaranteeRequired: _.template( $('#tpl-guarantee-required').html() ),
			guaranteeBox: _.template( $('#tpl-guarantee-box').html() ),
			guaranteeEdit: _.template( $('#tpl-guarantee-mf').html() ),
			guaranteeOnDelete: _.template( $('#tpl-guarantee-ondelete').html() )
		},

		Off.ui = {
			infoModal: $('#guarantee-info-modal'),
			requiredModal: $('#guarantee-required-modal'),
			onDeleteModal: $('#guarantee-ondelete-modal'),
			editModal: $('#guarantee-edit-modal'),
			list: $('#guarantees-list'),
			boxesRecommended: $('#guarantees-recommended'),
			boxesOther: $('#guarantees-others'),
		};

		// Add boxes
		_.each(Guarantees, function(g, id) {
			Off.uiAddGuaranteeBox(id);
		});

		Off.ui.list.nanoScroller();

		$(document.body).on('click', '[data-guarantee-remove]', function(e) {
			Off.removeGuarantee( $(this).data('guarantee-remove') );
		});

		$(document.body).on('click', '.offerta-box[data-guarantee-id]', function(e) {
			var $this = $(this);
			var id = $this.data('guarantee-id');
			var g = Off.getGuarantee(id);

			function edit() {
				if (_.isArray(g.massimale) || _.isArray(g.franchigia)) {
					Off.openGuaranteeModalEdit(id);
				} else {
					if (!Off.guaranteeIsInList(id)) {
						Off.addGuarantee(id);
					}
				}
			}

			if ($(e.target).data('edit')) {
				edit();
			} else if ($(e.target).data('info')) {
				Off.openGuaranteeModalInfo(id);
			} else {
				edit();
			}
		});

		$(document.body).on('click', '[data-guarantee-edit-add]', function() {
			var id = $(this).data('guarantee-edit-add');
			Off.ui.editModal.modal('hide');

			var new_massimale = Off.ui.editModal.find('[name="guarantee-'+id+'-massimale"]:checked').val();
			var new_franchigia = Off.ui.editModal.find('[name="guarantee-'+id+'-franchigia"]:checked').val();

			Off.addGuarantee(id);
			Off.editGuarantee(id, {
				franchigia: new_franchigia,
				massimale: new_massimale
			});
		});

		$(document.body).on('click', '[data-guarantee-ondelete-stay]', function() {
			Off.ui.onDeleteModal.modal('hide');
		});

		$(document.body).on('click', '[data-guarantee-ondelete-delete]', function() {
			var id = $(this).data('guarantee-ondelete-delete');
			Off.realRemoveGuaranteee(id);
			Off.ui.onDeleteModal.modal('hide');
		});

		$(document.body).on('click', '[data-guarantee-required-add]', function() {
			var id = $(this).data('guarantee-required-add');
			Off.realAddGuarantee(id);
			Off.ui.requiredModal.modal('hide');
		});

		$(document.body).on('click', '[data-popup]', function() {
			$.get('app/partials/html/guarantee.html').success(function(html) {
				Off.ui.infoModal.find('.modal-title').html('');
				Off.ui.infoModal.find('.modal-body').html(html);
				Off.ui.infoModal.modal('show');
			});
		});

		$(document.body).on('click', '[data-offerta-editing-assump]', function() {
			if (!$(this).data('active')) {
				$(this).removeClass('main');
				$(this).find('>span:eq(0)').text('Annulla');
				$('#editing-assump').addClass('visible')
			} else {
				$(this).addClass('main');
				$(this).find('>span:eq(0)').text('Modifica');
				$('#editing-assump').removeClass('visible')
			}

			var ct = $('[data-offerta-editing-text]').text();
			var nt = $('[data-offerta-editing-text]').data('offerta-editing-text');
			$('[data-offerta-editing-text]').data('offerta-editing-text', ct).text(nt);

			$(this).data('active', !$(this).data('active'));
		});
	}

};

$(Off.init);