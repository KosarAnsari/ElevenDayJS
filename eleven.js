//async await >> promise chains >> callback hell
//callback functions
function sum(a,b){
    console.log(a+b);
}

function calculator(a,b,sumcallback){
    sumcallback(a,b);
}
calculator(1,2,sum);

let hello = () => {

    console.log("hello")

}

setTimeout(hello,3000);

//callback hell :- nested callbacks stacked below one another forming a pyramid structure(pyramid of doom).this style of programming becomes difficult to understand and manage.
/*function getData(dataId, getNextData){ // using getNextData so that we can call the first data before and second data after that,not on same times.
    setTimeout(()=>{
        console.log("data = ",dataId);
        if(getNextData){ // this means if next data exist then only call the next data after first data,if we do not pass this code then there will be an error.
            getNextData();
        }
        
    },2000);
}

getData(1,() => { // this callback fxn is the proper syntax to call next data because if we will not then the second data is called and logs over screen first and throws error becoz we want to call it after than the first fxn. 
    console.log("getting data2...");
    getData(2,() => {
        console.log("getting data3...");
        getData(3,() => {
            console.log("getting data4...");
            getData(4);   //these datas will execute one after another,and we have created nested callbacks which is making this code very messy and difficult to understand and thats why it is called callback hell.
        })
    });
});*/

// and to solve this callback hell problem javascript introduced the concept of PROMISES.
//promises give us the promise that our task will be completed nd there will be two scenarios whether it will be resolved(successful) or rejected.
//Syntax:- let promise = new promise((resolve,reject) => {...})
//promises have three states during its completion:- pending,fulfilled,rejected
let getPromise = () => {
    return new Promise((resolve,reject) => {
    console.log("I am a promise.");
    //resolve("success"); //fulfilled state
    reject("error occured");
});
};
 
let promise = getPromise();
promise.then((res) => {
    console.log("Promise Fulfilled",res);
})


promise.catch((err) => {
    console.log("Promise Rejected",err);
})

function fetchData(Dataid, getnextdata){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log("data",Dataid);
            resolve("success");
            if(getnextdata){
                getnextdata();
            }
        },5000);
    })
}

//how to use Promises
/* there are two cases
1.) manlo humara promise successful ho gya to ky pta uske bd koi kam krana ho ,for that we use ".then()"  method to get the work done next to fulfilled promise.
syntax:-promise.then((res) => {...}) , yeh code / fxn tbhi execute agr promise fulfill hoga
2.)manlo humara promise reject ho gya to ho skta hai uske bd hume koi or km ya req send krni ho, for that purpose we use ".catch()" method to get the next work done after the promise get rejected
syntax:-promise.catch((err)={....}) , yeh code /fxn srf tbhi execute hoga jb promise reject hoga */

//Promise Chaining
/*function asyncFunc(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log("some data0");
            resolve("success0");
        },4000);
    });
}
console.log("fetching data...");
let p1 = asyncFunc();
p1.then((res) => {
  console.log(res);
})

function asyncFunc1(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log ("some data2");
            resolve("success1");
        },4000);
    });
};
console.log("fetching data 1...");
let p2 = asyncFunc1();
p2.then((res) => {
    console.log(res);
})*/

//asyncFunc and asyncFunc1 will execute parallely i.e, at the same time but we want to print asyncFunc before and asyncFunc1 later,so to serve the purpose we can use promise chaining.
//syntax of code for promise chaining


function asyncFunc1(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log("some data 1...")
            resolve("success");
        }, 5500);
    });
};


function asyncFunc2(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log("some data 2...");
            resolve("success");
        },5500);

    });
};
console.log("fetching data 1....")
let p1 =  asyncFunc1();
p1.then((res) =>{
    console.log(res);
    console.log("fetching data 2...");
    let p2 = asyncFunc2();
    p2.then((res) => {
        console.log(res);
    });
});

function getData(dataId){
    return new Promise((resolve,reject) =>{
        setTimeout(() => {
            console.log("data" , dataId);
            resolve("success");
            

        },5000);
    });
};

/*getData(1).then((res) => {
 console.log(res);
 getData(2).then(() => {
    console.log(res);
    getData(3).then(() => {
        console.log(res);
    })
 })
});*/ //another better way to write this code--

/*getData(1)
.then((res) =>{
    return getData(2);
})
.then((res) => {
    return getData(3);
})
.then((res) => {
    return getData(4)
})
.then((res)=>{
    console.log(res);
});*/  

//a simpler way of writing this code using async-await

async function getallData() {
    console.log("getting data 1...");
     await getData(1);
      console.log("getting data 2...");
     await getData(2);
      console.log("getting data 3...");
     await getData(3);
    
}  // writing this code using IIFE

(async function () {
    console.log("getting data 1...");
    await getData(1);
    console.log("getting data 2...");
    await getData(2);
    console.log("getting data 3...");
    await getData(3);
    console.log("getting data 4...");
    await getData(4);
    
})(); // we can not call IIFE's later in our program , we have to paste the code to use it again.


//promise chaining is also difficult to understand so we have async await to make the code easier to understand.
//Async-Await:- async function always returns promise,await pauses the execution of its other surrounding async function until the promise is settled.
//Syntax:- async function func_name(){...}

async function Hello(){
    console.log("Hello");
}

function api(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log("weather data");
        resolve(200);
        },1000);
    });
};

// await api(); this will not work and give error due to the reason mentioned below.

async function getWeatherData() {
    await api(); // 1st call, await always works inside async function .
    await api(); // 2nd call
    
}

//NOTE :- we can use whether async-await or.then(),.catch() in a function | we can not use them simultaneously for a same function.

// IIFE :- Immediately invoked function expression , we use iife to avoid the problem of unneccessary function calling at beginning in async-await.
//ways of writing IIFE's | syntax:- ( any function)();