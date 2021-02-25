import React, { useState, useEffect } from "react";
import styles from "./Albums.module.css";
import fetchJsonp from "fetch-jsonp";
import Search from "../SearchComponent/Search";
import Loading from "../LoadingComponent/Loading";
import InfiniteScroll from 'react-infinite-scroll-component';


function Albums(){

    const [albumData, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [moreAlbums, setMoreAlbums] = useState(10);
    const [inputVal, setInput] = useState('');
    const [activeInfo, setActiveInfo] = useState(null);

    useEffect(() => {
        fetchData()
    }, [])

// // Initial fetch of data
    async function fetchData(){

        try{
            
            let response = await fetchJsonp(`https://itunes.apple.com/search?term=all&media=music&entity=album,song&limit=${moreAlbums}`)
            response = await response.json()
            setData(response)
            setLoading(false)

        }
        catch(err){
            console.log(err);

        }

    }

// Fetching data from search bar and setting data to the state
    const searchAlbum = async () => {
        
        try{
            let searchInput = inputVal;
            searchInput = searchInput.replace(/ /g, "+");

            let response = await fetchJsonp(`https://itunes.apple.com/search?term=${searchInput ? searchInput : "all"}&media=music&entity=album,song&limit=${moreAlbums}`)
            response = await response.json()

            setData(response)
        }
        catch(err){
            console.log(err);
        };
    }

// Fetching 10 more albums and adding them to the albumData state

const fetchMoreAlbums = async () => {
    
    try{
        let searchInput = inputVal;
        searchInput = searchInput.replace(/ /g, "+");
        let addMoreAlbums = moreAlbums + 10;
        setMoreAlbums(addMoreAlbums)
        let response = await fetchJsonp(`https://itunes.apple.com/search?term=${searchInput ? searchInput : "all"}&media=music&entity=album,song&limit=${addMoreAlbums}`)
        response = await response.json()
        setData(response)
    }
    catch(err){
        console.log(err);
    }
}


// Setting toggle activeInfo state back to null to close info section if clicked again while open
const toggleInfo = (index ) => {

    if(index === activeInfo){
        setActiveInfo(null)
    }else{
        setActiveInfo(index)
    }
}

    return(

        <div>
            <Search setInput={setInput} inputVal={inputVal} searchAlbum={searchAlbum}/>
            {loading ? <Loading/> : 
            <InfiniteScroll
                dataLength={albumData.results.length}
                next={fetchMoreAlbums}
                hasMore={true}
                className={styles.albumContainer}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                      <b>Yay! You have seen it all</b>
                    </p>
                }
            >  
            {albumData.results.map((data, index) => (
                <div key={index} className={styles.album} style={{backgroundImage: `url(${data.artworkUrl100})`}}>
                    <div className={styles.albumOverlay}>
                        <h3>{data.artistName}</h3>
                        <p>{data.collectionName}</p>
                    </div>
                    <div className={styles.readMore} style={{marginTop:`-${activeInfo === index ?95 : 25}px`}}>
                        <button className={styles.moreInfoButton} onClick={() => toggleInfo(index)}>More Info</button>
                        <div className={styles.moreInfoSection} style={{maxHeight:`${activeInfo === index ? 70 : 0}px`}}>
                            <p>{data.wrapperType}  </p>
                            <p>{data.primaryGenreName}</p>
                            <p>{data.collectionPrice}</p>
                        </div>
                    </div>  
                    
                    
                </div>
            ))}
                
            </InfiniteScroll>
            
            }
            

        </div>
    )
}

export default Albums;