
//create a calculator using constructor
function Calculator(){
    this.read = function(){
        this.a = +prompt("Enter the value of a: "),
        this.b = +prompt("Enter the value of b: ")
    };
    this.sum = function(){
        return (this.a + this.b);
    };
    this.mul = function(){
        return (this.a*this.b);
    };
}
let c = new Calculator();
c.read();
alert(c.sum());
alert(c.mul());