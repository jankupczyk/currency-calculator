// DOM
const fromInput = document.querySelector("#from");
const toInput = document.querySelector("#to");
const base = document.querySelector("#currBase");
const validDate = document.querySelector("#validDate");
const rate = document.querySelector("#rates");

const URL = "https://api.exchangeratesapi.io/latest?base=";

function getData(currency = "EUR", selectedCurrency){
    fetch(URL + currency.toUpperCase())
    .then(response => response.json())
    .then(data => {
        populateInputs(data.rates, selectedCurrency);
        base.innerHTML = `<strong>Base: </strong>${data.base}`;
        validDate.innerHTML = `<strong>Date: </strong>${data.date}`;
    })
    .catch(err => console.log(`Error occured: ${err.message}`));
}

function populateInputs(data, selectedCurrency){
    let option = "";

    for(let currency in data){
        if(currency == selectedCurrency){
            option += `<option value=${currency} selected>${currency}</option>`;
        }else{
            option += `<option value=${currency}>${currency}</option>`;
        }
    }

    fromInput.innerHTML = option;
    toInput.innerHTML = option;
}

function updateInfo(elem){
    getData(elem.value, elem.options[elem.selectedIndex].text);
}

function updateRates(elem){

}
//         rate.innerHTML = `<strong> 1 ${data.base} = ${data.rates[data.base]}`;

