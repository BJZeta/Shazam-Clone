const apiURL = "https:api.lyrics.ovh";
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
