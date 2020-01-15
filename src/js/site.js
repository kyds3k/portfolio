$(document).ready(function() {
  //Get and display most recent track
  scrobbleScribble("kyds3k");
  //Update track every 3 minutes (in case someone is captivated by my site and is on there for 3 minutes)
  let scrobGoblin = setInterval(function() {
    scrobbleScribble("kyds3k");
  }, 180000);

  // Track "EQ" display
  let eqLines = document.getElementsByClassName("eq-line");
  let eqCount = eqLines.length;

  let bars = setInterval(function() {
    for (let i = 0; i < eqCount; i++) {
      let eqVar = randomIntFromInterval(10, 100);
      eqLines[i].style["height"] = eqVar + "%";
    }
  }, 100);

  // Video thumbnail moving
  let myThumb = document.getElementsByClassName("vid-me")[0];

  myThumb.addEventListener("mouseover", function() {
    //Check to see if video is ready to go
    if (myThumb.readyState > 2) {
      this.play();
    }
  });

  myThumb.addEventListener("mouseout", function() {
    if (myThumb.readyState > 2) {
      this.pause();
      this.currentTime = 0;
    }
  });

  // Skillset animations
  let skillz = document.getElementsByClassName("skill");

  Array.from(skillz).forEach((skill, index) => {
    setTimeout(function() {
      let level = skill.dataset.percent;
      $(skill).css("width", level + "%");
    }, 250 * index);
  });
});

//Render scrobbled info
function scrobbleScribble(id) {
  let tracks = getTracks(id);
  tracks.then(res => {
    let currentArtist = $(".current-artist").html();
    let currentTrack = $(".current-track").html();
    let newImage = res.recenttracks.track[0].image[2]["#text"];
    let newArtist = res.recenttracks.track[0].artist["name"];
    let newTrack = res.recenttracks.track[0].name;
    let newAlbum = res.recenttracks.track[0].album["#text"];

    if (
      newImage ===
        "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png" ||
      newImage === ""
    )
      newImage = "images/cassette-smaller.gif";

    if (newArtist != currentArtist && newTrack != currentTrack) {
      $(".album-image img")
        .attr("src", newImage)
        .attr("alt", newArtist + " - " + newTrack);
      $(".current-artist").html(newArtist);
      $(".current-track").html(newTrack);
      $(".current-album").html(newAlbum);
    }
  });
}

// Last.fm scrobbling
async function getTracks(id) {
  try {
    let response = await fetch(
      `https://ws.audioscrobbler.com/2.0?method=user.getRecentTracks&user=${id}&api_key=70d032701f2e8602243e3915d6d25980&&format=json&extended=1`
    );
    return await response.json();
  } catch (err) {
    $(".current-artist").html("An error occurred.");
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
