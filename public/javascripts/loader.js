export const removeData = () => {
    let loadingFlag = document.getElementById("loader")
    loadingFlag.innerHTML = "<h1 id='loader-header'>Requesting from NOAA... Stand-By!</h1>"
    let table = document.getElementById("weather-info");
    table.innerHTML = "";
    let graph = document.getElementById("d3-graph")
    graph.innerHTML = "";
    let buttons = document.getElementById("weather-buttons");
    buttons.innerHTML = "";
    return true;
}

export const removeLoader = (addressSearch) => {
    let address = addressSearch.toUpperCase();
    let loadingFlag = document.getElementById("loader")
    loadingFlag.innerHTML = `<h1 id='loader-header'>Weather Forecast: ${address}</h1>`
}
