people.once("value", getData, error);

function appendChild(firstName) {
    var aTag = document.createElement("A");
    aTag.innerHTML = "Name: " + firstName
    aTag.href = "https://froggit-sudo.github.io/database/person" + "?name=" + firstName;
    document.getElementById("people").appendChild(aTag);
}

function getData(data) {
    let values = Object.values(data.val());
    values.forEach((person) => {
        appendChild(person.name);
    });
}

function error(err) {
    console.log(err);
}
