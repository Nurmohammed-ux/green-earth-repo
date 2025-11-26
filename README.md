1.  What is the difference between var, let, and const?

    Answer: The primary diffrence between var,let and const in JavaScript revolve around their scope, reassignment/redeclaration rules, and hoisting behavior. let and const were introduced in ES6 (2015) as modern alternatives to var that offer more predictable behavior.
    
            i.    Var is Function-scoped or Globally-scoped but both let and const are Block-scoped.
    
            ii.   Var allowed reassignment/redeclaration within the same scope, let allowed reassignment it doesn't allow redeclaration and const doesn't allow reassignment/redeclaration.
    
            iii.  var Hoisted and initialized with 'Undefined but both let and const Hoisted, but not initialized 'Undefined'. Accessing it before declaration results in a ReferenceError (Temporal Dead Zone).
