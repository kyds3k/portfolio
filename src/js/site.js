$(document).ready(function() {
  let tracks = getTracks("kyds3k");
  tracks.then(res => {
    $(".album-image").html(
      '<img src="' + res.recenttracks.track[0].image[2]["#text"] + '" />'
    );
    $(".current-artist").html(res.recenttracks.track[0].artist["name"]);
    $(".current-track").html(res.recenttracks.track[0].name);
    $(".current-album").html(res.recenttracks.track[0].album["#text"]);
  });
});

// Last.fm scrobbling
async function getTracks(id) {
  try {
    let response = await fetch(
      `https://ws.audioscrobbler.com/2.0?method=user.getRecentTracks&user=${id}&api_key=70d032701f2e8602243e3915d6d25980&&format=json&extended=1`
    );
    return await response.json();
  } catch (err) {
    console.error(err);
    // Handle errors here
  }
}

// Video thumbnail moving
let myThumb = document.getElementsByClassName("vid-me")[0];
let isPlaying =
  myThumb.currentTime > 0 &&
  !vidmyThumbeo.paused &&
  !myThumb.ended &&
  myThumb.readyState > 2;

myThumb.addEventListener("mouseover", function() {
  if (!isPlaying) this.play();
});

myThumb.addEventListener("mouseout", function() {
  this.pause();
  this.currentTime = 0;
});

// Skillset animations

let skillz = document.getElementsByClassName("skill");

Array.from(skillz).forEach((skill, index) => {
  setTimeout(function() {
    let level = skill.dataset.percent;
    $(skill).css("width", level + "%");
  }, 250 * index);
});
