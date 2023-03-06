//simple function
/* greetings();
function greetings(){
    alert("Hello");
} */

//better one
/* function greetings(){
    let name = prompt("Enter your name please: ");
    alert("Welcome " + name);
}
greetings(); */


//function calling another function
/* function greetings(name){
    alert("Hello " + name);
}

function getName(){
    let name = prompt("Enter your name : ");
    greetings(name);
}

getName(); */

//default values for function
/* function greetings(name="Ishan harkhani"){
    alert("hello " + name);
}

greetings(); */

//function expression
/* let greetings = function(name="Ishan Harkhani"){
    alert("Hello, " + name);
}

greetings(); */

//functions are values only

/* function greetings(name="Ishan Harkhani"){
    alert("Hello, " + name);
}
alert(greetings);

let getName = function(){
    return prompt("Enter your name: ");
}
alert(getName);*/

function x(){
    console.log("hello");
}
alert(typeof x);


const parent = {
    mom_name: "Samantha Quinn",
    mother: function () {
        return `${this.mom_name} is my mother`;
    },
};
console.log(parent.mother());