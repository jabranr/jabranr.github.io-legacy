(function(root, doc, $) {

  var app = {},
      init = function() {
        // $.getJSON('https://api.github.com/users/jabranr/repos',
        //   function(repos) {
        //     if ( repos && !repos.error ) {
        //       var ul = $('<ul />', { 'class': 'list-unstyled' }).appendTo( $('.section-project') );
        //       repos.map(function(repo) {
        //         if ( ! repo.fork ) {
        //           var li = $('<li />', {
        //             'id': 'repo-' + repo.id,
        //             'html': repo.name
        //           }).prependTo(ul);

        //           $('<p />', {
        //             'html': repo.description
        //           }).appendTo(li);
        //         }
        //       });
        //     }
        //   },
        //   function(xhr, error) {
        //     console.log(error);
        //   });
      };

  app.VERSION = '2.0.0';

  // Export global object
  root.jabranr = root.jabranr || app;

  // Run global
  $(doc).ready(init);

})(this, document, jQuery);