

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


//sin terminar
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
})



//get the breeds when the page has loaded
document.addEventListener('DOMContentLoaded', async() => {
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
