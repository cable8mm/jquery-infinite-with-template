jQuery Infinite With Template Plugin
======================

JQuery plugin for ajax-enabled infinite page scroll with template.

If you like Laravel and jQuery until now, this little library will help.

## Demo

For convinient Laravel Valet need:

```bash
cd ~/Sites
git clone https://github.com/cable8mm/jquery-infinite-with-template.git
```

and visit https://jquery-infinite-with-template.test

## Usage sample

Javascript part:

```Javascript
$("#result").infiniteTemplate({
	templateSelector: "#test-tmpl",
	dataPath: "data_sources.php",
	query: "word=ajax",
	templateHelpers: {
		authId : 354
	}
});
```

HTML part:

```html
<div id="result"></div>

<script id="test-tmpl" type="text/x-jsrender">
	<p>{{:id}}. {{:title}} [user:{{:authId}}]</p>
</script>
```

AJAX part: `data_sources.php`. This should return Ajax:

```javascript
{
	"data": [
	{
		"id": 885,
		"title": "iGFIJUSPp8oXoBDqoRXKK0VEAU0IBG(word=ajax)"
	},
	{
		"id": 277,
		"title": "HM3iPLDwd3nQKNH5eOkaOh5QlSb92F(word=ajax)"
	},
	{
		"id": 583,
		"title": "O2X0VQeWFGIRQPcVquYwHx49VNhwX3(word=ajax)"
	},
...even more rows
}
```

Result:

```html
<div id="result">
	<p>885. iGFIJUSPp8oXoBDqoRXKK0VEAU0IBG(word=ajax) [user:354]</p>
	<p>277. HM3iPLDwd3nQKNH5eOkaOh5QlSb92F(word=ajax) [user:354]</p>
	<p>583. O2X0VQeWFGIRQPcVquYwHx49VNhwX3(word=ajax) [user:354]</p>
	<p>179. vrEwi7hgVucCEDmuO7pOf4Gzk4gmyh(word=ajax) [user:354]</p>
	<p>380. yviF2uDLyySLZaAPs3bKNbSZfHeQA7(word=ajax) [user:354]</p>
	<p>329. 865t05x9DMngrETccBuqrY7ts9Xt3R(word=ajax) [user:354]</p>
	<p>84. D6mhKuRA06ONCE5HbswSwPjZvp0bUh(word=ajax) [user:354]</p>
	<p>528. saWL46OBtTDGIBuZL9TkmfBvPXiRqM(word=ajax) [user:354]</p>
	<p>522. PBe0jjP1Egy6NWpHzuA86JHupxNGvc(word=ajax) [user:354]</p>
	<p>115. vBmfL7osq2VAKIktVznrC6QZzYpc1H(word=ajax) [user:354]</p>
	<p>722. mti7aMut4TxAygKAdfGylml9QgJoDN(word=ajax) [user:354]</p>
	<p>401. 06kgapSQylxWJOvFmDNLIcvpSPMB7V(word=ajax) [user:354]</p>
	<p>245. UD0TP3bMU7J4mAlGqwo52F1I0rJIyR(word=ajax) [user:354]</p>
	<p>985. 3xSyr0m68K3Ec6y8vJgIhYgSfgcGnG(word=ajax) [user:354]</p>
	<p>78. DWpWRzx1x4Ibfh1Gn0Lk0F3aufu34d(word=ajax) [user:354]</p>
	<p>573. iINBTozeMIeZguTU6lLB9j76zNZ4AK(word=ajax) [user:354]</p>
	<p>946. OEuUblddtI9vqlyL89nDXizhvryn4e(word=ajax) [user:354]</p>
	<p>756. wsBL8dxDf6UjTiNWNnnX4XAlAonHBM(word=ajax) [user:354]</p>
	<p>66. q3irGi5lNUXccTDTDfl2jRlzVp04uk(word=ajax) [user:354]</p>
	<p>20. vcq8sKN4RhCEoFLVW2vbX2eR14EKp8(word=ajax) [user:354]</p>
</div>
```

## Options

**templateSelector** - jsRender template identify

**templateHelpers** - Merge with json to load

**dataPath** - URL to load more data via AJAX

**query** - Additional query
