import { useContext } from "react";
import { PartyContext } from "../context/game/PartyContext";
import { useCartaAleatoria } from "./useCartaAleatoria";
import { types } from "../types/types";
export const useCobrarMerca = () => {
    const{ dispatch } = useContext(PartyContext);
    const{elegirCarta} = useCartaAleatoria();
    
    const noRevisar = (usuario, pago) => {

        dispatch({
            type: types.RevelarM,
            payload: false
        });

        for (let i=0; i <= usuario.personaje.mercancia.length; i++ ){
            if( i < usuario.personaje.mercancia.length){
                if(usuario.personaje.mercancia[i].categoria === 'ilegal'){
                    incrementarVentas(usuario, 'Ilegales');
                }
                incrementarVentas(usuario, usuario.personaje.mercancia[i].nombre);
            }
            else if(i === usuario.personaje.mercancia.length){
                usuario.personaje.dinero -= pago;
                dispatch({
                    type: types.CambiarDineroSheriff,
                    payload: pago
                });

                incrementarVentas(usuario, 'CargarInfo');
            }
        }

    }

    const revisarMercancia = (usuario) => {
        let hayIlegal = false;
        dispatch({
            type: types.RevelarM,
            payload: true
        });

        for(let i=0; i<usuario.personaje.mercancia.length; i++){
            if(usuario.personaje.mercancia[i].categoria === 'ilegal')
                hayIlegal = true;
        }

        if(hayIlegal){
            for (let i=0; i <= usuario.personaje.mercancia.length; i++ ){
                if( i < usuario.personaje.mercancia.length && usuario.personaje.mercancia[i].categoria === 'ilegal'){
                    usuario.personaje.dinero -= 4;
                    dispatch({
                        type: types.CambiarDineroSheriff,
                        payload: 4
                    });
                    if(usuario.personaje.mercancia[i].nombre === usuario.personaje.declaracion){
                        incrementarVentas(usuario, usuario.personaje.mercancia[i].nombre);
                    }
                }
                else if(i === usuario.personaje.mercancia.length)
                    incrementarVentas(usuario, 'CargarInfo');
            }
        }
        else{
            for (let i=0; i <= usuario.personaje.mercancia.length; i++ ){
                if( i < usuario.personaje.mercancia.length && usuario.personaje.mercancia[i].nombre === usuario.personaje.declaracion ){
                    incrementarVentas(usuario, usuario.personaje.mercancia[i].nombre);
                    usuario.personaje.dinero += 2;
                    dispatch({
                        type: types.CambiarDineroSheriff,
                        payload: -2
                    });
                }
                if(i === usuario.personaje.mercancia.length)
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

            case 'Ilegales':          
                usuario.personaje.ventas.ilegales++;   
    
            break;
    
            case 'CargarInfo':

                usuario.personaje.mercancia = [];

                for( let i = 0; i<usuario.personaje.deck.length; i++ ){
                    if(usuario.personaje.deck[i].descartada)
                        usuario.personaje.deck[i] = elegirCarta(1)[0];
                }

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
        noRevisar,
        revisarMercancia
    }

}