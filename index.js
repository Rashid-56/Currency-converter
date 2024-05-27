let Base_Url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector(".container button");
const fromcrr=document.querySelector(".From select");
const tocrr=document.querySelector(".To select");
let msg=document.querySelector(".msg");

for ( let select of dropdowns){
    for(currcode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=currcode;
        newoption.value=currcode;
        if(select.name==="from" && currcode==="USD"){
            select.value="selected"
        }else if(select.name==="to" && currcode==="PKR"){
            select.value="selected"
        }
        select.append(newoption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    })
}
const updateflag=(element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/shiny/64.png`
    let img=element.parentElement.querySelector("img");
    img.src=newsrc
}
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
   updateexchangeRate();
})
const updateexchangeRate=async()=>{
    let amount=document.querySelector(".amount input");
    if(amount.value==="" || amount.value<=0){
        amount.value="1"
    }
const url=`${Base_Url}/${fromcrr.value.toLowerCase()}/${tocrr.value.toLowerCase()}.json`;
let response=await fetch(url);
let data=await response.json();
let rate = data[tocrr.value.toLowerCase()];
let finalamount=rate*amount.value
msg.innerText=`${amount.value}${fromcrr.value} = ${finalamount}${tocrr.value}`
};
window.addEventListener("load",()=>{
    updateexchangeRate();
});