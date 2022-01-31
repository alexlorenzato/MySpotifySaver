// client id:       24f7cee526b8428196a25cbb7ce2179e
// client secret:   fe8b4df726f1430c83b04b49bd83cc8d

var redirect_uri = "http://127.0.0.1:5501/index.html";
 

var client_id = ""; 
var client_secret = "";

const AUTHORIZE = "https://accounts.spotify.com/authorize"


function onPageLoad(){
    client_id = localStorage.getItem("client_id");
    client_secret = localStorage.getItem("client_secret"); 
    
    if( window.location.search.length() > 0){
        handleRedirect();
    }
    else{
        access_token = localStorage.getItem("access_token");
        if( access_token == null ){
            document.getElementById("tokenSection").style.display = 'block';
        }
        else {
            // we have an access token so present device section
            document.getElementById("deviceSection").style.display = 'block'; 
            // refreshPlaylists(); 
        }
    }
}

function handleRedirect(){
    let code = getCode();
    fetchAccessToken( code );
    window.history.pushState("", "", redirect_uri); // remove param from url
}

function fetchAccessToken( code ){
    let body = "grant_type=authorization_code";
    body += "&code=" + code; 
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
}

function callAuthorizationApi(body){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

// build a link with all the permissions we're asking 
function requestAuthorization(){
    client_id = document.getElementById("clientId").value;
    client_secret = document.getElementById("clientSecret").value;
    localStorage.setItem("client_id", client_id);
    localStorage.setItem("client_secret", client_secret); // In a real app you should not expose your client_secret to the user

    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url; // Show Spotify's authorization screen
}

function funzione(){
    console.log("funziono")
    alert("stocazzo")
}