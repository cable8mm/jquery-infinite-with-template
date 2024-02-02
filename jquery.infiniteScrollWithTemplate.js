/**
 * jQuery Infinite With Template Plugin
 * JQuery plugin for ajax-enabled infinite page scroll with template.
 *
 * Author: Sam Lee (https://github.com/cable8mm)
 * Version: 1.0.4
 */

(function ($) {
  $.fn.infiniteTemplate = function (settings) {
    var $this = $(this);
    if (!$this.length) {
      return $this;
    }

    var opts = $.extend({}, $.fn.infiniteTemplate.defaults, settings);

    var currentScrollPage = opts.initialPage;
    var scrollTriggered = false;
    var isFinished = false;

    if (opts.loadSelector) {
      $(document).on("click", opts.loadSelector, function () {
        triggerDataLoad();
      });
    } else {
      $(window).on("scroll", function () {
        if (
          $(this).scrollTop() >
            $(document.body).height() - $(this).height() * 2 &&
          !isFinished
        ) {
          triggerDataLoad();
        }
      });
    }

    function triggerDataLoad() {
      if (scrollTriggered || isFinished) {
        return;
      }

      scrollTriggered = true;

      var tmpl = $.templates(opts.templateSelector);

      var query = opts.query ? "&" + opts.query : "";

      var timestamp = opts.preventCache ? "&t=" + new Date().getTime() : "";

      $.ajax({
        url: opts.dataPath + "?page=" + currentScrollPage + query + timestamp,
        method: opts.method,
        success: function (result) {
          if (typeof result === "string") {
            result = JSON.parse(result);
          }

          if (result) {
            if (result[opts.key].length == 0) {
              isFinished = true;

              // if zero, call zeroCallback
              console.log(currentScrollPage + " " + opts.zeroCallback);
              if (
                currentScrollPage == 1 &&
                typeof opts.zeroCallback === "function"
              ) {
                opts.zeroCallback();
              }
            } else {
              $.each(result[opts.key], function (_, item) {
                if (opts.templateHelpers) {
                  item = Object.assign(item, opts.templateHelpers);
                }

                var html = tmpl.render(item);
                $(html).appendTo($this);
              });

              currentScrollPage += 1;
            }
          }

          scrollTriggered = false;
        },
      });
    }

    if (opts.loadAtStart) {
      triggerDataLoad();
    }

    return this;
  };

  // plugin defaults - added as a property on our plugin function
  $.fn.infiniteTemplate.defaults = {
    dataPath: null,
    templateSelector: null,
    query: null,
    key: "data",
    method: "GET",
    templateHelpers: null,
    loadAtStart: true,
    loadSelector: null,
    initialPage: 1,
    preventCache: false,
    zeroCallback: null,
  };
})(jQuery);
