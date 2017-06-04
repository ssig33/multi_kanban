export default class GHClient {

  get(path, token, func){
    let url= '';
    if(path.match(/^https/)){
      url = path;
    } else {
      url = "https://api.github.com" + path;
    }

    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", (e)=>{
      const res = JSON.parse(e.target.response);
      func(res);
    });
    xhr.open("GET", url);
    xhr.setRequestHeader("Accept", "application/vnd.github.inertia-preview+json");
    xhr.setRequestHeader("Authorization", "token "+token);
    xhr.send();
  }
}
