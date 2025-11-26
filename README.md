1.  What is the difference between var, let, and const?

    Answer: The primary diffrence between var,let and const in JavaScript revolve around their scope, reassignment/redeclaration rules, and hoisting behavior. let and const were introduced in ES6 (2015) as modern alternatives to var that offer more predictable behavior.
    
            i.    Var is Function-scoped or Globally-scoped but both let and const are Block-scoped.
    
           ii.    Var allowed reassignment/redeclaration within the same scope, let allowed reassignment it doesn't allow redeclaration and const doesn't allow reassignment/redeclaration.
    
          iii.    var Hoisted and initialized with 'Undefined but both let and const Hoisted, but not initialized 'Undefined'. Accessing it before declaration results in a ReferenceError (Temporal Dead Zone).

2.  What is the difference between map(), forEach(), and filter()?

    Answer: The methods map(), forEach(), and filter() are all common array iteration methods in JavaScript, but they serve distinct purposes, primarily concerning what they return and whether they modify the original array.

            i.    map() is used to transform each element and create a new array of the same length, forEach() is used to iterate over the elements and execute a condition for each one and filter() is used to select elements that pass a condition and create a new array                       with only those elements.

           ii.    map() returns a new array containing the results of calling a provided function on every element in the calling array, forEach() returns undefined and filter() returns a new array containing all elements that satisfy the provided testing function.

          iii.    map(),forEach() and filter() does not modify the original array (Immutable), but forEach() the callback function can cause side effects (like modifying external state or the array itself).

3.  What are arrow functions in ES6?
   
    Answer:  Arrow functions are a concise alternative to traditional JavaScript function expressions, introduced in ECMAScript 2015 (ES6). They offer a shorter syntax and, crucially, do not have their own bindings for this, arguments, super, or new.target.Arrow functions               drastically shorten function declarations, especially for simple one-line operations.

             Example: i) const add = (a, b) => { return a + b; }; // Single Function

                     ii) const hi = () => 'Hi!'; // No Parameters

4.  How does destructuring assignment work in ES6?

    Answer:  Destructuring assignment is a powerful feature introduced in ES6 (ECMAScript 2015) that allows you to unpack values from arrays or properties or key-value from objects into distinct variables. It provides a more readable and concise way to extract data.
             There are two prominent types of destructuring: Array Destructuring and Object Destructuring.

             Example: i) Array Destructuring :
                         const fruits = ['Mango', 'Apple', 'Blueberry'];

                         // Destructure the first, second, and third elements
                         const [first, second, third] = fruits;

                         console.log(first);  // Output: 'Mango'
                         console.log(second); // Output: 'Apple'
                         console.log(third);  // Output: 'Blueberry'

                     ii) Object Destructuring :

                         const student = {
                         firstName: 'Jarry',
                         lastName: 'Doe',
                         age: 30
                         };

                        // Destructure the properties by their names
                        const { firstName, age } = student;

                        console.log(firstName); // Output: 'Jane'
                        console.log(age);       // Output: 30
                        // console.log(lastName); // ReferenceError, unless it was also destructured

5.   Explain template literals in ES6. How are they different from string concatenation?
     Answer:  Template literals, introduced in ES6 (ECMAScript 2015), are a modern way to create strings in JavaScript. They offer significant improvements over traditional string methods, primarily in handling variable interpolation and multi-line strings.
              Template literals are enclosed by backticks ( ` ` ) instead of single or double quotes.The most powerful feature is expression interpolation, which allows you to embed variables or expressions directly into the string using the placeholder syntax                         ${expression}.

              Example: const name = "Bijoy";
                       const age = 23;

                       // Using a template literal
                       const greeting = `Hello, my name is ${name} and I am ${age} years old.`;

                       console.log(greeting);
                       // Output: Hello, my name is Bijoy and I am 23 years old.
    
