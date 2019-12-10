
function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // set parameter name and value (use 'true' if empty)
      var paramName = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

      // if the paramName ends with square brackets, e.g. colors[] or colors[2]
      if (paramName.match(/\[(\d+)?\]$/)) {

        // create key if it doesn't exist
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        // if it's an indexed array e.g. colors[2]
        if (paramName.match(/\[\d+\]$/)) {
          // get the index value and add the entry at the appropriate position
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          // otherwise add the value to the end of the array
          obj[key].push(paramValue);
        }
      } else {
        // we're dealing with a string
        if (!obj[paramName]) {
          // if it doesn't exist, create property
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string'){
          // if property does exist and it's a string, convert it to an array
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          // otherwise add the property
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}
function pageClick(page) {
	$('.page-active').removeClass('page-active');
  $('#page'+page).addClass('page-active');
  $('.w3-black').removeClass('w3-black');
  $('#pagenav'+page).addClass('w3-black')
}
function openEntry(entryTitle,entry,entryType){
  if(entryType === "html"){
    window.location.href = entry;
    return;
  }
  window.location.href = 'entry.html?entry='+encodeURI(entry)+'&type='+entryType+'&title='+entryTitle;
}
function setupEntry(){
  let query= getAllUrlParams(window.location.href);
  let entryTitle = query["title"];
  let entryType = query["type"];
  let entry  = query["entry"];
  let appendable = "";

  $('body > div.w3-main > div > h4 > b').text(decodeURI(entryTitle));
  switch(entryType){
    case "pdf":
      appendable = '<object data="./Resources/files/homeworks/'+ entry +'" type="application/pdf" width="100%" height="800px"><p>Alternative text - include a link <a href="./Resources/files/homeworks/'+ entry +'">to the PDF!</a></p></object>'
      break;
    default:
      appendable = '<img src="./Resources/files/homeworks/'+  entry +'" alt="Honework 1.1" style="width:100%">'
      break
  }

  $("#entryInfo").append(appendable);
  $("#entryInfo").append('<a href="./Resources/files/homeworks/'+entry+'" download="'+entry+'"><button class="w3-button w3-dark-grey w3-padding-large w3-margin-top w3-margin-bottom">Download File</button></a>');

}
// Script to open and close sidebar
function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}