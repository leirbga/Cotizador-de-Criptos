const datosIngresados = document.querySelector('#cotizador');
const selectorMoneda = document.querySelector('#selectorMoneda');
const selectorCripto = document.querySelector('#selectorCripto');
const montoIngresado = document.querySelector('#Monto');
const informacion = document.querySelector('#informacion');
const mostarBarra = document.querySelector('.mostrarBarra');

datosIngresados.addEventListener('submit',  async evento => {
    evento.preventDefault();
    const monedaSeleccionada = [ ... selectorMoneda.children].find(option => option.selected).value;
    const criptoSeleccionada = [ ... selectorCripto.children].find(option => option.selected).value;
    const montoValor = Number(montoIngresado.value); 
    
    try{
    informacion.innerHTML = `<br> <span class="loader"></span>`;
    const cotizador = await(await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoSeleccionada}&tsyms=${monedaSeleccionada}`)).json();
    const precioCripto = cotizador.DISPLAY[criptoSeleccionada][monedaSeleccionada].PRICE;
    const precioAlto = cotizador.DISPLAY[criptoSeleccionada][monedaSeleccionada].HIGH24HOUR;
    const precioBajo = cotizador.DISPLAY[criptoSeleccionada][monedaSeleccionada].LOW24HOUR;
    const variacion24H = cotizador.DISPLAY[criptoSeleccionada][monedaSeleccionada].CHANGEPCT24HOUR;

    if(montoValor == ''){
    informacion.innerHTML = `
    <p class="info">El precio es: ${precioCripto}</p>
    <p class="info">El precio mas alto es: ${precioAlto}</p>
    <p class="info">El precio mas bajo es: ${precioBajo}</p>
    <p class="info">Variacion en 24H: ${variacion24H}%</p>
    `;
    }
    else{
    const puedesComprar = montoValor / cotizador.RAW[criptoSeleccionada][monedaSeleccionada].PRICE;
    informacion.innerHTML = `
    <p class="info">El precio es: ${precioCripto}</p>
    <p class="info">El precio mas alto es: ${precioAlto}</p>
    <p class="info">El precio mas bajo es: ${precioBajo}</p>
    <p class="info">Variacion en 24H: ${variacion24H}%</p>
    <p class="info">Puede comprar:${puedesComprar.toFixed(4)} ${criptoSeleccionada}</p>
    `;
        
    }
    
    }catch(error){
        console.log('Error');
    }
    
});



   