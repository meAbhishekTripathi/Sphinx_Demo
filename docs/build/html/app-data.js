
(function() {
  var sizzle = $(document).data('sizzle');

  sizzle.app_data = JSON.parse('{"glossary": {"document": null, "terms": {}}, "custom_data": {}}');
})();

(function () {
  ("[data-toggle='rst-debug-badge']").on("click", function () {
    ("[data-toggle='rst-versions']").toggleClass("rst-badge");
  });
})
