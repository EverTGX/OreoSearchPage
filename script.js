function search() {
    var input_value = document.getElementById("search-input").value
    console.log(input_value)
    if (/^\s*$/.test(input_value)) return
    if (input_value.startsWith("https://") || input_value.startsWith("http://")) {window.location.assign(encodeURIComponent(input_value))}
    else {window.location.assign("https://duckduckgo.com/?q=" + encodeURIComponent(input_value))}
}

document.addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {search()}});

function openSettings() {
    console.log("settings opened")
    return
}