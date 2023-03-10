var x = 1;
// a();
// b();
c();
console.log(x);

// function a(){
//     var x = 10;
//     console.log(x);
// }
// function b(){
//     var x = 100;
//     console.log(x);
// }
function c(){
    var x = 1000;
    function hey(){
        var y = 12;
        console.log(y);
    }
    hey();
    console.log(x);
}
// var x = 0;
// console.log(x);