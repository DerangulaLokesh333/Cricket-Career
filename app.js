const playerForm = document.getElementById("playerForm");

const formSection = document.getElementById("formSection");
const searchSection = document.getElementById("searchSection");
const searchResult = document.getElementById("searchResult");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const addPlayerBtn = document.getElementById("addPlayerBtn");

let editingPlayerId = null;




playerForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const player = {

        id: editingPlayerId || Date.now(),

        name: document.getElementById("name").value,

        dob: document.getElementById("dob").value,

        photoUrl: document.getElementById("photoUrl").value,

        birthplace: document.getElementById("birthplace").value,

        career: document.getElementById("career").value,

        matches: document.getElementById("matches").value,

        score: document.getElementById("score").value,

        fifties: document.getElementById("fifties").value,

        centuries: document.getElementById("centuries").value,

        wickets: document.getElementById("wickets").value,

        average: document.getElementById("average").value

    };


    let players =
        JSON.parse(localStorage.getItem("players")) || [];


    

    if (editingPlayerId) {

        players = players.map(function (oldPlayer) {

            if (oldPlayer.id === editingPlayerId) {

                return player;

            }

            return oldPlayer;

        });


        localStorage.setItem(
            "players",
            JSON.stringify(players)
        );


        alert("Player updated successfully!");


        // Show updated player profile

        showPlayerProfile(player);


        // Reset edit mode

        editingPlayerId = null;


        // Reset button text

        playerForm.querySelector(
            "button[type='submit']"
        ).textContent = "Submit";


        return;

    }


    

    players.push(player);


    localStorage.setItem(
        "players",
        JSON.stringify(players)
    );


    // Clear form

    playerForm.reset();


    alert("Player added successfully!");

});




searchBtn.addEventListener("click", function () {

    const searchName =
        searchInput.value.trim().toLowerCase();


    if (searchName === "") {

        alert("Please enter a player name.");

        return;

    }


    const players =
        JSON.parse(localStorage.getItem("players")) || [];


    const player = players.find(function (player) {

        return player.name
            .toLowerCase()
            .includes(searchName);

    });


    

    if (player) {

        showPlayerProfile(player);

        searchInput.value = "";

    }


    else {

        alert("Player not found.");

    }

});



function showPlayerProfile(player) {

    // Hide form

    formSection.style.display = "none";


    // Hide search section

    searchSection.style.display = "none";


    // Show profile

    searchResult.style.display = "block";


    // Show Add Player button

    addPlayerBtn.style.display = "block";


    searchResult.innerHTML = `

        <h1>Player Information</h1>


        <div class="player-card">

            <img
                src="${player.photoUrl}"
                alt="${player.name}"
            >


            <h2>${player.name}</h2>


            <p>
                <strong>Date of Birth:</strong>
                ${player.dob}
            </p>


            <p>
                <strong>Birthplace:</strong>
                ${player.birthplace}
            </p>


            <p>
                <strong>Career:</strong>
                ${player.career}
            </p>


            <p>
                <strong>Matches:</strong>
                ${player.matches}
            </p>


            <p>
                <strong>Score:</strong>
                ${player.score}
            </p>


            <p>
                <strong>Fifties:</strong>
                ${player.fifties}
            </p>


            <p>
                <strong>Centuries:</strong>
                ${player.centuries}
            </p>


            <p>
                <strong>Wickets:</strong>
                ${player.wickets}
            </p>


            <p>
                <strong>Average:</strong>
                ${player.average}
            </p>


            <div class="profile-buttons">

                <button
                    class="edit-btn"
                    onclick="editPlayer(${player.id})"
                >
                    Edit Player
                </button>


                <button
                    class="delete-btn"
                    onclick="deletePlayer(${player.id})"
                >
                    Delete Player
                </button>

            </div>

        </div>

    `;

}



function editPlayer(playerId) {

    const players =
        JSON.parse(localStorage.getItem("players")) || [];


    const player = players.find(function (player) {

        return player.id === playerId;

    });


    if (!player) {

        alert("Player not found.");

        return;

    }


    // Store player ID

    editingPlayerId = playerId;


    // Show form

    formSection.style.display = "block";


    // Hide search

    searchSection.style.display = "none";


    // Hide profile

    searchResult.style.display = "none";


    // Hide Add Player button

    addPlayerBtn.style.display = "none";


    // Fill form with existing player details

    document.getElementById("name").value =
        player.name;

    document.getElementById("dob").value =
        player.dob;

    document.getElementById("photoUrl").value =
        player.photoUrl;

    document.getElementById("birthplace").value =
        player.birthplace;

    document.getElementById("career").value =
        player.career;

    document.getElementById("matches").value =
        player.matches;

    document.getElementById("score").value =
        player.score;

    document.getElementById("fifties").value =
        player.fifties;

    document.getElementById("centuries").value =
        player.centuries;

    document.getElementById("wickets").value =
        player.wickets;

    document.getElementById("average").value =
        player.average;


    // Change Submit button to Update Player

    playerForm.querySelector(
        "button[type='submit']"
    ).textContent = "Update Player";

}




function deletePlayer(playerId) {

    const confirmDelete =
        confirm("Are you sure you want to delete this player?");


    if (!confirmDelete) {

        return;

    }


    let players =
        JSON.parse(localStorage.getItem("players")) || [];


    // Remove player

    players = players.filter(function (player) {

        return player.id !== playerId;

    });


    // Save updated players

    localStorage.setItem(
        "players",
        JSON.stringify(players)
    );


    alert("Player deleted successfully!");


    // Hide profile

    searchResult.style.display = "none";

    searchResult.innerHTML = "";


    // Hide Add Player button

    addPlayerBtn.style.display = "none";


    // Show form

    formSection.style.display = "block";


    // Show search section

    searchSection.style.display = "block";


    // Clear search box

    searchInput.value = "";


    // IMPORTANT:
    // Clear deleted player's details from form

    playerForm.reset();


    // Reset edit mode

    editingPlayerId = null;


    // Reset submit button

    playerForm.querySelector(
        "button[type='submit']"
    ).textContent = "Submit";

}



addPlayerBtn.addEventListener("click", function () {

    // Hide profile

    searchResult.style.display = "none";

    searchResult.innerHTML = "";


    // Hide Add Player button

    addPlayerBtn.style.display = "none";


    // Show form

    formSection.style.display = "block";


    // Show search section

    searchSection.style.display = "block";


    // Clear search box

    searchInput.value = "";


    // Clear form

    playerForm.reset();


    // Reset edit mode

    editingPlayerId = null;


    // Reset submit button

    playerForm.querySelector(
        "button[type='submit']"
    ).textContent = "Submit";

});




formSection.style.display = "block";

searchSection.style.display = "block";

searchResult.style.display = "none";

addPlayerBtn.style.display = "none";