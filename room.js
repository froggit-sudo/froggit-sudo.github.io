var firebaseConfig = {
    apiKey: "AIzaSyCU_SFlvzKk7EpjDatMTB29e5ST1NO0p5k",
    authDomain: "connect4-52337.firebaseapp.com",
    projectId: "connect4-52337",
    storageBucket: "connect4-52337.appspot.com",
    messagingSenderId: "1098230590476",
    appId: "1:1098230590476:web:e571599091988fa5d41229",
    measurementId: "G-RYWRYFLSBE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const database = firebase.database();

var playing = false;

let board = [];

var roomDeployed = false;

var e = "Waiting for another player to join...";

var joinRoomData;

var userTurn;

var type;

var mainColor;

var userToken = {
    x: 80,
    y: 50
}

var currentUserIndex = 0;


const game = document.getElementById("canvas");
const display = game.getContext("2d")

function drawRect(x, y, width, height, color) {
    display.fillStyle = color;
    display.fillRect(x, y, width, height);
}

function circle(x, y, radius, color) {
    display.beginPath();
    display.fillStyle = color;
    display.arc(x, y, radius, 0, 2 * Math.PI);
    display.stroke();
    display.fill();
}

let g;

function createRoom(id) {
    for (var o = 210; o < 700; o+= 500/6) {
        for (var i = 80; i < 700; i += 90) {
            circle(i, o, 40, "white");
            let space = {
                x: i,
                y: o,
                color: "white"
            }
            board.push(space)   
        }
    }
    let columns = [];
    for (let x = 0; x < 7; x++) {
        let newCol = {
            x: board[x].x,
            y: board[x].y,
            spacesLeft: 7
        }
        columns.push(newCol);
    }
    g = columns;
    let a = board;
    database.ref("rooms").child(id).set({
        id: id,
        playerCount: 1,
        board: a,
        turn: 0,
        columns: columns
    });
    document.getElementById("create-room").remove();
    document.getElementById("join-room").remove();
    document.getElementById("room-name").remove();
    document.getElementById("room-id").remove();
    document.querySelector("h2").remove();
    document.getElementById("rename").innerHTML = "";
}

var c;




document.getElementById("create-room").onclick = function() {
    let roomId = document.getElementById("room-name").value;
    c = roomId;
    if (roomId.length > 3 && roomId != "") {
        createRoom(roomId);
        roomDeployed = true;
    }
}

database.ref("rooms").on("value", getData, error)

var serverData;

var serverName;

var serverKeys;

var matchData;

console.log("Nice try!")
console.log("I\'m not allowing you to read the server data.")
console.log("hah")

function getData(data) {
    serverData = data.val();
    serverKeys = Object.values(serverData);
    for (let i = 0; i < serverKeys.length; i++) {
        if (serverKeys[i].id == c) {
            matchData = serverKeys[i];
            board = matchData.board;
            g = matchData.columns;
        }
    }
    if (matchData != null && matchData.playerCount == 2) {
        playing = true;
    }
}

var returnedColor;

function checkWin() {
    for (let n = 0; n < board.length; n++) {
        // Vertical
        if ((n >= 0 && n <= 3) || (n >= 7 && n <= 10) || (n >= 14 && n <= 17) || (n >= 21 && n <= 24) || (n >= 28 && n <= 31 || (n >= 35 && n <= 38))) {
            if (board[n].color == board[n+1].color && board[n].color == board[n + 2].color && board[n].color == board[n + 3].color) {
                if (board[n].color != "white") {
                    returnedColor = board[n].color;
                    return true;
                }
            }
        }
        if (n >= 21) {
            if (board[n].color == board[n - 7].color && board[n].color == board[n - 14].color && board[n].color == board[n - 21].color) {
                if (board[n].color != "white") {
                    returnedColor = board[n].color;
                    return true;
                }
            }
        }
        if (n >= 24) {
            // Diagonal
            if (board[n].color == board[n-8].color && board[n].color == board[n - 16].color && board[n].color == board[n - 24].color) {
                if (board[n].color != "white") {
                    returnedColor = board[n].color;
                    return true;
                }
            }
        }
        if (n >= 18) {
            // Left Diagonal
            if (board[n].color == board[n-6].color && board[n].color == board[n - 12].color && board[n].color == board[n - 18].color) {
                if (board[n].color != "white") {
                    returnedColor = board[n].color;
                    return true;
                }
            }
        }
        
    }
    return false;
}

function joinRoom(id) {
    if (joinRoomData.playerCount == 2) {
        
    }
    if (joinRoomData.playerCount == 1) {
        joinRoomData.playerCount += 1;
        database.ref("rooms").child(id).set({
            id: id,
            playerCount: joinRoomData.playerCount,
            board: joinRoomData.board,
            turn: joinRoomData.turn,
            columns: joinRoomData.columns
        });
        g = joinRoomData.columns
        playing = true;
        roomDeployed = true;
    }
    document.getElementById("create-room").remove();
    document.getElementById("join-room").remove();
    document.getElementById("room-name").remove();
    document.getElementById("room-id").remove();
    document.querySelector("h2").remove();
    document.getElementById("rename").innerHTML = "";
}

document.getElementById("join-room").onclick = function() {
    let roomId = document.getElementById("room-id").value;
    c = roomId;
    for (let i = 0; i < serverKeys.length; i++) {
        if (serverKeys[i].id == roomId) {
            joinRoomData = serverKeys[i];
            joinRoom(serverKeys[i].id);
        }
    }
}

function error(err) {
    console.log(err);
}


function drawBoard() {
    drawRect(0, 100, 700, 600, "blue");
    for (let o = 0; o < board.length; o++) {
        let space = board[o];
        circle(space.x, space.y, 40, space.color);
    }
}

function checkType() {
    if (joinRoomData == undefined) {
        type = false;
        mainColor = "red";
    } else {
        type = true;
        mainColor = "yellow"
    }
}



function fillCircle(currentIndex) {
    if (g[currentIndex].spacesLeft == 6) {
        board[currentIndex + 35].color = mainColor;
    }
    if (g[currentIndex].spacesLeft == 5) {
        board[currentIndex + 28].color = mainColor;
    }
    if (g[currentIndex].spacesLeft == 4) {
        board[currentIndex + 21].color = mainColor;
    }
    if (g[currentIndex].spacesLeft == 3) {
        board[currentIndex + 14].color = mainColor;
    }
    if (g[currentIndex].spacesLeft == 2) {
        board[currentIndex + 7].color = mainColor;
    }
    if (g[currentIndex].spacesLeft == 1) {
        board[currentIndex].color = mainColor;
    }
}

document.body.onkeyup = function(e){
    if(e.keyCode == 32){    
        if (matchData.turn % 2 == 0 && !type) {
            if (g[currentUserIndex].spacesLeft != 0) {
                g[currentUserIndex].spacesLeft--;      
            }
            matchData.turn++;
            fillCircle(currentUserIndex);
            database.ref("rooms").child(c).set({
                id: c,
                playerCount: matchData.playerCount,
                board: board,
                turn: matchData.turn,
                columns: g
            });
        }
        if (matchData.turn % 2 == 1 && type) {
            if (g[currentUserIndex].spacesLeft != 0) {
                g[currentUserIndex].spacesLeft--;      
            }
            matchData.turn++;
            fillCircle(currentUserIndex);
            database.ref("rooms").child(c).set({
                id: c,
                playerCount: matchData.playerCount,
                board: board,
                turn: matchData.turn,
                columns: g
            });
        }
    }
}



document.addEventListener('keydown', (e)=> {
    if (e.key == "ArrowRight" || e.key == "d") {
        if (currentUserIndex != 6) {
            currentUserIndex++;
        }
    }
    if (e.key == "ArrowLeft" || e.key == "a") {
        if (currentUserIndex != 0) {
            currentUserIndex--;
        }
    }  
});

function draw() {
    if (roomDeployed) {
        canvas.style.border = "3px solid black"
        if (playing) {
            drawRect(0, 0, 800, 800, "white")
            drawBoard();
            userToken.x = g[currentUserIndex].x;
            circle(userToken.x, userToken.y, 40, mainColor);
            checkType();
            if (checkWin()) {
                playing = false;
                e = returnedColor + " wins!"
            }
        } else {
            drawRect(0, 0, 800, 800, "white")
            display.font = "30px Arial";
            display.textAlign = "center"
            display.fillStyle = "black"
            display.fillText(e, canvas.width/2, canvas.height/2); 
        }
    }
}

setInterval(draw, 1);