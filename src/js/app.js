const fromCurrency = document.querySelector("#from");
const toCurrency = document.querySelector("#to");
const base = document.querySelector("#currBase");
const validDate = document.querySelector("#validDate");
const rate = document.querySelector("#rate");
const swapBttn = document.querySelector("#swap");
const amount1 = document.querySelector("#amount-1");
const amount2 = document.querySelector("#amount-2");

let currencies;

const CURRENCY_API_URL = "https://api.exchangeratesapi.io/latest?base=";

window.addEventListener("DOMContentLoaded", () => {
    const defaultCurrency = "EUR";

    fetch(CURRENCY_API_URL + defaultCurrency.toUpperCase())
        .then(response => response.json())
        .then(currencyList => {
            populateInputs(currencyList.rates);
            displayMoreInfo(currencyList);
            currencies = currencyList;
        })
        .catch(err => console.error(err));
}, false);

const displayMoreInfo = (currencyList) => {
    base.innerHTML = `<strong>Base: </strong>${currencyList.base}`;
    validDate.innerHTML = `<strong>Date: </strong>${currencyList.date}`;
    rate.innerHTML = `<strong> 1 ${fromCurrency.value} </strong> = <span> ${currencyList.rates[toCurrency.value]} ${toCurrency.value}</span>`;
}

const populateInputs = (data) => {
    let fromOption = `<option value=EUR>EUR</option>`;
    let toOption = "";

    for (let currency in data) {
        toOption += `<option value=${currency}>${currency}</option>`;
    }

    fromCurrency.insertAdjacentHTML("beforeend", fromOption);
    toCurrency.insertAdjacentHTML("beforeend", toOption);
}

toCurrency.addEventListener("change", () => {
    const exchangeRate = `<strong> 1 ${fromCurrency.value} </strong> = <span> ${currencies.rates[toCurrency.value]} ${toCurrency.value}</span>`;

    rate.innerHTML = exchangeRate;
});

amount1.addEventListener("change", () => {
    amount2.value = (amount1.value * currencies.rates[toCurrency.value]).toFixed(4);
})

amount2.addEventListener("change", () => {
    amount1.value = (amount2.value / currencies.rates[toCurrency.value]).toFixed(4);
}) 