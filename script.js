// declaring variables

let isGamemodeMulti = true;
let menudiv = document.getElementById("menu");
let gamediv = document.getElementById("game");
let windiv = document.getElementById("winner");
let multiplayer = document.getElementById("svg-multi");
let ai = document.getElementById("svg-ai");
let multiText = document.getElementById("text-multi");
let aiText = document.getElementById("text-ai");
let player2TB = document.querySelectorAll(".name");
gamediv.style.display = "none";
windiv.style.display = "none";
let player1name = document.getElementById("player1name");
let player2name = document.getElementById("player2name");
let gamerules = document.getElementById("gamerules");
let player1img = document.getElementById("player1img");
let player2img = document.getElementById("player2img");
let gameTable = document.getElementById("gameTable");
let isPlayer1turn = true;
let roundTime;
let timerBar = document.getElementById("timerBar");
let downloadTimer;
let table = [];

// creating table
for(let i = 0; i < 6;i++){
    let temp = [];
    for(let j = 0; j < 7; j++){
        temp.push(0);
    }
    table.push(temp);
}
// if you forgot to write names
function RemoveError(){
    if(player2TB[0].value != ""){
            player2TB[0].classList.remove("invalid");
    }
    if(player2TB[1].value != ""){
            player2TB[1].classList.remove("invalid");
    }
}
// switching between gamemodes
function Gamemode(){
    if(isGamemodeMulti){
        multiplayer.classList.remove("svg-colored");
        multiplayer.classList.add("svg-black");
        multiText.classList.remove("svg-colored");
        multiText.classList.add("svg-black");
        ai.classList.remove("svg-black");
        ai.classList.add("svg-colored");
        aiText.classList.remove("svg-black");
        aiText.classList.add("svg-colored");
        player2TB[1].disabled = true;
        player2TB[1].value = "";
        player2TB[1].value = "MosAI";
    } else {
        player2TB[1].placeholder = "Player2's Name";
        ai.classList.remove("svg-colored");
        ai.classList.add("svg-black");
        multiplayer.classList.remove("svg-black");
        multiplayer.classList.add("svg-colored");
        aiText.classList.remove("svg-colored");
        aiText.classList.add("svg-black");
        multiText.classList.remove("svg-black");
        multiText.classList.add("svg-colored");
        player2TB[1].disabled = false;
        player2TB[1].value = "";
    }
    isGamemodeMulti = !isGamemodeMulti;
}
// if you want to go back to the main menu, clears the table and the timer
function Menu(){
    for(let j = 1; j <= 7; j++){
        column = document.querySelectorAll(".col"+ j);
        for(let i = 0; i < 6;i++){
            column[i].innerHTML = "";
        }
    }
    table = [];
    windiv.style.display = "none";
    menudiv.style.display = "block";
    gamediv.style.display = "none";
    clearInterval(downloadTimer);
}
function Play(){
    // declaring variables again, new game
    isGamemodeMulti = true;
    menudiv = document.getElementById("menu");
    gamediv = document.getElementById("game");
    windiv = document.getElementById("winner");
    multiplayer = document.getElementById("svg-multi");
    ai = document.getElementById("svg-ai");
    multiText = document.getElementById("text-multi");
    aiText = document.getElementById("text-ai");
    player2TB = document.querySelectorAll(".name");
    gamediv.style.display = "none";
    windiv.style.display = "none";
    player1img.classList.remove("gray");
    player1name = document.getElementById("player1name");
    player2name = document.getElementById("player2name");
    gamerules = document.getElementById("gamerules");
    player1img = document.getElementById("player1img");
    player2img = document.getElementById("player2img");
    gameTable = document.getElementById("gameTable");
    isPlayer1turn = true;
    roundTime;
    timerBar = document.getElementById("timerBar");
    downloadTimer;
    table = [];
    for(let i = 0; i < 6;i++){
    let temp = [];
    for(let j = 0; j < 7; j++){
        temp.push(0);
    }
    table.push(temp);
    }
    // roundTime
    roundTime = document.getElementById("timerval").value;
    timerBar.max = roundTime;
    time(roundTime);
    player2img.classList.add("gray");
    if(player2TB[0].value != "" && player2TB[1].value != ""){
        if(!isGamemodeMulti){
            player2img.src = "src/mosi.png";
        }
        else {
            player2img.src = "src/player2.png";
        }
        menudiv.style.display = "none";
        gamediv.style.display = "block";
        // player names
        player1name.innerHTML = player2TB[0].value;
        player2name.innerHTML = player2TB[1].value;
        player1name.classList.add("player1turn");
        }
    else {
        if(player2TB[0].value == ""){
            player2TB[0].classList.add("invalid");
        } else {
            player2TB[1].classList.add("invalid");
        }
    }
}

// clicking on a column
gameTable.onclick = function(event) {
    let td = event.target.closest('td'); 
    tmp = td.classList[0]
    col = tmp[tmp.length-1]
    Put(col);
};

// putting the coin into the table
function Put(col){
    column = document.querySelectorAll(".col"+ col);
    let isFull = true;
    let j = 0;
    // checking if the column is full
    while(j < 6 && isFull){
        if(column[j].innerHTML ==="")
        {
            isFull = false;
        }
        j++;
    }
    let i = 5;
    let flag = false;
    // if its already full, you have to choose another
    if(!isFull){
        while(!flag && i >= 0){
            if(column[i].innerHTML === "")
            {
                cell = column[i];
                if(isPlayer1turn){
                    cell.innerHTML="<img src='src/sarga.png' width='90' class='fall'/>";
                    table[i][col-1] = 1;
                }
                else {
                    cell.innerHTML="<img src='src/lila.png' width='90' class='fall'/>";
                    table[i][col-1] = 2;
                }     
                flag = true;
                CheckVictory(i, col-1)
                ChangePlayers();
            }
            i--;
        }
    } else {
        
        if(isGamemodeMulti){
            alert("This column is already full.")
        } else {
            if(isPlayer1turn){
                alert("This column is already full.")
            } else {
                // if the ai wanted to put the coin to a teeming column it tries again
                let random = Math.floor(Math.random() * 6);
                Put(random);
            }   
        }
    }
}

// the bot waits before his round
async function Mosikalep(){
    await sleep(700)
    let random = Math.floor(Math.random() * 6);
    Put(random);
}
// after a round changing the players 
function ChangePlayers(){
    if(isPlayer1turn){
        isPlayer1turn = false;
        player2name.classList.add("player2turn");
        player1name.classList.remove("player1turn");
        player1img.classList.add("gray");
        player2img.classList.remove("gray");
        if(!isGamemodeMulti){
            if(!isPlayer1turn)
                Mosikalep();
        }      
    }
    else {
        player1name.classList.add("player1turn");
        player2name.classList.remove("player2turn");
        player2img.classList.add("gray");
        player1img.classList.remove("gray");
        isPlayer1turn = true;
    }
    // reset the timer
    clearInterval(downloadTimer)
    time(roundTime);
}

// TIMER
function time(timeleft){
    downloadTimer = setInterval(function(){
        if(timeleft <= 0){
            clearInterval(downloadTimer);
            Won();
        }
        document.getElementById("timerBar").value = timeleft;
        timeleft -= 1;
    }, 1000);
}
//sleeping timer
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function CheckVictory(r,c){
    // horizontal
    check = table[r][c]
    for(let i = 0; i < 6; i++){
        for(let j = 0; j < 4; j++){
            if(table[i][j] == table[i][j+1] && table[i][j] == table[i][j+2] && table[i][j] == table[i][j+3] && table[i][j] != ""){
                if(isPlayer1turn){
                    Won();
                } else {
                    Won();
                }
            }
        }
    }
    // vertical
    for(let i = 0; i < 7; i++){
        for(let j = 0; j < 3; j++){
            if(table[j][i] == table[j+1][i] && table[j][i] == table[j+2][i] && table[j+3][i] == table[j][i] && table[j][i] != ""){
                if(isPlayer1turn){
                    Won();
                } else {
                    Won();
                }
            }
        }
    }
    // diagonal
    for(let i = 0; i < 3; i++){
        for(let j = 3; j < 7; j++){
            if(table[i][j] == table[i+1][j-1] && table[i][j] == table[i+2][j-2] && check == table[i+3][j-3] && table[i][j] != ""){
                if(isPlayer1turn){
                    Won();
                } else {
                    Won();
                }
            }
        }
    }
    for(let i = 2; i >= 0; i--){
        for(let j = 0; j < 4; j++){
            if(table[i][j] == table[i+1][j+1] && table[i][j] == table[i+2][j+2] && check == table[i+3][j+3] && table[i][j] != ""){
                if(isPlayer1turn){
                    Won();
                } else {
                    Won();
                }
            }
        }
    }
}
// WHO won?
function Won(){
    clearInterval(downloadTimer);
    gamediv.style.display = "none";
    windiv.style.display = "block";
    if(isPlayer1turn){
        document.getElementById("pic").width = "300";
        document.getElementById("pic").src  = "src/player1.png";
        document.getElementById("winplayer").innerHTML = player1name.innerHTML
    } else {
        document.getElementById("pic").width = "500";
        document.getElementById("pic").src  = "src/player2.png";
        document.getElementById("winplayer").innerHTML = player2name.innerHTML
    }
}
