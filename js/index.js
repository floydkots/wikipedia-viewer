$(document).ready(function(){
  $("#search").keyup(function(){
    if ($(this).val() == ''){
      $("#go").prop('disabled', true);
    } else {
      $("#go").prop('disabled', false);
    }
  })
  
  $("#go").click(function(){
    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php',
      data: {action: 'opensearch',
            search: $("#search").val(), format: 'json'},
      dataType: 'jsonp',
      success: function(results){
        console.log("Results", results)
        showResults(results);
      }
    })
  })
  
  function showResults(results){
    var resultsHtml = "";
    if (results[1].length > 0){
      for (var i = 0; i < results[1].length; i++){
      resultsHtml += '<a href="'+results[3][i]+'"target="_blank" class="list-group-item list-group-item-action flex-column align-items-start">' +
        '<div class="d-flex w-100 justify-content-between">' +
          '<h5 class="mb-1"><strong>'+results[1][i]+'</strong><\/h5>' +
        '<\/div>' +
        '<p class="mb-1">'+results[2][i]+'<\/p>' +
      '<\/a>'
    }
    
    $("#resultsGroup").html(resultsHtml);
    } else {
      $("#resultsGroup").html("<h3><strong>No results found for the search term \""+ results[0] +"\"</strong></h3>");
    }
    

  }
});