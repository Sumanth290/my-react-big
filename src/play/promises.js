const promise = new Promise( (resolve,reject) => {
    setTimeout(() => {
        // resolve("Resolved !!!!!!!!");
        // resolve({
        //     obj1 : "eadg sdg",
        //     obj2 : 35
        // });
        reject("Rejected !!!!!!!!")
    },3000);
});


console.log("before");

promise.then((data) => {
    console.log("data:",data);
}).catch((err) => {
    console.log("error :",err);
});

console.log("after");