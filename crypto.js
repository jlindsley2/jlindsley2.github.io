var rawText = "";
var offset = 0;


$(document).ready(function() {
  $("#shifter").click(function() {caesarShift();});
});

function caesarShift() {
  console.log("Start shift");
  rawText = $("#messageInput").val().toLowerCase();
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
