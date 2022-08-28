import './scss/main.scss'
import './scss/reset.scss'
const imgUrl = require("./img/hamburger.svg")
console.log('JS loaded!')

// dom
const steps = document.querySelectorAll('.stepper-container_step')
const formSections = document.querySelectorAll('section')
const btnNext = document.querySelector('.btn.btn--next')
const btnPrev = document.querySelector('.btn.btn--prev')
const cart = document.querySelector('.main-container_right_box') 
const cartItem = document.querySelectorAll('.main-container_right_box_item')
const prices = document.querySelectorAll('.price')
const cartTotal = document.querySelector('.cart-total-num')
let sectionNum = 0
let qtys = []

btnNext.addEventListener('click', () => {
  sectionNum++
  if (sectionNum > formSections.length - 1)
  return
  formProgress(sectionNum)
  progressControl(sectionNum)
})
btnPrev.addEventListener('click', () => {
  sectionNum--

  if (sectionNum < 0) {
    return
  } else if (sectionNum > formSections.length - 1) {
    sectionNum = formSections.length - 2
  }
  formProgress(sectionNum)
  progressControl(sectionNum)
})

// 表單階段控制
function formProgress (num) {
  if (num === formSections.length - 1) {
    btnNext.classList.add('submit')
    btnNext.innerHTML = `<p class="m-0">確認下單</p>`
  } else {
    btnNext.classList.remove('submit')
    btnNext.innerHTML = `<p class="m-0">下一步</p>`
  }
  formSections.forEach((item, idx) => item.classList.add('d-none'))
  formSections[num].classList.remove('d-none')
}

// progress-bar 控制
function progressControl (num) {
  steps.forEach((item, idx) => item.classList.remove('active', 'checked'))
  steps[num].classList.add('active')
  if (num > 0) {
    steps[num - 1].classList.add('checked')
    btnPrev.classList.remove('disabled')
  } else {
    btnPrev.classList.add('disabled')
  }
}

// 購物籃 項目價錢
document.querySelectorAll('.qty_num').forEach((item, idx) => {
  qtys.push(Number(item.innerHTML))
})

cart.addEventListener('click', (event) => {
  let index = event.target.closest('.main-container_right_box_item').dataset.id
  let qty = qtys[index - 1]

  if(event.target.matches('.qty_plus')){
    qty++
    event.target.previousElementSibling.innerHTML = qty
  }

  if(event.target.matches('.qty_minus') && qty > 0){
    qty--
    event.target.nextElementSibling.innerHTML = qty
  }
  qtys.splice((index - 1), index, qty)
  total()
})
// 加總
function total(){
  let sum = 0
  cartItem.forEach((item, idx) => {
    sum = Number(prices[idx].innerHTML.slice(1)) * qtys[idx] + sum
  }) 
  cartTotal.innerHTML = '$' + sum
}
