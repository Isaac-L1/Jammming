import React, {useState} from 'react';
import './App.css';
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

function App() {
    const [searchResults, setSearchResults] = useState([{name:"You Belong With Me", artist:"Taylor Swift",
        album:"RED", id:1}, {name:"Defying Gravity", artist:"Wicked Original Broadway Cast",
        album:"Original Cast Recording", id:2}]);

    const [playlistName, setPlaylistName] = useState("Great Playlist");

    const [playlistTracks, setPlaylistTracks] = useState([{name:"Radioactive", artist:"Imagine Dragons",
        album:"Who knows", id:4}, {name:"bad guy", artist:"Billy Eilish",
        album:"wwfawdwg", id:2}])


    const addTrack = trackToAdd => {
        if (playlistTracks.some(track => (track.id === trackToAdd.id))) return;
        setPlaylistTracks([...playlistTracks, trackToAdd]);
    }

    const removeTrack = trackToRemove => {
        setPlaylistTracks(playlistTracks.filter(track => (track.id !== trackToRemove.id)));
    }

    const updatePlaylistName = newName => {
        setPlaylistName(newName);
    }

    const savePlaylist = () => {
        Spotify.savePlaylist(playlistName, playlistTracks);
        setPlaylistName("New Playlist");
        setPlaylistTracks([]);
    }

    const search = term => {
        Spotify.search(term).then(newSearchResults => {
            setSearchResults(newSearchResults);
        })
    }


    return (
        <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
                <SearchBar onSearch={search}/>
                <div className="App-playlist">
                    <SearchResults searchResults={searchResults} onAdd={addTrack}/>
                    <Playlist name={playlistName} tracks={playlistTracks} onRemove={removeTrack} onNameChange={updatePlaylistName} onSave={savePlaylist}/>
                </div>
            </div>
        </div>
    );
}

export default App;
