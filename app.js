// function abc(){
//     let a =10;
//     console.log(this);
//     innerFunction();
//     function innerFunction (){
//          console.log(this);
//          console.log('inner function');
//      }
//     this.one = function (){
//        // console.log(this);
        
//         innerFunction();
//     }
//     Object.defineProperty( this, 'a', {
//         get: function(){
//             return a;
//         }
//     })
// }
// var obj1 = {
//     one : function(){
//         console.log('hi');
//     }
// }

// var obj = new abc();
// console.log(Object.getPrototypeOf(obj));
// console.log(obj.aB);
// obj.one();

// //obj.innerFunction();

// //console.log(obj);

// var BudgetController = (function(){
//     var x; 

//     function add(x)
//     {
//         return a+x;
//     }

//     var 
// })

// function sayHello(){
//     return 'hello';
// }



// function Circle(){
//     let name= 'anc';
//     this.name= name;
//     this.fxn = function(){
//         console.log('in function');
//     }
// }

// function greeting(message, name){
//     return function(){
//         //console.log(message() + name);
//     }
// }

// let fun = greeting(sayHello, 'priyanka')();
// console.log(fun);


// var person ={
//     name: 'priyanka',
//     fun: function(){
//         console.log(this);
//         function innerFunction(){
//             console.log(this);
//         }
//         innerFunction();
//     }
// }

// person.fun();

// function Person(name){
//     this.name = name;
// }
// var fxn = Array.prototype.map;

// Person.prototype.fxn = function (friends){
//     return friends.map( (el) => {
//             return `${this.name} my name is ${el}`;
//     });
    
// }

// var obj = new Person('priyanka').fxn(['kl', 'jk', 'j']);
// console.log(obj);

// var person = {
//     firstName : 'priyanka',
//     lastName : 'hasija'
// }

// const {firstName, lastName } = person;

// //Normally
// function sum(a,b,c,d){
//     return a+b+c+d;
// }
// var mySum = sum(1,3,4,2);
// //console.log(mySum);

// //ES5
// var arr= [1,2,3,4];
// function calcSum(a,b,c,d){
//     return a+b+c+d;
// }

// //var mySum1 = calcSum.apply(null, arr);
// //console.log(mySum1);

// //ES6
// //Spread Operator 
// var sum6 = calcSum(...arr);
// console.log(sum6);


// function fullAge(limit){
//     console.log(limit);
//     console.log(arguments);
//      var arr = Array.prototype.slice.call(arguments,1);
//      console.log(arr);
//      console.log(limit);
//    // console.log(args);
//     arr.forEach(element => {
//        //console.log(element) ;
//     });
// }

//fullAge(21, 1992,1995);
// var greeting = function(){
//     let counter = 0;
//     return {
//         inc : function(){
//         console.log(counter);
//         //console.log(this);
//         return counter++;
//     }
//   };
// };

function Person(name,lastName){
        this.firstName = name;
        this.lastName = lastName;
}


function Man(name,lastName,medals){
    Person.call(this,name,lastName);
    this.medals = medals;
}

Man.prototype = Object.create(Person.prototype);

var obj = new Man('priyanka', 'hasija', 8);


class A{
    constructor(name,lastName){
        this.name = name; 
        this.lastName = lastName;
    }
    static abc(){
        console.log('hi');
    }
}

class B extends A{
    // constructor(name,lastName, medals){
    //     super(name , lastName);
    //     this.medals = medals;
    // }

}

var obj1= new B('kl','jk', 90);
//obj1.abc();

class NullExtend extends null{

}
