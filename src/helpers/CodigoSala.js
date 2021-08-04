

export const letrasala = (cantidad) => {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
     let espacio = '';
     
     for(let i=0; i < cantidad; i++ ){
        espacio += letras.charAt(Math.floor(Math.random() * letras.length)); 
     }

    return espacio;
}