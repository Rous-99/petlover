
// import viewActualDog from '../js/viewActualDog';
import {getToken} from './token.js';
import {dataActualDog} from './viewActualDog.js';


console.log("start");

let dogsContainer=document.querySelector('#dogs');
let animalType='Dog'; //solo trabajo con la búsqueda de perros
let indicePagina=1;
let scrollBtn=document.querySelector('.scroll');


let buttonNext=document.querySelector('.next');
let buttonAnt=document.querySelector('.ant');


buttonNext.addEventListener('click', async() => {
    if(indicePagina<=7){
        indicePagina+=1;
        let dogsContainer=document.querySelector('#dogs');
        dogsContainer.innerHTML="";
        let loadingMessage=document.querySelector('.message__text');
        loadingMessage.innerText='Loading...';
        await fetchDogs();
    }
})

buttonAnt.addEventListener("click", async() => {
    if(indicePagina>1){
        indicePagina-=1;
        let dogsContainer=document.querySelector('#dogs');
        dogsContainer.innerHTML="";
        let loadingMessage=document.querySelector('.message__text');
        loadingMessage.innerText='Loading...';
        await fetchDogs();
    }
})


async function viewActualDog(dogInfo){
    console.log("desde la funcion");
    // let dogName= dogInfo.children[0].innerText;
    let info=dogInfo.innerHTML;
    let actualDogId=dogInfo.children[1].innerText;
    let actualDogID=parseInt(actualDogId);
    console.log("aqui",actualDogID);
    let newToken=await getToken();
    const dogsReponse= await fetch(`https://api.petfinder.com/v2/animals/${actualDogID}`,{ 
         headers: {
         'Authorization': newToken[0] + ' ' + newToken[1],
         'Content-Type': 'application/x-www/form-urlencoded'
         }
        });
    const dogsJson=await dogsReponse.json();
    console.log(dogsJson);
    const dogInfoFetch=dogsJson.animal;
    let structureDog=dataActualDog(dogInfoFetch);
    console.log(structureDog);
    let dogContainer=document.querySelector('.actualDog');
    let outputDog="";
    outputDog+=`
    <img class="dogPhoto" src="${structureDog.photoKey}" alt="">
    <div class="actualDogInfo">
                    <p class="Name">${structureDog.nameKey}</p>
                    <div class="infoDog">
                        <div class="info__parameter">
                            <img src="./img/bone.png">
                            <p class="parameter__title">Age</p>
                            <p>${structureDog.ageKey}</p>
                        </div>
                        <div class="info__parameter">
                            <img src="./img/paw.png">
                            <p class="parameter__title">Breed</p>
                            <p>${structureDog.breedKey}</p>
                            <p>${structureDog.breed2Key}</p>
                        </div>
                        <div class="info__parameter">
                            <img src="./img/gender.png">
                            <p class="parameter__title">Gender</p>
                            <p >${structureDog.genderKey}</p>
                        </div>
                        <div class="info__parameter">
                            <img src="./img/dog-seating.png">
                            <p class="parameter__title">Size</p>
                            <p >${structureDog.sizeKey}</p>
                        </div>
                        <div class="info__parameter">
                            <img src="./img/pet-care.png">
                            <p class="parameter__title">Mixed</p>
                            <p >${structureDog.mixedValueKey}</p>
                        </div>
                        <div class="info__parameter">
                                ${structureDog.iconColorKey}
                                <p class="parameter__title">${structureDog.colorTitleKey}</p>
                                <p>${structureDog.messageColorKey}</p>
                        </div>
                        <div class="info__parameter">
                                ${structureDog.iconCoatKey}
                                <p class="parameter__title">${structureDog.colorCoatKey}</p>
                                <p>${structureDog.messageCoatKey}</p>
                        </div>
                        <div class="info__parameter">
                                <img src="./img/status.png">
                                <p class="parameter__title">Status</p>
                                <p>${structureDog.messageStatusKey}</p>
                        </div>
                    </div>
                    <div class="info__parameter personality">
                                <div class="containerOptions">
                                    <h3 class="parameter__title">${structureDog.titlePersonalityKey}</h3>
                                    <div class="info__personality">
                                        ${structureDog.messagePersonalityKey}
                                    </div>
                                </div>
                                <div class="containerGoodWith">
                                    <h3 class="parameter__title">${structureDog.goodTitleKey}</h3>
                                    <div class="goodWith">
                                        ${structureDog.messageGoodWithKey}
                                    </div>
                                </div>
                     </div>
                    <button class="btn__goBack"><img src="./img/hacia-atras.png" alt="">GO BACK</button>
            </div>
    `
    dogContainer.innerHTML=outputDog;
    let btnActualDog=document.querySelector('.btn__goBack');
    btnActualDog.addEventListener("click", () => {
        let divBtns=document.querySelector('.btn__pages');
        divBtns.style.display="flex";
        let actualDogContainer=document.querySelector(".actualDog");
        actualDogContainer.innerHTML=""; //limpio el contenedor y lo dejo vacío para el próximo perro 
        actualDogContainer.style.display = "none"; 
        let dogsContainer=document.querySelector('#dogs');
        dogsContainer.style.display="grid"; //vuelvo a mostrar los perros filtrados del contenedor dogs
    })
    
}

const showAlldogs = (dogs) => {
    function hi(){
        console.log("hi");
    }
    let loadingMessage=document.querySelector('.message__text');
    loadingMessage.innerText='';
    let dogsContainer=document.querySelector('#dogs');
    let output="";
    console.log("desde la funcion show", dogs)
    dogsContainer.innerHTML='';
    dogs.forEach(dog =>{
        if(dog.photos.length>0){
            let dogID=dog.url;
            let photo=dog['primary_photo_cropped'].large;
            let age=dog.age;
            let breed=dog['breeds'].primary;
            let mixed=dog['breeds'].mixed;
            let breed2="";
            console.log(mixed);
            let mixedValue="";
            if (mixed===true){
                mixedValue="Yes";
                breed2=dog['breeds'].secondary;
                if (breed2===null){
                    breed2="";
                }
            }else{
                mixedValue="No";
            }
            let gender=dog.gender;
            let Name=dog.name;
            let size=dog.size;
            let id=dog.id;
            let description=dog["tags"];
            console.log(dog);
            console.log(dogID,photo,age,breed,gender,Name,description, size); 

            output+=`
            <div class="dog">
                <img class="dog__photo" src="${photo}" alt="">
                <div class="dog__info">
                    <p class="name">${Name}</p>
                    <p class="dog__id">${id}</p>
                    <div class="info">
                        <div class="info__description">
                            <p class="info__p">Age</p>
                            <p class="lifespan">${age}</p>
                        </div>
                        <div class="info__description">
                            <p class="info__p">Breed</p>
                            <p class="breed">${breed}</p>
                            <p class="breed">${breed2}</p>
                        </div>
                        <div class="info__description">
                            <p class="info__p">Gender</p>
                            <p class="height">${gender}</p>
                        </div>
                        <div class="info__description">
                            <p class="info__p">Size</p>
                            <p class="weight">${size}</p>
                        </div>
                        <div class="info__description">
                            <p class="info__p">Mixed</p>
                            <p class="weight">${mixedValue}</p>
                        </div>
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
    btnViewMore.forEach(btn =>{
        btn.addEventListener("click", function viewDog(ev){
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
            let divBtns=document.querySelector('.btn__pages');
            divBtns.style.display="none";
            viewActualDog(dogInfo);
        })
    })
   
}

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
    showAlldogs(dogInfo);
}


document.addEventListener('DOMContentLoaded', async() => {
    let actualDogContainer=document.querySelector(".actualDog");
    actualDogContainer.style.display="none";
    let loadingMessage=document.querySelector('.message__text');
    loadingMessage.innerText='Loading...';
    await fetchDogs();
    // let btnviewDog=document.querySelectorAll('.dog__btn');
    // btnviewDog.addEventListener("click", function(){
    //  console.log("hi");
    // }) 
})

