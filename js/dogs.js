
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


// function viewDog(){
//     console.log("Hola");
//     console.log(ev.offsetParent);
//     let actualDog=ev.offsetParent;
//     let dogsContainer=document.querySelector("#dogs");
//     dogsContainer.style.display="none";
//     let actualDogContainer=document.querySelector(".actualDog");
//     actualDogContainer.style.display="flex";
//     let dogInfo=actualDog.children[1];
//     console.log(dogInfo);
//     viewActualDog(dogInfo);
// }


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
    // let messageColor="";
    let coat=dogInfoFetch.coat;
    // let messageCoat="";
    let status=dogInfoFetch.status;
    let messageStatus=`${status}`;
    let descriptionDog=dogInfoFetch.description;
    // let messageDescriptionDog="";
    let personality=dogInfoFetch["tags"];
    let messageColor, messageCoat, messageDescriptionDog, messageGoodWith,  titlePersonality,messagePersonality,colorTitle, colorCoat, iconColor, iconCoat,iconStatus,goodTitle;
    // let titlePersonality="";
    // let messagePersonality="";
    // let colorTitle="";
    // let colorCoat="";
    // let iconColor="";
    // let iconCoat="";
    // let iconStatus="";
    // let goodTitle="";
    console.log(messagePersonality);
    console.log(photo,age,breed,gender,Name, size, color,coat, personality, descriptionDog,status, goodWith); 




    if (color!==null){
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
    if(personality.length!==0){
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
    if(goodWith.length!==0){
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
                    <div class="info__parameter personality">
                                <div class="containerOptions">
                                    <h3 class="parameter__title">${titlePersonality}</h3>
                                    <div class="info__personality">
                                        ${messagePersonality}
                                    </div>
                                </div>
                                <div class="containerGoodWith">
                                    <h3 class="parameter__title">${goodTitle}</h3>
                                    <div class="goodWith">
                                        ${messageGoodWith}
                                    </div>
                                </div>
                     </div>
                    <button class="btn__goBack" onclick="goBack()"><img src="./img/hacia-atras.png" alt="">GO BACK</button>
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
    let btnviewDog=document.querySelectorAll('.dog__btn');
    btnviewDog.addEventListener("click", function(){
     console.log("hi");
    }) 
})

function goBack(){
    console.log("hi");
    let actualDogContainer=document.querySelector(".actualDog");
    actualDogContainer.innerHTML="";
    actualDogContainer.style.display = "none";
    let dogsContainer=document.querySelector('#dogs');
    dogsContainer.style.display="grid";
    let btnDiv=document.querySelector('.btn__pages');
    btnDiv.style.display="flex";
}

document.addEventListener("click", function(ev){
    if(ev.target.className==="dog__btn"){
        console.log("es el boton");
        console.log(ev.target); //aqui esta el padre contenedor con la info del perro
        let actualDog=ev.target.offsetParent;
        console.log(actualDog);
        let dogInfo=actualDog.children[1];
        console.log(dogInfo);
        let dogsContainer=document.querySelector("#dogs");
        dogsContainer.style.display="none";
        let actualDogContainer=document.querySelector(".actualDog");
        actualDogContainer.style.display="flex";
        let btnDiv=document.querySelector('.btn__pages');
        btnDiv.style.display="none";
        viewActualDog(dogInfo);
    }else if(ev.target.className==="btn__goBack"){
        goBack();
    }else{
        console.log(ev.target.className);
        console.log("no es boton");
    }
    console.log(ev.target);
})