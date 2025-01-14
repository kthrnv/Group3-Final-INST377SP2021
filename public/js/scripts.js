/* 
    NAVBAR BURGER FUNCTIONALITY
*/
document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

/* 
    POPULATING CHARTS/ TABLES
*/
async function getUSCharts() {
  const songRequest = await fetch("/api/wholeUSchart");
  const songData = await songRequest.json();
  return songData;
}

async function getGlobalCharts() {
  const songRequest = await fetch("/api/wholeGlobalChart");
  const songData = await songRequest.json();
  return songData;
}

async function getUserAddedSongs() {
  const songRequest = await fetch("/api/userSongs");
  const songData = await songRequest.json();
  return songData;
}

async function getSongs() {
  const songRequest = await fetch("/api/songs");
  const songData = await songRequest.json();
  return songData;
}

/*
  Handle Edit Button Click
*/
async function edit_row(event) {
  console.log("clicked button", event.target);
  console.log("button value", event.target.value);

  const rowIndex = event.target.classList;
  const row = rowIndex[0].substring(3);
    console.log(row);
    const rowData = document.getElementsByClassName(rowIndex[0]);
    console.log(rowData);
    const songName = rowData[0].innerText;
    const explicitInput = rowData[1].innerText;
    let explicitVal = false;
    if (explicitInput === "true") {
      explicitVal = true;
    }
    console.log(songName, explicitVal);

    const newSongName = document.querySelector(".input" + row).value;
    console.log(newSongName);

    let newExplicit = false;
    try {

      if (document.querySelector(".checkbox" + row +":checked").value === null) {
        newExplicit = false;
      } else {
        newExplicit = true;
      }

    } catch {
      newExplicit = false;
    }
    
    console.log(newExplicit);

    fetch('/api/songs', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({song_name: songName, explicit: explicitVal, updatedSong: newSongName, updatedExplicit: newExplicit})
    })
      //.then((fromServer) => fromServer.json())
      //.then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
      .catch((err) => {
        console.log(err);
      });
}

async function delete_row(event) {
  // console.log("clicked button", event.target);
  // console.log("button value", event.target.value);
  const rowIndex = event.target.classList;
  if (rowIndex.length > 1) {
    //console.log(rowIndex);
    const row = rowIndex[1];
   // console.log(row);
    const rowData = document.getElementsByClassName(row);
    const songName = rowData[0].innerText;
    const explicitInput = rowData[1].innerText;
    let explicitVal = false;
    if (explicitInput === "true") {
      explicitVal = true;
    }
    console.log(songName, explicitVal);

    fetch('/api/songs', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({song_name: songName, explicit: explicitVal})
    })
      //.then((fromServer) => fromServer.json())
      //.then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
      .catch((err) => {
        console.log(err);
      });

  } 
}

async function windowActions() {
  const usResults = await getUSCharts();
  const globalResults = await getGlobalCharts();
  const userResults = await getUserAddedSongs();
  const songsResults = await getSongs();
  // console.table(usCharts.data);
  // console.table(globalResults.data);
  const usCharts = usResults.data;
  const globalCharts = globalResults.data;
  const userTable = userResults.data;
  const songsTable = songsResults.data;
  console.table(songsTable);
  console.table(userTable);

  const usTopSong = document.querySelector(".us-top-songs");
  usCharts.forEach((item) => {
    const appendItem = document.createElement("tr");

    appendItem.innerHTML = `
            <td>${item.us_top50_rank}</td>
            <td>${item.song_name}</td>
            <td>${item.artist_name}</td>
            <td>${item.streams}</td>`;

    if (usTopSong) {
      usTopSong.append(appendItem);
    }
  });

  const globalTopSong = document.querySelector(".global-top-songs");
  globalCharts.forEach((item) => {
    const appendItem = document.createElement("tr");

    appendItem.innerHTML = `
            <td>${item.global_top50_rank}</td>
            <td>${item.song_name}</td>
            <td>${item.artist_name}</td>
            <td>${item.streams}</td>`;

    if (globalTopSong) {
      globalTopSong.append(appendItem);
    }
  });

  const userAddedSong = document.querySelector(".playlist-table");
  let rowIndex = document.getElementById("myTable").rows.length;
  console.log(rowIndex);
  userTable.forEach((item) => {
    const appendItem = document.createElement("tr");
    rowIndex++;
    console.log(rowIndex);
    appendItem.innerHTML = `
            <td id="song_col" class="row${rowIndex}">${item.song_name}</td>
            <td id="explicit_col" class="row${rowIndex}">${item.explicit}</td>
            <td class="is-narrow"><input type='button' id='edit_button' value='Edit' class='edit row${rowIndex} modal-button' onclick='edit_row' data-target="modal-edit${rowIndex}" aria-haspopup="true">
            
            <div id="modal-edit${rowIndex}" class="modal">
                    <div class="modal-background"></div>
                    <div class="modal-card">
                        <header class="modal-card-head">
                        <p class="modal-card-title">Edit Song ${rowIndex}</p>
                        <button class="delete" aria-label="close"></button>
                        </header>
                        <section class="modal-card-body">
                          <!-- BEGINNING OF FORM -->
                          <form action='/api/songs' method='post'>
                            <input type="hidden" name="_method" value="put" />
                            <div class='form-row'>
                              <label for='songInput'>Song Title</label>
                              <input class="input${rowIndex}" id='songInput' name='songInput' type='text' required/>
                            </div>
                            <br>
                            <div class='form-row'>
                              <label class="checkbox">
                                <input type="checkbox" class="checkbox${rowIndex}" name="explicitInput" id="explicitInput">
                                Explicit
                              </label>
                        </section>
                        <footer class="modal-card-foot">
                        <button class="row${rowIndex} button is-link center save" type="save" value="save" id="save" formmethod="post">Save</button>
                        <button class="button center">Cancel</button>
                        </footer>
                          </form>
                    </div>
                </div>


            <input type='button' id='delete_button' value='Delete' class='deleted row${rowIndex}' onclick='delete_row'></td>`;

    if (userAddedSong) {
      userAddedSong.append(appendItem);
    }
  });
  const editBtn = document.querySelectorAll(".edit");
  //console.log(editBtn);
  const deleteBtn = document.querySelectorAll(".deleted");
  //console.log(deleteBtn);
  const saveBtn = document.querySelectorAll(".save");

  let rootEl = document.documentElement;
  let $modals = document.querySelectorAll(".modal");
  let $modalButtons = document.querySelectorAll(".modal-button");
  let $modalCloses = document.querySelectorAll(
    ".modal-background, .modal-close, .modal-card-head .deleted, .modal-card-foot .button"
  );
  editBtn.forEach((item) => {
    if ($modalButtons.length > 0) {
      $modalButtons.forEach(function ($el) {
        $el.addEventListener("click", function () {
          let target = $el.dataset.target;
          let $target = document.getElementById(target);
          rootEl.classList.add("is-clipped");
          $target.classList.add("is-active");
        });
      });
    }
  
    if ($modalCloses.length > 0) {
      $modalCloses.forEach(function ($el) {
        $el.addEventListener("click", function () {
          closeModals();
        });
      });
    }
  
    document.addEventListener("keydown", function (event) {
      let e = event || window.event;
      if (e.keyCode === 27) {
        closeModals();
      }
    });
  
    function closeModals() {
      rootEl.classList.remove("is-clipped");
      $modals.forEach(function ($el) {
        $el.classList.remove("is-active");
      });
    }
  
    // Functions
  
    function getAll(selector) {
      return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
    }
    });


  deleteBtn.forEach((item) => {
    item.addEventListener("click", (event) => {
      delete_row(event);
    });
  });

  saveBtn.forEach((item) => {
    item.addEventListener("click", (event) => {
      edit_row(event);
    });
  });
  
}

window.onload = windowActions;

/* 
    MODAL POP-UP 
*/
("use strict");

document.addEventListener("DOMContentLoaded", function () {
  // Modals

  let rootEl = document.documentElement;
  let $modals = getAll(".modal");
  let $modalButtons = getAll(".modal-button");
  let $modalCloses = getAll(
    ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
  );

  if ($modalButtons.length > 0) {
    $modalButtons.forEach(function ($el) {
      console.log($el);
      $el.addEventListener("click", function () {
        let target = $el.dataset.target;
        let $target = document.getElementById(target);
        rootEl.classList.add("is-clipped");
        $target.classList.add("is-active");
      });
    });
  }

  if ($modalCloses.length > 0) {
    $modalCloses.forEach(function ($el) {
      $el.addEventListener("click", function () {
        closeModals();
      });
    });
  }

  document.addEventListener("keydown", function (event) {
    let e = event || window.event;
    if (e.keyCode === 27) {
      closeModals();
    }
  });

  function closeModals() {
    rootEl.classList.remove("is-clipped");
    $modals.forEach(function ($el) {
      $el.classList.remove("is-active");
    });
  }

  // Functions

  function getAll(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
  }
});

/* 
    Appending Playlist Cards 
*/

// function getCookie(cname) {
//   let name = cname + "=";
//   let decodedCookie = decodeURIComponent(document.cookie);
//   let ca = decodedCookie.split(';');
//   for(let i = 0; i <ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) == ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }
// function getPlaylists() {
//   let num_playlist = getCookie("num_playlist");

//   if (num_playlist.length == 0) {
//     document.cookie = "num_playlist = 0";
//     num_playlist = 0;
//   }
//   const num = parseInt(num_playlist);
//   const playlists = [];
//   for (let i = 0; i < num; i++) {
//     const playlist = getCookie("playlist" + i.toString());
//     playlists.push(playlist);
//   }
//   return playlists;
// }

// function generatePlaylist()
// {
//   let num_playlist = getCookie("num_playlist");
//   if (num_playlist.length == 0) {
//     document.cookie = "num_playlist = 0";
//     num_playlist = 0;
//   }
//   const num = parseInt(num_playlist);
//   document.cookie = "num_playlist =" + (num+1).toString();

//   document.cookie = "playlist" + num.toString() + "= content";
//   console.log(getPlaylists());
// }

// const pDisplay = `
// <div class="column is-one-quarter">
// <div class="card card-button" onclick="location.href='playlistsview.html'">
//   <div class="card-image">
//     <figure class="image is-4by3">
//       <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
//     </figure>
//   </div>
//   <div class="card-content has-text-centered">
//     <div class="media">
//       <div class="media-content">
//         <p class="title is-4">Playlist Name</p>
//         <p class="subtitle is-6">Created on 4/20/2021</p>
//       </div>
//     </div>
//   </div>
// </div>
// </div>
// </div>
// `;

// function displayPlaylists() {
//   const playlists = getPlaylists();
//   const preview = document.getElementById("playlist_preview");
//   const container = preview.firstElementChild;
//   container.innerHTML = "";
//   for (let i = 0; i < playlists.length; i++) {
//     container.innerHTML += pDisplay;
//   }
//   console.log(container);
//   // document.getElementById("playlist_preview").firstElementChild.innerHTML=pDisplay;
// }

// displayPlaylists();

// const button = document.getElementById("p-button");
// console.log(button);

// button.addEventListener('click' , generatePlaylist);

/* 
  function to move through create playlist forms
*/

/* function ifRandom() {    
  if (document.getElementById('random').checked) {
    document.getElementById('rando').style.display = 'block';
    document.getElementById('custo').style.display = 'none';
  }
  else {   
    console.log('custom!');
  }
}
function nextPage() {
  const page1 = document.querySelector('#step-one');
  const page2 = document.querySelector('#step-two');
  page1.style.display = 'none';
  page2.style.display = 'block';
} */
/*
function prevPage() {
  const page1 = document.querySelector('#step-one');
  const page2 = document.querySelector('#step-two');
  page1.style.display = 'block';
  page2.style.display = 'none';
}
function togglePage(page1, page2) {
  page1.style.display = 'none';
  page2.style.display = 'block';
}

// selecting the page that you want to change
const stepone = document.getElementById('step-one');
const steptwo = document.getElementById('step-two');
const next = document.getElementById('next');
const prev = document.getElementById('prev');

// calling the function (look at HTML for style attribute on these forms)
next.onclick = nextPage(stepone, steptwo);
prev.onclick = prevPage(steptwo, stepone); */
