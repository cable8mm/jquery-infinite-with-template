<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Jquery Infinite Scroll With Template</title>
    <!-- Load jQuery -->
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>

    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/jsrender/1.0.10/jsrender.min.js"
      integrity="sha512-7yQAIBjexgysvXcuKPFsm6+wy+Mm6gWz/ZIRnuMDgDqUPEn3SyYGg/qxDdHeNpFU/4PgdKTeHscYjgKIumqsYg=="
      crossorigin="anonymous"
    ></script>

    <!-- Load InfiniteScrollWithTemplate -->
    <script src="js/jquery.infiniteScrollWithTemplate.js"></script>
  </head>

  <body>
    <script>
      $(function () {
        $("#result").infiniteTemplate({
          templateSelector: "#test-tmpl",
          dataPath: "data_sources.php",
          query: "word=ajax",
        });
      });
    </script>
    <div id="result"></div>

    <script id="test-tmpl" type="text/x-jsrender">
      <p>{{:id}}. {{:title}}</p>
    </script>
  </body>
</html>
