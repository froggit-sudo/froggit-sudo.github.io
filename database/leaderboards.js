let currentlySelected; // = "smartest-people";

let peopleDOMElements = [];

function parse() {
    let url = window.location.href;
    for (let i = 0; i < url.length; i++) {
        if (url[i] == "?") {
            return url.substring(i + 10, url.length);
        }
    }
}

currentlySelected = parse();
let lbRef = database.ref("leaderboard/" + currentlySelected);

document.getElementById("smartest-people").onclick = function() {
    window.location = window.location.pathname + "?category=smartest-people"
}

document.getElementById("karthik-lovers").onclick = function() {
    window.location = window.location.pathname + "?category=karthik-lovers"
}

document.getElementById("annoying-people").onclick = function() {
    window.location = window.location.pathname + "?category=annoying-people"
}

document.getElementById("loudest-people").onclick = function() {
    window.location = window.location.pathname + "?category=loudest-people"
}


lbRef.on("value", retrieve, er);

function loadLeaderboard(list) {
    let l = list[0];
    l.forEach((person) => {
       //console.log(person);
       let aTag = document.createElement("a");
       aTag.innerHTML = person;
       aTag.href = "https://froggit-sudo.github.io/database/person?name=" + person;
       aTag.className = "person";
       peopleDOMElements.push(aTag);
       document.getElementById("span").appendChild(aTag);
    });
}


function retrieve(data) {
    console.log("Running .on statement. Firebase API Running :D")
    for (let i = 0; i < peopleDOMElements.length; i++) {
        peopleDOMElements[i].remove();
        peopleDOMElements.splice(i, 1);
    }
    let s = data.val();
    loadLeaderboard(Object.values(s));
}

function er(error) {
    console.log(error);
}