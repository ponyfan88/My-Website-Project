// on page load
document.addEventListener("DOMContentLoaded", function () {
    var hideme = document.getElementById("hideme"); // find the div that has the id "hideme"
    hideme.style.display = "none"; // set its display style to "none" (hiding its contents)
});

function show() { // "show" function (called when we click or "load page" button)
    hideme.style.display = "contents"; // show our div with the id "hideme"
    document.getElementById("epic music").play(); // start playing our epic music
    document.getElementById("loadbutton").style.display = "none"; // hide our "load page" button
}