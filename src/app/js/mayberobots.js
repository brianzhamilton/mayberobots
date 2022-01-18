/* Maybe Robots Website javaScript
     Author:   Brian Hamilton
     Date:     01/25/2020
     Filename: mayberobots.js
*/

// global variables
var donateArray = ["You get nothing! <br><br>But that's okay&mdash;we still love you.", // this is an array to determine what the "rewards" in each donation bracket are.
                          "You are a page in the courts of the mighty, and you have paid your taxes. <br><br>As a reward, we permit you to live.",
                          "A knight of some renown. We take pride in your accomplishments as benefactors of your safety and entertainment. <br><br>As a reward, we offer you a share in the spoils of war&mdash;90/10 split.",
                          "You are a fellow king, and we pleasure in your company! <br><br>Reward? What reward would suit a king? <br>No! You are our honored guest by right! Join us in feasting!"]; 
var announcement = ["New episodes available every Monday by 6am!",
                    "We're going on tour! Hear us ramble in person March 4 &ndash; April 15!",
                    "If you're reading this, you've scrolled past the donation section.",
                    "Please give us your money. We're hungry."]; 
var donation = document.getElementsByName("donationLevels");

// calculates donation cost based on level
function calcDonate() {
     var totalCostHeader = document.getElementById("totalCost");
     var rewardStatement = document.getElementById("reward");
     for (var i = 0; i < donation.length; i++) {
          if (donation[i].checked === true) {
               var totalCost = i * 5; // donation bracket increase by increments of $5
               totalCostHeader.innerHTML = "Donation Amount: $" + totalCost; // displays donation amount to user
               rewardStatement.innerHTML = donateArray[i]; // displays array content depending on user input               
          }
     }
}

// creates event listeners
function createEventListeners() {
     if (donation[0].addEventListener) {
          donation[0].addEventListener("click", calcDonate, false);
          donation[1].addEventListener("click", calcDonate, false);
          donation[2].addEventListener("click", calcDonate, false);
          donation[3].addEventListener("click", calcDonate, false);
     } else if (donation[0].attachEvent) {
          donation[0].attachEvent("onclick", calcDonate);
          donation[1].attachEvent("onclick", calcDonate);
          donation[2].attachEvent("onclick", calcDonate);
          donation[3].attachEvent("onclick", calcDonate);
     }
}

//function to populate calendar
function setUpPage() {
     createEventListeners(); 
     document.getElementById("noDonate").checked = true;
}

// runs setUpPage() function when page loads
if (window.addEventListener) {
     window.addEventListener("load", setUpPage, false); 
}
else if (window.attachEvent) {
     window.attachEvent("onload", setUpPage); 
}