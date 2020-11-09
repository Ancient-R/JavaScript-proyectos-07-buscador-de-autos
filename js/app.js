import { autos } from './datos.js'

//Constantes
const formulario = document.getElementById('buscador')
const anio = document.getElementById('year')
const contenedor = document.getElementById('resultado')

// crear los años
const years = document.createElement('option');
const  max = new Date().getFullYear();
let  min = max - 11;

const fragment = document.createDocumentFragment()
for(let i = max; i >  min; i--) {
    let option =  document.createElement('option');
    option.value = i;
    option.textContent = i;
    fragment.appendChild(option);
}
anio.appendChild(fragment)

//Datos para la busqueda
const busqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

const limpiaHtML = () =>{
    //Limpia los resultados al hacer una busqueda
    while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild)
}
//Renderiza todos los autos
const mostrarAutos = autos =>{
    const fragment2 = document.createDocumentFragment()
    
    limpiaHtML()

    autos.forEach(auto =>{
        const autoHTML = document.createElement('p')
        autoHTML.textContent = `${auto.marca} - ${auto.modelo} - ${auto.year} - ${auto.precio} - ${auto.puertas} - ${auto.color} - ${auto.transmision}`
        fragment2.appendChild(autoHTML)
    })
    
    contenedor.appendChild(fragment2)
}

//Filtra todos los autos
const filtrarAutos = () =>{
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)

    if(resultado.length){
        mostrarAutos(resultado)
    }else{
        limpiaHtML()
        const mensaje = document.createElement('div')
        mensaje.classList.add('alerta',  'error')
        mensaje.textContent = 'Auto no encontrado'
        contenedor.appendChild(mensaje)
    }
}

const filtrarMarca = auto =>{
    if (busqueda.marca) return auto.marca === busqueda.marca
    else return auto
}
const filtrarYear = auto =>{
    if(busqueda.year) return auto.year === busqueda.year
    else return auto
}
const filtrarMinimo = auto=>{
    if(busqueda.minimo) return auto.precio >= busqueda.minimo
    else return auto
}
const filtrarMaximo = auto=>{
    if(busqueda.maximo) return auto.precio <= busqueda.maximo
    else return auto
}
const filtrarPuertas = auto =>{
    if(busqueda.puertas) return auto.puertas === busqueda.puertas
    else return auto
}
const filtrarTransmision = auto =>{
    if(busqueda.transmision) return auto.transmision === busqueda.transmision
    else return auto
}
const filtrarColor = auto =>{
    if(busqueda.color ) return auto.color === busqueda.color
    else return auto
}


//EventListeners
document.addEventListener('DOMContentLoaded', ()=>{
    mostrarAutos(autos)
})

for(const elemento of formulario){
        elemento.addEventListener('input', (e)=>{    
            if(elemento.id === 'year' || elemento.id === 'minimo' || elemento.id === 'maximo' || elemento.id === 'puertas'){
                busqueda[elemento.id] = Number(e.target.value)
                filtrarAutos()
            } 
            else{
                busqueda[elemento.id] = e.target.value
                filtrarAutos()
            } 
            
        })
}
