var x =10;

function hey(){
    var z = 11;
    
    console.log(this.z);
    console.log(window.z);
}
hey();
console.log(x);
console.log(this.x);
console.log(window.x);

//console.log(y);
console.log(this.y);
console.log(window.y);
//reason why y gives error but this.y and window.y does not is because window is an object
//when you try to access property that doesn't exists in object it won't give error but will show undefined.