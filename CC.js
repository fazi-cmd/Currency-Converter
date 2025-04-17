const base_Url="https://api.exchangerate-api.com/v4/latest/USD";

const dropdown=document.querySelectorAll(".dropdown select ");
const button=document.querySelector("form button");
const msg = document.querySelector(".msg");


for(let select of dropdown){
    for (currCode in countryList){
     let newOptions=document.createElement("option");
    newOptions.innerText=currCode;
    newOptions.value=currCode;
    select.append(newOptions);

    }
    select.addEventListener("change",(evt)=>{
updateFlag(evt.target);
    });
}
const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let imgSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=imgSrc;
}
button.addEventListener("click",(evt)=>{  
    evt.preventDefault(); 
    let amountField=document.querySelector("form input");
    let amount=amountField.value;
    if (amount=="" || amount<1){
        amount=1;
        amountField.value="1";
    }
    let from=dropdown[0].value; 
    let to=dropdown[1].value;
    convertCurrency(from,to,amount);
});
// prevent Default means if we use form tag in html and then we click on button it automatically refresh the page so to prevent that we use preventDefault (we gave the function which we want to perform on click)

const convertCurrency = async (from, to, amount) => {
    try {
        let response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        let data = await response.json();
        
        let exchangeRate = data.rates[to];
        if (!exchangeRate) {
            console.log("Invalid currency code");
            return;
        }
        
        let convertedAmount = (amount * exchangeRate).toFixed(2); 
        msg.innerText=`${amount} ${from} = ${convertedAmount} ${to}`;
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
    }
};