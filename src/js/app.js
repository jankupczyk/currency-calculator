// DOM
let fromInput = document.querySelector("#from");
let toInput = document.querySelector("#to");

function getData(url, currency = "EUR"){
    fetch(url + currency.toUpperCase())
    .then(response => response.json())
    .then(data => {
        populate(data.rates)
        console.log("Rejtsy: ", data.rates.CAD);
        console.log("Bejz: ", data.base);
        console.log("Data: ", data.date);
    })
    .catch(err => console.log(`Error occured: ${err.message}`));
}

getData("https://api.exchangeratesapi.io/latest?base=");


function populate(data){
    let option = "";

    for(let curr in data){
        option += `<option value=\"${curr}\">${curr}</option>`;
    }

    fromInput.innerHTML = option;
    toInput.innerHTML = option;
}