var menu = document.querySelector('#chocolateMenu');
var menuButton = document.querySelector('#chocolateMenuButton');

var sendButton = document.querySelector('#sendForm');
var clearButton = document.querySelector('#clearForm');
var formModal = document.querySelector('.form__modal-container');
var sendResultContainer = document.querySelector('.modal__text');
var closeModal = document.querySelector('#closeForm');

var commentsControls = document.querySelectorAll(".comments__avatar");
var comments = document.querySelectorAll(".comment");
var currentComment = 0;
var slideInterval = setInterval(nextComment, 4000);


const slideLeft = document.querySelector(".btn__arrow--prev");
const slideRight = document.querySelector(".btn__arrow--next");
const slider= document.querySelector("#slider");
const slides = document.querySelectorAll(".slider__item");
const slide= document.querySelector(".slider__item");
let minRight = -slide.offsetWidth;
let maxRight = (slides.length  - 2)*slide.offsetWidth;
let step = slide.offsetWidth;
let currentRight = 0;
slider.style.right =currentRight;

const accordeonItem = document.querySelector(".item__content-author");
const accordeonItems = document.querySelectorAll(".item__content-author");

const menuAccordeons = document.querySelectorAll(".menu1__button");

for(let i=0;i<accordeonItems.length;i++){
    accordeonItems[i].addEventListener('click',(e)=>{
        e.preventDefault();
        accordeonItems[i].parentNode.classList.toggle("item__content--active");
     

    })
}


for(let i=0;i<menuAccordeons.length;i++){
    menuAccordeons[i].addEventListener('click',(e)=>{
        e.preventDefault();
        menuAccordeons[i].parentNode.classList.toggle("menu1__item--active");
        

    })
}


function toggleMenu(menue, button) {
    menue.classList.toggle("menu--active");
    button.classList.toggle("is-active");
    menue.classList.remove("fadeOut");
}

menuButton.addEventListener("click", function () {
    if (this.classList.contains("is-active")) {
        menu.classList.add("fadeOut");
        setTimeout(() => {
            toggleMenu(menu, menuButton);
        }, 400);


    } else {
        toggleMenu(menu, menuButton)
    }
});


menu.addEventListener("click", function (e) {
    e.preventDefault();
    var target = e.target;
    if (target.classList.contains('menu__link') && menu.classList.contains("menu--active")) {
        menu.classList.add("fadeOut");
        setTimeout(() => {
            menu.classList.remove("menu--active");
            menuButton.classList.remove("is-active");
        }, 400);


    }
});


clearButton.addEventListener("click", function (e) {
    e.preventDefault();
    for(let i=0;i<document.forms[0].elements.length;i++){
        document.forms[0].elements[i].value="";
    }
})

sendButton.addEventListener("click", function (e) {
    e.preventDefault();
    var message = generateData(document.forms[0].elements);
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open("POST", "https://webdev-api.loftschool.com/sendmail");
    req.onload = function () {
    
        sendResultContainer.textContent=req.response.message
        closeModal.addEventListener("click",(e)=>{
            e.preventDefault();
            formModal.classList.remove("form__modal-container--active");
        })
        formModal.classList.add("form__modal-container--active");
    }
    req.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    req.send(message);
});


function generateData(value) {
    var data = new FormData();
    var form = value;
    data.append("name", form["name"].value);
    data.append("phone", form["phone"].value);
    data.append("comment", form["comment"].value);
    data.append("to", "jackpanchenko@mail.ru")
    return data;
}


for (let i = 0; i < commentsControls.length; i++) {
    const it = commentsControls[i];
    
    it.setAttribute('data-index', [i]);
    it.addEventListener("click", function (e) {
        e.preventDefault();
        this.classList.add("user--active");
        goToComment(it.getAttribute('data-index'));
    })
}




function nextComment() {
    goToComment(currentComment + 1);
}

function goToComment(n) {
    comments[currentComment].classList.remove("comment--active");
    comments[currentComment].style.display = "none";
    commentsControls[currentComment].classList.remove("user--active");
    currentComment = (n + comments.length) % comments.length;
    comments[currentComment].style.display = "flex";
    commentsControls[currentComment].classList.add("user--active");
    setTimeout(() => {
        comments[currentComment].classList.add("comment--active");
    }, 100);
}




function moveLeft(){
  
    if(currentRight < maxRight){
        currentRight += step;
        slider.style.right = currentRight +"px";
    }
    else{
        currentRight = maxRight;
        slider.style.right = minRight +'px'
    }
}

function moveRight(){
    if(currentRight > minRight){
        currentRight -= step;
        slider.style.right = currentRight +"px";
    }
    else{
        currentRight = minRight;
        slider.style.right = maxRight +'px'
    }
}

slideLeft.addEventListener("click",(e)=>{
    e.preventDefault();
    moveLeft();
})

slideRight.addEventListener("click",(e)=>{
    e.preventDefault();
    moveRight();
})
