import './scss/main.scss'
const logoUrlDefault = require("./img/Logo.png")
const logoUrlDark = require("./img/Logo-dark.png")
const imgUrl = require("./img/hamburger.svg")
const cartIcon = require("./img/icon_cart.svg")
const modeIconDark = require("./img/icon_mode-dark.svg")
const modeIconLight = require("./img/icon_mode-light.svg")
const searchIcon = require("./img/icon_search.svg")
console.log('JS loaded!')

// dom
const steps = document.querySelectorAll('.stepper-container_step')
const formSections = document.querySelectorAll('section')
const btnNext = document.querySelector('.btn.btn--next')
const btnPrev = document.querySelector('.btn.btn--prev')
const cart = document.querySelector('.main-container_right_box_wrap') 
const cartItem = document.querySelectorAll('.main-container_right_box_item')
const mainContainer = document.querySelector('.main-container')
const cartTotal = document.querySelector('.cart-total-num')
const modeToggleBtn = document.getElementById('dark-mode-toggle')
const deliverWay = document.querySelectorAll('.main-container_left_form_address')
let theme = localStorage.getItem('theme')
let sectionNum = 0
let delivery = 0
let qtys = []
let prices = [3999, 1299]

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
  steps.forEach((item, idx) => item.classList.remove('active'))
  steps[num].classList.add('active')
  if (num > 0) {
    steps.forEach((item, idx2) => {
      if(num <= idx2){
        item.classList.remove('checked')
      }else{
        item.classList.add('checked')
      }
    })
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

  if (event.target.matches('.qty_plus')) {
    qty++
    event.target.previousElementSibling.innerHTML = qty
  }

  if (event.target.matches('.qty_minus') && qty > 0) {
    qty--
    event.target.nextElementSibling.innerHTML = qty
  }
  qtys.splice((index - 1), index, qty)
})

// 運費
function deliverAdd(el){
  if (el.matches('.address-label')) {
    deliverWay.forEach((item, index) => item.classList.remove('selected'))
    el.parentNode.classList.add('selected')
    delivery = Number(el.nextElementSibling.value)
  }
  delivery === 0 ? document.querySelector('.delivery-fee').innerHTML = "免費" : document.querySelector('.delivery-fee').innerHTML = '$' + delivery
  return delivery
}

// 加總
function total(){
  let sum = 0
  cartItem.forEach((item, idx) => {
    sum = prices[idx] * qtys[idx] + sum
  }) 
  cartTotal.innerHTML = '$' + Number(sum + delivery).toString().replace(/\B(?=(?:\d{3})+\b)/g, ',')
}

mainContainer.addEventListener('click', (event) => {
  deliverAdd(event.target)
  total()
})

// dark mode
if(theme){
  document.documentElement.setAttribute("data-theme", theme)
}

modeToggleBtn.addEventListener('click', (event) => {
  event.target.checked ? theme = "dark" : theme = "light"
  localStorage.setItem("theme", theme)
  document.documentElement.setAttribute("data-theme", theme)
  return theme 
})