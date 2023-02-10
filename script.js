function search() {
    var input_value = document.getElementById("search-input").value
    console.log(input_value)
    if (/^\s*$/.test(input_value)) return
    if (input_value.includes("https://") || input_value.includes("http://") || input_value.includes(".com")) {window.location.assign(input_value)}
    else {window.location.assign("https://duckduckgo.com/?q=" + encodeURIComponent(input_value))}
}

document.addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {search()}});

// Basically takes care of the stuffs when you click the settings button
function settingsToggle() {
    if (document.getElementById("settings-menu").classList.contains("invisible")) {
        document.getElementById("settings-menu").classList.remove("invisible")
        document.getElementById("settings-menu").classList.add("visible")
        console.log("settings opened")
    } else {
        document.getElementById("settings-menu").classList.remove("visible")
        document.getElementById("settings-menu").classList.add("invisible")
        console.log("settings closed")
    }
}

// Thx to Tim Down at on Stack Overflow for these functions
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}
  
function rgbToHex(r, g, b) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}
// end of Stack Overflow functions

function applyStyles() {
    addStyleValuesToLocalStorage()
    var root = document.querySelector(":root")
    var storedAccentColor = localStorage.getItem("accentColor")
    var storedBackgroundColor = localStorage.getItem("backgroundColor")
    const accentInput = document.getElementById("accent-color-input")
    const backgroundInput = document.getElementById("background-color-input")
    // All the accent color shenanigans
    root.style.setProperty("--accent-color", storedAccentColor)
    accentInput.value = rgbToHex(storedAccentColor.slice(0, storedAccentColor.indexOf(",")), storedAccentColor.slice(storedAccentColor.indexOf(",")+1, storedAccentColor.lastIndexOf(",")), storedAccentColor.slice(storedAccentColor.lastIndexOf(",")+1))
    accentInput.addEventListener("change", () => {
        localStorage.setItem("accentColor", `${hexToRgb(accentInput.value).r},${hexToRgb(accentInput.value).g},${hexToRgb(accentInput.value).b}`)
        console.log("Accent Changed")
        applyStyles()
    })

    // All the background color shenanigans
    root.style.setProperty("--background-color", storedBackgroundColor)
    backgroundInput.value = rgbToHex(storedBackgroundColor.slice(0, storedBackgroundColor.indexOf(",")), storedBackgroundColor.slice(storedBackgroundColor.indexOf(",")+1, storedBackgroundColor.lastIndexOf(",")), storedBackgroundColor.slice(storedBackgroundColor.lastIndexOf(",")+1))
    backgroundInput.addEventListener("change", () => {
        localStorage.setItem("backgroundColor", `${hexToRgb(backgroundInput.value).r},${hexToRgb(backgroundInput.value).g},${hexToRgb(backgroundInput.value).b}`)
        console.log("Background Changed")
        applyStyles()
    })
}

function addStyleValuesToLocalStorage() {
    if (localStorage.getItem("wasUsedBefore") == "true") return
    localStorage.setItem("wasUsedBefore", "true")
    localStorage.setItem("accentColor", "0,0,0")
    localStorage.setItem("backgroundColor", "255,255,255")
}