const apiURL = "https://api.lyrics.ovh";
const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

//SEARCH BY SONG OR ARTIST
async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  showData(data);
}

//SHOW SONGS/ARTIST IN DOM
function showData(data) {
  result.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(
          (song) => `
       <li>
          <span><strong>${song.artist.name}</strong> - ${song.title}</span>
          <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
        </li>
      `
        )
        .join("")}
    </ul> 
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
      ${
        data.prev
          ? `<button class="btn" onclick=getMoreSongs("${data.prev}")>Prev</button>`
          : ""
      }
      ${
        data.next
          ? `<button class="btn" onclick=getMoreSongs("${data.next}")>Next</button>`
          : ""
      }
    `;

    console.log(data.next);
  } else {
    more.innerHTML = "";
  }
}

//PREV / NEXT BUTTON
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showData(data);

  console.log(url);
}

//EVENT LISTENERS
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  //VALIDATING SEARCH TEARM
  if (!searchTerm) {
    alert("Please search something!");
  } else {
    searchSongs(searchTerm);
  }
});

//Get Lyrics BUTTON
result.addEventListener("click", (e) => {
  const clickedEl = e.target;

  if (clickedEl.tagName === "BUTTON") {
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);
  }
});

//Get Lyrics FUNCTION
async function getLyrics(artist, songtitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songtitle}`);
  const data = await res.json();

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

  result.innerHTML = `<h2><strong>${artist}</strong> - ${songtitle}</h2>
  <span>${lyrics}</span>`;

  more.innerHTML = "";
}
