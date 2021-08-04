import React from 'react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import { Producto } from './Producto';

const Dinero = styled.div`
    display: inline-block;
    background-color: rgba(0,0,0,0.5);
    border-radius: 1rem;
    height: 3.5rem;
    width: 13rem;
    font-size: 2.5rem;
    font-weight: 900;
    text-align: center;
    transform: translateX(1rem);
`;

const Moneda = styled.span`
    display: inline-flex;
    background-color: #E3CE0D;
    color: #212121;
    width: 5rem;
    height: 5rem;
    border-radius: 10rem;
    font-weight: 900;
    font-size: 3rem;
    transform: translateX(-1rem);
    align-items: center;
    justify-content: center;
`;

const BotonCentral = styled.span`
    display: flex;
    width: 4rem;
    height: 4rem;
    background: rgb(57,106,252);
    background: linear-gradient(180deg, rgba(57,106,252,1) 0%, rgba(41,72,255,1) 100%);
    border-radius: 3rem;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-top: 3rem;
`;

const BotonExt = styled.span`
    display: flex;
    width: 4rem;
    height: 4rem;
    background: rgb(57,106,252);
    background: linear-gradient(180deg, rgba(57,106,252,1) 0%, rgba(41,72,255,1) 100%);
    border-radius: 3rem;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-top: 3rem;
    transform: translateY(5rem);
`;

const Logo = styled.div`
    background: linear-gradient(183deg, rgba(142,45,226,1) 0%, rgba(74,0,224,1) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    border-radius: 50;
    width: 6rem;
    height: 6rem;
    border-radius: 10rem;
    margin: 0 auto;
    margin-top: 2rem;
`;

export const Jugador = () => {
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
                    background: rgb(252,74,26);
                    background: linear-gradient(180deg, rgba(252,74,26,1) 0%, rgba(247,183,51,1) 100%);;
                    font-family: 'Nunito', sans-serif;
                    font-size: 2.5rem;
                    color: white;
                    text-align: center;
                }

                a {
                    text-decoration: none;
                    color: inherit;
                }
            `}/>

            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 mt-3">
                        <Dinero>
                            <span>130</span>
                        </Dinero>
                        <Moneda>$</Moneda>
                    </div>
                </div>

                <div className="row justify-content-around">
                    <div className="col-6">
                        <Producto />
                    </div>
                    <div className="col-6">
                        <Producto />
                    </div>
                    <div className="col-6">
                        <Producto />
                    </div>
                    <div className="col-6">
                        <Producto />
                    </div>
                    <div className="col-6">
                        <Producto />
                    </div>
                    <div className="col-6">
                        <Producto />
                    </div>
                   
                </div>

                <div className="row justify-content-evenly">
                    <div className="col-2">
                        <BotonExt className="fas fa-search"></BotonExt>
                    </div>
                    <div className="col-2">
                        <BotonCentral className="fas fa-search"></BotonCentral>
                    </div>
                    <div className="col-2">
                        <BotonCentral className="fas fa-search"></BotonCentral>
                    </div>
                    <div className="col-2">
                        <BotonExt className="fas fa-search" ></BotonExt>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-4">
                        <Logo className="fas fa-skull"></Logo>
                    </div>
                </div>

            </div>
            
            
        </div>
    )
}
