
console.log("start");
const key='yCTWxvIK9RPRLhRxrjefKcqgcfn2gy3scxvQ8omqd18Pw9QpMO';
const secret='aB19kPT14oQ4UdEQ42SRmUaEPh1lUqvpYFzlSpB0';

let animalType='Dog'; //solo trabajo con la búsqueda de perros
let dogsContainer=document.querySelector('#dogs');
let indicePagina=1;
let output="";


// let dogPhoto=document.querySelector('.dog__photo');
// let dogBreed=document.querySelector('.name');
// let lifeSpanHTML=document.querySelector('.lifespan');
// let temperamentHTML=document.querySelector('.temperament');
// let heightHTML=document.querySelector('.height');
// let weightHTML=document.querySelector('.weight');


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


const fetchDogs= async () =>{
    let newToken=await getToken();
    // console.log("token del fetch",newToken);
    const tokenType=tokenJson.token_type;
    const tokenAcces=tokenJson.access_token;
    const tokenExpires=tokenJson.expires_in;
    // console.log(tokenType,tokenAcces,tokenExpires);
    const dogsReponse= await fetch(`https://api.petfinder.com/v2/animals?type=${animalType}&location=texas&distance=50&page=${indicePagina}`,{ //devuelve un array de objetos
     headers: {
     'Authorization': tokenType + ' ' + tokenAcces,
     'Content-Type': 'application/x-www/form-urlencoded'
     }
     }); //son 7 páginas y 133 perros en total
     const dogsJson=await dogsReponse.json();
     console.log(dogsJson);
     const dogInfo=dogsJson.animals;
    //  console.log(dogInfo);
}


const showFilterDogs = (filterDogs) =>{
    console.log("perros filtrados", filterDogs);
    filterDogs.forEach(page => {
        page.forEach(dog => {
            if(dog.photos.length>0){
                        let dogID=dog.url;
                        let photo=dog['primary_photo_cropped'].large;
                        let age=dog.age;
                        let breed=dog['breeds'].primary;
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
                                    <p class="temperament">${breed}</p>
                                </div>
                                <div class="info__description">
                                    <p class="info__p">Gender</p>
                                    <p class="height">${gender}</p>
                                </div>
                                <div class="info__description">
                                    <p class="info__p">Size</p>
                                    <p class="weight">${size}</p>
                                </div>
                            </div>
                        </div>
                        `
                        dogsContainer.innerHTML=output;
                    }   
        })
    })

}
//sin terminar
const breedOptions=async() =>{
    let newToken=await getToken();
    const tokenType=tokenJson.token_type;
    const tokenAcces=tokenJson.access_token;
    const tokenExpires=tokenJson.expires_in;
    const dogsReponse= await fetch(`https://api.petfinder.com/v2/animals?type=${animalType}&location=texas&distance=50&page=${indicePagina}`,{ //devuelve un array de objetos
    headers: {
    'Authorization': tokenType + ' ' + tokenAcces,
    'Content-Type': 'application/x-www/form-urlencoded'
    }
    }); //son 7 páginas y 130 perros en total
    const dogsJson=await dogsReponse.json();
    console.log(dogsJson);
    // const breeds=[];
    const selectBreed=document.querySelector('#breed__filter');
    console.log(selectBreed);


    // const Breedptions=dogsJson.map( dog => {
    //     lifespan.push(dog.life_span);
    // })
    
    const breed=[];
    //filtro las que se repiten
    dogsJson.forEach((page)=>{
        page.forEach((dog) =>{
            if(!lifespanFilter.includes(item)){
                lifespanFilter.push(item);
            }
        })
    })
    console.log(lifespanFilter);


    // const dogsBreedsOptions=dogs.map(dog =>{
    //     breeds.push(dog.name);
    //     const breedOption=document.createElement('option');
    //     breedOption.textContent=dog.name;
    //     breedOption.value=dog.id; /*asi podemos acceder al objeto perro por la id */
    //     return breedOption;
    // })
    // console.log(dogsBreedsOptions);
    // console.log("razas",breeds);
    // dogsBreedsOptions.forEach(option => {
    //     select.appendChild(option);
    // })
   
}   


const filterDogsByAge = async(age) =>{
    console.log("desde la funcion",age);
    let currentPage=1;
    let filterDogs=[];
    let dogJson=await getDogByAge(age, currentPage)
    // console.log(dogsJson);
    let numPag=dogsJson["pagination"].total_pages;
    console.log(numPag);
    for(let indPag=1;indPag<=numPag;indPag++){
        let dogJson=await getDogByAge(age, indPag);
        console.log(dogsJson);
        filterDogs.push(dogJson["animals"]);
    }
    console.log(filterDogs);
    showFilterDogs(filterDogs); 
}
 

const filterDogsBySize = async(size) =>{
    console.log("desde la funcion",size);
    let currentPage=1;
    let filterDogs=[];
    let dogJson=await getDogBySize(size, currentPage)
    // console.log(dogsJson);
    let numPag=dogsJson["pagination"].total_pages;
    console.log(numPag);
    for(let indPag=1;indPag<=numPag;indPag++){
        let dogJson=await getDogBySize(size, indPag);
        console.log(dogsJson);
        filterDogs.push(dogJson["animals"]);
    }
    console.log(filterDogs);
    showFilterDogs(filterDogs); 
}
 
const filterDogsByGender= async (gender) => {
    console.log("desde la funcion",gender);
    let currentPage=1;
    let filterDogs=[];
    let dogJson=await getDogByGender(gender, currentPage)
    console.log(dogsJson);
    let numPag=dogsJson["pagination"].total_pages;
    console.log(numPag);
    for(let indPag=1;indPag<=numPag;indPag++){
        let dogJson=await getDogByGender(gender, indPag);
        console.log(dogsJson);
        filterDogs.push(dogJson["animals"]);
    }
    console.log(filterDogs);
    showFilterDogs(filterDogs);
}

const getDogByAge= async(age,currentPage) =>{
    let newToken=await getToken();
    // console.log("token del fetch",newToken);
    const tokenType=tokenJson.token_type;
    const tokenAcces=tokenJson.access_token;
    const tokenExpires=tokenJson.expires_in;
    console.log(tokenType,tokenAcces,tokenExpires);
    const dogsReponse= await fetch(`https://api.petfinder.com/v2/animals?type=${animalType}&age=${age}&location=texas&distance=50&page=${currentPage}`,{ //devuelve un array de objetos
     headers: {
     'Authorization': tokenType + ' ' + tokenAcces,
     'Content-Type': 'application/x-www/form-urlencoded'
     }
    }); //son 7 páginas y 133 perros en total

    return dogsJson=await dogsReponse.json();
}  


const getDogBySize= async(size,currentPage) =>{
    let newToken=await getToken();
    // console.log("token del fetch",newToken);
    const tokenType=tokenJson.token_type;
    const tokenAcces=tokenJson.access_token;
    const tokenExpires=tokenJson.expires_in;
    console.log(tokenType,tokenAcces,tokenExpires);
    const dogsReponse= await fetch(`https://api.petfinder.com/v2/animals?type=${animalType}&size=${size}&location=texas&distance=50&page=${currentPage}`,{ //devuelve un array de objetos
     headers: {
     'Authorization': tokenType + ' ' + tokenAcces,
     'Content-Type': 'application/x-www/form-urlencoded'
     }
    }); //son 7 páginas y 133 perros en total

    return dogsJson=await dogsReponse.json();
}  

const getDogByGender= async(gender,currentPage) =>{
    let newToken=await getToken();
    // console.log("token del fetch",newToken);
    const tokenType=tokenJson.token_type;
    const tokenAcces=tokenJson.access_token;
    const tokenExpires=tokenJson.expires_in;
    console.log(tokenType,tokenAcces,tokenExpires);
    const dogsReponse= await fetch(`https://api.petfinder.com/v2/animals?type=${animalType}&gender=${gender}&location=texas&distance=50&page=${currentPage}`,{ //devuelve un array de objetos
     headers: {
     'Authorization': tokenType + ' ' + tokenAcces,
     'Content-Type': 'application/x-www/form-urlencoded'
     }
    }); //son 7 páginas y 133 perros en total

    return dogsJson=await dogsReponse.json();
}  


const changeDogByGender = () => {
    //AÑADIR ALGO QUE RESETEE EL CONTENEDOR DOGS PARA QUE NO SE AÑADAN DEBAJO LOS NUEVOS FILTROS
    console.log(event.target.value);
    filterDogsByGender(event.target.value);
    // dogsContainer.classList.remove('hide');//cuando cargue la primera selección ya no necesito esconderlo
}

const changeDogBySize = () => {
    console.log(event.target.value);
    filterDogsBySize(event.target.value);
}

const changeDogByAge = () => {
    console.log(event.target.value);
    filterDogsByAge(event.target.value);
}
//get the breeds when the page has loaded
document.addEventListener('DOMContentLoaded', async() => {
    await breedOptions();
    // dogsContainer.classList.add('hide');
})