import React, {useState} from 'react';
import './SearchBar.css';

function SearchBar(props) {

    const [searchTerm, setSearchTerm] = useState("");

    const search = () => {
        props.onSearch(searchTerm);
    }

    const handleTermChange = e => {
        setSearchTerm(e.target.value);
    }

    return (
        <div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist" onChange={handleTermChange}/>
            <button className="SearchButton" onClick={search}>SEARCH</button>
        </div>
    )
}

export default SearchBar;