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

    // Validate required options
    if (!opts.templateSelector) {
      console.error("infiniteTemplate: templateSelector is required");
      return $this;
    }

    if (!opts.dataPath) {
      console.error("infiniteTemplate: dataPath is required");
      return $this;
    }

    var currentScrollPage = opts.initialPage;
    var scrollTriggered = false;
    var isFinished = false;
    var namespace =
      ".infiniteTemplate_" + Math.random().toString(36).substr(2, 9);

    if (opts.loadSelector) {
      $(document).on("click" + namespace, opts.loadSelector, function () {
        triggerDataLoad();
      });
    } else {
      $(window).on("scroll" + namespace, function () {
        if (
          $(this).scrollTop() >
            $(document.body).height() -
              $(window).height() * (opts.scrollThreshold || 2) &&
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

      if (typeof opts.loadingCallback === "function") {
        opts.loadingCallback();
      }

      var tmpl = $.templates(opts.templateSelector);

      var url = buildUrl(opts.dataPath, currentScrollPage);

      $.ajax({
        url: url,
        method: opts.method,
        success: function (result) {
          if (typeof result === "string") {
            try {
              result = JSON.parse(result);
            } catch (e) {
              console.error("JSON parse error:", e);
              scrollTriggered = false;
              if (typeof opts.errorCallback === "function") {
                opts.errorCallback(e);
              }
              return;
            }
          }

          if (result) {
            if (result[opts.key].length == 0) {
              isFinished = true;

              // if zero, call zeroCallback
              if (
                currentScrollPage == 1 &&
                typeof opts.zeroCallback === "function"
              ) {
                opts.zeroCallback();
              }
            } else {
              var htmlContent = "";

              $.each(result[opts.key], function (_, item) {
                if (opts.templateHelpers) {
                  item = Object.assign(item, opts.templateHelpers);
                }

                var html = tmpl.render(item);
                htmlContent += html;
              });

              $this.append(htmlContent);

              currentScrollPage += 1;
            }
          }

          scrollTriggered = false;
        },
        error: function (xhr, status, error) {
          scrollTriggered = false;
          console.error("AJAX error:", status, error);
          if (typeof opts.errorCallback === "function") {
            opts.errorCallback(error);
          }
        },
        complete: function () {
          if (typeof opts.loadedCallback === "function") {
            opts.loadedCallback();
          }
        },
      });
    }

    function buildUrl(baseUrl, page) {
      var url = new URL(baseUrl, window.location.origin);
      url.searchParams.set("page", page);

      if (opts.query) {
        var queryParams = opts.query.split("&");
        $.each(queryParams, function (_, param) {
          var keyValue = param.split("=");
          if (keyValue.length === 2) {
            url.searchParams.set(keyValue[0], keyValue[1]);
          }
        });
      }

      if (opts.preventCache) {
        url.searchParams.set("t", new Date().getTime());
      }

      return url.toString();
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
    errorCallback: null,
    loadingCallback: null,
    loadedCallback: null,
    scrollThreshold: 2,
  };
})(jQuery);
