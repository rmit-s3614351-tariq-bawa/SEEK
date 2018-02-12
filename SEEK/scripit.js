// Instantiates the Paginations Plugin
var $pagination = $('#pagination');
$pagination.twbsPagination({
    totalPages: 10,
    visiblePages: 5,
    onPageClick: (evt, page) => {
    // Destroys the old data from the page
    document.querySelector('#elements').innerHTML = "";
// Calls the fetchResults function which fetches the right resultset and renders it
fetchResults(page);
},
});

function constructUrl(page) {
	
 query = window.location.search.substring(1).split('&');
 
 params = [];
 
 query.map((val) => {
	var temp = val.split('=');
	params[temp[0]] = temp[1];
	return val;
 });

var url = `${config.serverName}:${config.port}/jobs/_search?from=${(page-1)*config.size}&size=${config.size}&q=`;

for (key in params) {
	url = url+`${key}:${params[key]}%20`;
}

url.trim();

console.log(url);

return url;
}

// Fetches the results for a query from the API
// calls the filterAndRender function to filter the results according to
// the keywords given
async function fetchResults(page = 1) {
    config = await loadConfig()
    var ajaxhttp = new XMLHttpRequest();
    // var url = "example.json";
    // var page = window.location.search.substring(3);
    
    // let config = {
    //   serverName: "http://43.240.96.87",
    //   port: 9200,
    //   size: 20
    // }
    
    // THIS NEEDS TO BE REPLACED BY A URL POINTING TO THE API
    // "http://" + config.servername +":" + config.portnumber + config.search +"?q = " + params example
    var url = constructUrl(page);
	
	console.log(url);


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

    let result = '';
    let results = jcontent.hits.hits;
    
    // console.log(parent);


    // Renders the output
    for (result of results){
            var newElement = document.createElement('div');
            newElement.id = result._id;
            newElement.className = "job";
            newElement.innerHTML =`<a href="jobs.html?job=${result._source.jobid}"><h1  class="job-name">${result._source.title}</h1></a><div class="jobid">${result._source.jobid}</div><br><div class="class">${result._source.advertiser}<br>${result._source.displaysuburb}, ${result._source.state}, ${result._source.nation}<br><br><b>${result._source.classification}</b> > ${result._source.subclassification}<br><p>${result._source.shortdescription}</p>`;
            document.querySelector('#elements').appendChild(newElement);

      output.innerHTML = ` <h2 class="app-title">${jcontent.hits.total} Jobs Found</h2>
      `;
    }
}