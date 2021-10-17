import React, { useContext } from 'react'
import { MainPage } from './MainPage'
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { GameContext } from '../context/game/GameContext';
import { letrasala } from '../helpers/CodigoSala';
import ClickUI from '../audio/ClickUI.mp3'
import { Howl } from 'howler';

const BotonPrincipal = styled.div`
    border-radius: 4rem;
    font-size: 6rem;
    width: 55rem;
    height: 55rem;
    text-align: center;
    background: linear-gradient(183deg, rgba(254,140,0,1) 0%, rgba(248,55,0,1) 100%);
    @media (max-width: 480px){
        font-size: 2.5rem;
        width: 25rem;
        height: 25rem;
        margin-right: 2rem;
        padding: 0.5rem, 1rem;
    }
`;

const BotonCrearSala = styled.div`
    border-radius: 4rem;
    font-size: 6rem;
    width: 55rem;
    height: 55rem;
    text-align: center;
    background: linear-gradient(183deg, rgba(252,103,103,1) 0%, rgba(236,0,140,1) 100%);
    @media (max-width: 480px){
        font-size: 0rem;
        width: 100%;
        height: 0px;
        margin-right: 2rem;
        padding: 0.5rem, 1rem;
        margin-bottom: 4rem;
        margin-top : 2rem;
        color: none;
        background: none;
    }
`;


export const Selector = () => {
    
    const { CrearGame } = useContext( GameContext );

    const ReproducirClick = () => {
        const sound = new Howl({
            src: ClickUI
        });
        sound.play();
    }
    
    const onClick = () => {
        ReproducirClick();
        CrearGame( letrasala(5) );
    }

    return (
        <MainPage>
            <div className="row justify-content-around">
                <BotonCrearSala className="col-6" onClick={onClick}>
                <Link to="/loby" >
                    Crear sala
                </Link>
                </BotonCrearSala>

                <BotonPrincipal className="col-6" onClick={ReproducirClick}>
                <Link to="/registro" >
                    Unirse a una sala
                </Link>
                </BotonPrincipal>
            </div>
        </MainPage>
    )
}
