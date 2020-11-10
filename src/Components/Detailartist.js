/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core'


const Detailartist = ({ href, artists, name, images }) => {
    return (
        <div>
            <a href={href} css={css`color: transparent; !important`}>
                <img css={[imagen]} src={images[0].url} alt={name}></img>
            </a>
            <div>
                <h6 css={[nombre]}>{name}</h6>
            </div>
        </div>
    );
}
const imagen = css`
    width: 100%;
    border-radius: 5%;
    max-height: 167px;`
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
export default Detailartist;