'use strict';
'use strict';

const account1 = {
    owner: "Lohitav",
    amount: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2,
    pin: 2619
};

const account2 = {
    owner: "Minnie",
    amount: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2619
};

const account3 = {
    owner: "Sanjay Karthik",
    amount: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 2619
};

const account4 = {
    owner: "Padmavathi",
    amount: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 2619
};

const main2Container = document.querySelector(".main2");

const displayAmount = function (amounts) {
    main2Container.innerHTML="";
    amounts.forEach(function(arr,i){
        const html=`<div class="row-1-st">
        <div class="row${arr>0?"-1":"1"}">${i+1} ${arr>0?"deposit":"withdrawal"}</div>
        <div class="row-3">${arr} €</div>
      </div>`;
      main2Container.insertAdjacentHTML("afterbegin",html);
    });
};
displayAmount(account1.amount);