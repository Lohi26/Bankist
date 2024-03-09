'use strict';
const account1 = {
    owner: "Lohitav Chandrasekaran",
    amount: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2,
    pin: 26
};

const account2 = {
    owner: "Minnie Innocent",
    amount: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 19
};

const account3 = {
    owner: "Sanjay Karthik",
    amount: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 20
};

const account4 = {
    owner: "Padmavathi Kannappan",
    amount: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 6
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
        <div class="row${arr>0?"-1":"1"}">${i+1} ${arr>0?"deposit":"withdrawal"}</div>
        <div class="row-3">${arr} €</div>
      </div>`;
      main2Container.insertAdjacentHTML("afterbegin",html);
    });
};

let balanceAccounts;
const totalFunction=function(amounts)
{
    const totalAmountAccount=amounts.reduce( (acc,arr) => acc+arr,0);
    balanceAccounts=totalAmountAccount;
    totalDisplay.textContent=totalAmountAccount+"  €";
};


const displayDetails=function(amounts,loginUser)
{
    document.querySelector(".amt-style1").textContent=amounts.filter( ele => ele>0)
    .reduce( (acc,ele) => acc+ele,0)+" €";
    document.querySelector(".amt-style2").textContent=Math.abs(amounts.filter( ele => ele<0)
    .reduce( (acc,ele) => acc+ele,0))+" €";
    document.querySelector(".amt-style3").textContent=amounts.filter( ele => ele>0)
    .map( ele => ele*loginUser.interestRate/100)
    .filter(ele => ele>=1)
    .reduce( (acc,ele) => ele+acc,0)+" €";
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
        if(findedObjectCloseAccount)
        alert("Enter a valid username and password");
        else
        alert("The entered account is now actice, so cannot be closed");
    }
    closeUser.value="";
    closePins.value="";
});


op2.addEventListener("click",function(){
    if(loginUser.amount.some(ele => ele>=loanEnter.value*0.1))
    {
        loginUser.amount.push(Number(loanEnter.value));
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