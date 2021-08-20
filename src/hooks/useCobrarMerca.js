import { useContext } from "react";
import { PartyContext } from "../context/game/PartyContext";
import { types } from "../types/types";

export const useCobrarMerca = () => {
    const{dispatch} = useContext(PartyContext);

    const noRevisar = (usuario) =>{

        for (let i=0; i <= usuario.personaje.mercancia.length; i++ ){
            if( i < usuario.personaje.mercancia.length){
                incrementarVentas(usuario, usuario.personaje.mercancia[i].nombre);
            }
            if(i === usuario.personaje.mercancia.length){
                incrementarVentas(usuario, 'CargarInfo');
            }
        }
    }


    const incrementarVentas = (usuario, carta) => {

        switch( carta ){
            case 'Tamales':
    
                usuario.personaje.ventas.tamales++;
    
            break;
    
            case 'Pan de Muerto':
    
                usuario.personaje.ventas.pan++;
    
            break;
    
            case 'Aguacate':          
                usuario.personaje.ventas.aguacate++;   
                
            break;
            
            case 'Carnitas':          
                usuario.personaje.ventas.carnitas++;   
    
            break;
            
            case 'Tequila':          
                usuario.personaje.ventas.tequila++;   
    
            break;
            
            case 'Axolote':          
                usuario.personaje.ventas.axolote++;
    
            break;
            
            case 'Machete':          
                usuario.personaje.ventas.machete++;   
    
            break;
            
            case 'Petardos':          
                usuario.personaje.ventas.petardos++;   
    
            break;
    
            case 'CargarInfo':
                dispatch({
                    type: types.guardarVentas,
                    payload: usuario
                });
            break;
    
            default:
                console.log("Default");
          
        }
    }

    return {
        noRevisar
    }

}