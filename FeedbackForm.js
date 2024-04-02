// Get references to elements
let popup = document.getElementById("popup");
let form = document.getElementById("form");

// Function to validate form inputs
function validateForm(){
    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var emailPatternValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var receiveUpdateInput = document.getElementById("recieveUpdate");
    var navigateNoRadio = document.querySelector('input[name="navigate"][value="No"]');
    var suggestionTextarea = document.getElementById("suggestion");

    // Validate name input
    if(nameInput.value.trim() === "" || !isAlphabetic(nameInput.value.trim())){
        if(nameInput.value.trim() === ""){
            alert("Name is Required")
        }else{
            alert("Invalid name. Name should contain only alphabets.")
        }
        nameInput.focus(); // Set focus to name input
        return false;
    }

    // Validate email input
    if(emailInput.value.trim()==="" || !emailPatternValid.test(emailInput.value)){
        if(emailInput.value.trim()===""){
            alert("Email is Required")
        }else{
            alert("Invalid email format")
        }
        emailInput.focus(); // Set focus to email input
        return false;
    }

    // Validate receive update input
    if(receiveUpdateInput.value.trim()===""){
        alert("Please select receive update method")
        receiveUpdateInput.focus();
        return false;
    }

    // Validate suggestion textarea if 'No' option is selected
    if(navigateNoRadio && navigateNoRadio.checked && suggestionTextarea.value.trim()===""){
        alert("please provide suggestion for the improvement of the future (if you selected 'No')");
        suggestionTextarea.focus();
        return false;
    }

    return true;
}

// Function to check if a string contains only alphabetic characters
function isAlphabetic(value) {
    for (var i = 0; i < value.length; i++) {
        var charCode = value.charCodeAt(i);
        if (!(charCode > 64 && charCode < 91) && !(charCode > 96 && charCode < 123)) {
            return false;
        }
    }
    return true;
}

// Function to display form data preview
function displayPreview(){
    // Get form inputs
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var visiting = getRadioValue("visiting");
    var navigate = getRadioValue("navigate");
    var suggestion = document.getElementById("suggestion").value.trim();
    var satisfied = getRadioValue("satisfied");
    var recommend = getRadioValue("recommend");
    var updates = document.getElementById("recieveUpdate").value.trim();
    var additional = document.getElementById("additionalSuggestion").value.trim();

    // Populate preview section with form data
    document.getElementById("previewName").textContent = name;
    document.getElementById("previewEmail").textContent = email;
    document.getElementById("previewVisiting").textContent = visiting;
    document.getElementById("previewNavigate").textContent = navigate;
    document.getElementById("previewSuggestion").textContent = suggestion;
    document.getElementById("previewRating").textContent = satisfied;
    document.getElementById("previewRecommend").textContent = recommend;
    document.getElementById("previewUpdates").textContent = updates;
    document.getElementById("previewAdditional").textContent = additional;

    //Show Preview Section
    document.getElementById("previewSection").style.display  = "block";
}

// Function to get value of checked radio button in a group
function getRadioValue(name){
    var radioButtons = document.getElementsByName(name);
    for(var i = 0; i < radioButtons.length; i++){
        if(radioButtons[i].checked){
            return radioButtons[i].value;
        }
    }
    return ""; // return empty string if no radio button is checked
}

// Function to switch from preview to edit mode
function editForm(){
    var previewSection = document.getElementById("previewSection");
    var form = document.getElementById("form")

    previewSection.style.display = "none"; // Hide preview section
    form.style.display = "block"; // Show form for editing
}

// Function to open the confirmation popup
function openPopup(){
    popup.classList.add("open-popup");
}

// Function to close the confirmation popup and reset form fields
function closePopup(){
    popup.classList.remove("open-popup");
    document.getElementById("previewSection").style.display = "none";
     // Reset form fields
    document.getElementById("name").value = '';
    document.getElementById("email").value = '';
    document.getElementById("visiting_yes").checked = false;
    document.getElementById("visiting_no").checked = false;
    document.getElementById("navigate_yes").checked = false;
    document.getElementById("navigate_no").checked = false;
    document.getElementById("suggestion").value = '';
    for( k = 1; k <=10 ; k++){
        document.getElementById(`rating${k}`).checked = false;
    }
    document.getElementById("recommend_yes").checked = false;
    document.getElementById("recommend_no").checked = false;
    document.querySelector('#recieveUpdate').value = "Yes-via Email";
    document.querySelector('#recieveUpdate').value = "Yes-via message";
    document.querySelector('#recieveUpdate').value = "no";
    document.querySelector('#recieveUpdate').selectedIndex=0;
    document.getElementById("additionalSuggestion").value = '';

}

// Function to validate form and display preview
function validateAndSubmit(){
    if(validateForm()){
        displayPreview();
        return true;
    }
    // Prevent form submission if validation fails
    return false;
}

//Function to validate form, display preview, and open confirmation popup
function validPreview(){
    if(validateAndSubmit()){
        openPopup();
        return true;
    }
    return false;
}