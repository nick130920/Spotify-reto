/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { css, jsx } from '@emotion/core'
import { Credentials } from '../Credentials';
import Detailartist from './Detailartist';
import axios from 'axios';


const Artist = () => {

    const spotify = Credentials();
    const [token, setToken] = useState('');
    const [searches, setSearches] = useState({ selectedSearch: '', listOfSearchesFromAPI: [] });
    const [searchDetail, setSearchDetail] = useState(null);


    useEffect(() => {

        axios('https://accounts.spotify.com/api/token', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
            },
            data: 'grant_type=client_credentials',
            method: 'POST'
        }) //Llamada a la api para obtener el token
           .then(tokenResponse => {
                setToken(tokenResponse.data.access_token);
               axios('https://api.spotify.com/v1/search?q=andres&type=artist&offset=0&limit=12', {
                    method: 'GET',
                    headers: { 'Authorization': 'Bearer ' + tokenResponse.data.access_token }
                }) //Se obtienen LA search
                .then(searchResponse => {
                    setSearches({
                        selectedSearch: searches.selectedSearch,
                        listOfSearchesFromAPI: searchResponse.data.artists.items
                    }) // la lista de nuevos lanzamientos
                });
                
            });
            
        }, [searches.selectedSearch, spotify.ClientId, spotify.ClientSecret]);
    console.log(searches.listOfSearchesFromAPI);
        return (
            
            <div className="container-fluid">
            <h2 css={[title]}>Artistas Encontrado</h2>
            <div className="row justify-content-end">
                <div className="col-sm-2">
                    <button css={[icon]}>
                        <svg role="img" focusable="false" height="24" width="24" viewBox="0 0 24 24" >
                            <polyline points="17 4 6 12 17 20" fill="none" stroke="#fff"></polyline>
                        </svg>
                    </button>
                    <button css={[icon]}>
                        <svg role="img" focusable="false" height="24" width="24" viewBox="0 0 24 24" >
                            <polyline points="8 4 19 12 8 20" fill="none" stroke="#fff"></polyline>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="row justify-content-center">
                <div css={css`padding-top: 5%;`} className="col-md-10">
                    <div className="row justify-content-center">
                        {searches.listOfSearchesFromAPI.map((item, idx) =>
                            // // <form css={css`display: contents;`} onSubmit={albumClicked} >
                            // <button key={idx} onClick={albumClicked} css={css`display: contents;`} type="submit">
                            <div key={idx} className="col-md-2" css={css`padding-left: 10px;padding-right: 10px;margin-bottom: 5%;`}>
                                {item && <Detailartist {...item} />}
                            </div>
                            // </button>

                            // </form>
                        )}
                    </div>
                </div>

            </div>
        </div>

    );
}

const title = css`
    text-align: center;
    color: white;
    margin: 3%;        
`
const icon = css`
    margin-right: 10%;
    border: 1px solid white !important;
    height: 32px;
    width: 32px;
    border-radius: 50%;
    background-color: rgba(0,0,0,0);
    color: #fff;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;`

export default Artist

// "albums": {
//     "href": "https://api.spotify.com/v1/browse/new-releases?offset=0&limit=20",
//         "items": [
//             {
//                 "album_type": "single",
//                 "artists": [
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/1r4hJ1h58CWwUQe3MxPuau"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/1r4hJ1h58CWwUQe3MxPuau",
//                         "id": "1r4hJ1h58CWwUQe3MxPuau",
//                         "name": "Maluma",
//                         "type": "artist",
//                         "uri": "spotify:artist:1r4hJ1h58CWwUQe3MxPuau"
//                     },
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
//                         "id": "1Xyo4u8uXC1ZmMpatF05PJ",
//                         "name": "The Weeknd",
//                         "type": "artist",
//                         "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
//                     }
//                 ],
//                 "external_urls": {
//                     "spotify": "https://open.spotify.com/album/1Ag9EPbzibwzz0S0WpgX3v"
//                 },
//                 "href": "https://api.spotify.com/v1/albums/1Ag9EPbzibwzz0S0WpgX3v",
//                 "id": "1Ag9EPbzibwzz0S0WpgX3v",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b273be768155351bbd7d4c19ab13",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e02be768155351bbd7d4c19ab13",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d00004851be768155351bbd7d4c19ab13",
//                         "width": 64
//                     }
//                 ],
//                 "name": "Hawái (Remix)",
//                 "release_date": "2020-11-05",
//                 "release_date_precision": "day",
//                 "total_tracks": 1,
//                 "type": "album",
//                 "uri": "spotify:album:1Ag9EPbzibwzz0S0WpgX3v"
//             }