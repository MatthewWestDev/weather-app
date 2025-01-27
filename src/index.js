import "./styles.css";

const form = document.querySelector("form");

const email = document.getElementById("email");
const emailError = document.querySelector("#email + span.error");
email.addEventListener("input", (event) => {
  if (email.validity.valid) {
    emailError.textContent = "";
    emailError.className = "error";
  } else {
    showEmailError();
  }
});

const country = document.getElementById("country");
const countryValue = document.getElementById("country").value;
const countryError = document.querySelector("#country + span.error");
country.addEventListener("input", (event) => {
  if (country.validity.valid) {
    countryError.textContent = "";
    countryError.className = "error";
  } else {
    showCountryError();
  }
});

const formMessage = document.querySelector(".form-message");

// handle form submit if fields ae invalid display error
form.addEventListener("submit", (event) => {
  // if the email field is invalid
  if (!email.validity.valid) {
    // display an appropriate error message
    showError();
    formMessage.textContent = "Please correct the form errors and retry...";
    // prevent form submission
    event.preventDefault();
    return;
  }
  formMessage.textContent = "Form submitted sucessfully.";
});

// show error messages for all fields
function showEmailError() {
  if (email.validity.valueMissing) {
    emailError.textContent = "You need to enter an email address.";
  } else if (email.validity.typeMismatch) {
    // If it's not an email address,
    emailError.textContent = "Entered value needs to be an email address.";
  } else if (email.validity.tooShort) {
    // If the value is too short,
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }
  emailError.className = "error active";
}

function showCountryError() {
  console.log("country invalid");
  if (country.validity.valueMissing) {
    countryError.textContent = "You need to select a country.";
  }
  countryError.className = "error active";
}
