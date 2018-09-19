// Author: Jacob Lindsley with aid from online resources
// Note different approaches were used for different parts of the script

var rawText = "";
var offset = 0;
// API information
const url = 'https://api.datamuse.com/words?';
// Variables for page elements
const responseField = document.querySelector('#responseField');
const queryParams = document.querySelector('#sp');



// Attach functions to button elements
$(document).ready(function() {
  $("#shifter").click(function() {caesarShift();});
  $("#requestWord").click(function() {requestWords();});
});

function requestWords() {
  const word = $("#getInput").val();
  let params = $("#queryType").val();
  const endpoint = url + params + "=" + word;
  console.log(endpoint);
  
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE)
      {
        renderResponse(xhr.response);
      }
  };
  xhr.open("GET", endpoint);
  xhr.send();
}

function displaySuggestions(event) {
  event.preventDefault();
  while(responseField.firstChild){
    responseField.removeChild(responseField.firstChild);
  };
  requestWords();
}

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
