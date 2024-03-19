'use strict';
const account1 = {
    owner: "Lohitav Chandrasekaran",
    amount: [200.52, 450, -400, 3000.23, -650, -130, 70.25, 1300],
    interestRate: 1.2,
    pin: 26,
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
    owner: "Minnie Innocent",
    amount: [5000.70, 3400, -150.235, -790, -3210, -1000.89, 8500, -30],
    interestRate: 1.5,
    pin: 19,
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
    owner: "Sanjay Karthik",
    amount: [200.25, -200, 340.8, -300, -20.58, 50, 400.03, -460],
    interestRate: 0.7,
    pin: 20,
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

const account4 = {
    owner: "Padmavathi Kannappan",
    amount: [430.74, 1000, 700.2, 50, 90.0],
    interestRate: 1,
    pin: 6,
    movementsDates: [
        "2022-11-05T10:30:00.000Z",
        "2022-12-10T14:00:00.000Z",
        "2023-01-15T10:15:00.000Z",
        "2023-02-20T15:45:00.000Z",
        "2023-03-25T08:50:00.000Z",
        "2023-04-05T17:05:00.000Z",
        "2023-05-15T13:20:00.000Z",
        "2023-06-20T07:35:00.000Z"
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
const transerButton=document.querySelector("#op1");
const loanButton=document.querySelector("#op2");
const closeButton=document.querySelector("#op3");
const branchEnter=document.querySelector(".branch");
const branchAmount=document.querySelector(".amount");
const loanEnter=document.querySelector(".loan");
const closeUser=document.querySelector(".users");
const closePins=document.querySelector(".pins");
const sortAmounts=document.querySelector(".sorting");

// console.log(account3);

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
        messgae.textContent=`Welcome back! ${loginUser.owner.split(" ").find(str => str)}`;
        container.classList.remove("container");
        //disappera//
        userNameUser.value="";
        userPassword.value="";
        userPassword.blur();
        //disappear//
        displayAmount(loginUser.amount);
        totalFunction(loginUser.amount);
        displayDetails(loginUser.amount,loginUser);
    }
    else
    {
        alert("Enter valid username and password, enter a valid one");
    }
});


const displayAmount = function (amounts,sort) {
    const array=sort ? amounts.slice().sort((a,b) => a-b):amounts;
    main2Container.innerHTML="";
    array.forEach(function(arr,i){
        const html=`<div class="row-1-st">
        <div class="row${Math.floor(arr)>0?"-1":"1"}">${i+1} ${Math.floor(arr)>0?"deposit":"withdrawal"}</div>
        <div class="row-3">${Math.floor(arr)} €</div>
      </div>`;
      main2Container.insertAdjacentHTML("afterbegin",html);
    });
};

let balanceAccounts;
const totalFunction=function(amounts)
{
    const totalAmountAccount=amounts.reduce( (acc,arr) => acc+arr,0);
    balanceAccounts=totalAmountAccount.toFixed(2);
    totalDisplay.textContent=totalAmountAccount+"  €";
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


transerButton.addEventListener("click",function(){
    const findedObjectAccount=accounts.find(account => account.userName===branchEnter.value);
    if(branchAmount.value<balanceAccounts && findedObjectAccount?.userName!==loginUser.userName)
    {
        findedObjectAccount.amount.push(Number(branchAmount.value));
        loginUser.amount.push(Number("-"+branchAmount.value));
        displayAmount(loginUser.amount);
        totalFunction(loginUser.amount);
        displayDetails(loginUser.amount,loginUser);
    }
    else
    {
        alert("Invalid bank balance");
    }
    branchAmount.value="";
    branchEnter.value="";
});


op3.addEventListener("click",function(){
    const findedObjectCloseAccount=accounts.find(account => account.userName===closeUser.value);
    const index=accounts.findIndex(account => account.userName===closeUser.value);
    if(closeUser.value!==loginUser.userName && index>=0 && Number(closePins.value)===findedObjectCloseAccount.pin)
    {
        accounts.splice(index,1);
        alert(`${findedObjectCloseAccount.owner} account is closed successfully`);
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


op2.addEventListener("click",function(){
    const loanAmount=Math.floor(loanEnter.value);
    if(loginUser.amount.some(ele => ele>=loanAmount*0.1))
    {
        loginUser.amount.push(loanAmount);
        displayAmount(loginUser.amount);
        totalFunction(loginUser.amount);
        displayDetails(loginUser.amount,loginUser);
    }
    else
    alert("Cannot provide loan to this user");
    loanEnter.value="";
    console.log("Loan matters");
});


let sort=true;
sortAmounts.addEventListener("click",function(){
    displayAmount(loginUser.amount,sort);
    sort=sort?false:true;
});


totalDisplay.addEventListener("click",function(){
    const arr=Array.from(document.querySelectorAll(".row-3"),(ele,i)=>Number(ele.textContent.replace("€","")));
});


