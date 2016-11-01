(function ($) {
  'use strict';

  var defaults = {};

  function Sidenav (element, options) {
    this.$el = $(element);
    this.opt = $.extend(true, {}, defaults, options);

    this.init(this);
  }

  Sidenav.prototype = {
    init: function (self) {
      self.initToggle(self);
      self.initDropdown(self);
    },

    initToggle: function (self) {
      $(document).on('click', function (e) {
        var $target = $(e.target);

        if ($target.closest(self.$el.data('sidenav-toggle'))[0]) {
          self.$el.toggleClass('show');
          $('body').toggleClass('sidenav-no-scroll');

          self.toggleOverlay();

        } else if (!$target.closest(self.$el)[0]){
          self.$el.removeClass('show');
          $('body').removeClass('sidenav-no-scroll');

          self.hideOverlay();
        }
      });
    },

    initDropdown: function (self) {
      self.$el.on('click', '[data-sidenav-dropdown-toggle]', function (e) {
        var $this = $(this);

        $this
          .next('[data-sidenav-dropdown]')
          .slideToggle('fast');

        $this
          .find('[data-sidenav-dropdown-icon]')
          .toggleClass('show');

        e.preventDefault();
      });
    },

    toggleOverlay: function () {
      var $overlay = $('[data-sidenav-overlay]');

      if (!$overlay[0]) {
        $overlay = $('<div data-sidenav-overlay class="sidenav-overlay"/>');
        $('body').append($overlay);
      }

      $overlay.fadeToggle('fast');
    },

    hideOverlay: function () {
      $('[data-sidenav-overlay]').fadeOut('fast');
    }
  };

  $.fn.sidenav = function (options) {
    return this.each(function() {
      if (!$.data(this, 'sidenav')) {
        $.data(this, 'sidenav', new Sidenav(this, options));
      }
    });
  };
})(window.jQuery);
