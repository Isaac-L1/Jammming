import React from 'react';
import './Playlist.css';
import TrackList from "../TrackList/TrackList";

function Playlist(props) {

    const handleNameChange = e => {
        props.onNameChange(e.target.value);
    }

    return (
        <div className="Playlist">
            <input defaultValue={props.name} onChange={handleNameChange}/>
            <TrackList tracks={props.tracks} onRemove={props.onRemove} isRemoval={true}/>
            <button className="Playlist-save" onClick={props.onSave}>SAVE TO SPOTIFY</button>
        </div>
    )
}

export default Playlist;