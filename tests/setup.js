// Mock jQuery and jsRender for testing
global.jQuery = require("jquery");
global.$ = global.jQuery;

// Use actual jsrender
const jsrender = require("jsrender");
global.jsrender = jsrender;
global.$.templates = jsrender.templates;

// Mock window.location
// In newer jsdom (Jest 30+), window.location is a non-configurable
// accessor property on Window.prototype, so Object.defineProperty fails.
// We use delete + assignment instead. This triggers jsdom's navigation
// setter (which logs a harmless "not implemented" warning), so we
// temporarily suppress console.error during the assignment.
var originalConsoleError = console.error;
console.error = function () {};
delete window.location;
window.location = {
  origin: "http://localhost:8080",
  href: "http://localhost:8080/",
};
console.error = originalConsoleError;
