import React from 'react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';

const Contenido = styled.div`
    margin: 0 auto;
    margin-top: 10rem;
    width: 90%;
    height: 86rem;
    box-shadow: 0px 0px 33px 10px rgba(0,0,0,0.33);
    background-color: rgba(0,0,0,0.5);
    backdrop-filter: blur(10px);
    border-radius: 5rem;
    @media(max-width: 992px){
        width: 100%;
    }
`;

const Logo = styled.div`
    background: linear-gradient(183deg, rgba(142,45,226,1) 0%, rgba(74,0,224,1) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10rem;
    border-radius: 50;
    width: 15rem;
    height: 15rem;
    border-radius: 10rem;
    transform: translateY(-8rem);
    @media(max-width: 992px){
        width:  8rem;
        height: 8rem;
        font-size: 5rem;
        transform: translateY(-4rem);
    }
`;

export const MainPage = ({children}) => {

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
                    background: linear-gradient(90deg, rgba(138,35,135,1) 0%, rgba(233,64,87,1) 50%, rgba(242,113,33,1) 100%);
                    font-family: 'Nunito', sans-serif;
                    font-size: 2.5rem;
                    color: white;
                }

                a {
                    text-decoration: none;
                    color: inherit;
                }

            `}/>
            <Contenido className="container-fluid">
                <div className= "row justify-content-center">
                    <Logo className= "col-4">
                        <i className="fas fa-skull"></i>
                    </Logo>
                </div>

                {children}

            </Contenido>
        </div>
    );
}
