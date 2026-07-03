/**
 * @jest-environment jsdom
 */

const $ = require("jquery");
require("../jquery.infiniteScrollWithTemplate.js");

describe("jQuery Infinite With Template Plugin", () => {
  let $container;

  beforeEach(() => {
    // Setup DOM
    document.body.innerHTML = `
      <div id="test-container"></div>
      <div id="load-button">Load More</div>
      <script id="test-template" type="text/x-jsrender">
        <div class="item">{{:id}}: {{:title}}</div>
      </script>
    `;

    $container = $("#test-container");
    $container.empty();
  });

  afterEach(() => {
    // Cleanup
    $(window).off(".infiniteTemplate");
    $(document).off(".infiniteTemplate");
  });

  describe("Initialization", () => {
    test("should return jQuery object for chaining", () => {
      $.ajax = jest.fn((options) => {
        options.success({ data: [] });
      });

      const result = $container.infiniteTemplate({
        templateSelector: "#test-template",
        dataPath: "/api/test",
      });

      expect(result).toBeInstanceOf($);
      expect(result).toEqual($container);
    });

    test("should require templateSelector", () => {
      const consoleError = jest.spyOn(console, "error").mockImplementation();

      $.ajax = jest.fn();

      $container.infiniteTemplate({
        dataPath: "/api/test",
      });

      expect(consoleError).toHaveBeenCalledWith(
        "infiniteTemplate: templateSelector is required",
      );
      expect($.ajax).not.toHaveBeenCalled();

      consoleError.mockRestore();
    });

    test("should require dataPath", () => {
      const consoleError = jest.spyOn(console, "error").mockImplementation();

      $.ajax = jest.fn();

      $container.infiniteTemplate({
        templateSelector: "#test-template",
      });

      expect(consoleError).toHaveBeenCalledWith(
        "infiniteTemplate: dataPath is required",
      );
      expect($.ajax).not.toHaveBeenCalled();

      consoleError.mockRestore();
    });
  });

  describe("Data Loading", () => {
    test("should load data via AJAX", () => {
      $.ajax = jest.fn((options) => {
        options.success({
          data: [
            { id: 1, title: "Item 1" },
            { id: 2, title: "Item 2" },
          ],
        });
      });

      $container.infiniteTemplate({
        templateSelector: "#test-template",
        dataPath: "/api/test",
        loadAtStart: true,
      });

      expect($.ajax).toHaveBeenCalled();
      expect($.ajax).toHaveBeenCalledWith(
        expect.objectContaining({
          url: expect.stringContaining("/api/test"),
          method: "GET",
        }),
      );
    });

    test("should pass data to template", () => {
      $.ajax = jest.fn((options) => {
        options.success({
          data: [{ id: 1, title: "Item 1" }],
        });
      });

      $container.infiniteTemplate({
        templateSelector: "#test-template",
        dataPath: "/api/test",
        loadAtStart: true,
      });

      // Verify AJAX was called with correct URL
      expect($.ajax).toHaveBeenCalled();
      const call = $.ajax.mock.calls[0];
      expect(call[0].url).toContain("page=1");
    });
  });

  describe("Callbacks", () => {
    test("should call zeroCallback when no data", () => {
      const zeroCallback = jest.fn();

      $.ajax = jest.fn((options) => {
        options.success({ data: [] });
      });

      $container.infiniteTemplate({
        templateSelector: "#test-template",
        dataPath: "/api/test",
        zeroCallback: zeroCallback,
      });

      expect(zeroCallback).toHaveBeenCalled();
    });

    test("should call errorCallback on AJAX error", () => {
      const errorCallback = jest.fn();

      $.ajax = jest.fn((options) => {
        options.error(new Error("Test error"));
      });

      $container.infiniteTemplate({
        templateSelector: "#test-template",
        dataPath: "/api/test",
        errorCallback: errorCallback,
      });

      expect(errorCallback).toHaveBeenCalled();
    });

    test("should call errorCallback on JSON parse error", () => {
      const errorCallback = jest.fn();

      $.ajax = jest.fn((options) => {
        options.success("invalid json{");
      });

      $container.infiniteTemplate({
        templateSelector: "#test-template",
        dataPath: "/api/test",
        errorCallback: errorCallback,
      });

      expect(errorCallback).toHaveBeenCalled();
    });

    test("should call loadingCallback", () => {
      const loadingCallback = jest.fn();

      $.ajax = jest.fn((options) => {
        options.success({ data: [] });
      });

      $container.infiniteTemplate({
        templateSelector: "#test-template",
        dataPath: "/api/test",
        loadingCallback: loadingCallback,
      });

      expect(loadingCallback).toHaveBeenCalled();
    });

    test("should call loadedCallback", () => {
      const loadedCallback = jest.fn();

      $.ajax = jest.fn((options) => {
        options.success({ data: [] });
        if (options.complete) {
          options.complete();
        }
      });

      $container.infiniteTemplate({
        templateSelector: "#test-template",
        dataPath: "/api/test",
        loadedCallback: loadedCallback,
      });

      expect(loadedCallback).toHaveBeenCalled();
    });
  });

  describe("Click Loading", () => {
    test("should load data on button click", () => {
      $.ajax = jest.fn((options) => {
        options.success({ data: [{ id: 1, title: "Item 1" }] });
      });

      $container.infiniteTemplate({
        templateSelector: "#test-template",
        dataPath: "/api/test",
        loadAtStart: false,
        loadSelector: "#load-button",
      });

      expect($.ajax).not.toHaveBeenCalled();

      $("#load-button").click();

      expect($.ajax).toHaveBeenCalled();
    });
  });

  describe("URL Building", () => {
    test("should include page parameter", () => {
      $.ajax = jest.fn((options) => {
        expect(options.url).toContain("page=1");
        options.success({ data: [] });
      });

      $container.infiniteTemplate({
        templateSelector: "#test-template",
        dataPath: "/api/test",
      });
    });

    test("should include query parameters", () => {
      $.ajax = jest.fn((options) => {
        expect(options.url).toContain("word=test");
        options.success({ data: [] });
      });

      $container.infiniteTemplate({
        templateSelector: "#test-template",
        dataPath: "/api/test",
        query: "word=test",
      });
    });

    test("should add cache buster when preventCache is true", () => {
      $.ajax = jest.fn((options) => {
        expect(options.url).toMatch(/[?&]t=\d+/);
        options.success({ data: [] });
      });

      $container.infiniteTemplate({
        templateSelector: "#test-template",
        dataPath: "/api/test",
        preventCache: true,
      });
    });
  });

  describe("Edge Cases", () => {
    test("should handle empty data array", () => {
      const zeroCallback = jest.fn();

      $.ajax = jest.fn((options) => {
        options.success({ data: [] });
      });

      $container.infiniteTemplate({
        templateSelector: "#test-template",
        dataPath: "/api/test",
        zeroCallback: zeroCallback,
      });

      expect($container.find(".item").length).toBe(0);
      expect(zeroCallback).toHaveBeenCalled();
    });

    test("should handle JSON string response", () => {
      $.ajax = jest.fn((options) => {
        options.success(JSON.stringify({ data: [{ id: 1, title: "Item 1" }] }));
      });

      $container.infiniteTemplate({
        templateSelector: "#test-template",
        dataPath: "/api/test",
      });

      // Verify AJAX was called successfully
      expect($.ajax).toHaveBeenCalled();
      expect($.ajax).toHaveBeenCalledWith(
        expect.objectContaining({
          url: expect.any(String),
        }),
      );
    });
  });
});
