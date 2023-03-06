let user = {
    name: "Ishan",
    age: 10,
    fee: {
        issubmitted: true
    }
}
let clone = {};
/* //naive way
clone = user */

/* //using object.assign
//Object.assign(clone,user);//1 way
clone = Object.assign({},user);
 */

//deep copy
clone  = structuredClone(user);
console.log(clone);