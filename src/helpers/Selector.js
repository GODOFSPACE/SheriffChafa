

//Fucnion para tener el selector de imagenes

let imagenes = ['Imagenes/licor.jpg', 'Imagenes/manzana.jpg', 'Imagenes/pan.png'];
contador = 0;

const infoCartas = [
    {id:'0', categoria: 'Ilegal', nombre: 'Licor', costo: '7', penalizacion: '5', imagen: 'Imagenes/licor.jpg' },
    {id:'1', categoria: 'Legal', nombre: 'Manzana', costo: '2', penalizacion: '4', imagen: 'Imagenes/manzana.jpg'},
    {id:'2', categoria: 'Legal', nombre: 'Pan', costo: '3', penalizacion: '5', imagen: 'Imagenes/pan.png'}
];


const seleccion= (contenedor) => {  
    contenedor.addEventListener('click', j =>    {

        let atras = contenedor.querySelector('.retroseso');
        let seleccion = contenedor.querySelector('.selecto');
        let delante = contenedor.querySelector('.avanzar');
        let img = contenedor.querySelector('img');
        let objetivo = j.target;

        let imagenesCartas = [...infoCartas];
        console.log(imagenesCartas)

        if(objetivo == atras){
            if(contador > 0){
                img.src = imagenes[contador - 1];
                contador--;
                console.log(infoCartas[contador].imagen)
            }else{
                img.src = imagenes[infoCartas.length - 1];
                contador = infoCartas.length - 1;
                console.log(infoCartas[contador].imagen)
            }
        }if( objetivo == delante){
            if(contador < imagenes.length - 1){
                img.src = imagenes[contador + 1];
                contador++;
            }else{
                img.src = imagenes[0];
                contador = 0;
            }
        }else if(objetivo == seleccion){
            agregarHD();
        }
    });   
}

document.addEventListener("DOMContentLoaded", () => {

    let contenedor = document.querySelector('.contenedor');
    seleccion(contenedor);

})
