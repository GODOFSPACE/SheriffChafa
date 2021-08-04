import React, { createContext } from 'react';
import shortid from 'shortid';




export const Usuario = () => {
    
    const Context = createContext();

    const [valores, setValores] = useState({
        id: '',
        nombre: '',
        color: '',
        sala: '',
        personaje: ''
    });

    const GuardarInfo = ({nombre, sala}) =>{
		setValores({
			...valores,
			nombre: nombre,
            sala:sala,
            id:shortid(),
            color: color()
		});
	}

}

