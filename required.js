
document.addEventListener("DOMContentLoaded", function () {
    var hideme = document.getElementById("hideme");
    hideme.style.display = "none";
});

function show() {
    hideme.style.display = "contents";
    document.getElementById("epic music").play();
    document.getElementById("loadbutton").style.display = "none";
}