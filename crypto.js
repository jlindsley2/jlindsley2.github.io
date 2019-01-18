// This is not at all representative of how I code, especially in a professional environment.
// This page is exclusively meant for functionality.

var rawText = "";
var offset = 0;


$(document).ready(function() {
  $("#shifter").click(function() {caesarShift();});
  $("#howto").click(function() {alert("A Caesar shift is currently the only supported shift. Thanks to Datamuse, you can enter any word you want, select the type of query you "
  + "want from the drop down menu, and submit it to get suggestions. For the crossword option, put '?'s for the unknown letters. I always thought something like this would be handy "
  + "for cryptograms, for example the ones the NSA likes to put out. If the request failed, try changing the query and word. In the past it's had some issues with a header, but "
  + "when I went to fix it it worked without issue before touching anything.");});
});

function caesarShift() {
  console.log("Start shift");
  rawText = $("#messageInput").val();
  offset = $("#offsetInput").val();
  if (offset !== parseInt(offset).toString()) {
    output("!!!WARNING!!! Set the offset correctly before shifting! (1-26)")
    return;
  }
  offset = parseInt(offset);
  let charCode = 0;
  let result = "";

  for (i = 0; i < rawText.length; i++) {
    charCode = rawText.charCodeAt(i);
    if (charCode > 96 && charCode < 123) {
      charCode = (((charCode + offset)%97)%26) + 97;
      result += String.fromCharCode(charCode);
    } else if (charCode > 64 && charCode < 91) {
      charCode = (((charCode + offset)%65)%26) + 65;
      result += String.fromCharCode(charCode);
    } else {
      result += rawText[i];
    }
  }
  output(result);
  return;
}

function output(text) {
  $("#messageOutput").val(text);
  return;
}

// Adding new stuff below here, trying things slightly differently.
const url = "https://api.datamuse.com/words?";
const responseInput = document.querySelector("#responseInput");
const responseOutput = document.querySelector("#responseOutput");
var queryType = "rel_trg=";
var queryDropDown = document.getElementById("queryType");
document.getElementById("responseButton").addEventListener("click", displayResults);

function getResponse() {
  const query = responseInput.value;
  queryType = queryDropDown.options[queryDropDown.selectedIndex].value;
  console.log($("#queryType").name);
  const fullurl = url + queryType + query;
  const xmlHttpReq = new XMLHttpRequest();
  xmlHttpReq.reponseType = "json";

  xmlHttpReq.onreadystatechange = () => {
    if (xmlHttpReq.readyState == XMLHttpRequest.DONE) {
      parseResponse(xmlHttpReq.response);
    }
  };

  xmlHttpReq.open("GET", fullurl);
  xmlHttpReq.send();
  return;
}

function parseResponse(response) {
  if (!response.length) {
    responseOutput.innerHTML = "No response. Perhaps try something else";
    return;
  }
  let wordMatches = [];
  response = JSON.parse(response);
  for (let i = 0; i < Math.min(response.length, 20); ++i) {
    wordMatches.push(`<li>${response[i].word}</li>`);
  }
  wordMatches = wordMatches.join("");
  responseOutput.innerHTML = `<ol>${wordMatches}</ol>`;
  return;
}

function displayResults(event) {
  event.preventDefault();

  while(responseOutput.firstChild) {
    responseOutput.removeChild(responseOutput.firstChild);
  }

  getResponse();
  return;
}
