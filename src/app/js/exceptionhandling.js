/* Maybe Robots Website Contact Page Form Exception Handling
     Author:   Brian Hamilton
     Date:     01/31/2020
     Filename: exceptionhandling.js
*/

// global variables
var merch = [];
var merchString;

// function for first name validation
function validateFName() {
     var firstName = document.getElementById("firstName");
     var errorMessageFName = document.getElementById("errorMessageFName");
     var fnLabel = document.getElementById("labelFN");
     var nameCheck = /^[a-zA-Z]/;
     try {
          if (firstName.value === "") {
               throw "**We like to know whom we're talking to, so a name is required. <br><br>However, feel free to substitute with a coolsounding alias like 'Artful Dodger' or 'Benedict Cumberbatch.'";
          } else if (nameCheck.test(firstName.value) === false) {
               throw "**We only accept alphanumeric characters for names/aliases.";
          } else {
               fnLabel.innerHTML = "First Name:";
               firstName.style.outline = "";
               errorMessageFName.style.display = "none";
               errorMessageFName.innerHTML = "";
          }
     } catch (msg) {
          fnLabel.innerHTML = "First Name:**";
          firstName.style.outline = "1px solid red";
          errorMessageFName.style.display = "block";
          errorMessageFName.innerHTML = msg;
          formValidity = false;
     }
}

// function for email validation
function validateEmail() {
     var returnEmail = document.getElementById("returnEmail");
     var emailErrMsg = document.getElementById("errorMessageEmail");
     var emailLabel = document.getElementById("labelEmail");
     var emailCheck = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/;
     try {
          if (returnEmail.value === "") {
               throw "**We like to know we can keep in contact with those who send us nice messages, so we require an email address to which we can send our super wise advice in response to your burning questions.";
          } else if (emailCheck.test(returnEmail.value) === false) {
               throw "**Please provide a valid email address.";
          } else {
               returnEmail.style.outline = "";
               emailLabel.innerHTML = "Return Email:";
               emailErrMsg.style.display = "none";
               emailErrMsg.innerHTML = "";
          }
     } catch (msg) {
          emailLabel.innerHTML = "Return Email:**";
          returnEmail.style.outline = "1px solid red";
          emailErrMsg.style.display = "block";
          emailErrMsg.innerHTML = msg;
          formValidity = false;
     }
}

// function for subject validation
function validateSubject() {
     var subject = document.getElementById("contactSubject");
     var subjectErrMsg = document.getElementById("subjectErrMsg");
     var subjectLabel = document.getElementById("subjectLabel");
     try {
          if (subject.value === "") {
               throw "**We require a subject to your email for easy scanning and reply.";
          } else if (subject.value.lastIndexOf("?") === -1) {
               throw "Please enter your subject in the form of a question.";
          } else if (subject.value.lastIndexOf("<script>") !== -1) {
               throw "Please do not try to hack our website."
          } else {
               subject.style.outline = "";
               subjectLabel.innerHTML = "Subject:";
               subjectErrMsg.innerHTML = "";
          }
     } catch (msg) {
          subjectLabel.innerHTML = "Subject:**";
          subject.style.outline = "1px solid red";
          subjectErrMsg.style.display = "block";
          subjectErrMsg.innerHTML = msg;
          formValidity = false;
     }
}

/* validate mailing list subscription choice */
function validateRadioButtons() {
     var errorMessageRadio = document.getElementById("errorMessageRadio");
     var fieldsetValidity = true;
     var radioButtons = document.getElementsByName("mailList");
     try {
          if (!radioButtons[0].checked && !radioButtons[1].checked) {
               // verify that an answer is selected
               for (i = 0; i < 2; i++) {
                    radioButtons[i].style.outline = "1px solid red";
               }
               fieldsetValidity = false;
          } else {
               for (i = 0; i < 2; i++) {
                    radioButtons[i].style.outline = "";
               }
          }
          if (!fieldsetValidity) { // check if any field is blank
               throw "**Please make a selection.";
          } else {
               errorMessageRadio.style.display = "none";
          }
     }
     catch(msg) {
          errorMessageRadio.style.display = "block";
          errorMessageRadio.innerHTML = msg;
          formValidity = false;
     }
}

/* validate robot question selection */
function validateSelection() {
     var selection = document.getElementById("robotQuestion");
     var fieldsetValidity = true;
     var errorMessageSel = document.getElementById("errorMessageSel");
     try {
          if (selection.selectedIndex === -1) {
               selection.style.border = "1px solid red";
               fieldsetValidity = false;
          } else {
               selection.style.border = "";
          }
          if (fieldsetValidity === false) {
               throw "**Please make a selection."
          } else {
               errorMessageSel.style.display = "none";
          }
     }
     catch (msg) {
          errorMessageSel.style.display = "block";
          errorMessageSel.innerHTML = msg;
          formValidity = false;
     }
}

// function for ranking merch
function rankMerch(event) {
     if (event === undefined) {
          event = window.event;
     }
     var callerElement = event.target || event.srcElement;
     var merchName = callerElement.value;
     if (callerElement.checked) {
          // add checkbox value to merch array
          merch.push(merchName);
          // add checkbox value to merch rank list
          var newMerch = document.createElement("li");
          newMerch.innerHTML = merchName;
          document.getElementById("merchRank").appendChild(newMerch);
          document.getElementById("merchRank").style.border = "solid #0f0000";
          document.getElementById("merchRankHead").style.display = "contents";
     } else {
          var listItems = document.querySelectorAll("#merchRank li");
          for (var i = 0; i < listItems.length; i++) {
               if (listItems[i].innerHTML === merchName) {
                    // remove element at index i from array
                    merch.splice(i, 1);
                    // remove merch from profile list
                    listItems[i].parentNode.removeChild(listItems[i]);
                    if (merch.length === 0) {
                         document.getElementById("merchRank").style.border = "";
                         document.getElementById("merchRankHead").style.display = "none";
                    }
                    break;
               }
          }
     }
}

/* validate form */
function validateForm(evt) {
     if (evt.preventDefault) {
          evt.preventDefault(); // prevent form from submitting
     } else {
          evt.returnValue = false; // prevent form from submitting in IE8
     }
     formValidity = true; // reset value for revalidation
     validateFName();
     validateEmail();
     validateSubject();
     validateRadioButtons();
     validateSelection();
}

// converts merch rank array to a string
function convertToString() {
     merchString = merch.toString();
}

// creates event listeners for form exception handling
function createEventListeners() {
     var contactForm = document.getElementById("contactForm");
     if (contactForm.addEventListener) {
          contactForm.addEventListener("submit", validateForm, false);
     } else if (contactForm.attachEvent) {
          contactForm.attachEvent("onsubmit", validateForm);
     }
     var fnInput = document.getElementById("firstName");
     if (fnInput.addEventListener) {
          fnInput.addEventListener("change", validateFName, false);
          fnInput.addEventListener("blur", validateFName, false);
     } else if (fnInput.attachEvent) {
          fnInput.attachEvent("onchange", validateFName);
          fnInput.attachEvent("onblur", validateFName);
     }
     var emailInput = document.getElementById("returnEmail");
     if (emailInput.addEventListener) {
          emailInput.addEventListener("change", validateEmail, false);
          emailInput.addEventListener("blur", validateEmail, false);
     } else if (emailInput.attachEvent) {
          emailInput.attachEvent("onchange", validateEmail);
          emailInput.attachEvent("onblur", validateEmail);
     }
     var subjectInput = document.getElementById("contactSubject");
     if (subjectInput.addEventListener) {
          subjectInput.addEventListener("change", validateSubject, false);
          subjectInput.addEventListener("blur", validateSubject, false);
     } else if (subjectInput.attachEvent) {
          subjectInput.attachEvent("onchange", validateSubject);
          subjectInput.attachEvent("onblur", validateSubject);
     }

     // adds event listener for merch rank checkboxes
     var merchChecks = document.getElementsByName("merch");
     if (merchChecks[0].addEventListener) {
          for (var i = 0; i < merchChecks.length; i++) {
               merchChecks[i].addEventListener("change", rankMerch, false);
          }
     } else if (merchChecks[0].attachEvent) {
          for (var i = 0; i < merchChecks.length; i++) {
               merchChecks[i].attachEvent("change", rankMerch);
          }
     }

     // adds event listener to convert merch rank into string
     var button = document.getElementById("submitBtn");
     if (button.addEventListener) {
          button.addEventListener("click", convertToString, false);
     } else if (button.attachEvent) {
          button.attachEvent("onclick", convertToString);
     }
}

// function to reset form when page loads
function setUpPage() {
     document.getElementById("robotQuestion").value = -1;
     document.getElementById("tShirt").checked = false;
     document.getElementById("bookbag").checked = false;
     document.getElementById("mug").checked = false;
     document.getElementById("popSocket").checked = false;
     document.getElementById("hoodie").checked = false;
     createEventListeners();
}

// runs setUpPage() function when page loads
if (window.addEventListener) {
     window.addEventListener("load", setUpPage, false);
}
else if (window.attachEvent) {
     window.attachEvent("onload", setUpPage);
}