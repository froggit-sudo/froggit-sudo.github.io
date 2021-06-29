// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCgS3yhanjd_K0-SFCfqtRT3zsef7_y1tE",
    authDomain: "real-time-chat-testing.firebaseapp.com",
    projectId: "real-time-chat-testing",
    storageBucket: "real-time-chat-testing.appspot.com",
    messagingSenderId: "25284565296",
    appId: "1:25284565296:web:455b82e88f74a400a990f5",
    measurementId: "G-K3C1RGZ6Z1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const database = firebase.database();
const chat = database.ref("chat");

let username = "bob";

function showMessage(sender, messageContent) {
    let p = document.createElement("P");
    p.innerHTML = sender + " : " + messageContent;
    document.getElementById("chat").appendChild(p);
}

function sendMessage(sender, messageContent) {
    let msg = {
        sender: sender,
        content: messageContent
    }
    chat.push(msg)
}

chat.on("value", getData, error);

let initialRead = false;

let holder;

function getData(data) {
    let val = data.val();
    let o = Object.values(val);
    console.log(o);
    holder = o;
    if (!initialRead) {
        for (let i = 0; i < o.length; i++) {
            let a = o[i];
            showMessage(a.sender, a.content);
        }
    }

    if (initialRead) {
        let mes = o[o.length - 1];
        showMessage(mes.sender, mes.content);
    }

    initialRead = true;
}

function error(err) {
    console.log(err);
}

document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        //showMessage(username, document.getElementById("message").value);
        sendMessage(username, document.getElementById("message").value);
        document.getElementById("message").value = "";
    }
});