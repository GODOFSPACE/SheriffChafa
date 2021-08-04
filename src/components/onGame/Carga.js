import React from 'react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';

const Logo = styled.div`
    font-size: 20rem;
`;

const Texto = styled.div`
    font-size: 5rem;
    font-weight: 900;
`;

export const Carga = () => {
    return (
        <>
            <Global styles={css`
                html{
                    font-size: 62.5%;
                    box-sizing: border-box;
                }
                *, *:before, *:after {
                    box-sizing: inherit;
                }

                body{
                    height: 90vh;
                    background: #4600D0;
                    font-family: 'Nunito', sans-serif;
                    font-size: 2.5rem;
                    color: white;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                }

                a {
                    text-decoration: none;
                    color: inherit;
                }
            `}/>
            <div className="container">
                <Logo>
                    <i className="fas fa-skull"></i>
                </Logo>
                <Texto>
                    <label>Esperando</label>                        
                </Texto>
                <Texto>
                    <label>Jugadores</label>                        
                </Texto>
            </div>
        </>
    )
}
