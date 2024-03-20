'use strict';
const account1 = {
    owner: "Chennai Super Kings",
    amount: [200.52, 450, -400, 3000.23, -650, -130, 70.25, 1300],
    interestRate: 1.2,
    pin: 7,
    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-05-27T17:01:17.194Z',
        '2020-07-11T23:36:17.929Z',
        '2020-07-12T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT' // de-DE
};

const account2 = {
    owner: "Royal Challenges Bangalore",
    amount: [5000.70, 3400, -150.235, -790, -3210, -1000.89, 8500, -30],
    interestRate: 1.5,
    pin: 18,
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US'
};

const account3 = {
    owner: "Kolkata Knight Riders",
    amount: [200.25, -200, 340.8, -300, -20.58, 50, 400.03, -460],
    interestRate: 0.7,
    pin: 96,
    movementsDates: [
          "2022-03-10T08:00:00.000Z",
          "2022-04-15T12:30:00.000Z",
          "2022-05-20T09:45:00.000Z",
          "2022-06-25T15:15:00.000Z",
          "2022-07-30T08:20:00.000Z",
          "2022-08-10T16:35:00.000Z",
          "2022-09-20T12:50:00.000Z",
          "2022-10-25T07:05:00.000Z"
    ],
    currency: "CAD",
    locale: "en-CA"
};
console.log()
const account4 = {
    owner: "Mumbai Indians",
    amount: [430.74, 1000, 700.2, 50, 90.0],
    interestRate: 1,
    pin: 33,
    movementsDates: [
        "2022-11-05T10:30:00.000Z",
        "2022-12-10T14:00:00.000Z",
        "2023-01-15T10:15:00.000Z",
        "2023-02-20T15:45:00.000Z",
        "2023-03-25T08:50:00.000Z"
    ],
    currency: "AUD",
    locale: "en-AU"
};


const accounts=[account1,account2,account3,account4];


const main2Container = document.querySelector(".main2");
const messgae=document.querySelector(".tx1");
const container=document.querySelector(".container");
const userButton=document.querySelector(".arrow");
const userNameUser=document.querySelector(".user");
const userPassword=document.querySelector(".pin");
const totalDisplay=document.querySelector(".amt1");
const transferButton=document.querySelector("#op1");
const loanButton=document.querySelector("#op2");
const closeButton=document.querySelector("#op3");
const branchEnter=document.querySelector(".branch");
const branchAmount=document.querySelector(".amount");
const loanEnter=document.querySelector(".loan");
const closeUser=document.querySelector(".users");
const closePins=document.querySelector(".pins");
const sortAmounts=document.querySelector(".sorting");
const dateChange=document.querySelector(".date");
const timeChange=document.querySelector(".time");



let bool=true;
const date=new Date();
console.log(date);
let year=date.getFullYear();
let month=date.getMonth()+1;
let dates=date.getDate();
let hours=date.getHours();
let minutes=date.getMinutes();
let seconds=date.getSeconds()
let milliseconds=date.getMilliseconds();
month=month<=9?"0"+month:month;
dates=dates<=9?"0"+dates:dates;


const checkuser=function(accounts){
    accounts.forEach(function(ele,i){
        ele.userName=ele.owner.toLowerCase().split(" ").map( uName => uName[0]).join("");
    });
};
checkuser(accounts);


let loginUser;
userButton.addEventListener("click",function(e){
    e.preventDefault();
    loginUser=accounts.find(account => account.userName===userNameUser.value);
    if(loginUser?.pin===Number(userPassword.value))
    {
        messgae.textContent=`Welcome back! ${loginUser.owner}`;
        container.classList.remove("container");
        //disappera//
        userNameUser.value="";
        userPassword.value="";
        userNameUser.blur();
        userPassword.blur();
        //disappear//
        displayAmount(loginUser);
        totalFunction(loginUser.amount);
        displayDetails(loginUser.amount,loginUser);
    }
    else
    {
        alert("Enter valid username and password, enter a valid one");
    }
});


const displayAmount = function (loginUser,sort) {
    // console.log(loginUser);
    // console.log(bool);
    const array=sort ? loginUser.amount.slice().sort((a,b) => a-b):loginUser.amount;
    main2Container.innerHTML="";
    if(bool===false)
    {
        loginUser.movementsDates.push(year+"-"+month+"-"+dates+"T"+hours+":"+minutes+":"+seconds+"."+milliseconds+"Z");
    }
    array.forEach(function(arr,i){
        // console.log(loginUser.movementsDates[i]);
        const [str1,str2]=loginUser.movementsDates[i].split("T");
        const dateDisplay=str1.split("-").reverse().join("/");
        const html=`<div class="row-1-st">
        <div class="row${Math.floor(arr)>0?"-1":"1"}">${i+1} ${Math.floor(arr)>0?"deposit":"withdrawal"}</div>
        <div class="row-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${dateDisplay}</div>
        <div class="row-3">${Math.floor(arr)} €</div>
      </div>`;
      main2Container.insertAdjacentHTML("afterbegin",html);
    });
    bool=true;
};

let balanceAccounts;
const totalFunction=function(amounts)
{
    const totalAmountAccount=amounts.reduce( (acc,arr) => acc+arr,0);
    balanceAccounts=totalAmountAccount;
    totalDisplay.textContent=Math.floor(totalAmountAccount)+"  €";
};


const displayDetails=function(amounts,loginUser)
{
    document.querySelector(".amt-style1").textContent=amounts.filter( ele => ele>0)
    .reduce( (acc,ele) => acc+Math.floor(ele),0)+" €";
    document.querySelector(".amt-style2").textContent=Math.abs(amounts.filter( ele => ele<0)
    .reduce( (acc,ele) => acc+Math.floor(ele),0))+" €";
    document.querySelector(".amt-style3").textContent=amounts.filter( ele => ele>0)
    .map( ele => Math.floor(ele)*loginUser.interestRate/100)
    .filter(ele => ele>=1)
    .reduce( (acc,ele) => Math.floor(ele)+acc,0)+" €";
};


transferButton.addEventListener("click",function(){
    const findedObjectAccount=accounts.find(account => account.userName===branchEnter.value);
    if(branchAmount.value<balanceAccounts && findedObjectAccount?.userName!==loginUser.userName)
    {
        bool=bool?false:true;
        findedObjectAccount.amount.push(Number(branchAmount.value));
        findedObjectAccount.movementsDates.push(year+"-"+month+"-"+dates+"T"+hours+":"+minutes+":"+seconds+"."+milliseconds+"Z");
        // console.log(findedObjectAccount.movementsDates);
        loginUser.amount.push(Number("-"+branchAmount.value));
        displayAmount(loginUser);
        totalFunction(loginUser.amount);
        displayDetails(loginUser.amount,loginUser);
        branchAmount.value="";
        branchEnter.value="";
    }
    else if(findedObjectAccount.userName)
    {
        alert("Enter correct user name");
    }
    else
    {
        alert("Invalid bank balance");
    }
    branchAmount.value="";
    branchEnter.value="";
});


op2.addEventListener("click",function(){
    const loanAmount=Math.floor(loanEnter.value);
    if(loginUser.amount.some(ele => ele>=loanAmount*0.1))
    {
        bool=bool?false:true;
        loginUser.amount.push(loanAmount);
        // loginUser.movementsDates.push(year+"-"+month+"-"+dates+"T"+hours+":"+minutes+":"+seconds+"."+milliseconds+"Z");
        console.log(loginUser.movementsDates);
        displayAmount(loginUser);
        totalFunction(loginUser.amount);
        displayDetails(loginUser.amount,loginUser);
        loanEnter.value="";
    }
    else
    alert("Cannot provide loan to this user");
    loanEnter.value="";
});


op3.addEventListener("click",function(){
    const findedObjectCloseAccount=accounts.find(account => account.userName===closeUser.value);
    const index=accounts.findIndex(account => account.userName===closeUser.value);
    if(closeUser.value!==loginUser.userName && index>=0 && Number(closePins.value)===findedObjectCloseAccount.pin)
    {
        accounts.splice(index,1);
        alert(`${findedObjectCloseAccount.owner} account is closed successfully`);
        closeUser.value="";
        closePins.value="";
    }
    else
    {
        if(String(closeUser.value)===findedObjectCloseAccount.userName && Number(closePins.value)===findedObjectCloseAccount.pin)
        {
            alert("This account is actice now so, it can't be closed");
        }
        else
        {
            alert("Please enter valid username and password to close the account");
        }
    }
    closeUser.value="";
    closePins.value="";
});


let sort=true;
sortAmounts.addEventListener("click",function(){
    displayAmount(loginUser,sort);
    sort=sort?false:true;
});


totalDisplay.addEventListener("click",function(){
    const arr=Array.from(document.querySelectorAll(".row-3"),(ele,i)=>Number(ele.textContent.replace("€","")));
});


dateChange.textContent=date.getDate()+"/"+(date.getMonth()+1<=9?"0"+(date.getMonth()+1):(date.getMonth()+1))+"/"+date.getFullYear();
timeChange.textContent=date.getHours()+":"+`${date.getMinutes()}`.padStart(2,0);