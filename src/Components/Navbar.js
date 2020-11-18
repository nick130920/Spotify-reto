/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect, forwardRef } from 'react'
import { css, jsx } from '@emotion/core'
import spotifyLogo from '../img/spotify-logo.png'
import Artist from '../Components/artist';
import Icon from './Icon'

import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * @function Navbar
 */
class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: ''}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (event) => {
    this.setState({ value: event.target.value });
    
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  render(){
    const { name } = this.state;
    return (
      <div>
        <nav css={[NavbarCSS]}>
          <img className="navbar-brand" height="39.5" src={spotifyLogo} />
          <ul>
            <Form onSubmit={this.handleSubmit}>
            <li>
              <i css={[BuscarCSS]} className={`busqueda Icon fa fa-search`}></i>
              <Form.Control value={this.state.value}
                onChange={this.handleChange} css={[InputCSS]} type="text" placeholder="Buscar Artista" />
              <Form.Control type="submit" css={css`display: none;`}  />
            </li>
            </Form>
            <li>
              <i css={[BuscarCSS]} className={`busqueda Icon fa fa-search`}></i>
              <Form.Control css={[InputCSS]} type="text" placeholder="Buscar Canción" />
            </li>
          </ul>

        </nav>
        {this.state.value && <Artist {...this.state.value} />}
      </div>
    );
  }
}
const BuscarCSS = css`
  position: relative;
  top: 2rem;
  z-index: 10;
  color: #8f8e94;
  margin-left: 10px;
  &:focus {
        display: none;
  }`
const NavbarCSS = css`
  background: rgb(38,38,40);
  position: sticky;
  height: 68px;
  z-index: 99;
  width: 100%;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: right;
  ul {
      align-items: center;
      display: flex;
      padding-left: 90px;
    }
    li {
        margin-right: 70px;
        list-style: none;
    }
  a {
    font-size: 15px;
    letter-spacing: 0.5px;
    color: #e5e5e5;
  }
  a.active {
    color: white;
    font-weight: 500;
  }
  ul.right {
    .Icon {
      color: white;
      cursor: pointer;
      font-size: 22px;
    }
  }
`
const InputCSS = css`
    padding-left: 30px;
    width: 345px;
    border: 0px;
    background-color: #323235;
    &::placeholder{
        color: #8f8e94;
    }
    &:focus {
        position: relative;
        background-color: #191919;
        border-color: #868686;
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgb(119 119 119 / 25%);
        color: white;
        z-index: 100;
      }`
export default Navbar