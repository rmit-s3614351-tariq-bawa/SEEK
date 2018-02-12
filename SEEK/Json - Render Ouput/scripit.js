/* global $ */
/* global output */
let config = {};
// This loads the config and parses it to JSON
// so that the script can adopt the new config changes
$.ajax({
  dataType: "json",
  url: 'http://localhost/workspace/config.json',
  success: (res) => {
    //   Once the config comes back, fetch resuls
      config = res;
      fetchResults()
  },
});

// Fetches the results for a query from the API
// calls the filterAndRender function to filter the results according to
// the keywords given
function fetchResults() {
    var ajaxhttp = new XMLHttpRequest();
    var url = "example.json";
    
    ajaxhttp.open("GET", url, true);
    ajaxhttp.setRequestHeader("content-type", "application/json");
    ajaxhttp.onreadystatechange = function () {
        if(ajaxhttp.readyState == 4 && ajaxhttp.status == 200){
            var jcontent = JSON.parse(ajaxhttp.response);
            filterAndRender(jcontent);
        }
    };
    ajaxhttp.send(null);   
}

function filterAndRender(jcontent) {
    // Retrieves the keywords from query string : 2 is for '?' and '='
    let offset = config.keywordSearch.length+2;
    let queryString = window.location.search;
    // filter out the actual keywords from the search string
    let keywords = queryString.substring(offset);
    
    // Filter the array by keywords. includes the item in the results
    // array only if the title contains the keywords
    let results = jcontent.hits.hits.filter((hit) => {
      let title = hit._source.title.toLowerCase();
      let keyword = keywords.toLowerCase();
      return title.indexOf(keyword) !== -1;
    });
    
    // Handles the case where no results matches the keywords
    if (results.length == 0) {
        let noResultsMessage = document.createElement('h2');
        noResultsMessage.textContent = "Sorry, we couldn't find anything";
        noResultsMessage.setAttribute('style', 'color:white');
        document.body.appendChild(noResultsMessage);
    }
    // Click function for job title to show full job details
    $(function() {
      $(".job").click(function(){
        window.location=$(this).find(result._source.title).attr(window.location.assign('https://seek-mrtech.c9users.io/Json - Render Ouput/Data.html'));
          return false;
      });
   });
    
    let result = ''
    
    // Renders the output
    for (result of results){
            var newElement = document.createElement('div');
            newElement.id = result._id; 
            newElement.className = "job";
            newElement.innerHTML ='<h1  class="job-name">'+ result._source.title +'</h1>'+ '<div class="jobid">'+ result._source.jobid + '</div>' +'<br>' + '<div class="class">'+ result._source.advertiser + '<br>' + result._source.displaysuburb + ', ' + result._source.state + ', ' + result._source.nation + '<br><br>'+ '<b>' + result._source.classification +'</b>'+ ' > ' + result._source.subclassification + '<br>' + '<p>' + result._source.shortdescription + '</p>' ;
            document.body.appendChild(newElement);
            
      output.innerHTML = ` <h2 class="app-title">Job (${results.length} results)</h2>
      `;
    
        
    }
}