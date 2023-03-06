let user = {
    name:"ishan"
}

let x = Symbol("Hello");

console.log(x);
console.log(x.description);

//using symbol as key
user[x] = "welcome";
console.log(user);
console.log(user[x]);

//for loop ignores symbols and only shows regular properties.
for(u in user){
    console.log(u);
}

//but cloning does not ignore symbol properties
let y = {};
console.log(Object.assign(y,user));