import React, { useContext, useEffect, useState } from 'react';
import shortid from 'shortid';
import { PartyContext } from '../../context/game/PartyContext';
import { SelectorPersonaje } from '../onGame/SelectorPersonaje';
import styled from '@emotion/styled';
import { SocketContext } from '../../context/SocketContext';
import { Producto } from '../onGame/Producto';
import { types } from '../../types/types';
import { usePickSheriff } from '../../hooks/usePickSheriff';
import { motion } from 'framer-motion';

const Contenedor = styled.div`
    margin: 0 auto;
    width: 500px;
    height: 500px;
    h1{
        text-align: center;
    }
`;

const CartasJugador = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    img{
        width: 100%
    }
`;

const TextoJuicio = styled.div`
    font-weight: 900;
    font-size: 5rem;
    text-align: center;
    margin: 4rem 0;
`;

const LegalesVendidas = styled.div`
    width: 40rem;
    height: 40rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #9BE2BC;
    border: 1rem solid #1DDF90;
    border-radius: 2rem;
    font-weight: 900;
    font-size: 10rem;
    text-align: center;
`;

const IlegalesVendidas = styled.div`
    width: 40rem;
    height: 40rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FC6B6B;
    border: 1rem solid #E11212;
    border-radius: 2rem;
    font-weight: 900;
    font-size: 10rem;
    text-align: center;
`;


export const JuicioFinal = ({fase}) => {
    
    const {partyState, dispatch } = useContext(PartyContext);
    const {revision, jugadores, vendedores, revelar} = partyState;
    const {socket} = useContext(SocketContext);
    const {SiguienteSheriff} = usePickSheriff();

    const [estado, setEstado] = useState('MostrarJugador');

    const [contador, setContador] = useState(0);
    const [legal, setLegal] = useState(0);

    const [loop, setLoop] = useState(-3);
    const disminuirTiempo = () => {
        setLoop(loop-1);
    }

    const SiguienteJugador = () => {
        if(jugadores.length - 2 > contador){
            setContador(contador+1);
            setEstado('MostrarJugador');
        }
        else if (jugadores.length - 2 === contador){
            
            setEstado('TerminaRevision');
            
            dispatch({
                type: types.ReiniciarTurno,
                payload: false
            });
            
            SiguienteSheriff();
            
            fase(0);
        }
    }

    const contarCategorias = () => {
        for(let i = 0;i< revision[contador].personaje.mercancia.length - 1; i++){
            if(revision[contador].personaje.mercancia[i].categoria === 'legal')
                setLegal(legal+1);
        }
    }

    
    useEffect(() => {
        if(loop >= 0){

            let timer = setTimeout(()=> disminuirTiempo() , 3000);

            return () => {
                clearTimeout(timer);
            }
        }

        if(loop === -1 ) {
                SiguienteJugador();
        }

    }, [loop]);


    
    //Preparar para revision de mercancia
    useEffect(() => {
        if(jugadores.length - 1 === revision.length){
            socket.emit('evaluar-jugador', revision[contador]);
        }
    }, [jugadores, revision, contador]);

    useEffect(() => {
        if(vendedores.length > 0){
            if(revelar){
                setEstado('MostrarCartas')
                setLoop(revision[contador].personaje.mercancia.length - 1);
            }
            else{
                setEstado('MostrarMultiplicador');
                contarCategorias();
                setLoop(2);
            }
        }
    }, [vendedores]);


    switch(estado) {
        case 'MostrarJugador':
            return (
                <Contenedor>
                    <h1> Enjuiciando a: {revision[contador].nombre} </h1>
                    <SelectorPersonaje key = {shortid()} nombre = {revision[contador].personaje.nombre} />
                </Contenedor>
            )
        
        case 'MostrarCartas':
            return (
                <>
                <TextoJuicio>Revisando Mercancia</TextoJuicio>
                <CartasJugador>
                    <motion.div key= {shortid()}
                        className='col-6 col-sm-4'
                        initial={{ scale: 0, opacity:0}}
                        animate={{ scale: 1, opacity:1 }}
                        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.1 } }}
                        transition={{                    
                        type: "spring",
                        stiffness: 260,
                        damping: 20}}
                        >
                        <Producto nombre={revision[contador].personaje.mercancia[loop >= 0 ? loop : 0].nombre}/>
                    </motion.div>
                </CartasJugador>
                </>
            )
            
        case 'MostrarMultiplicador':
            return(
                <div className="container">
                    <TextoJuicio>El jugador no fue revisado</TextoJuicio>
                    <div className="row justify-content-around">
                        <TextoJuicio className="col-4">
                            Legales  
                        </TextoJuicio>
                        <TextoJuicio className="col-4">
                            Ilegales
                        </TextoJuicio>
                    </div>
                    
                    <div className="row justify-content-around">
                        <LegalesVendidas className="col-4">
                            x{legal}    
                        </LegalesVendidas>
                        <IlegalesVendidas className="col-4">
                            x{revision[contador].personaje.mercancia.length - legal}
                        </IlegalesVendidas>
                    </div>
                </div>
            )

        case 'TerminaRevision':
            return(
                <h1>Se revisaron a todos los jugadores</h1>
            )

        default: 
            return(
                <h1>Hubo un error</h1>
            )
    }
}
