import { getToken } from "./token.js";

let animalType='Dog'; //solo trabajo con la búsqueda de perros

export const breedOptions=async () =>{
    let dataToken=await getToken(); //obtengo el token
    // console.log(dataToken);
    const selectBreed=document.querySelector('#breed__filter');
    console.log(selectBreed);
    const breed=[]; //array que almacenará todas las razas de los perros que se obtienen de la API
    //son 7 paginas con las que voy a trabajar (me interesa un máximo de perros)
    for(let indexPage=1;indexPage<=7; indexPage++){
        const dogsReponse= await fetch(`https://api.petfinder.com/v2/animals?type=${animalType}&location=texas&distance=50&page=${indexPage}`,{ //devuelve un array de objetos
         headers: {
            'Authorization': dataToken[0] + ' ' + dataToken[1],
            'Content-Type': 'application/x-www/form-urlencoded'
        }
        }); 
        const dogsJson=await dogsReponse.json();
        // console.log(dogsJson);
        const dogsOnly=dogsJson["animals"];
        // console.log(dogsOnly);
        dogsOnly.forEach((dog)=>{
            // console.log(dog);
            if(dog.photos.length>0) {//si tiene foto 
                let dogBreed=dog["breeds"].primary; //obtengo el valor de la raza
                if(!breed.includes(dogBreed)){ //si no existe la raza aún en el array la inserto, así   filtro para no meter razas de manera repetida
                    breed.push(dogBreed);
                }
            }
        })
    }
    // console.log(breed); 
    localStorage.setItem('razas', JSON.stringify(breed)); //guardo el array con las razas en el localStorage creando un item
    // console.log(listaRazas);
    setBreedsOptions();
}   

export function setBreedsOptions(){
    let razasString= localStorage.getItem('razas'); //accedo a los valores de las razas del item guardado en Localstorage
    let razas=JSON.parse(razasString);
    const selectBreed=document.querySelector('#breed__filter'); //accedo al select que tendrá las opciones de las razas en el filtro
    // console.log("desde funcion");
    // console.log(razas);
    razas.forEach(raza => {
        const option=document.createElement('option'); //por cada raza creo una opcion dentro del select, colocando su valor y su texto correspondiente
        option.innerText=raza;
        option.value=raza;
        selectBreed.appendChild(option); //agrego la opcion al select padre
    })
}
