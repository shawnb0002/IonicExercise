import React from "react";
import styles from "./Search.module.css";


function Search({setInput, inputVal, searchAlbum}){


    const handleSubmit = e => {
        e.preventDefault();
        if(!inputVal) return;
        searchAlbum()
    }

    return(
        <div className={styles.searchContainer}>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search Albums" className={styles.albumInput} value={inputVal} onChange={e => setInput(e.target.value)}></input>
                <input type="submit" value="Submit" disabled={inputVal.trim() === ""} style={{backgroundColor: inputVal.trim() === "" ? "grey" : "black"}} className={styles.submitButton}></input>
            </form>
            
        </div>
    )
}

export default Search;