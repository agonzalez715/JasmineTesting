let billAmtInput = document.getElementById('billAmt');//retreiving element called 'billAmt'
let tipAmtInput = document.getElementById('tipAmt'); //retreiving element called 'tipAmt'
let paymentForm = document.getElementById('paymentForm');//retreiving element called 'paymentForm'

let paymentTbody = document.querySelector('#paymentTable tbody');
let summaryTds = document.querySelectorAll('#summaryTable tbody tr td');

let allPayments = {};//to store payment information 
let paymentId = 0; //used to generate unique ID's

paymentForm.addEventListener('submit', submitPaymentInfo);//adding submit functionality to the form when clicking submit

// Add a curPayment object to allPayments, update html and reset input values
function submitPaymentInfo(evt) {
  if (evt) evt.preventDefault(); // when running tests there is no event

  let curPayment = createCurPayment();

  if (curPayment) {//if curPayment exists and has a value, then increment the paymentId by 1, see below
    paymentId += 1;

    allPayments['payment' + paymentId] = curPayment;// adds a new entry to the allPayments object where the key is created by concatenating the string payment and the paymentId

    //these functions are in charge of updating a certain element throughout the code
    appendPaymentTable(curPayment);
    updateServerTable();
    updateSummary();

    billAmtInput.value = '';//resetting bill amount 
    tipAmtInput.value = '';// resetting tip amount 
  }
}

// createCurPayment() will return undefined with negative or empty inputs
// positive billAmt is required but tip can be 0
//function takes the values form the bill and tip fields and checks if they are valid , and then returns the a payment object with the bill, tip, and calculated tip percentages 
function createCurPayment() {
  let billAmt = billAmtInput.value;
  let tipAmt = tipAmtInput.value;

  if (billAmt === '' || tipAmt === '') return;

  if (Number(billAmt) > 0 && Number(tipAmt) >= 0) {
    return {
      billAmt: billAmt,
      tipAmt: tipAmt,
      tipPercent: calculateTipPercent(billAmt, tipAmt),
    }
  }
}

// Create table row element and pass to appendTd with input value
function appendPaymentTable(curPayment) {
  let newTr = document.createElement('tr');
  newTr.id = 'payment' + paymentId;

  appendTd(newTr, '$' + curPayment.billAmt);
  appendTd(newTr, '$' + curPayment.tipAmt);
  appendTd(newTr, '%' + curPayment.tipPercent);

  appendDeleteBtn(newTr, 'payment');

  paymentTbody.append(newTr);
}

// Create table row element and pass to appendTd with calculated sum of all payment
function updateSummary() {
  let tipPercentAvg = sumPaymentTotal('tipPercent') / Object.keys(allPayments).length;

  summaryTds[0].innerHTML = '$' + sumPaymentTotal('billAmt');
  summaryTds[1].innerHTML = '$' + sumPaymentTotal('tipAmt');
  summaryTds[2].innerHTML = Math.round(tipPercentAvg) + '%';
}