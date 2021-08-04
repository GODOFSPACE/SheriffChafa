import React from 'react';
import styled from '@emotion/styled';

const Personaje = styled.div`
    width: 10rem;
    height: 10rem;
    border-radius: 5rem;
    background: linear-gradient(183deg, rgba(142,45,226,1) 0%, rgba(74,0,224,1) 100%);
    margin: 0 auto 1rem auto;

    img{
        width: 20rem;
        transform: translate(-4.6rem, -6.5rem);
    }
`;

export const UsuariosConectados = ( {jugador} ) => {
    return (
        
        <div className="col-4">
            <Personaje>
                <img src="https://i.pinimg.com/originals/63/91/03/639103eff63de2e26c5e1ecd0365712f.png" alt="Personaje" />
            </Personaje>
            { jugador.nombre }
        </div>
        
    )
}
