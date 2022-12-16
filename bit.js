// TYPEWRITTER SCRIPT//
const Typewriter = function(txtElement, words, wait = 3000){
  this.txtElement = txtElement
  this.words = words
  this.txt = ''
  this.wordIndex = 0
  this.wait = parseInt(wait, 10)
  this.type()
  this.isDeleting = false 
}

// Type Method
Typewriter.prototype.type = function(){ 
  // Current index of word
  const current = this.wordIndex % this.words.length 
  // Get full text of currentv word
  const fullTxt = this.words[current] 

  // Check if deleting
  if(this.isDeleting){
    // Remove char
    this.txt = fullTxt.substring(0, this.txt.length - 1)

  }else {
    // Add Char
    this.txt = fullTxt.substring(0, this.txt.length + 1)
  }

  // Indert txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

  // Type Speed
  let typeSpeed = 300

  if(this.isDeleting){
    typeSpeed /= 3
  }

  // If word is complete
  if(!this.isDeleting && this.txt === fullTxt){
    // Make pause at end
    typeSpeed = this.wait
    // Set deleting to true
    this.isDeleting = true 
  } else if(this.isDeleting && this.txt === ''){
    this.isDeleting = false
    // Move to next word
    this.wordIndex++
    // Pause before start typing
    typeSpeed = 500
  }

  setTimeout(() => this.type(), typeSpeed)
}


// Init on DOM Load
document.addEventListener('DOMContentLoaded', init)


// Init App
function init(){
  const txtElement = document.querySelector('.txt-type')
  const words = JSON.parse(txtElement.getAttribute('data-words'))
  const wait = txtElement.getAttribute('data-wait')

  // Init Typewriter
  new Typewriter(txtElement, words, wait)

}


// END OF TYPEWRITTER SCRIPT


// HEADER SCRIPT************************************//
// Morphing Burger Icon{}
let menu = document.querySelector('.menu')
let burger = document.querySelector('.burger')
let navlinks = document.querySelector('header nav')
let head = document.querySelector('header')

menu.addEventListener('click', ()=>{
   menu.classList.toggle('swish')
   burger.classList.toggle('swish')
   navlinks.classList.toggle('swish')
   head.classList.toggle('swish')
})


// End of Morphing Burger Icon{}

// Mobile Menu Slide View

// End of Mobile Menu Slide View

// HEADER STICKY ON UP-SCROLL
const body = document.body
let lastScroll = 0

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset

  if(currentScroll <= 0){
    body.classList.remove("scroll-up")
  }

  if (currentScroll > lastScroll && !body.classList.contains("scroll-down")){
    body.classList.remove("scroll-up")
    body.classList.add("scroll-down")
  }
  if (currentScroll < lastScroll && body.classList.contains("scroll-down")){
    body.classList.remove("scroll-down")
    body.classList.add("scroll-up")
  }


  lastScroll = currentScroll


})
// END OF HEADER STICKY ON UP-SCROLL

// END of HEADER SCRIPT************************************//

// ***************Contact Form Script
const inputs = document.querySelectorAll('.input');

function focusFunc(){
  let parent = this.parentNode;
  parent.classList.add('focus')

}
function blurFunc(){
  let parent = this.parentNode;
  if(this.value == ""){
  parent.classList.remove('focus')
  }

}

inputs.forEach((input) => {
  input.addEventListener('focus', focusFunc);
  input.addEventListener('blur', blurFunc);

})

// ******************End of Contact Form Script
