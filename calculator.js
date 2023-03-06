let calculator = {
    a: 0,
    b: 0,
    
    read: function(){
        this.a = prompt("Enter the value of a: ");
        this.b = prompt("Enter the value of b: ");
    },

    sum: function(){
        return (+this.a + +this.b);
    },

    mul: function(){
        return ((+this.a)*(+this.b));
    }

}
calculator.read();
alert(calculator.sum());
alert(calculator.mul());