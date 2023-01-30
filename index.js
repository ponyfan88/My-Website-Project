const animate = document.getElementById("animate");

const clickytext = document.getElementById("clickytext")

var growtext = document.getElementById("grow")

var clicks = 0;

function clicky() {
  if (clicks >= 5)
  {
    clickytext.innerHTML = "you've clicked home <span id=\"grow\">" + clicks + "</span> times"
    document.getElementById("grow").style.fontSize = (100 + clicks) + "%"
  }
  else
  {
    clickytext.innerHTML = "you are already home!"
  }
}

function ani() {
  clicks++;
  animate.className = "";
  void animate.offsetWidth;
  animate.className = "shake";

  clickytext.className = "";
  void clickytext.offsetWidth;
  clickytext.className = "squish";

  clicky();
}