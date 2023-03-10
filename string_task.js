/* //task 1 apply uppercase to first letter of string

function ucFirst(str){
    return (str[0].toUpperCase() + str.slice(1));
}

console.log(ucFirst("john doe")); */

//task 2
function checkSpam(str){
    let x = str.toUpperCase();
    if(x.includes('VIAGRA') || x.includes("XXX")){
        return true;
    }
    return false;
}

console.log(checkSpam("buy ViAgRA now"));
console.log(checkSpam('free xxxxx'));
console.log(checkSpam("innocent rabbit"));
