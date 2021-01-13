/**
 * Your plugin name and a small description
 * Author: Sam Lee (https://github.com/cable8mm)
 * Version: 1.0.0
 */

(function ($) {
  $.fn.infiniteTemplate = function (settings) {
    var $this = $(this);
    if (!$this.length) {
      return $this;
    }

    var opts = $.extend({}, $.fn.infiniteTemplate.defaults, settings);

    var currentScrollPage = 0;
    var scrollTriggered = false;

    $(window).on("scroll", function () {
      if (
        $(this).scrollTop() >
        $(document.body).height() - $(this).height() * 2
      ) {
        triggerDataLoad();
      }
    });

    function triggerDataLoad() {
      if (scrollTriggered) {
        return;
      }

      scrollTriggered = true;

      var tmpl = $.templates(opts.templateSelector);

      var query = opts.query ? "&" + opts.query : "";

      $.get(
        opts.dataPath + "?page=" + currentScrollPage + query,
        function (result) {
          if (result) {
            $.each(result["data"], function (_, item) {
              var html = tmpl.render(item);
              $(html).appendTo($this);
            });
          }

          currentScrollPage += 1;
          scrollTriggered = false;
        }
      );
    }

    triggerDataLoad();

    return this;
  };

  // plugin defaults - added as a property on our plugin function
  $.fn.infiniteTemplate.defaults = {
    dataPath: null,
    templateSelector: null,
    query: null,
  };
})(jQuery);
