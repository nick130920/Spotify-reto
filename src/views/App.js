import React, { useState, useEffect } from 'react';
import Dropdown from '../Components/Dropdown';
import Navbar from '../Components/Navbar';
import Releases from '../Components/releases';
import Artist from '../Components/artist';
import Listbox from '../Components/Listbox';
import Detail from '../Components/Detail';
import { Credentials } from '../Credentials';
import axios from 'axios';

const App = () => {

  const spotify = Credentials();
  const [token, setToken] = useState('');
  const [genres, setGenres] = useState({ selectedGenre: '', listOfGenresFromAPI: [] });
  const [playlist, setPlaylist] = useState({ selectedPlaylist: '', listOfPlaylistFromAPI: [] });
  const [tracks, setTracks] = useState({ selectedTrack: '', listOfTracksFromAPI: [] });
  const [trackDetail, setTrackDetail] = useState(null);

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
        axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
          method: 'GET',
          headers: { 'Authorization': 'Bearer ' + tokenResponse.data.access_token }
        }) //Se obtienen la lista de categorias
          .then(genreResponse => {
            setGenres({
              selectedGenre: genres.selectedGenre,
              listOfGenresFromAPI: genreResponse.data.categories.items
            }) // guarda las categorias
          });

      });

  }, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]);

  const genreChanged = val => {
    setGenres({
      selectedGenre: val,
      listOfGenresFromAPI: genres.listOfGenresFromAPI
    }); // Guarda el genero seleccionado

    axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    }) //obtiene las playlist de ese genero
      .then(playlistResponse => {
        setPlaylist({
          selectedPlaylist: playlist.selectedPlaylist,
          listOfPlaylistFromAPI: playlistResponse.data.playlists.items
        }) // Guarda las playlist
      });

    console.log(val);
  }

  const playlistChanged = val => {
    console.log(val);
    setPlaylist({
      selectedPlaylist: val,
      listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI
    }); //Selecciona una playlist
  }

  const buttonClicked = e => {
    e.preventDefault();

    axios(`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=10`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }) //Obtiene las canciones de esa playlists
      .then(tracksResponse => {
        setTracks({
          selectedTrack: tracks.selectedTrack,
          listOfTracksFromAPI: tracksResponse.data.items
        }) //Guarda las canciones
      });
  }

  const listboxClicked = val => {

    const currentTracks = [...tracks.listOfTracksFromAPI]; //Guarda la lista de canciones

    const trackInfo = currentTracks.filter(t => t.track.id === val); //Guarda la informacion de la canción seleccionada

    setTrackDetail(trackInfo[0].track);



  }

  const condicion = false;



  return (
    <div>
      <Navbar/>
      {condicion && <Releases /> }
      
      {/* <form onSubmit={buttonClicked}>
          <Dropdown label="Genero :" options={genres.listOfGenresFromAPI} selectedValue={genres.selectedGenre} changed={genreChanged} />
          <Dropdown label="Playlist :" options={playlist.listOfPlaylistFromAPI} selectedValue={playlist.selectedPlaylist} changed={playlistChanged} />
          <div className="col-sm-6 row form-group px-0">
            <button type='submit' className="btn btn-success col-sm-12">
              Search
            </button>
          </div>
          <div className="row">
            <Listbox items={tracks.listOfTracksFromAPI} clicked={listboxClicked} />
            {trackDetail && <Detail {...trackDetail} />}
          </div>
      </form> */}

    </div>



  );
}

export default App;