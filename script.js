let isGamemodeMulti = true;
           let menudiv = document.getElementById("menu");
           let gamediv = document.getElementById("game");
           let multiplayer = document.getElementById("svg-multi");
           let ai = document.getElementById("svg-ai");
           let multiText = document.getElementById("text-multi");
           let aiText = document.getElementById("text-ai");
           let player2TB = document.querySelectorAll(".name");
           gamediv.style.display = "none";
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
            for(let i = 0; i < 6;i++){
                let temp = [];
                for(let j = 0; j < 7; j++){
                    temp.push(0);
                }
                table.push(temp);
            }
            gameTable.onclick = function(event) {
                let td = event.target.closest('td'); 
                tmp = td.classList[0]
                col = tmp[tmp.length-1]
                Put(col);
            };
            
            function Put(col){
                column = document.querySelectorAll(".col"+ col);
                let isFull = true;
                let j = 0;
                while(j < 6 && isFull){
                    if(column[j].innerHTML ==="")
                    {
                        isFull = false;
                    }
                    j++;
                }
                let i = 5;
                let flag = false;
                if(!isFull){
                    while(!flag && i >= 0){
                        if(column[i].innerHTML === "")
                        {
                            cell = column[i];
                            if(isPlayer1turn){
                                cell.innerHTML="<img src='sarga.png' width='90' class='fall'/>";
                                table[i][col-1] = 1;
                            }
                            else {
                                cell.innerHTML="<img src='lila.png' width='90' class='fall'/>";
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
                            let random = Math.floor(Math.random() * 6);
                            Put(random);
                        }   
                    }
                }
            }
              
            function sleep(ms) {
                return new Promise((resolve) => setTimeout(resolve, ms));
            }
            async function Mosikalep(){
                await sleep(700)
                let random = Math.floor(Math.random() * 6);
                Put(random);
            }
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
                clearInterval(downloadTimer)
                time(roundTime);
            }
           function Play(){
            roundTime = document.getElementById("timerval").value;
            timerBar.max = roundTime;
            time(roundTime);
            player2img.classList.add("gray");
            if(player2TB[0].value != "" && player2TB[1].value != ""){
                if(!isGamemodeMulti){
                    player2img.src = "mosi.png";
                }
                else {
                    player2img.src = "player2.png";
                }
                menudiv.style.display = "none";
                gamediv.style.display = "block";
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
           function RemoveError(){
            if(player2TB[0].value != ""){
                    player2TB[0].classList.remove("invalid");
            }
            if(player2TB[1].value != ""){
                    player2TB[1].classList.remove("invalid");
            }
           }
           function Menu(){
            menudiv.style.display = "block";
            gamediv.style.display = "none";
            clearInterval(downloadTimer);
           }
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

           // TIMER
           function time(timeleft){
                downloadTimer = setInterval(function(){
                    if(timeleft <= 0){
                        clearInterval(downloadTimer);
                        if(isPlayer1turn){
                            alert("Player2 WON!")
                            Menu();
                        } else {
                            alert("Player1 WON!")
                            location.reload();
                            Menu();
                        }
                    }
                    document.getElementById("timerBar").value = timeleft;
                    timeleft -= 1;
                }, 1000);
            }
            function CheckVictory(r,c){
                // sorok
                check = table[r][c]
               for(let i = 0; i < 6; i++){
                    for(let j = 0; j < 4; j++){
                        if(table[i][j] == table[i][j+1] && table[i][j] == table[i][j+2] && table[i][j] == table[i][j+3] && table[i][j] != ""){
                            if(isPlayer1turn){
                                alert("WINNER: " + player1name.innerHTML);
                                Menu();
                            } else {
                                alert("WINNER: " + player2name.innerHTML);
                                Menu();
                            }
                        }
                    }
                }
                //oszlopok
                for(let i = 0; i < 7; i++){
                    for(let j = 0; j < 3; j++){
                        if(table[j][i] == table[j+1][i] && table[j][i] == table[j+2][i] && table[j+3][i] == table[j][i] && table[j][i] != ""){
                            if(isPlayer1turn){
                                alert("WINNER: " + player1name.innerHTML);
                                Menu();
                            } else {
                                alert("WINNER: " + player2name.innerHTML);
                                Menu();
                            }
                        }
                    }
                }
                //atlok
           /*     for(let i = 3; i < 7; i++){
                    for(let j = 0; j < 3; j++){
                        if(check == table[i][j] && check == table[i-2][j+2] && check == table[i-3][j+3] && check != ""){
                            if(isPlayer1turn){
                                alert("WINNER: " + player1name.innerHTML);
                                Menu();
                            } else {
                                alert("WINNER: " + player2name.innerHTML);
                                Menu();
                            }
                        }
                    }
                }*/
            }
        function Won(){
            if(isPlayer1turn){
                alert("WINNER: " + player1name.innerHTML);
                Menu();
            } else {
                alert("WINNER: " + player2name.innerHTML);
                Menu();
            }
        }
    