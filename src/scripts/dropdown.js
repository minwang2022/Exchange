export function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

export function GetSelectedValue(){
let e = document.getElementById("myDropdown");
// console.log(e);
let result = e.options[e.selectedIndex].value;
console.log(result);
console.log(typeof(result));

return result;

// document.getElementById("result").innerHTML = result;
}



