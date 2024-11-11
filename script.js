let counter = 0;
let counter2 = 0;

//Static
const birthdayString = "Birthday: November 20, 2009";
const contactmethod = "Contact me through Discord: @hito.akk1to";

//Countdown
const birthdayMonth = 11;
const birthdayDay = 20;
const birthYear = 2009;
const today = new Date();
const currentYear = today.getFullYear();

var radio = null;
var radioPlayingSong = null;

var radioIsLoading = false;

let nextBirthday = new Date(currentYear, birthdayMonth - 1, birthdayDay);
if (today > nextBirthday) {
    nextBirthday = new Date(currentYear + 1, birthdayMonth - 1, birthdayDay);
}

const timeDifference = nextBirthday - today;
const daysUntilBirthday = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

const nextAge = nextBirthday.getFullYear() - birthYear;


//Event
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('countdown').textContent = birthdayString;

    //Status
    fetch('https://api.lanyard.rest/v1/users/727497287777124414')
        .then(response => response.json())
        .then(data => {
            const status = data.data.discord_status;
            const statusElement = document.getElementById('bio-status');
            
            // Set the text based on status
            statusElement.textContent = '●';
            
            // Remove any existing status classes
            statusElement.classList.remove('online', 'idle', 'dnd', 'offline');

            console.log(status);
            
            // Add class based on the status
            switch (status) {
                case 'online':
                    statusElement.classList.add('online');
                    break;
                case 'idle':
                    statusElement.classList.add('idle');
                    break;
                case 'dnd':
                    statusElement.classList.add('dnd');
                    break;
                case 'offline':
                    statusElement.classList.add('offline');
                    break;
                default:
                    statusElement.classList.add('offline'); // Default to offline
            }
        })
        .catch(error => {
            console.error('Error fetching the API:', error);
            document.getElementById('bio-status').textContent = '⚠︎';
        });

    setInterval(change, 5000);
    // setInterval(changemethod, 5000);

    setInterval(setRadioText, 500);

    let a = new EventSource("https://api.zeno.fm/mounts/metadata/subscribe/fikggbpoi71vv");
    a.onmessage = function(t) {
        let e = JSON.parse(t.data);
        if (e.streamTitle) {
            radioPlayingSong = e.streamTitle;
        }
    }
});

function setRadioText() {
    var m = getMutedStatus();
    if (radioIsLoading) {
        var mt = "(Loading...)"
    }
    else {
        if (m) {
            var mt = "(Tap here to unmute)"
        }
        else {
            var mt = "(Tap here to mute)"
        }
    }
    document.getElementById("radio-text-1").textContent = "📻 akk1to's chill vibes " + mt;
    document.getElementById("radio-text-2").textContent = radioPlayingSong;
}

function getMutedStatus() {
    if (radio == null) {
        return true;
    }

    if (radio.muted) {
        return true;
    }
    else {
        return false;
    } 
}

function radiotoggle() {
    if (radioIsLoading) {
        return;
    }

    if (radio == null) {
        radioIsLoading = true;
        radio = new Audio('https://stream.zeno.fm/fikggbpoi71vv');
        radio.addEventListener("canplaythrough", (event) => {
            radioIsLoading = false;
        });
        radio.play();
        return;
    }

    if (radio.muted) {
        radio.muted = false;
    }
    else {
        radio.muted = true;
    }

}

function change() {
  document.getElementById("countdown").setAttribute("class", "text-fade");

  setTimeout(() => {
    const countdownElement = document.getElementById('countdown');
    if (counter == 0) {
        countdownElement.textContent = birthdayString;
    }
    if (counter == 1) {
        countdownElement.textContent = `${daysUntilBirthday} days until my ${nextAge}-year-old birthday!`;
    }
    document.getElementById("countdown").setAttribute("class", "text-show");
  }, 500)

  counter++;

  if (counter > 1) {
    counter = 0;
  }
}


// function changemethod() {
//     document.getElementById("contactmethod").setAttribute("class", "text-fade");
  
//     setTimeout(() => {
//       const contactElement = document.getElementById('contactmethod');
//       if (counter2 == 0) {
//           contactElement.textContent = contactmethod;
//       }
//       if (counter2 == 1) {
//           contactElement.textContent = `Contact me through mail: akk1to.dev@gmail.com`;
//       }
//       document.getElementById("contactmethod").setAttribute("class", "text-show");
//     }, 500)
  
//     counter2++;
  
//     if (counter2 > 1) {
//       counter2 = 0;
//     }
//   }
