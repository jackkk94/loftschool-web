//№1
var div = document.createElement('div');
div.textContent= "Этот элемент создан при помощи DOM API";
document.body.appendChild(div);

//2
var div1=document.createElement('div');
div1.classList="inner";
div1.textContent="Этот элемент тоже создан при помощи DOM API";
div.appendChild(div1);

//3

div.style.color="red";
//4

div.addEventListener('click',function(){
  console.log("Этот текст говорит о том, что я всё сделал правильно");
})

//5

var a=document.createElement("a");
var href="https://loftschool.com"
a.href=href;
a.textContent="Ссылка";
document.body.appendChild(a);
a.addEventListener('click',function(e){
  e.preventDefault();
  console.log("Я кликнул на ссылку " + href);
})

//6

var input=document.createElement("input");
var button=document.createElement("button");
document.body.appendChild(input);
document.body.appendChild(button);
button.textContent="Кнопка";
button.addEventListener('click',function(e){
  e.preventDefault();
  console.log(input.value);
})

//7 содержимое js из codeopen
// const left = document.querySelector("#left");
// const right = document.querySelector("#right");
// const items = document.querySelector("#items");
// right.addEventListener("click", function() {
  
//   var shift = parseInt(getComputedStyle(items).marginLeft);
 

//   if(shift<0) items.style.marginLeft=shift+100+"px";
  
//  });

// left.addEventListener("click", function() {
//   var shift = parseInt(getComputedStyle(items).marginLeft);
//   if(shift>-500) items.style.marginLeft=shift-100+"px";
//   });
