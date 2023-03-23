

console.log("start");
const key='yCTWxvIK9RPRLhRxrjefKcqgcfn2gy3scxvQ8omqd18Pw9QpMO';
const secret='aB19kPT14oQ4UdEQ42SRmUaEPh1lUqvpYFzlSpB0';

let animalType='Dog'; //solo trabajo con la búsqueda de perros
// let dogsContainer=document.querySelector('#dogs');
// let pruebaDiv=document.querySelector('.prueba');
let indicePagina=1;
// let output="";
// let btnFilterCategory=document.querySelector("#btn__category");
let btnFilter=document.querySelector("#btn__filter");
console.log(btnFilter);


const getToken=async() =>{
    const tokenResponse= await fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret, //enviamos los datos en el body
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' //indicamos el tipo de información que estamos enviando
        }
    });
    return tokenJson= await tokenResponse.json();
}



const breedOptions=async() =>{
    let newToken=await getToken();
    const tokenType=tokenJson.token_type;
    const tokenAcces=tokenJson.access_token;
    const tokenExpires=tokenJson.expires_in;
    const selectBreed=document.querySelector('#breed__filter');
    console.log(selectBreed);
    const breed=[];
    //son 7 paginas
    for(let indexPage=1;indexPage<=7; indexPage++){
        const dogsReponse= await fetch(`https://api.petfinder.com/v2/animals?type=${animalType}&location=texas&distance=50&page=${indexPage}`,{ //devuelve un array de objetos
         headers: {
            'Authorization': tokenType + ' ' + tokenAcces,
            'Content-Type': 'application/x-www/form-urlencoded'
        }
        }); //son 7 páginas y 130 perros en total
        const dogsJson=await dogsReponse.json();
        console.log(dogsJson);
        const dogsOnly=dogsJson["animals"];
        console.log(dogsOnly);
        dogsOnly.forEach((dog)=>{
            // console.log(dog);
            if(dog.photos.length>0) {//si tiene foto 
                let dogBreed=dog["breeds"].primary;
                if(!breed.includes(dogBreed)){
                    breed.push(dogBreed);
                }
            }
          
        })
    }

    console.log(breed); //me salen 29 razas
    localStorage.setItem('razas', JSON.stringify(breed));
    let listaRazas=localStorage.getItem('razas');
    console.log(listaRazas);
    setBreedsOptions();
}   

function setBreedsOptions(){
    let razasString= localStorage.getItem('razas');
    let razas=JSON.parse(razasString);
    const selectBreed=document.querySelector('#breed__filter');
    console.log("desde funcion");
    console.log(razas);
    razas.forEach(raza => {
        const option=document.createElement('option');
        option.innerText=raza;
        option.value=raza;
        selectBreed.appendChild(option);
    })
}

function goBack(){
    let actualDogContainer=document.querySelector(".actualDog");
    actualDogContainer.innerHTML="";
    actualDogContainer.style.display = "none";
    let dogsContainer=document.querySelector('#dogs');
    dogsContainer.style.display="grid";
}


async function viewActualDog(dogInfo){
    console.log("desde la funcion", dogInfo);
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




function viewDog(ev){
    console.log("Hola");
    console.log(ev.offsetParent);
    let actualDog=ev.offsetParent;
    let dogsContainer=document.querySelector("#dogs");
    dogsContainer.style.display="none";
    let actualDogContainer=document.querySelector(".actualDog");
    actualDogContainer.style.display="flex";
    let dogInfo=actualDog.children[1];
    console.log(dogInfo);
    viewActualDog(dogInfo);
}



const showDogs = (dogs) => {
    let dogsContainer=document.querySelector('#dogs');
    let output="";
    dogsContainer.innerHTML='';
    console.log(dogs);
    dogs.forEach(page => {
        page.forEach( dog => {
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
                console.log(dogID,photo,age,breed,gender,Name,description, size,id); 
    
                output+=`
                <div class="dog">
                    <img class="dog__photo" src="${photo}" alt="">
                    <div class="dog__info">
                        <p class="name">${Name}</p>
                        <p class="dog__id">${id}</p>
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
                        <button class="dog__btn" onclick="viewDog(this)"><img src="./img/zoom-in.png">VIEW MORE</button>
                    </div>
                </div>
                `
                dogsContainer.innerHTML=output;
            }   
        } )
    })
}

const showDogsMixedOption= (arrayDogs) => {
    let dogsContainer=document.querySelector('#dogs');
    let output="";
    dogsContainer.innerHTML='';
    console.log(dogs);
    arrayDogs.forEach(dog => {
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
            let description=dog["tags"];
            console.log(dog);
            console.log(dogID,photo,age,breed,gender,Name,description, size); 

            output+=`
            <div class="dog">
                <img class="dog__photo" src="${photo}" alt="">
                <div class="dog__info">
                    <p class="name">${Name}</p>
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
            </div>
            `
            dogsContainer.innerHTML=output;
        }
    })
}

const SelectDogs = (dogs) =>{
    let mixedOption=document.getElementById("mixed__filter").value;
    console.log(mixedOption);
    if (mixedOption==="np"){
        let flatArrayDogs=dogs.flat();
        let numDogs=flatArrayDogs.length;
        console.log(numDogs);
        let loadingInput=document.querySelector('.loading__text').innerText='';
        let dogsFoundMessage=document.querySelector('.message__text').innerText=`${numDogs} results found`;
        showDogs(dogs);
    }
    else if (mixedOption==="mixed"){
        let MixedDogs=[];
        dogs.forEach(page =>{
            page.forEach(dog => {
                // console.log(dog);
                let mixed=dog['breeds'].mixed;
                if (mixed===true){
                    MixedDogs.push(dog);
                }
            })
           
        })
        console.log(MixedDogs);
        let numDogs=MixedDogs.length;
        let loadingInput=document.querySelector('.loading__text').innerText='';
        let dogsFoundMessage=document.querySelector('.message__text').innerText=`${numDogs} results found`;
        showDogsMixedOption(MixedDogs);
    }
    else{
        //show only the dogs returned that are false
        let noMixedDogs=[];
        dogs.forEach(page =>{
            page.forEach(dog => {
                console.log(dog);
                let mixed=dog['breeds'].mixed;
                if (mixed===false){
                    noMixedDogs.push(dog);
                }
            })
        })
        console.log(noMixedDogs);
        let numDogs=noMixedDogs.length;
        let loadingInput=document.querySelector('.loading__text').innerText='';
        let dogsFoundMessage=document.querySelector('.message__text').innerText=`${numDogs} results found`;
        showDogsMixedOption(noMixedDogs);
    }
}


function changeDogByFilters(){
    let sizeInput=document.getElementById('size__filter').value;
    let genderInput=document.getElementById('gender_filter').value;
    let ageInput=document.getElementById('age__filter').value;
    let breedInput=document.getElementById('breed__filter').value;
    let dogtoSearch={
        size:sizeInput,
        gender:genderInput,
        age:ageInput,
        breed:breedInput,
    };
    return dogtoSearch; //añadir EL FILTRO DE MIXED AL FINAL DE LA PETICION
    //search with the params that people want to filter
}

const filterDog=async(dog) =>{
    let newToken=await getToken();
    const tokenType=tokenJson.token_type;
    const tokenAcces=tokenJson.access_token;
    const tokenExpires=tokenJson.expires_in;
    let dogtoFilter=Object.entries(dog);
    let page=1;
    console.log(dogtoFilter);
    let dogFilter=dogtoFilter.filter(function([key,value]){
        return value!=="np";
    })
    console.log(dogFilter);
    let dogFilterObj=Object.fromEntries(dogFilter);
    console.log(dogFilterObj);
    let paramsFetch=Object.keys(dogFilterObj).length;
    console.log(paramsFetch);
    let paramkeys=Object.entries(dogFilterObj);
    console.log(paramkeys);
    let toSearch=[];
    paramkeys.forEach(param => {
        let paramKey=`${param[0]}=${param[1]}&`;
        toSearch.push(paramKey);
        console.log(paramKey);
    })
    let urlFetch=`https://api.petfinder.com/v2/animals?type=${animalType}&`;
    console.log(toSearch);
    let toInsert="";
    for(let i=0;i<toSearch.length;i++){
        toInsert=toInsert.concat(toSearch[i]);
    }
    console.log(toInsert);
    urlFetch=urlFetch.concat(toInsert);
    console.log(urlFetch);
    let finalFetch=`location=texas&distance=50&page=1`;
    urlFetch=urlFetch.concat(finalFetch);
    console.log(urlFetch);
    const dogsReponse= await fetch(urlFetch,{ //devuelve un array de objetos
    headers: {
    'Authorization': tokenType + ' ' + tokenAcces,
    'Content-Type': 'application/x-www/form-urlencoded'
    }
   });
   let dogsJson=await dogsReponse.json();
   let totalPages=dogsJson["pagination"].total_pages;
   console.log(dogsJson);
   let dogsArray=[];
    for(let currentPage=1; currentPage<=totalPages; currentPage++){
        urlFetch=urlFetch+`&page=${currentPage}`
        const dogsReponse= await fetch(urlFetch,{ //devuelve un array de objetos
            headers: {
            'Authorization': tokenType + ' ' + tokenAcces,
            'Content-Type': 'application/x-www/form-urlencoded'
            }
        });
        let dogsJson=await dogsReponse.json(); //meter en un array de perros
        // console.log(dogsJson);
        dogsArray.push(dogsJson["animals"]);
    }
    console.log(dogsArray);
    console.log(totalPages);
    if(dogsArray[0].length>=1){
        SelectDogs(dogsArray);
    }
    else{
        let loadingInput=document.querySelector('.loading__text').innerText='';
        let dogsFoundMessage=document.querySelector('.message__text').innerText='No dogs found';
        //coger el contenedor de dogs y vaciarlo para insertar el mensaje
    }
}


btnFilter.addEventListener("click", () => {
    console.log("clickado");
    let dogsFoundMessage=document.querySelector('.message__text').innerText='';
    let loadingInput=document.querySelector('.loading__text').innerText='Loading...';
    let dogsContainer=document.querySelector('#dogs').innerHTML='';
    let dog=changeDogByFilters();
    console.log(dog);
    filterDog(dog);
})

let btnReset=document.querySelector("#reset__filters");
btnReset.addEventListener("click", () => {
    let resetSize=document.getElementById("size__filter");
    let resetGender=document.getElementById("gender_filter");
    let resetAge=document.getElementById("age__filter");
    let resetBreed=document.getElementById("breed__filter");
    let resetMixed=document.getElementById("mixed__filter");
    resetSize.selectedIndex=0;
    resetGender.selectedIndex=0;
    resetAge.selectedIndex=0;
    resetBreed.selectedIndex=0;
    resetMixed.selectedIndex=0;
    let dogsFoundMessage=document.querySelector('.message__text').innerText='';
    let loadingInput=document.querySelector('.loading__text').innerText='';
    let dogsContainer=document.querySelector('#dogs').innerHTML='';
    let actualDogContainer=document.querySelector(".actualDog");
    actualDogContainer.style.display="none";
})



//get the breeds when the page has loaded
document.addEventListener('DOMContentLoaded', async() => {
    let actualDogContainer=document.querySelector(".actualDog");
    actualDogContainer.style.display="none";
    console.log(localStorage.length);
    if(localStorage.length===0){
        console.log("primera carga");
        breedOptions();
    }
    let breedFilter=document.querySelector("#breed__filter");
    if(breedFilter.length<=1 && localStorage.length>0){
        // breedOptions();
        console.log("segunda carga");
        setBreedsOptions();
    }
    console.log(breedFilter);
})
