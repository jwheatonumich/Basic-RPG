//Array of enemy names
var abilities = ["None","Charge","Block"];

//Store the dropdown element
selectMenu = document.getElementById("ability")

//Create drop-down from enemy name array
function popDropdown() {
    for(element in abilities)
        {
        var opt = document.createElement("option");
        opt.value= abilities[element];
        opt.innerHTML = abilities[element];

        //Append to the dropdown
        selectMenu.appendChild(opt);
        }
}

//Populate dropdown on page load
window.onload = popDropdown();