const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

for (let i=0; i<dropList.length; i++){
  for(currency_code in country_code){ 
    // selecting USD as the default FROM currency
    let selected;
    if(i == 0){
      selected = currency_code == "USD" ? "selected" : "";
    }else if(i == 1){
      selected = currency_code == "NGN" ? "selected" : "";
    }
    // Creating option tag with passing currency code as a text and value
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;

    // Inserting Options Tag inside Select Tag
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", e =>{
    loadFlag(e.target); //Calling loadFlag with passing target element as an argument
  });
}

function loadFlag(element){
  for(code in country_code){
    if(code == element.value){  //If currency code of country list is equal to option value
      let imgTag = element.parentElement.querySelector("img"); //selecting img tag of particular drop list
      // imgTag.src = `https://flagcdn.com/48x36/${country_code[code]}.png`
      imgTag.src = `https://flagsapi.com/${country_code[code]}/shiny/64.png`
    }
  }
}

window.addEventListener("load", () =>{ 
  getExchangeRate();
});

getButton.addEventListener("click", e =>{
  e.preventDefault(); //Preventing Form from submitting
  getExchangeRate();
});

// Flags icons
const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener(click, ()=> {
  let tempCode = fromCurrency.value;  //temporary currency code of FROM drop list 
  fromCurrency.value = toCurrency.value; //passing TO currency code to FROM currency code
  toCurrency.value = tempCode; //passing temporary currency
  loadFlag(fromCurrency);
  loadFlag(tourrency);
  getExchangeRate();
})
// End of Flags icons

function getExchangeRate(){
  const amount = document.querySelector(".amount input");
  const exchangeRateTxt = document.querySelector(".exchange-rate");
  let amountVal = amount.value;
  // If User doesn't enter any value or keys in 0; then we'll put 1 as a value by default in the input field 
  if(amountVal == "" || amountVal == "0"){
    amount.value = "1";
    amountVal = 1;
  }
  exchangeRateTxt.innerText = "Getting exchange rate..."
  let url = `https://v6.exchangerate-api.com/v6/23635712c380809b619c1b5b/latest/${fromCurrency.value}`;
  // Fetching API response and returning it with parsing into js obj and in another then method receiving that object.
  fetch(url).then(response => response.json()).then(result => {
    let exchangeRate = result.conversion_rates[toCurrency.value];
    let totalExchangeRate = (amountVal * exchangeRate).toFixed(2); 
    exchangeRateTxt.innerText = ` ${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
  });
}