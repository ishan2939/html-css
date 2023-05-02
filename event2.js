/*---------------------use events module using inheritance---------------------------*/
const event = require('events');

class eventObj extends event{
    constructor(){
        super();
    }
}

const eo = new eventObj();

eo.on("hey", () => {
    console.log("hey🤟");
});

eo.emit("hey");
