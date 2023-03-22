
// import viewActualDog from '../js/viewActualDog';



console.log("start");
const key='yCTWxvIK9RPRLhRxrjefKcqgcfn2gy3scxvQ8omqd18Pw9QpMO';
const secret='aB19kPT14oQ4UdEQ42SRmUaEPh1lUqvpYFzlSpB0';


let dogsContainer=document.querySelector('#dogs');
let animalType='Dog'; //solo trabajo con la búsqueda de perros
let indicePagina=1;
let scrollBtn=document.querySelector('.scroll');


let buttonNext=document.querySelector('.next');
let buttonAnt=document.querySelector('.ant');
// let messageH3=document.querySelector('.message__result');



buttonNext.addEventListener('click', async() => {
    if(indicePagina<=7){
        indicePagina+=1;
        let dogsContainer=document.querySelector('#dogs');
        dogsContainer.innerHTML="";
        let loadingMessage=document.querySelector('.message__text');
        loadingMessage.innerText='Loading...';
        await getToken();
    }
    //funciona pero necesito que cuando cargue la siguiente pagina se borre la anterior
})

buttonAnt.addEventListener("click", async() => {
    if(indicePagina>1){
        indicePagina-=1;
        let dogsContainer=document.querySelector('#dogs');
        dogsContainer.innerHTML="";
        let loadingMessage=document.querySelector('.message__text');
        loadingMessage.innerText='Loading...';
        await getToken();
    }
})

const getToken=async() =>{
    const tokenResponse= await fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret, //enviamos los datos en el body
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' //indicamos el tipo de información que estamos enviando
        }
    });
    const tokenJson= await tokenResponse.json();
    const tokenType=tokenJson.token_type;
    const tokenAcces=tokenJson.access_token;
    const tokenExpires=tokenJson.expires_in;
    // console.log(tokenType,tokenAcces,tokenExpires);
    console.log(tokenJson);
    fetchDogs(tokenType,tokenAcces);
}


const fetchDogs= async (tokenType,tokenAcces) =>{
   const dogsReponse= await fetch(`https://api.petfinder.com/v2/animals?type=${animalType}&location=texas&distance=50&page=${indicePagina}`,{ //devuelve un array de objetos
    headers: {
    'Authorization': tokenType + ' ' + tokenAcces,
    'Content-Type': 'application/x-www/form-urlencoded'
    }
    }); //son 7 páginas y 133 perros en total
    const dogsJson=await dogsReponse.json();
    console.log(dogsJson);
    const dogInfo=dogsJson.animals;
    console.log(dogInfo);
    showAlldogs(dogInfo);
}


const showAlldogs = (dogs) => {
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
                    <a class="dog__btn"><img src="./img/zoom-in.png">VIEW MORE</a>
                </div>
            </div>
            `
            dogsContainer.innerHTML=output;
        }   
       
    });
}

async function viewActualDog(dogInfo){
    console.log("desde la funcion");
    // let dogName= dogInfo.children[0].innerText;
    let info=dogInfo.innerHTML;
    let actualDogId=dogInfo.children[1].innerText;
    let actualDogID=parseInt(actualDogId);
    console.log("aqui",actualDogID);
    const tokenResponse= await fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret, //enviamos los datos en el body
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' //indicamos el tipo de información que estamos enviando
        }
    });
    const tokenJson= await tokenResponse.json();
    const tokenType=tokenJson.token_type;
    const tokenAcces=tokenJson.access_token;
    const tokenExpires=tokenJson.expires_in;
    console.log(tokenJson);
    const dogsReponse= await fetch(`https://api.petfinder.com/v2/animals/${actualDogID}`,{ 
         headers: {
         'Authorization': tokenType + ' ' + tokenAcces,
         'Content-Type': 'application/x-www/form-urlencoded'
         }
        });
    const dogsJson=await dogsReponse.json();
    console.log(dogsJson);
    const dogInfoFetch=dogsJson.animal;
    console.log(dogInfoFetch);
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
    let goodWith=[]
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
    let messageColor="";
    let coat=dogInfoFetch.coat;
    let messageCoat="";
    let status=dogInfoFetch.status;
    let messageStatus=`${status}`;
    let descriptionDog=dogInfoFetch.description;
    let messageDescriptionDog="";
    let personality=dogInfoFetch["tags"];
    let messageGoodWith="";
    let messagePersonality="";
    let colorTitle="";
    let colorCoat="";
    let iconColor="";
    let iconCoat="";
    let iconStatus="";
    let goodTitle="";
    console.log(photo,age,breed,gender,Name, size, color,coat, personality, descriptionDog,status, goodWith); 




    if (color!==null){
        colorTitle="Color";
        iconColor=` <img src="./img/gota-de-tinta.png">`;
        messageColor=`${color}`;
    }
    if(coat!==null){
        colorCoat="Coat";
        iconCoat=` <img src="./img/coat.png">`
        messageCoat=`${coat}`;
    }
    if(descriptionDog!==null){
        messageDescriptionDog=`About me <br><br> ${descriptionDog}`;
    }
    if(personality.length!==0){
        let space="";
        personality.forEach(value =>{
            console.log(value);
            space=`<br>`;
        })
        messagePersonality=`${personality}${space}`;
    }
    if(goodWith.length!==0){
        goodTitle="Good with";
        let GoodWithDogs="";
        let GoodWithChildren="";
        let GoodWithCats="";
        goodWith.forEach(value =>{
            if(value==="dogs"){
                GoodWithDogs=`<img src="./img/love-dog.png">${value}<br> `;
            }
            if(value==="children"){
                GoodWithChildren=`<img src="./img/chupete.png">${value}<br>`;
            }
            if(value==="cats"){
                GoodWithCats=`<img src="./img/cat.png">${value}<br>`;
            }
        })
        messageGoodWith=`${GoodWithDogs} ${GoodWithChildren} ${GoodWithCats}`;
    }


  

    let dogContainer=document.querySelector('.actualDog');
    let outputDog="";
    outputDog+=`
    <img class="dogPhoto" src="${photo}" alt="">
    <div class="actualDogInfo">
                    <p class="Name">${Name}</p>
                    <div class="infoDog">
                        <div class="info__parameter">
                            <img src="./img/bone.png">
                            <p class="parameter__title">Age</p>
                            <p>${age}</p>
                        </div>
                        <div class="info__parameter">
                            <img src="./img/paw.png">
                            <p class="parameter__title">Breed</p>
                            <p>${breed}</p>
                            <p>${breed2}</p>
                        </div>
                        <div class="info__parameter">
                            <img src="./img/gender.png">
                            <p class="parameter__title">Gender</p>
                            <p >${gender}</p>
                        </div>
                        <div class="info__parameter">
                            <img src="./img/dog-seating.png">
                            <p class="parameter__title">Size</p>
                            <p >${size}</p>
                        </div>
                        <div class="info__parameter">
                            <img src="./img/pet-care.png">
                            <p class="parameter__title">Mixed</p>
                            <p >${mixedValue}</p>
                        </div>
                        <div class="info__parameter">
                                ${iconColor}
                                <p class="parameter__title">${colorTitle}</p>
                                <p>${messageColor}</p>
                        </div>
                        <div class="info__parameter">
                                ${iconCoat}
                                <p class="parameter__title">${colorCoat}</p>
                                <p>${messageCoat}</p>
                        </div>
                        <div class="info__parameter">
                                <img src="./img/status.png">
                                <p class="parameter__title">Status</p>
                                <p>${messageStatus}</p>
                        </div>
                    </div>
                    <div class="descriptionDog">
                            <div class="info__parameter">
                                <p >${messageDescriptionDog}</p>
                            </div>
                            <div class="info__parameter">
                                <p >${messagePersonality}</p>
                            </div>
                    </div>
                    <div class="info__parameter">
                            <p class="parameter__title">${goodTitle}</p>
                            <p>${messageGoodWith}</p>
                    </div>
                    <a href="./dogs.html"><img src="./img/hacia-atras.png" alt="">GO BACK</a>
            </div>
    `
    dogContainer.innerHTML=outputDog;
}

document.addEventListener('DOMContentLoaded', async() => {
    let actualDogContainer=document.querySelector(".actualDog");
    actualDogContainer.style.display="none";
    let loadingMessage=document.querySelector('.message__text');
    loadingMessage.innerText='Loading...';
    await getToken();
    
})


// let btnActualDog=document.querySelector('dog__btn');
//     btnActualDog.addEventListener("click", function(ev){
//          console.log(ev.target);
//     })

document.addEventListener("click", function(ev){
    if(ev.target.innerText==="VIEW MORE" || ev.target.offsetParent==='<div class="dog">'){
        console.log("es el enlace");
        console.log(ev.target); //aqui esta el padre contenedor con la info del perro
        let actualDog=ev.target.offsetParent
        console.log(actualDog);
        let dogPhoto=actualDog.children[0];
        let dogInfo=actualDog.children[1];
        console.log(dogPhoto);
        console.log(dogInfo);
        let dogsContainer=document.querySelector("#dogs");
        dogsContainer.style.display="none";
        let actualDogContainer=document.querySelector(".actualDog");
        actualDogContainer.style.display="flex";
        let btnDiv=document.querySelector('.btn__pages');
        btnDiv.style.display="none";
        viewActualDog(dogInfo);
        // viewActualDog(actualDog);
    }else{
        console.log("no es boton");
    }
    console.log(ev.target);
})