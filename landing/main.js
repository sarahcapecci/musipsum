var A, C, D, E, F, G, container, count, createPoint, i, note, notesArr, playNote, rand, song, srcArr, srcDir;

container = $("#container");
count = 0;
// What note to play next
note = 0;
// Declare note vars for song array
C = "C";
D = "D";
E = "E";
F = "F";
G = "G";
A = "A";
// Define the notes we will use (some random stuff)
notesArr = ["C", "D", "E", "F", "G", "A"];
// Where are these sounds coming from, bro?
srcDir = "http://www.vibrationdata.com/";
// Define the SRC for our audio elements
srcArr = [srcDir + "piano_middle_C.mp3", srcDir + "piano_A.mp3", srcDir + "piano_D.mp3", srcDir + "piano_E.mp3", srcDir + "piano_B.mp3", srcDir + "piano_G_sharp.mp3"];

// The notes of the song!
song = [C, C, G, G, A, A, G, 
		F, F, E, E, D, D, C, 
		G, G, F, F, E, E, D, 
		G, G, F, F, E, E, D, 
		C, C, G, G, A, A, G, 
		F, F, E, E, D, D, C
];
i = 0;
while (i < notesArr.length) {
  // Add the audio elements to the DOM
  $("body").append("<audio id=\"" + notesArr[i] + "\" src=\"" + srcArr[i] + "\" autostart=\"false\">");
  // Next note, please
  i++;
}
// Defining the function to play sounds.
playNote = function(index, songArray) {
  // load the sound before playing - check!
  document.getElementById(songArray[index]).load();
  // Play the sound
  document.getElementById(songArray[index]).play();
};
// Basic random number from range
rand = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
// Define our visual effect function
createPoint = function(count, e) {
  // Function explicit vars
  var a, b, color, g, r, size, point, x, y;
  // point size, between 100px and 250px
  size = rand(100, 250);
  // Random color RGB values (0-255)
  r = rand(0, 250);
  g = rand(0, 255);
  b = rand(0, 255);
  // Alpha value, (range / 10 = decimal value)
  a = rand(3, 10) / 10;
  // Compile our point color in RGBA format
  color = r + ", " + g + ", " + b + ", " + a;
  // Create the element
  container.append("<div class=\"point-" + count + "\"></div>");
  // Assign unique class
  point = $(".point-" + count);
  // Give it a size
  point.css({
    width: size,
    height: size
  });
  // Center the point on the cursor position
  x = e.offsetX - point.outerWidth() / 2;
  y = e.offsetY - point.outerHeight() / 2;
  // Assign the position of our point & assign previously defined random color
  point.css({
    top: y,
    left: x,
    background: "rgba(" + color + ")"
  });
  // Adding the CSS animation to the completion of the event
  point.addClass("downScale").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {
    // Remove the point (whenanimation is complete)
    $(this).remove();
  });
};
// Bind mouseup event to our containing element & pass the event for our point function
container.on("mouseup", function(e) {
  // Create our visual
  createPoint(count, e);
  // increment count by 1
  count++;
  // Play the current note from our song
  playNote(note, song);
  // Increments the note index then if it is the last note of the song, play the first
  note = (note + 1) % song.length;
});