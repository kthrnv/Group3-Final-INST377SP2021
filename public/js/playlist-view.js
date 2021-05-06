/* 
    POPULATING CHARTS RANDOMLY
*/
document.addEventListener('DOMContentLoaded', () => {

  function getRando(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async function getSongs() {
    const songRequest = await fetch('/api/songs');
    const songData = await songRequest.json();
    return songData;
  }

  async function windowActions() {
    
    const songs = await getSongs();
    const songsData = songs.data;

    //console.table(songsArtists.data);

    const random = [1,2,3,4,5,6,7,8,9,10];
    
    const selectedSongs = random.map((element) => {
      const randomNum = getRando(0, songsData.length - 1);
      return songsData[randomNum];
    });

    console.table(selectedSongs)

    const table = document.querySelector('.playlist-table');
    selectedSongs.forEach((item) => {
      const appendItem = document.createElement('tr');

      appendItem.innerHTML = `
              <td>${item.song_name}</td>
              <td>${item.explicit}</td>`;
          
      if (table) {
        table.append(appendItem);
      }
          
    });

  }
  
  window.onload = windowActions;
  
});