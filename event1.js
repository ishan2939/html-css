/*----------------------use events module----------------------------*/
const event = require('events');

const eventObj  = new event();

// eventObj.on("hello", () => {
//     console.log("hello guys👋2");
// });

// eventObj.on("hello", () => {
//     console.log("hello guys👋1");
// });

eventObj.on("hello", x => {
    console.log(`hello guys👋${x}`);
});

eventObj.emit("hello", 3);