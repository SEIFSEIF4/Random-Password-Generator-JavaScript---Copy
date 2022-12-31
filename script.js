const characterAmountRange = document.getElementById("characterAmountRange");
const characterAmountNumber = document.getElementById("characterAmountNumber");
const lengthSlider = document.querySelector(".pass-length .rag "),
  options = document.querySelectorAll(".options input"),
  PassIndicator = document.querySelector(".pass-indicator"),
  copyIcon = document.querySelector(".input-box span"),
  icon = document.querySelector(".history ol li span"),
  passwordInput = document.querySelector(".input-box input"),
  generateBtn = document.querySelector(".generate-btn"),
  historyBtn = document.getElementById("hist"),
  Controls = document.querySelector(".controls"),
  history = document.querySelector(".history");

const arr = [];

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

  arr.push(passwordInput.value);

  // Create DOM element
  // Set content to current element
  let childNode = document.createElement("li");
  document.querySelector(".history ol").appendChild(childNode);

    // var icon = document.createElement("span");
    // icon.className = "material-symbols-rounded";
    // icon.innerText = "copy_all";
    // document.querySelector(".history ol").appendChild(icon);
    // <i class="fa-solid fa-trash"></i>

  // childNode.innerHTML = arr[arr.length-1]; //first method
  while (arr.length) {
    childNode.innerHTML = arr.pop(); //second method
    arr.pop();
  }
};

const updateSlide = () => {
  document.querySelector(".header span").innerHTML = lengthSlider.value;
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

  function limiter(input) {
    if (input.value < 0) input.value = 0;
    if (input.value > 30) input.value = 30;
  }

  if (characterAmountNumber.value > 30) {
    document.querySelector(".header span").innerHTML = 30;
  } else {
    document.querySelector(".header span").innerHTML = value;
  }

  updatePassIndicator();
  // generatePassword();
  limiter(characterAmountNumber);
}

copyIcon.addEventListener("click", copyPassword);
// icon.addEventListener("click", clearPassword);
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
generateBtn.addEventListener("click", () => {
  copyIcon.classList.toggle("scaleAnimation");
});

historyBtn.addEventListener("click", () => {
  Controls.classList.toggle("hide");
  history.classList.toggle("show");

  // historyBtn.innerText = 'Control'
});
