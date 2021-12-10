'use strict';



let section = document.getElementById('seattle');


let hours = [' 6:00am', ' 7:00am', ' 8:00am', ' 9:00am', '10:00am', '11:00am', '12:00pm', ' 1:00pm', ' 2:00pm', ' 3:00pm', ' 4:00pm', ' 5:00pm', ' 6:00pm', ' 7:00pm'];
let tfoot =document.createElement('tfoot');
let stores = [];
let totalsArr = 0;


function CityName(name, minCustPerHour, maxCustPerHour, avgCookiesPerSale) {
  this.name = name;
  this.minCustPerHour = minCustPerHour;
  this.maxCustPerHour = maxCustPerHour;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.cookiesSalesPerHour = [];
  this.dailyTotal = 0;
  stores.push(this);
}

CityName.prototype.custPerHour = function () {
  return Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour + 1) + this.minCustPerHour);
},
CityName.prototype.avgSalesPerHour = function () {
  return Math.ceil(this.avgCookiesPerSale * this.custPerHour());
},
CityName.prototype.calcCookieSalesPerHour = function () {
  for (let i = 0; i < hours.length; i++) {
    let cookies = this.avgSalesPerHour();
    this.cookiesSalesPerHour.push(cookies);
    this.dailyTotal += cookies;
    totalsArr += cookies;
  }
};
let seattle = new CityName('Seattle', 23, 65, 6.3);
let tokyo = new CityName('Tokyo', 3, 24, 1.2);
let dubai = new CityName('Dubai', 11, 38, 3.7);
let paris = new CityName('Paris', 20, 38, 2.3);
let lima = new CityName('Lima', 2, 16, 4.6);

const cityForm = document.getElementById('add-city');


function handleSubmit(event){
  event.preventDefault();

  let city = event.target.city.value;
  let mincust = event.target.mincust.value;
  let maxcust = event.target.maxcust.value;
  let avgcookiesperhour = event.target.avgcookiesperhour.value;
  console.log(city);
  console.log(mincust);

  const newCity = new CityName(city, mincust, maxcust, avgcookiesperhour);

  newCity.render();
  cityForm.reset();
  tfoot.innerHTML = '';
  renderFooter();

}


cityForm.addEventListener('submit', handleSubmit);


let article = document.createElement('article');
section.appendChild(article);

let table = document.createElement('table');
article.appendChild(table);

let thead = document.createElement('thead');
table.appendChild(thead);

let tr = document.createElement('tr');
thead.appendChild(tr);

let th = document.createElement('th');
th.textContent = '        ';
tr.appendChild(th);

for (let i = 0; i < hours.length; i++) {
  let th = document.createElement('th');
  th.textContent = `${hours[i]}`;
  tr.appendChild(th);
}
th = document.createElement('th');
th.setAttribute('class', 'dlt');
th.textContent = 'Daily Location Total';
tr.appendChild(th);


CityName.prototype.render = function () {

  this.calcCookieSalesPerHour();

  let tbody = document.createElement('tbody');
  table.appendChild(tbody);
  tr = document.createElement('tr');
  tbody.appendChild(tr);

  th = document.createElement('th');
  th.setAttribute('class', 'names');
  th.textContent = `${this.name}`;
  tr.appendChild(th);

  for (let i = 0; i < this.cookiesSalesPerHour.length; i++) {
    let td = document.createElement('td');
    td.textContent = `${this.cookiesSalesPerHour[i]}`;
    tr.appendChild(td);
  }
  let td = document.createElement('td');
  td.textContent = `${this.dailyTotal}`;
  tr.appendChild(td);
};


seattle.render();
tokyo.render();
dubai.render();
paris.render();
lima.render();
renderFooter();

function renderFooter (){


  table.appendChild(tfoot);
  tr = document.createElement('tr');
  tfoot.appendChild(tr);
  let td = document.createElement('td');
  td.textContent = 'Totals per hour';
  tr.appendChild(td);

  for (let i = 0; i <hours.length; i++) {
    td = document.createElement('td');
    let hourlyTotals = 0;
    for (let x = 0; x < stores.length; x++) {
      hourlyTotals += stores[x].cookiesSalesPerHour[i];
    }
    td.textContent = `${hourlyTotals}`;
    tr.appendChild(td);
  }

  let dailyHourlyTotals = 0;
  dailyHourlyTotals += totalsArr;
  th = document.createElement('th');
  th.setAttribute('class', 'dht');
  th.textContent = `${dailyHourlyTotals}`;
  tr.appendChild(th);
}



