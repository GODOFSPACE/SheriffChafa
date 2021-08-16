import React, { createContext, useReducer } from 'react';
import { PartyReducer } from './PartyReducer';


export const PartyContext = createContext();

const initialState = {
    jugadores: [  ],
    tarjetas: [
        {categoria: 'legal', nombre: 'Tamales',  costo: '3', multa: '2', cantidad: 36, imagen: 'Tamales', vacio: false, descartada: false}, //ok
        {categoria: 'legal', nombre: 'Pan de Muerto', costo: '2', multa: '2', cantidad: 48, imagen: 'Pan', vacio: false, descartada: false}, //ok
        {categoria: 'legal', nombre: 'Aguacate', costo: '3', multa: '2', cantidad: 36, imagen: 'Aguacate', vacio: false, descartada: false}, //ok
        {categoria: 'legal', nombre: 'Carnitas', costo: '4', multa: '2', cantidad: 24, imagen: 'Carnitas', vacio: false, descartada: false}, //ok
        
        {categoria: 'ilegal', nombre: 'Tequila', costo: '6', multa: '4', cantidad: 22, imagen: 'Tequila', vacio: false, descartada: false}, //ok
        {categoria: 'ilegal', nombre: 'Axolote', costo: '7', multa: '4', cantidad: 21, imagen: 'Axolote', vacio: false, descartada: false}, //ok
        {categoria: 'ilegal', nombre: 'Machete', costo: '9', multa: '4', cantidad:  5, imagen: 'Machete', vacio: false, descartada: false}, //ok
        {categoria: 'ilegal', nombre: 'Petardos', costo: '8', multa: '4', cantidad:  12, imagen: 'Petardo', vacio: false, descartada: false}, //o

    ],
    usuario: null,
    sheriff: {id: '', numero: 0},
    revision: [],
    revisando: null,
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