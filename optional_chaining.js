//optional chaining using ?.
let user={
    name: "Ishan",
    age: 21,
    getName: function(){
        return this.name;
    }
}
//access the property using .
alert(user?.age);
alert(user?.ishan);

//access the methods
alert(user.getName?.());
alert(user.getAge?.());

//access the property using []
alert(user?.["name"]);
alert(user?.["ishan"]);
alert(typeof user);
