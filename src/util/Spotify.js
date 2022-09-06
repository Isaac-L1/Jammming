let accessToken = "";
let expirationTime;
const clientID = "8d66429155004cccb06828cdb9da170d";
const redirectURI = "http://localhost:3000/";

const Spotify = {
    getAccessToken() {
        if (accessToken) return accessToken;
        console.log(accessToken);
        if (!(window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/))) {
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            while(window.location.href.match(/accounts.spotify.com/)) {};
        }
        accessToken = window.location.href.match(/access_token=([^&]*)/)[0].slice(13);
        expirationTime = window.location.href.match(/expires_in=([^&]*)/)[0].slice(11);
        window.setTimeout(() => accessToken = '', expirationTime * 1000);
        window.history.pushState('Access Token', null, '/');
        console.log(accessToken)
        return accessToken
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        console.log(accessToken)
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {headers: {Authorization: `Bearer ${accessToken}`}})
            .then(response => response.json())
            .then(jsonResponse => {
                if(!jsonResponse.tracks) return [];
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
            });
    },

    savePlaylist(name, tracks) {
        if(!(name && tracks)) return;
        let accessToken = Spotify.getAccessToken();
        let headers = {Authorization: `Bearer ${accessToken}`};
        let snapshotID;
        console.log(tracks)

        fetch("https://api.spotify.com/v1/me", {headers:headers})
            .then(response => response.json())
            .then(jsonResponse => jsonResponse.id)
            .then(userID => {
                fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                    method:"POST",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({name:name})
                }).then(response => response.json())
                    .then(jsonResponse => jsonResponse.id)
                    .then(playlistID => {
                        fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                            method:"POST",
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({uris:(tracks.map(track=>track.uri))})
                        }).then(response => response.json())
                            .then(jsonResponse => {
                                snapshotID = jsonResponse.id
                            })
                    })
            })





    }
}

export default Spotify;