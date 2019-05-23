var name = "Jack"; 
console.log(name); 

name = "Bob"; 
console.log(name); 


if(name == "Jack"){ 
console.log("имя = Jack") 
}else{ 
console.log("имя = Bob") 
} 

for(var i = 0; i<10; i++){ 
console.log(i) 
} 

function sum(p1,p2,p3){ 
var result = p1+p2+p3 
return result; 
} 

console.log(sum(10,20,30)); 

var res = sum(10,20,30); 

console.log(res); 



console.log(sum(120,230,3210)); 



//Массивы 

var arr = ['Привет','loftschool']; 
arr.push('я изучаю' ,'javascript'); 
console.log(arr.length); 



for(var i=0;i<arr.length;i++){ 
console.log(arr[i]); 
} 


var arr2 = []; 
arr2.push(1,2,3,4,5,600,700,800,900,1000); 
for(var i=0;i<arr2.length;i++){ 
if(arr2[i]>100) console.log(arr2[i]); 
} 

var obj ={ 
name:"Jack", 
lastName:"Panchenko", 
age:25 
} 

console.log("Имя: "+ obj.name + " Фамилия: " + obj.lastName + " Возраст: " + obj.age); 
var obj2 = {sex : "men"} 

obj.sex = obj2; 

console.log(obj.sex); 


function hello(human){ 
return "Привет, меня зовут " + human.name + " " +human.lastName + " и мне "+ human.age +" лет!"; 
} 

var res2 = hello(obj) 
console.log(res2);