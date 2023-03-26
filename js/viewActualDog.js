
import {getToken} from './token.js';

//FUNCIÓN OBTENER LA DATA EXTRA DE CADA PERRO
function dataActualDog(dogInfoFetch){ //recibe el objeto perro
    let photo=dogInfoFetch['primary_photo_cropped'].large;
    let age=dogInfoFetch.age;
    let breed=dogInfoFetch['breeds'].primary;
    let mixed=dogInfoFetch['breeds'].mixed;
    let breed2="";
    console.log(mixed);
    let mixedValue="";
    if (mixed===true){
        mixedValue="Yes";
        breed2=dogInfoFetch['breeds'].secondary;
        if (breed2===null){
            breed2="";
        }
    }else{
        mixedValue="No";
    }
    let goodWith=[] //añado con que se lleva bien el perro si hay información (perros, gatos, niños)
    let ArrayValues=dogInfoFetch.environment;
    for(let value in ArrayValues){
        if (ArrayValues[value]===true){
            goodWith.push(value);
        }
    }
    console.log(goodWith);
    let gender=dogInfoFetch.gender;
    let Name=dogInfoFetch.name;
    let size=dogInfoFetch.size;
    let color=dogInfoFetch.colors["primary"]; //can be null
    let coat=dogInfoFetch.coat;
    let status=dogInfoFetch.status;
    let messageStatus=`${status}`;
    let descriptionDog=dogInfoFetch.description;
    let personality=dogInfoFetch["tags"];
    let messageColor, messageCoat, messageDescriptionDog, messageGoodWith,  titlePersonality,messagePersonality,colorTitle, colorCoat, iconColor, iconCoat,goodTitle; //declaro variables para mostrar vacías o no según si el perro tiene info sobre esa característica
    console.log(messagePersonality);
    console.log(photo,age,breed,gender,Name, size, color,coat, personality, descriptionDog,status, goodWith); 
    //SOLO MUESTRO LOS VALORES DE AQUELLAS PROPIEDADES QUE TIENEN VALOR DIFERENTE A NULL
    if (color!==null){ //sino esta vacía la información se mostrará, así que añado la estructura html a cada variable correspondiente
        colorTitle="Color";
        iconColor=` <img src="./img/gota-de-tinta.png">`;
        messageColor=`${color}`;
    }else{
        colorTitle="";
        iconColor="";
        messageColor="";
    }
    if(coat!==null){
        colorCoat="Coat";
        iconCoat=` <img src="./img/coat.png">`
        messageCoat=`${coat}`;
    }
    else{
        colorCoat="";
        iconCoat="";
        messageCoat="";
    }
    if(descriptionDog!==null){
        messageDescriptionDog=`About me <br><br> ${descriptionDog}`;
    }
    if(personality.length!==0){ //si tiene info
        messagePersonality="";
        let adj="";
        titlePersonality="Personality";
        personality.forEach(value =>{
            console.log(value);
            adj=`<p>${value}</p>`;
            console.log(adj);
            messagePersonality=messagePersonality.concat(adj);
            console.log(messagePersonality);
        })
    }else{
        titlePersonality="";
        messagePersonality="";
    }
    if(goodWith.length!==0){ //si tiene info
        goodTitle="Good with";
        let GoodWithDogs="";
        let GoodWithChildren="";
        let GoodWithCats="";
        goodWith.forEach(value =>{
            if(value==="dogs"){
                GoodWithDogs=`<div class="option"><img src="./img/love-dog.png"><p>${value}</p></div> `;
            }
            if(value==="children"){
                GoodWithChildren=`<div class="option"><img src="./img/chupete.png"><p>${value}</p></div>`;
            }
            if(value==="cats"){
                GoodWithCats=`<div class="option"><img src="./img/cat.png"><p>${value}</p></div>`;
            }
        })
        messageGoodWith=`${GoodWithDogs} ${GoodWithChildren} ${GoodWithCats}`;
    }else{
        goodTitle="";
        messageGoodWith="";
    }
    let structureActualDog={ //devuelvo un objeto con los datos que necesito para montar la estructura html del perro
        nameKey:Name,
        photoKey:photo,
        ageKey:age, 
        breedKey:breed, 
        breed2Key:breed2,
        genderKey:gender,
        sizeKey:size,
        mixedValueKey:mixedValue,
        iconColorKey:iconColor,
        colorTitleKey:colorTitle,
        messageColorKey:messageColor,
        iconCoatKey:iconCoat,
        colorCoatKey:colorCoat,
        messageCoatKey:messageCoat,
        messageStatusKey:messageStatus,
        titlePersonalityKey:titlePersonality,
        messagePersonalityKey:messagePersonality,
        goodTitleKey:goodTitle,
        messageGoodWithKey:messageGoodWith
    };
    return structureActualDog;
}

// export default dataActualDog;

export async function viewActualDog(dogInfo){
    console.log("desde la funcion", dogInfo);
    let info=dogInfo.innerHTML;
    let actualDogId=dogInfo.children[1].innerText; //accedo a la ID del perro del que queremos obtener más ifnormación
    let actualDogID=parseInt(actualDogId); //lo convertimos a un entero para que el fetch lo pueda hacer
    // console.log("aqui",actualDogID);
    let dataToken= await getToken();
    // console.log(dataToken);
    const dogsReponse= await fetch(`https://api.petfinder.com/v2/animals/${actualDogID}`,{ 
         headers: {
         'Authorization': dataToken[0] + ' ' + dataToken[1],
         'Content-Type': 'application/x-www/form-urlencoded'
         }
        });
    const dogsJson=await dogsReponse.json();
    // console.log(dogsJson);
    const dogInfoFetch=dogsJson.animal; //accedemos al perro buscado por la ID
    // console.log(dogInfoFetch);
    let structureDog=dataActualDog(dogInfoFetch); //obtengo el objeto con los datos para mostrar en el HTML del perro
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
                    <button class="btn__goBack"><img src="./img/hacia-atras.png" alt="">BACK</button>
            </div>
    `
    dogContainer.innerHTML=outputDog;
    let btnActualDog=document.querySelector('.btn__goBack'); //funcionalidad para volver atrás al contenedor padre
    btnActualDog.addEventListener("click", () => {
        let actualDogContainer=document.querySelector(".actualDog");
        actualDogContainer.innerHTML=""; //limpio el contenedor y lo dejo vacío para el próximo perro 
        actualDogContainer.style.display = "none"; 
        let dogsContainer=document.querySelector('#dogs');
        dogsContainer.style.display="grid"; //vuelvo a mostrar los perros filtrados del contenedor dogs
        let divBtns=document.querySelector('.btn__pages');
        let btnUp=document.querySelector('.arrow__goUp');
        if(divBtns!==null){
            divBtns.style.display="flex";
        }
        if(btnUp!==null){
            btnUp.style.display="flex";
        }
    })
    
}