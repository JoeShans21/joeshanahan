//Adds the entered value to the output section
var entered;
function add_value(character) {
  var current_value = document.getElementById("result").innerHTML;
  if (character=="/" || character=="*"){
    entered = String(current_value) + String(character);
    document.getElementById("result").innerHTML = entered;
  }
  else if (current_value=="0") {
      document.getElementById("result").innerHTML = character;
  }
  else {
    entered = String(current_value) + String(character);
    document.getElementById("result").innerHTML = entered;
  }
}
//Evaluates the equation and puts the result in the output section
var equation, out;
function equals() {
  equation = document.getElementById("result").innerHTML;
  equation = equation.replace("^", "**");
  equation = equation.replace("--", "+");
  equation = equation.replace("++", "+");
  try{
    out = eval(equation);
    document.getElementById("result").innerHTML = out;
  }
  catch(err){
      if (err=='SyntaxError: Unexpected token )'){
          alert("() is an invalid calculation");
          clear_result();
      }
  }
}
//Clears the result of the last calculation
function clear_result() {
  document.getElementById("result").innerHTML = "0";
}
//Factorial of a number
function factorial(num) {
  if (num < 0) return -1;
  else if (num === 0) return 1;
  else {
    return num * factorial(num - 1);
  }
}
//For functions like factorial of x or 1 divided by x
var current;
function functions(first, second) {
  current = document.getElementById("result").innerHTML;
  document.getElementById("result").innerHTML = first + current + second;
  equals();
}
