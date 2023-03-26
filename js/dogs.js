
import {getToken} from './token.js';
import {viewActualDog} from './viewActualDog.js'
import {dataDog} from './showDogs.js';


console.log("start");

let animalType='Dog'; //solo trabajo con la búsqueda de perros
let indicePagina=1;
let buttonNext=document.querySelector('.next');
let buttonAnt=document.querySelector('.ant');

//BOTÓN PARA SIGUIENTE PÁGINA
buttonNext.addEventListener('click', async() => {
    if(indicePagina<=7){ //como el total de páginas con la que trabajo son 7, cuando llegue a 7 dejo de sumar el indicePagina
        indicePagina+=1;
        let dogsContainer=document.querySelector('#dogs');
        dogsContainer.innerHTML="";
        let loadingMessage=document.querySelector('.message__text');
        loadingMessage.innerText='Loading...';
        await fetchDogs(); //llama a la función que hará la petición de la página y luego llamará a la función que mostrará los perros
    }
})

//BOTÓN PARA PÁGINA ANTERIOR
buttonAnt.addEventListener("click", async() => {
    if(indicePagina>1){ //no quiero un indíce de página menor que 1
        indicePagina-=1; //resto para volver a la página anterior
        let dogsContainer=document.querySelector('#dogs');
        dogsContainer.innerHTML="";
        let loadingMessage=document.querySelector('.message__text');
        loadingMessage.innerText='Loading...';
        await fetchDogs();
    }
})


//FUNCIÓN PARA MOSTRAR TODOS LOS PERROS
const showAlldogs = (dogs) => { 
    let loadingMessage=document.querySelector('.message__text');
    loadingMessage.innerText='';
    let dogsContainer=document.querySelector('#dogs');
    let output="";
    console.log("desde la funcion show", dogs)
    dogsContainer.innerHTML='';
    dogs.forEach(dog =>{ //recorro cada perro
        if(dog.photos.length>0){
            let dataDogArray=dataDog(dog); //obtengo los datos de cada perro
            //INSERTO EL HTML CON LA ESTRUCTURA DE CADA PERRO
            output+=`
           <div class="dog">
                    <img class="dog__photo" src="${dataDogArray[0]}" alt="">
                    <div class="dog__info">
                        <p class="name">${dataDogArray[7]}</p>
                        <p class="dog__id">${dataDogArray[9]}</p>
                        <div class="info__description">
                            <p class="info__p">Age</p>
                            <p class="lifespan">${dataDogArray[1]}</p>
                        </div>
                        <div class="info__description">
                            <p class="info__p">Breed</p>
                            <p class="breed">${dataDogArray[2]}</p>
                            <p class="breed">${dataDogArray[5]}</p>
                        </div>
                        <div class="info__description">
                            <p class="info__p">Gender</p>
                            <p class="height">${dataDogArray[6]}</p>
                        </div>
                        <div class="info__description">
                            <p class="info__p">Size</p>
                            <p class="weight">${dataDogArray[8]}</p>
                        </div>
                        <div class="info__description">
                            <p class="info__p">Mixed</p>
                            <p class="weight">${dataDogArray[4]}</p>
                        </div>
                        <button class="dog__btn"><img src="./img/zoom-in.png">VIEW MORE</button>
                    </div>
                </div>
                `
            dogsContainer.innerHTML=output;
        }
    })
    let btnViewMore=document.querySelectorAll('.dog__btn');
    console.log(btnViewMore);
    btnViewMore.forEach(btn =>{ //añado la funcionalidad ver más a cada botón de cada perro
        btn.addEventListener("click", function viewDog(ev){
            let divBtns=document.querySelector('.btn__pages');
            divBtns.style.display="none";
            console.log("soy yo");
            console.log(ev);
            let btnDog=ev.target;
            console.log(btnDog);
            let actualDog=btnDog.offsetParent; //accedo a la info sobre el perro que tiene ese botón
            let dogsContainer=document.querySelector("#dogs");
            dogsContainer.style.display="none"; //oculto el resto de perros
            let actualDogContainer=document.querySelector(".actualDog");
            actualDogContainer.innerHTML=""; //limpio el contenedor para insertar la información del nuevo perro
            actualDogContainer.style.display="flex";
            let dogInfo=actualDog.children[1]; //accedo a la info que me interesa obtener del perro, donde se encuentra la ID también
            // console.log(dogInfo);
            viewActualDog(dogInfo);
        })
    })
}   

//HACE LA PETICIÓN DE CADA PÁGINA QUE BUSQUEMOS, MOSTRANDO POR PRIMERA VEZ SIEMPRE LA PÁGINA 1
const fetchDogs= async () =>{
    let newToken=await getToken();
    console.log(newToken);
   const dogsReponse= await fetch(`https://api.petfinder.com/v2/animals?type=${animalType}&location=texas&distance=50&page=${indicePagina}`,{ //devuelve un array de objetos
    headers: {
    'Authorization': newToken[0] + ' ' + newToken[1],
    'Content-Type': 'application/x-www/form-urlencoded'
    }
    }); //son 7 páginas y 133 perros en total
    const dogsJson=await dogsReponse.json();
    console.log(dogsJson);
    const dogInfo=dogsJson.animals;
    console.log(dogInfo);
    showAlldogs(dogInfo); //llama a la función que mostrará todos los perros
}


document.addEventListener('DOMContentLoaded', async() => {
    let actualDogContainer=document.querySelector(".actualDog");
    actualDogContainer.style.display="none";
    let loadingMessage=document.querySelector('.message__text');
    loadingMessage.innerText='Loading...';
    await fetchDogs(); //hace la primera petición con la página 1
})

