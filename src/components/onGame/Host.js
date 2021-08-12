import React from 'react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';

export const Host = () => {

    return (
        <div>
            <Global styles={css`
                html{
                    font-size: 62.5%;
                    box-sizing: border-box;
                }
                *, *:before, *:after {
                    box-sizing: inherit;
                }
                body{
                    height: 100vh;
                    background-image: linear-gradient(0, #ff438e 0, #ff2d8b 25%, #f50087 50%, #e70083 75%, #da0081 100%);
                    font-family: 'Nunito', sans-serif;
                    font-size: 2.5rem;
                    color: white;
                }

                a {
                    text-decoration: none;
                    color: inherit;
                }

            `}/>
        </div>
    )
}
