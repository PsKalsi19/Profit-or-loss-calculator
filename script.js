const submitBtn = document.querySelector('#submit-button');
const initialPrice = document.querySelector('#initial-price');
const quantity = document.querySelector('#quantity');
const currentPrice = document.querySelector('#current-price');
const errorContainer = document.querySelector('#error');
const outputContainer = document.querySelector('.output-container');
const result = document.querySelector('#result');
const body = document.querySelector('body');
const lossColor = '#fee2e2'
const profitColor = '#dcfce7'
const actualColor = '#fff7ed'
submitBtn.addEventListener('click', checkData)

function checkData() {
  if (verifyInputs()) {
    calculateProfitAndLoss(Number(initialPrice.value), Number(currentPrice.value), Number(quantity.value))
  }
}

function verifyInputs() {
  if (initialPrice.value === '' || currentPrice.value === '' || quantity.value === '') {
    setError('All Fields are required')
    return false
  }

  if (quantity.value < 1) {
    setError('Please enter valid quantity.')
    return false;
  }
  // else if (Number(input.value) <= 0) {
  //   setError('Input invalid, please provide positive integers.')
  //   return false
  // }

  hideError()
  return true
}



// logical functions

function calculateProfitAndLoss(initPrice, currPrice, quant) {
  if (initPrice > currPrice) {
    const lossAmount = loss(initPrice, currPrice, quant)
    const lossPercent = lossPercentage(lossAmount, initPrice)
    setOutput(`Sorry, you are in loss of amount ${lossAmount} which is ${lossPercent}%`);
    changeBodyColor(lossColor)
  }
  else if (currPrice > initPrice) {
    const profitAmount = profit(initPrice, currPrice, quant)
    const profitPercent = profitPercentage(profitAmount, initPrice)
    setOutput(`Hey, you've gained profit of amount ${profitAmount} which is ${profitPercent}%`)
    changeBodyColor(profitColor)
  }
  else {
    setOutput(`No Pain no gain, no gain no pain`)
    changeBodyColor(actualColor)
  }
}

function profit(initPrice, currPrice, quant) {
  return (currPrice - initPrice) * quant
}

function profitPercentage(profit, initPrice) {
  return ((profit / initPrice) * 100).toFixed(2)
}

function loss(initPrice, currPrice, quant) {
  return (initPrice - currPrice) * quant
}

function lossPercentage(loss, initPrice) {
  return ((loss / initPrice) * 100).toFixed(2)
}
// hide and show functions
function setError(errMessage) {
  errorContainer.style.display = 'block'
  errorContainer.innerText = errMessage;
  hideOutput();
}

function hideError() {
  errorContainer.style.display = 'none'
}

function setOutput(outputMessage) {
  result.innerText = outputMessage;
  outputContainer.style.display = 'block'
  hideError();
}

function hideOutput() {
  outputContainer.style.display = 'none'
  result.innerText = '';
}

function changeBodyColor(color) {
  body.style.backgroundColor = color;
}