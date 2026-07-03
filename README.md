# ⚡ jQuery Infinite With Template Plugin

[![NPM Version](https://img.shields.io/npm/v/%40cable8mm%2Fjquery-infinite-with-template)](https://www.npmjs.com/package/@cable8mm/jquery-infinite-with-template)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/%40cable8mm%2Fjquery-infinite-with-template)](https://bundlephobia.com/package/@cable8mm/jquery-infinite-with-template)
[![NPM Downloads](https://img.shields.io/npm/dt/%40cable8mm%2Fjquery-infinite-with-template)](https://www.npmjs.com/package/@cable8mm/jquery-infinite-with-template)
[![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hy/%40cable8mm%2Fjquery-infinite-with-template)](https://www.jsdelivr.com/package/npm/@cable8mm/jquery-infinite-with-template)
[![NPM Type Definitions](https://img.shields.io/npm/types/%40cable8mm%2Fjquery-infinite-with-template)](https://www.npmjs.com/package/@cable8mm/jquery-infinite-with-template)
[![NPM License](https://img.shields.io/npm/l/%40cable8mm%2Fjquery-infinite-with-template)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/cable8mm/jquery-infinite-with-template)](https://github.com/cable8mm/jquery-infinite-with-template)
[![GitHub issues](https://img.shields.io/github/issues/cable8mm/jquery-infinite-with-template)](https://github.com/cable8mm/jquery-infinite-with-template/issues)

> 🚀 **AJAX-powered infinite scroll with template rendering for jQuery**

If you like jQuery until now, this little library will help you implement infinite scroll with ease.

## ✨ Features

- ⚡ **Zero Dependencies** (except jQuery & jsRender)
- 🎨 **Template Rendering** with jsRender
- 🔄 **Dual Loading Modes** - Scroll or Click
- 🎯 **TypeScript Support** out of the box
- 🛡️ **Error Handling** with callbacks
- ⚙️ **Highly Configurable** with 12+ options
- 🚀 **Performance Optimized** with DocumentFragment
- 📦 **Lightweight** - Only ~3KB minified
- ✅ **Well Tested** - 16 unit tests included

## 📦 Installation

### npm

```sh
npm i @cable8mm/jquery-infinite-with-template
```

### CDN

```html
<script
  src="https://cdn.jsdelivr.net/npm/@cable8mm/jquery-infinite-with-template@1.0.4/jquery.infiniteScrollWithTemplate.min.js"
  integrity="sha256-bX3iyCp0T50YmDRgpUl1tY/LGlpPGsKR4TqUkpcq6WA="
  crossorigin="anonymous"
></script>
```

### ESM

```html
<script type="module">
  import @cable8mm/jquery-infinite-with-template from https://cdn.jsdelivr.net/npm/@cable8mm/jquery-infinite-with-template@1.0.4/+esm
</script>
```

## 🎬 Demo

### Online Demo

You can test the plugin directly in your browser:

👉 **[https://www.palgle.com/jquery-infinite-with-template/examples/index.html](https://www.palgle.com/jquery-infinite-with-template/examples/index.html)**

### Quick Start

#### Using npm run dev (Recommended)

```bash
# Install dependencies (one-time)
npm install

# Run development server with auto-open
npm run dev
```

**Note:** This will start the server at `http://127.0.0.1:8080/examples/index.html` and automatically open it in your browser.

Visit [http://127.0.0.1:8080/examples/index.html](http://127.0.0.1:8080/examples/index.html) in your browser.

### Regenerate Demo Data

```bash
# Using PHP CLI
php examples/generate > examples/data_sources.json

# Or if you have the generate script in examples directory
cd examples
php generate > data_sources.json
```

## 🚀 Usage

### Basic Example

**HTML:**

```html
<div id="result"></div>

<script id="test-tmpl" type="text/x-jsrender">
  <div class="item">
    <h3>{{:title}}</h3>
    <p>ID: {{:id}}</p>
  </div>
</script>
```

**JavaScript:**

```javascript
$("#result").infiniteTemplate({
  templateSelector: "#test-tmpl",
  dataPath: "/api/posts",
  query: "category=tech",
  templateHelpers: {
    userId: 123,
  },
  zeroCallback: function () {
    console.log("No more posts!");
  },
});
```

**Server Response (JSON):**

```json
{
  "data": [
    {
      "id": 1,
      "title": "Getting Started with jQuery",
      "content": "..."
    },
    {
      "id": 2,
      "title": "Advanced JavaScript Patterns",
      "content": "..."
    }
  ]
}
```

### Click-to-Load Button

```javascript
$("#result").infiniteTemplate({
  templateSelector: "#item-template",
  dataPath: "/api/items",
  loadSelector: "#load-more-btn", // Click this button to load more
  loadAtStart: false, // Don't load automatically
});
```

### With Error Handling

```javascript
$("#result").infiniteTemplate({
  templateSelector: "#item-template",
  dataPath: "/api/items",
  errorCallback: function (error) {
    console.error("Failed to load:", error);
    alert("Something went wrong. Please try again.");
  },
  loadingCallback: function () {
    $("#loading").show();
  },
  loadedCallback: function () {
    $("#loading").hide();
  },
});
```

## 📋 Options

| Option               | Type       | Default      | Description                                                  |
| -------------------- | ---------- | ------------ | ------------------------------------------------------------ |
| **templateSelector** | `string`   | **required** | jsRender template selector (e.g., `"#my-template"`)          |
| **dataPath**         | `string`   | **required** | URL to load data via AJAX                                    |
| **key**              | `string`   | `"data"`     | Key for data array in JSON response                          |
| **query**            | `string`   | `null`       | Additional query parameters (e.g., `"category=1&sort=date"`) |
| **method**           | `string`   | `"GET"`      | HTTP method (GET, POST, PUT, DELETE)                         |
| **templateHelpers**  | `object`   | `null`       | Helper data merged with each item                            |
| **loadAtStart**      | `boolean`  | `true`       | Load data on initialization                                  |
| **loadSelector**     | `string`   | `null`       | CSS selector for click-to-load button                        |
| **initialPage**      | `number`   | `1`          | Initial page number                                          |
| **preventCache**     | `boolean`  | `false`      | Add timestamp to prevent caching                             |
| **scrollThreshold**  | `number`   | `2`          | Multiplier for viewport height (lower = more sensitive)      |
| **zeroCallback**     | `function` | `null`       | Called when no data returned on first page                   |
| **errorCallback**    | `function` | `null`       | Called on AJAX or JSON parse error                           |
| **loadingCallback**  | `function` | `null`       | Called when loading starts                                   |
| **loadedCallback**   | `function` | `null`       | Called when loading completes (success or error)             |

## 🎯 Real-World Examples

### Example 1: Blog Posts with Pagination

```javascript
$("#post-list").infiniteTemplate({
  templateSelector: "#post-template",
  dataPath: "/api/posts",
  query: "status=published",
  initialPage: 1,
  scrollThreshold: 1.5,
  templateHelpers: {
    currentUser: window.currentUser,
  },
  loadingCallback: () => $("#spinner").show(),
  loadedCallback: () => $("#spinner").hide(),
  zeroCallback: () => $("#end-message").show(),
});
```

### Example 2: E-commerce Product Grid

```javascript
$("#product-grid").infiniteTemplate({
  templateSelector: "#product-card",
  dataPath: "/api/products",
  query: "category=electronics&sort=price",
  loadSelector: "#load-more-products",
  loadAtStart: true,
  templateHelpers: {
    currency: "$",
    discountRate: 0.1,
  },
});
```

### Example 3: Social Media Feed

```javascript
$("#feed").infiniteTemplate({
  templateSelector: "#feed-item",
  dataPath: "/api/feed",
  method: "POST",
  query: "filter=following",
  initialPage: 3,
  preventCache: true,
  templateHelpers: {
    currentUserId: Auth.id(),
    likedPosts: Auth.likedPosts(),
  },
});
```

### Example 4: Search Results

```javascript
$("#search-results").infiniteTemplate({
  templateSelector: "#result-item",
  dataPath: "/api/search",
  query: `q=${encodeURIComponent(searchQuery)}`,
  zeroCallback: () => {
    $("#no-results").show();
  },
  errorCallback: (error) => {
    console.error("Search failed:", error);
  },
});
```

## 🏗️ Project Structure

```text
jquery-infinite-with-template/
├── jquery.infiniteScrollWithTemplate.js  # Main plugin (unminified)
├── jquery.infiniteScrollWithTemplate.min.js  # Minified version
├── jquery.infiniteScrollWithTemplate.d.ts  # TypeScript definitions
├── package.json
├── README.md
├── LICENSE
├── examples/
│   ├── index.html          # Demo page
│   ├── data_sources.json   # Demo data
│   └── generate            # Data generator script
└── tests/
    ├── setup.js            # Test configuration
    └── jquery.infiniteScrollWithTemplate.test.js  # 16 unit tests
```

## 🧪 Testing

```bash
# Install dependencies
npm install

# Run tests
npm test
```

**Test Coverage:**

- ✅ Initialization & validation
- ✅ Data loading & rendering
- ✅ Callbacks (zero, error, loading, loaded)
- ✅ Scroll & click loading modes
- ✅ URL building & pagination
- ✅ Edge cases (empty data, JSON parsing)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

- **jsRender** - Template engine
- **jQuery** - DOM manipulation

## 💡 Tips for Getting Stars

- ⭐ Star this repo if you find it useful!
- 🐛 Report bugs and request features
- 📢 Share with your developer friends
- 💬 Leave feedback and suggestions

## 🔗 Links

- **GitHub**: [https://github.com/cable8mm/jquery-infinite-with-template](https://github.com/cable8mm/jquery-infinite-with-template)
- **NPM**: [https://www.npmjs.com/package/@cable8mm/jquery-infinite-with-template](https://www.npmjs.com/package/@cable8mm/jquery-infinite-with-template)
- **Issues**: [https://github.com/cable8mm/jquery-infinite-with-template/issues](https://github.com/cable8mm/jquery-infinite-with-template/issues)

---

**Made with ❤️ by [Sam Lee](https://github.com/cable8mm)**

If this project helped you, please give it a ⭐️!
