// function a(){
//     var x = 10;
//     function b(){
//         console.log(x);
//     }
//     b();
// }
// a();

function z(){
    var y = 100;
    function a(){
        var x = 10;
        function b(){
            //x = 20;
            console.log(x + y);
        }
        b();
    }
    a();
}
z();