import React, { createContext, useReducer } from 'react';
import { PartyReducer } from './PartyReducer';
import shortid from 'shortid';


export const PartyContext = createContext();

const initialState = {
    jugadores: [  ],
    tarjetas: [
        {id: shortid(), categoria: 'legal', nombre: 'Tamales',  costo: '3', multa: '2', cantidad: 36, imagen: 'Tamales', vacio: false}, //ok
        {id: shortid(), categoria: 'legal', nombre: 'Pan de Muerto', costo: '2', multa: '2', cantidad: 48, imagen: 'Pan', vacio: false}, //ok
        {id: shortid(), categoria: 'legal', nombre: 'Aguacate', costo: '3', multa: '2', cantidad: 36, imagen: 'Aguacate', vacio: false}, //ok
        {id: shortid(), categoria: 'legal', nombre: 'Carnitas', costo: '4', multa: '2', cantidad: 24, imagen: 'Carnitas', vacio: false}, //ok
        
        {id: shortid(), categoria: 'ilegal', nombre: 'Tequila', costo: '6', multa: '4', cantidad: 22, imagen: 'Tequila', vacio: false}, //ok
        {id: shortid(), categoria: 'ilegal', nombre: 'Axolote', costo: '7', multa: '4', cantidad: 21, imagen: 'Axolote', vacio: false}, //ok
        {id: shortid(), categoria: 'ilegal', nombre: 'Machete', costo: '9', multa: '4', cantidad:  5, imagen: 'Machete', vacio: false}, //ok
        {id: shortid(), categoria: 'ilegal', nombre: 'Petardos', costo: '8', multa: '4', cantidad:  12, imagen: 'Petardo', vacio: false}, //ok
    ],
    sheriff: {id: '', numero: 0},
    ready: false
}

export const PartyProvider = ({ children }) => {
    const [partyState, dispatch] = useReducer(PartyReducer ,initialState);

    return(
        <PartyContext.Provider value={{
            partyState,
            dispatch
        }}>
            { children }
        </PartyContext.Provider>
    )
}