const BaseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector("#submitted");
const fromcurr = document.querySelector('.from select');
const tocurr = document.querySelector('.to select');
const msg = document.getElementById("msg");

document.addEventListener('load', ()=>{
    UpdateExchangeRate();
});
for(let select of dropdowns){
    for( let currCode in countryList) {
        let newOption = document.createElement('option');
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt)=> {
updateflag(evt.target)
    });
};

const updateflag = (element) => {
    let currCode = element.value;
    let countrycode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    UpdateExchangeRate();
} ); 

const UpdateExchangeRate = async() => {
    let amount = document.getElementById("inpit");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1 ) {
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${BaseUrl}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[tocurr.toLowerCase];
    let finalvalue = rate*amtVal;
msg.innerText = `${amtVal} ${fromcurr.value} = ${finalvalue} ${tocurr.value} `;
    console.log(response);
}