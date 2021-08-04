import React, { useContext, useState } from 'react';
import { MainPage } from './MainPage';
import styled from '@emotion/styled';
import {UsuarioContext} from '../context/UsuariosContext';
import { Link, useHistory } from 'react-router-dom';

const FormularioRegistro = styled.div`
    width: 65%;
    background-color: rgba(80,4,224,0.5);
    height: 60rem;
    border-radius: 2.5rem;
    margin: 0 auto;
    font-weight: 900;
    font-size: 5rem;

    @media (max-width: 1024px){
        width: 90%;
        font-size: 3rem;
        height: 40rem;
    }
`;

const InfoUser = styled.input`
    border-radius: 25px;
    background-color: rgba(0,0,0,0.33);
    border: none;
    margin-top: 2.5rem;
    
    font-family: 'Nunito', sans-serif;
    font-weight: 400;
    color: white;
    font-size: 4rem;
    box-shadow: 15px 15px 22px 0px rgba(0,0,0,0.34);
`;
const Texto = styled.label`
    margin-top: 9rem;
    text-align: center;

    @media (max-width: 1024px){
        margin-top: 5rem;
    }
`;
const BotonNext = styled.button`
    margin-right: 6rem;
    border-radius: 25px;
    width: auto;
    padding: 1rem 2rem;

    background: linear-gradient(183deg, rgba(252,103,103,1) 0%, rgba(236,0,140,1) 100%);
    font-family: 'Nunito', sans-serif;
    font-weight: 900;
    font-size: 4rem;
    color: white;
    text-align: center;
    border: none;

    :hover{
        cursor: pointer;
    }

    @media (max-width: 480px){
        font-size: 2rem;
        margin-right: 2rem;
        padding: 0.5rem, 1rem;
    }
`;
const BotonPrev = styled.button`
    margin-left: 6rem;
    border-radius: 25px;
    width: auto;
    padding: 1rem 2rem;

    background: linear-gradient(183deg, rgba(254,140,0,1) 0%, rgba(248,55,0,1) 100%);
    font-family: 'Nunito', sans-serif;
    font-weight: 900;
    font-size: 4rem;
    color: white;
    text-align: center;
    border: none;

    :hover{
        cursor: pointer;
    }

    @media (max-width: 480px){
        font-size: 2rem;
        margin-left: 2rem;
        padding: 0.5rem, 1rem;
    }

`;

export const Registro = () => {

    const [datos, setDatos] = useState({
        nombre: '',
        sala: ''
    });

    const history = useHistory();

    const { GuardarInfo } = useContext(UsuarioContext);

    const onChange = ({ target }) =>{
		const { name, value } = target;
		
		setDatos({
			...datos,
			[name]: value
		});
	}

    const{nombre, sala} = datos;

    const onSubmit = ev => {
        ev.preventDefault();
        console.log('Subir');
        GuardarInfo(nombre, sala);
        history.push('/carga');
    }

    return (
        <MainPage>
            <form
                onSubmit={onSubmit}
            >
            <FormularioRegistro>

                <div className="row justify-content-center">
                    <Texto className="col-xl-6 col-10"> Código de la sala </Texto>
                </div>

                <div className="row justify-content-center">
                    <InfoUser className="col-xl-6 col-10" type="text" name="sala" value={datos.sala} onChange={onChange} />
                </div>

                <div className="row justify-content-center">
                    <Texto className="col-xl-6 col-10"> Nombre </Texto>
                </div>

                <div className="row justify-content-center">
                    <InfoUser className="col-xl-6 col-10" type="text" name="nombre" value={datos.nombre} onChange={onChange}/>
                </div>
            </FormularioRegistro>
                <div className="row justify-content-between">
                    <BotonPrev type="button" className="col-5"><Link to="/">VOLVER</Link></BotonPrev>
                    <BotonNext type="submit" className="col-5">UNIRSE</BotonNext>
                </div>
            </form>
        </MainPage>
    )
}
