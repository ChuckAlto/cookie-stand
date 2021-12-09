'use strict';

// console.log('hello world');

let section = document.getElementById('seattle');
// console.log(section);

let hours = [' 6:00am', ' 7:00am', ' 8:00am', ' 9:00am', '10:00am', '11:00am', '12:00pm', ' 1:00pm', ' 2:00pm', ' 3:00pm', ' 4:00pm', ' 5:00pm', ' 6:00pm', ' 7:00pm'];
let stores = [];
let totalsArr = 0;
// console.log(hours);
// console.log(stores);

function CityName(name, minCustPerHour, maxCustPerHour, avgCookiesPerSale, cookiesSalesPerHour, dailyTotal) {
  this.name = name;
  this.minCustPerHour = minCustPerHour;
  this.maxCustPerHour = maxCustPerHour;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.cookiesSalesPerHour = cookiesSalesPerHour;
  this.dailyTotal = dailyTotal;
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
let seattle = new CityName('Seattle', 23, 65, 6.3, [], 0);
let tokyo = new CityName('Tokyo', 3, 24, 1.2, [], 0);
let dubai = new CityName('Dubai', 11, 38, 3.7, [], 0);
let paris = new CityName('Paris', 20, 38, 2.3, [], 0);
let lima = new CityName('Lima', 2, 16, 4.6, [], 0);
// console.log(seattle);

// console.log(seattle.avgSalesPerHour());
// console.log(seattle.custPerHour());
// console.log(seattle.cookiesSalesPerHour);


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


  tr = document.createElement('tr');
  table.appendChild(tr);

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

tr = document.createElement('tr');
table.appendChild(tr);
let td = document.createElement('td');
td.textContent = 'Totals per hour';
tr.appendChild(td);

for (let i = 0; i <hours.length; i++) {
  td = document.createElement('td');
  let hourlyTotals = 0;
  console.log(hours);
  for (let x = 0; x < stores.length; x++) {
    hourlyTotals += stores[x].cookiesSalesPerHour[i];
    console.log(hourlyTotals);
    td.textContent = `${hourlyTotals}`;
    tr.appendChild(td);
  }
}

let dailyHourlyTotals = 0;
dailyHourlyTotals += totalsArr;
th = document.createElement('th');
th.setAttribute('class', 'dht');
th.textContent = `${dailyHourlyTotals}`;
tr.appendChild(th);


const cityForm = document.getElementById('add-city');


cityForm.addEventListener('submit', handleSubmit);
