var menu = document.querySelector('#chocolateMenu');
var menuButton = document.querySelector('#chocolateMenuButton');
var sendButton = document.querySelector('#sendForm');
var clearButton = document.querySelector('#clearForm');

function toggleMenu(menue, button) {
    menue.classList.toggle("menu--active");
    button.classList.toggle("is-active");
    menue.classList.remove("fadeOut");
}
menuButton.addEventListener("click", function () {
    if (this.classList.contains("is-active")) {
        menu.classList.add("fadeOut");
        setTimeout(()=>{
            toggleMenu(menu, menuButton);
        },400);
       
 
    } else {
        toggleMenu(menu, menuButton)
    }
});


menu.addEventListener("click", function (e) {
    e.preventDefault();
    var target = e.target;
    if (target.classList.contains('menu__link') && menu.classList.contains("menu--active")) {
        menu.classList.add("fadeOut");
        setTimeout(()=>{
            menu.classList.remove("menu--active");
            menuButton.classList.remove("is-active");
        },400);
       
 
    }
});



sendButton.addEventListener("click", function (e) {
    e.preventDefault();
    var message = generateData(document.forms[0].elements);
    console.log(message);
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open("POST", "https://webdev-api.loftschool.com/sendmail");
    req.onload = function () {
        console.log(req.response);
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