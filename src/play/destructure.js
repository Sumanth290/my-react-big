
// const book = {
//     name: "Ego is the Enemy",
//     author: "Ryan Holiday",
//     publisher : {
//         // name: "Penguin"
//     }
// }

// const {name:publisherName = "Self-Published"} = book.publisher;

// console.log(publisherName);


const item = ["Coffee (iced)","$2.50","$3.00","$3.50"] ;

const [name, ,price] = item ;

console.log(`A medium ${name} costs ${price}`);