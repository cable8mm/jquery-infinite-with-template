jQuery Infinite With Template Plugin
======================

JQuery plugin for ajax-enabled infinite page scroll with template.

If you like jQuery until now, this little library will help.

## Demo

For convinient `http-server` need:

```bash
git clone https://github.com/cable8mm/jquery-infinite-with-template

cd jquery-infinite-with-template

http-server .
```

and visit http://127.0.0.1:8080/examples/

If you are not installed `http-server`, refer to https://www.npmjs.com/package/http-server

You can regenerate data_sources:

```bash
# permission required
./examples/generate > data_sources.ajax
```

## Usage sample

Javascript part:

```Javascript
$("#result").infiniteTemplate({
	templateSelector: "#test-tmpl",
	dataPath: "data_sources.ajax",
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

AJAX part: `data_sources.ajax`. This should return Ajax:

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

**templateSelector** - (required) jsRender template identify

**dataPath** - (required) URL to load more data via AJAX

**templateHelpers** - (optional) Merge with json to load

**query** - (optional) Additional query

**method** - (optional) GET(default), POST, PUT, DELETE

**loadAtStart** - (optional) true(default), false

**loadSelector** - (optional) if it set, it load more data every time the selector clicked

**initialPage** - (optional) 1(default)

**preventCache** - (optional) false(default) if true, Add timestamp

## Examples

```html
// https://m.holapet.com/adoption

<x-adoption.rounded-card-list :selector="'adoption-rounded-card-list'">
    @foreach($adoptions as $item)
    <x-adoption.rounded-card :item="$item" />
    @endforeach
</x-adoption.rounded-card-list>
<x-adoption.rounded-card-tmpl />
<script>
    $("#adoption-rounded-card-list").infiniteTemplate({
        templateSelector: "#adoption-rounded-card-tmpl",
        dataPath: "/api/adoption",
        initialPage: 3,
    });
</script>
```

```html
// https://m.holapet.com/place/pensions/region/1

<x-place.rounded-card-list :selector="'place-rounded-card-list'">
    @foreach($region->placesRecent as $item)
    <x-place.rounded-card :item="$item" />
    @endforeach
</x-place.rounded-card-list>
<x-place.rounded-card-tmpl />
<script>
    $("#place-rounded-card-list").infiniteTemplate({
        templateSelector: "#place-rounded-card-tmpl",
        dataPath: "/api/place/pensions/region/{{ $region->id }}",
        initialPage: 3,
        templateHelpers: {
            minColumnCount: 1
        }
    });
</script>
```

```html
// https://m.holapet.com/search/show?word=%ED%8F%AC%EB%A9%94%EB%9D%BC%EB%8B%88%EC%95%88

@include('shared.jtemplate.search-user')

@auth
<script>
    $("#user-list").infiniteTemplate({
        templateSelector: "#user-tmpl",
        dataPath: "/api/user",
        query: "word={{ $word }}",
        templateHelpers: {
            authId : {{ Auth::id() ?? 0 }},
            followeeIds: {!! Auth::user()->followee_ids->toJson() ?? 'false' !!}
        }
    });
</script>
@endauth
@guest
<script>
    $("#user-list").infiniteTemplate({
        templateSelector: "#user-tmpl",
        dataPath: "/api/user",
        query: "word={{ $word }}",
    });
</script>
@endguest
```

```html
// https://m.holapet.com/story/hot

@if(!empty($hotStories))
<x-story.grid-card-list :selector="'story-grid-card-list'">
    @foreach($hotStories as $item)
    <x-story.grid-card :item="$item" />
    @endforeach
</x-story.grid-card-list>
@endif
<x-story.grid-card-tmpl />
<script>
    $("#story-grid-card-list").infiniteTemplate({
        templateSelector: "#story-grid-card-tmpl",
        dataPath: "/api/story/hot",
        initialPage: 3,
    });
</script>
```