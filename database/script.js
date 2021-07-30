const nameInput= document.getElementById("name");
const lastnameInput = document.getElementById("lastname");
const ageInput = document.getElementById("age");
const heightInput = document.getElementById("height");
const bioInput = document.getElementById("bio");

class Person {
    constructor(name, lastName, age, height, bio) {
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.height = height;
        this.bio = bio;
    }
}

document.getElementById("create").onclick = function() {
    var person = new Person(nameInput.value, lastnameInput.value, ageInput.value, heightInput.value, bioInput.value);
    people.push(person);
    window.location = "index.html";
}


