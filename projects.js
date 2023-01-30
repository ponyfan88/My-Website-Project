// #1
import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const octokit = new Octokit()

async function showRepos(user) {
  var request = await octokit.request('GET /users/{username}/repos{?type,sort,direction,per_page,page}', {
    username: user
  });
  
  var repos = request.data;

  shuffle(repos)
  
  for (var i = 0; i < repos.length; i++) {
    var repo = repos[i]
    
    console.log(repo.name)
    var div = document.createElement('div');
    var innerHTML = "";

    var reponame = repo.name;

    innerHTML += "<a href=\"https://github.com/" + user + "/" + repo.name + "\">"

    innerHTML += "<span class=\"repo-name\">" + reponame + "</span>"; // add our repository name

    if (repo.fork)
    {
      innerHTML += "<span class=\"repo-smalltext\">&nbsp(fork)</span><br><br>"
    }
    else
    {
      innerHTML += "<br><br>";
    }

    innerHTML += "<span class=\"repo-desc\">" // add a line break

    if (repo.description)
    {
      innerHTML += repo.description
    }
    else
    {
      innerHTML += "(this repo has no desc.)"
    }

    innerHTML += "</span></a>"

    div.innerHTML = innerHTML
 
    document.getElementsByClassName("container")[0].appendChild(div);

    window.scrollTo(0, 0);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  showRepos("ponyfan88")
  showRepos("quickkennedy")
  // latest function will appear at the top (:
   // stops MANY issues
}, false);


// you could use any way to find your iframe, this is my favorite way
const iframe = document.getElementById('myframe');

// if we dont have anything after the link, set the location to 1, otherwise, take the current location.search (returns ?1, ?2, etc.) and split it by "?", returning the current recursion number. then add one, since its the next recursion.
var nextQueryValue = !location.search ? 1 : Number(location.search.split("?").pop()) + 1;

const MAX_RECURSIONS = 40; // ONLY LOOP 6 TIMES

// if the value we want to use next is above our recursions, we'll repeat the valuse.
if (nextQueryValue > MAX_RECURSIONS - 2) {
  nextQueryValue = MAX_RECURSIONS;
  // once it encounters the same query value (aka the same link) twice, it will stop the recursion
}

// set the source to our next recursion
iframe.src = "projects.html?" + nextQueryValue;