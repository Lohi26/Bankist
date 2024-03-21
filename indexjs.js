'use strict';
const account1 = {
    owner: "Chennai Super Kings",
    amount: [200.52, 450, -400, 3000.23, -650, -130, 70.25, 1300],
    interestRate: 1.2,
    pin: 7,
    movementsDates: [
        '2024-01-18T21:31:17.178Z',
        '2024-02-23T07:42:02.383Z',
        '2024-01-28T09:15:04.904Z',
        '2024-02-01T10:17:24.185Z',
        '2024-02-08T14:11:59.604Z',
        '2024-01-27T17:01:17.194Z',
        '2024-01-11T23:36:17.929Z',
        '2024-03-20T10:51:36.790Z',
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
        '2024-03-01T13:15:33.035Z',
        '2024-03-03T09:48:16.867Z',
        '2024-03-10T06:04:23.907Z',
        '2024-03-11T14:18:46.235Z',
        '2024-03-13T16:33:06.386Z',
        '2024-03-15T14:43:26.374Z',
        '2024-03-16T18:49:59.371Z',
        '2024-03-20T12:01:20.894Z',
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
          "2024-03-19T08:00:00.000Z",
          "2024-03-18T12:30:00.000Z",
          "2024-03-17T09:45:00.000Z",
          "2024-03-20T15:15:00.000Z",
          "2024-02-29T08:20:00.000Z",
          "2024-02-10T16:35:00.000Z",
          "2024-02-20T12:50:00.000Z",
          "2024-01-25T07:05:00.000Z"
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
        "2024-03-05T09:30:00.000Z",
        "2024-03-10T14:45:00.000Z",
        "2024-03-15T11:00:00.000Z",
        "2024-03-18T16:15:00.000Z",
        "2024-03-20T09:30:00.000Z"

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

// console.log(new Date(account1.movementsDates[0])-new Date(account1.movementsDates[1]));

let bool=true;
const date=new Date();
// console.log(date);
let year=date.getFullYear();
let month=`${date.getMonth()+1}`.padStart(2,0);
let dates=`${date.getDate()}`.padStart(2,0);
let hours=`${date.getHours()}`.padStart(2,0);
let minutes=`${date.getMinutes()}`.padStart(2,0);
let seconds=`${date.getSeconds()}`.padStart(2,0);
let milliseconds=date.getMilliseconds();
// const strDate=date.getDate()+"/"+(date.getMonth()+1<=9?"0"+(date.getMonth()+1):(date.getMonth()+1))+"/"+date.getFullYear();
//or
const strDate=dates+"/"+month+"/"+year;

// const strTime=date.getHours()+":"+`${date.getMinutes()}`.padStart(2,0);
//or
const strtime=hours+":"+minutes;
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
    // console.log("Okay!!");
    array.forEach(function(arr,i){
        // const [str1,str2]=loginUser.movementsDates[i].split("T");
        // const display=str1.split("-").reverse().join("/");

        //or use "today" or "yeaterday" or "x days ago"
        // console.log(new Date(loginUser.movementsDates[i]));
        // console.log(date);
        const diff=Math.round(Math.abs(new Date(loginUser.movementsDates[i])-date)/(1000*60*60*24));
        // console.log(diff);
        let dateDisplay="";
        if(diff==0)
        dateDisplay="Today";
        else if(diff==1)
        dateDisplay="Yesterday";
        else
        dateDisplay=`${diff} days ago`;
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
        // console.log(loginUser.movementsDates);
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


dateChange.textContent=strDate;
// console.log(str);
timeChange.textContent=strtime;