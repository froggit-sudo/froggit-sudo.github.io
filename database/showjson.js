function parseUrl(url) {
    let name;
    for (let i = 0; i < url.length; i++) {
        if (url[i] == "?") {
            name = url.substring(i + 6, url.length);
        }
    }
    return name;
}

const name = parseUrl(window.location.href);

people.once("value", retrieveData, err);

function retrieveData(data) {
    let values = Object.values(data.val());
    values.forEach((person) => {
        if (person.name == name) {
            console.log("User data found!");
            document.getElementById("name").innerHTML = "First Name: " + person.name;
            document.getElementById("lastname").innerHTML = "Last Name: " + person.lastName;
            document.getElementById("age").innerHTML = "Age: " + person.age;
            document.getElementById("height").innerHTML = "Height: " + person.height;
            document.getElementById("bio").innerHTML = "Bio: " + person.bio;
            document.title = "Person: " + name;
        }
    })
}

function err(error) {
    console.log(error);
}