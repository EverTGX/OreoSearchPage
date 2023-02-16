var accentInputEventListener
var backgroundInputEventListener
var searchEngineInputEventListener
var nicknameEventListener
var firstRun = localStorage.getItem("firstRun")
var root = document.querySelector(":root")
var storedAccentColor = localStorage.getItem("accentColor")
var storedBackgroundColor = localStorage.getItem("backgroundColor")
var storedSearchEngine = localStorage.getItem("searchEngine")
var storednickname = localStorage.getItem("username")
const accentInput = document.getElementById("accent-color-input")
const backgroundInput = document.getElementById("background-color-input")
const searchEngineSelect = document.getElementById("search-engines")
const nicknameInput = document.getElementById("nickname-input")
const greetingsText = document.getElementById("greeting")
const fileInput = document.getElementById('background-image-file')
const backgroundImage = document.getElementById('background-image')
const searchEngines = {
    google: "https://www.google.com/search?q=",
    duckduckgo: "https://duckduckgo.com/?q=",
    bing: "https://www.bing.com/search?q=",
    brave: "https://search.brave.com/search?q=",
    ecosia: "https://www.ecosia.org/search?method=index&q="
}
// ^^^ Declare global variables ^^^

// Takes care of searches
function search() {
    var inputValue = document.getElementById("search-input").value
    var searchEngine = localStorage.getItem("searchEngine")
    if (/^\s*$/.test(inputValue)) return
    const isValidUrl = urlString=> {
        var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
        '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
        return !!urlPattern.test(urlString);
    }
    if (isValidUrl(inputValue)) {
        if (inputValue.startsWith("https://") || inputValue.startsWith("http://")) {
            window.location.href = inputValue
        } else {
            window.location.href = encodeURI("https://" + inputValue)
        }
    } else {window.location.href = searchEngines[searchEngine] + encodeURIComponent(inputValue)}
}

// Handles settings visibility
function settingsToggle() {
    if (document.getElementById("settings-menu").classList.contains("invisible")) {
        document.getElementById("settings-menu").classList.remove("invisible")
        document.getElementById("settings-menu").classList.add("visible")
        console.log("Settings opened")
    } else {
        document.getElementById("settings-menu").classList.remove("visible")
        document.getElementById("settings-menu").classList.add("invisible")
        console.log("Settings closed")
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

// Takes care of changes in Accent Color
function accentColor() {
    if (!accentInputEventListener) {
        root.style.setProperty("--accent-color", storedAccentColor)
        accentInput.value = rgbToHex(storedAccentColor.slice(0, storedAccentColor.indexOf(",")), storedAccentColor.slice(storedAccentColor.indexOf(",")+1, storedAccentColor.lastIndexOf(",")), storedAccentColor.slice(storedAccentColor.lastIndexOf(",")+1))
        accentInput.addEventListener("change", () => {
            localStorage.setItem("accentColor", `${hexToRgb(accentInput.value).r},${hexToRgb(accentInput.value).g},${hexToRgb(accentInput.value).b}`)
            storedAccentColor = localStorage.getItem("accentColor")
            root.style.setProperty("--accent-color", storedAccentColor)
            console.log("Accent changed")
        })
        accentInputEventListener = true
    }
}

// Takes care of changes in Background Color
function backgroundColor() {
    if (!backgroundInputEventListener) {
        root.style.setProperty("--background-color", storedBackgroundColor)
        backgroundInput.value = rgbToHex(storedBackgroundColor.slice(0, storedBackgroundColor.indexOf(",")), storedBackgroundColor.slice(storedBackgroundColor.indexOf(",")+1, storedBackgroundColor.lastIndexOf(",")), storedBackgroundColor.slice(storedBackgroundColor.lastIndexOf(",")+1))
        backgroundInput.addEventListener("change", () => {
            localStorage.setItem("backgroundColor", `${hexToRgb(backgroundInput.value).r},${hexToRgb(backgroundInput.value).g},${hexToRgb(backgroundInput.value).b}`)
            storedBackgroundColor = localStorage.getItem("backgroundColor")
            root.style.setProperty("--background-color", storedBackgroundColor)
            console.log("Background changed")
        })
        backgroundInputEventListener = true
    }
}

// Takes care of Search Engine changes
function searchEngine() {
    if(!searchEngineInputEventListener) {
        searchEngineSelect.value = storedSearchEngine
        document.getElementById("search-input").placeholder = `Search with ${searchEngineSelect.options[searchEngineSelect.selectedIndex].text}`
        searchEngineSelect.addEventListener("change", () => {
            localStorage.setItem("searchEngine", `${searchEngineSelect.value}`)
            document.getElementById("search-input").placeholder = `Search with ${searchEngineSelect.options[searchEngineSelect.selectedIndex].text}`
            console.log("Search Engine changed")
        })
        searchEngineInputEventListener = true
    }
}

// Handles the greetings text
function greetings() {
    greetingsText.innerText = chooseGreeting(new Date().getHours())
    nicknameInput.value = `${storednickname}`
    if(!nicknameEventListener) {
        nicknameInput.addEventListener("change", () => {
            localStorage.setItem("username", nicknameInput.value)
            greetingsText.innerText = chooseGreeting(new Date().getHours())
            console.log("Nickname changed")
        })
    }
}

// Helper function to determine the greeting to use
function chooseGreeting(hour) {
    var greeting
    var nickname
    storednickname = localStorage.getItem("username")
    if (storednickname != "") {nickname = `, ${storednickname}`} else {nickname = storednickname}
    if ([6,7,8,9,10,11,12].includes(hour)) {
        greeting = `Good morning${nickname}!`
    } else if ([13,14,15,16].includes(hour)) {
        greeting = `Good afternoon${nickname}!`
    } else if ([17,18,19].includes(hour)) {
        greeting = `Good evening${nickname}!`
    } else if ([20,21,22,23,0,1,2,3,4,5].includes(hour)) {
        greeting = `Good night${nickname}!`
    } else {
        greeting = `Hello${nickname}!`
    }
    return greeting
}

// Helper function for handling images
function imageToBase64() {
    backgroundImage.src = `data:image/png;base64, ${localStorage.getItem("backgroundImage")}`

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.onload = () => {
            backgroundImage.src = reader.result
            const base64Image = backgroundImage.src.split(',')[1]
            localStorage.setItem('backgroundImage', base64Image)
        }
        reader.readAsDataURL(file)
    })
}

function removeBackground() {
    backgroundImage.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA"
    fileInput.value = ""
    localStorage.setItem("backgroundImage", "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA")
    fileInput.dispatchEvent(new Event("change"))
}

// !!! DANGER !!! Sets ALL values to default config
function setDefaultConfig() {
    if(!confirm("Are you sure?")) return
    accentInput.value = "#000000"
    backgroundInput.value = "#ffffff"
    searchEngineSelect.value = "google"
    nicknameInput.value = ""
    accentInput.dispatchEvent(new Event("change"))
    backgroundInput.dispatchEvent(new Event("change"))
    searchEngineSelect.dispatchEvent(new Event("change"))
    nicknameInput.dispatchEvent(new Event("change"))
}

// First time setup function
function setup() {
    localStorage.setItem("firstRun", "false")
    localStorage.setItem("accentColor", "0,0,0")
    localStorage.setItem("backgroundColor", "255,255,255")
    localStorage.setItem("searchEngine", "google")
    localStorage.setItem("username", "")
}

// Main functions. Gets called on page load.
function onPageLoad() {
    // Check if it's first time running website
    if (firstRun == null) {setup()}

    // Add event listener for "Enter" key presses
    document.addEventListener("keypress", function(event) {
        if (event.keyCode == 13) {search()}
    });

    // Call all settings related functions
    accentColor()
    backgroundColor()
    searchEngine()
    greetings()
    imageToBase64()
}