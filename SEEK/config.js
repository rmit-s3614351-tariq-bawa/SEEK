//loads the JSON file
async function loadConfig() {
    let config = {};
    result = await fetch('config.json');
    window.config = await result.json();
    console.log('loaded');
    return window.config;
}