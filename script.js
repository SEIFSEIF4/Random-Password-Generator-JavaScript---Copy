const characterAmountRange = document.getElementById("characterAmountRange");
const characterAmountNumber = document.getElementById("characterAmountNumber");
const lengthSlider = document.querySelector(".pass-length .rag "),
  options = document.querySelectorAll(".options input"),
  PassIndicator = document.querySelector(".pass-indicator"),
  copyIcon = document.querySelector(".input-box span"),
  passwordInput = document.querySelector(".input-box input"),
  generateBtn = document.querySelector(".generate-btn");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$%&|[](){}:;.,*+-#@<>~",
};

const updatePassIndicator = () => {
  PassIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 16
      ? "medium"
      : "strong";
};

const generatePassword = () => {
  let staticPassword = "",
    randomPassword = "",
    excDuplicate = false,
    passLength = lengthSlider.value;

  options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "spaces" && option.id !== "exc-duplicate") {
        staticPassword += characters[option.id];
      } else if (option.id === "spaces") {
        staticPassword += `  ${staticPassword}  `;
      } else {
        excDuplicate = true;
      }
    }
  });

  for (let i = 0; i < passLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excDuplicate) {
      !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }
  passwordInput.value = randomPassword;
};

const updateSlide = () => {
  document.querySelector(".header span").innerHTML = lengthSlider.value 
  updatePassIndicator();
  generatePassword();
};
updateSlide();

const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyIcon.innerText = "check";

  setTimeout(() => {
    copyIcon.innerText = "copy_all";
    copyIcon.style.color = "#425ff4";
  }, 1500);
};

function syncCharacterAmount(e) {
  const value = e.target.value;
  characterAmountNumber.value = value;
  characterAmountRange.value = value;
  document.querySelector(".header span").innerHTML = value 
  updatePassIndicator();
  generatePassword();
}


copyIcon.addEventListener("click", copyPassword);
// lengthSlider.addEventListener("input", updateSlide);

characterAmountRange.addEventListener(
  "input",
  syncCharacterAmount,
  updateSlide
);
characterAmountNumber.addEventListener(
  "input",
  syncCharacterAmount,
  updateSlide
);

generateBtn.addEventListener("click", generatePassword);
