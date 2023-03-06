function User(name,age){
    this.name = name,
    this.age = age,
    this.readName = function(){
        
        function x(){
            console.log(this);//this with function
        }
        x();

        return this.name;//this with method
    }
}

let user = new User("ishan",21);
console.log(user);
console.log(user.readName());
