import React from 'react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import CatrinLogo from '../img/Logo2.png';

const Contenido = styled.div`
    margin: 0 auto;
    margin-top: 10rem;
    width: 90%;
    height: auto;
    padding-top: 14rem;
    padding-bottom: 5rem;
    box-shadow: 0px 0px 33px 10px rgba(0,0,0,0.33);
    background-color: rgba(0,0,0,0.5);
    backdrop-filter: blur(10px);
    border-radius: 5rem;
    @media(max-width: 992px){
        margin-top: 4rem;
        padding-top: 4rem;
        width: 100%;
    }
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 20rem;
    height: 20rem;
    transform: translateY(-24rem);
    
    @media(max-width: 992px){
        width:  8rem;
        height: 8rem;
        font-size: 5rem;
        transform: translateY(-8rem);
    }

    img{
        width: 100%;
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
                        <img src={CatrinLogo} alt="Logo" />
                    </Logo>
                </div>

                {children}

            </Contenido>
        </div>
    );
}
