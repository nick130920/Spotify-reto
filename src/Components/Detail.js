/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from 'react';
import { css, jsx } from '@emotion/core'
import axios from 'axios';
import { Credentials } from '../Credentials';


const Detail = ({album, href, artists, name, images }) => {
    const spotify = Credentials();
    const [token, setToken] = useState('');
    const albumClicked = async (e) => {


        e.preventDefault();

        console.log(e);
        // const currentAlbums = [...albums.listOfAlbumsFromAPI]; //Guardo la lista de albums


        // console.log('Artista seleccionado: ! ! ');
        // //console.log(currentAlbums);
        // console.log(albums.listOfAlbumsFromAPI.filter(album => album.index === album.index));


        //const albumInfo = currentAlbums.filter(a => a.album.id === e); //guardar la informacion del album seleccionado
        //setAlbumDetail(albumInfo[0].album);
        axios('https://accounts.spotify.com/api/token', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
            },
            data: 'grant_type=client_credentials',
            method: 'POST'
        }) //Llamada a la api para obtener el token
        await axios(`${album.href}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            console.log('Esta es la response :', response);
        })
        // .then(AlbumsResponse => {
        //         setTracks({
        //             selectedTrack: tracks.selectedTrack,
        //             listOfTracksFromAPI: tracksResponse.data.items
        //         })
        //     });
    }
    return (
            <div>
                <a href={href} css={css`color: transparent; !important`}>
                    <img css={[imagen]} src={images[0].url} alt={name}></img>
                </a>
                <div>
                    <h6 css={[nombre]}>{name}</h6>
                    <p css={[artist]}>{artists[0].name}</p>
                </div>
            </div>
    );
}
const imagen = css`
    width: 100%;
    border-radius: 5%;`
const nombre = css`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
   -webkit-line-clamp: 1; /* number of lines to show */
   -webkit-box-orient: vertical;
    color: #fff;
    padding-top: 4%;s
`
const artist = css`
    color: #8f8e94;
`
export default Detail;