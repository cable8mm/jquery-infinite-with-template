// Mock jQuery and jsRender for testing
global.jQuery = require("jquery");
global.$ = global.jQuery;

// Use actual jsrender
const jsrender = require("jsrender");
global.jsrender = jsrender;
global.$.templates = jsrender.templates;

// Mock window.location
Object.defineProperty(window, "location", {
  value: {
    origin: "http://localhost:8080",
  },
  writable: true,
});
