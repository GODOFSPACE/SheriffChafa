import React, { createContext, useState } from 'react';
import shortid from 'shortid';



export const UsuarioContext = createContext();

export const UsuarioProvider = ({children}) => {
    

    const [jugador, setJugador] = useState({
        id: '',
        nombre: '',
        sala: '',
        personaje: null
    });

    const GuardarInfo = (nombre, sala) =>{
		setJugador({
			...jugador,
			nombre: nombre,
            sala:sala,
            id: shortid(),
		});
	}
    
    return (
        <UsuarioContext.Provider value={{
            jugador,
            GuardarInfo
        }}
        >
            { children }
        </UsuarioContext.Provider>
    );

}