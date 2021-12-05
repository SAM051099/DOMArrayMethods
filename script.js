const main = document.getElementById('main');
const addUsreBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaireBtn = document.getElementById('show-millionaires');
const highSortBtn = document.getElementById('highSort');
const lowSortBtn = document.getElementById('lowSort');
const calculateWealthBtn = document.getElementById('claculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    const user = data.results[0];
    const newUser = {
        name : `${user.name.first} ${user.name.last}`,
        money : Math.floor(Math.random()*1000000)
    };
    addData(newUser);
}

function addData(user) {
    data.push(user);
    updateDOM();
}

function updateDOM(provideData = data) {
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;
    provideData.forEach(item =>{
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });


}

function doubleMoney() {
    data = data.map((user) => {
        return{...user,money:user.money*2};
    });
    updateDOM();
}

function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,'$&,');
}

function showMillionaire() {
    data = data.filter((user) => 
        user.money > 1000000
    );
    updateDOM();
}

function highSort() {
    data.sort((a,b) =>
        b.money - a.money
    );
    updateDOM();
}

function calculateWealth() {
    updateDOM();
    let wealth = 0;
    data.forEach(function(item){
        wealth += item.money;
    });
    const we = document.createElement('div');
    we.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(we);

}

function lowSort() {
    data.sort((a,b) =>
        a.money - b.money
    );
    updateDOM();
}

addUsreBtn.addEventListener('click',getRandomUser);
doubleBtn.addEventListener('click',doubleMoney);
showMillionaireBtn.addEventListener('click',showMillionaire);
highSortBtn.addEventListener('click',highSort);
lowSortBtn.addEventListener('click',lowSort);
calculateWealthBtn.addEventListener('click',calculateWealth);

