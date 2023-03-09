

console.log("start");
const key='yCTWxvIK9RPRLhRxrjefKcqgcfn2gy3scxvQ8omqd18Pw9QpMO';
const secret='aB19kPT14oQ4UdEQ42SRmUaEPh1lUqvpYFzlSpB0';

let animalType='Dog'; //solo trabajo con la búsqueda de perros
// let dogsContainer=document.querySelector('#dogs');
// let pruebaDiv=document.querySelector('.prueba');
let indicePagina=1;
// let output="";



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




const clearDiv= () =>{
    let pruebaDiv=document.querySelector('.prueba');
    // console.log(pruebaDiv)
    // pruebaDiv.innerHTML='bye';
    // let dogsContainer=document.querySelector('#dogs');
    // dogsContainer.innerHTML='';
    // $("#dogs").empty();
}

const showFilterDogs = (filterDogs) =>{
    let dogsContainer=document.querySelector('#dogs');
    let pruebaDiv=document.querySelector('.prueba');
    let output="";
    console.log("perros filtrados", filterDogs);
    console.log(pruebaDiv);
    console.log(dogsContainer);
    dogsContainer.innerText='';
    pruebaDiv.innerHTML='';
    console.log(pruebaDiv);
    console.log(dogsContainer);
    filterDogs.forEach(page => {
        page.forEach(dog => {
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
    })

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

    breed.forEach(breed => {
        const option=document.createElement('option');
        option.innerText=breed;
        option.value=breed;
        selectBreed.appendChild(option);
    })
}   

const showDogsByMixed = (dogs) =>{
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
    });
}

const filterDogsByMixed= async (option) =>{
    let newToken=await getToken();
    const tokenType=tokenJson.token_type;
    const tokenAcces=tokenJson.access_token;
    const tokenExpires=tokenJson.expires_in;
    const mixed=[];
    const nomixed=[];
    for(let indexPage=1;indexPage<=7; indexPage++){
        const dogsReponse= await fetch(`https://api.petfinder.com/v2/animals?type=${animalType}&location=texas&distance=50&page=${indexPage}`,{ //devuelve un array de objetos
         headers: {
            'Authorization': tokenType + ' ' + tokenAcces,
            'Content-Type': 'application/x-www/form-urlencoded'
        }
        });
        const dogsJson=await dogsReponse.json();
        console.log(dogsJson);
        const dogsOnly=dogsJson["animals"];
        console.log(dogsOnly);
        dogsOnly.forEach((dog)=>{
            // console.log(dog);
            if(dog['breeds'].mixed===true) {//si tiene foto 
               mixed.push(dog);
            }
            else{
                nomixed.push(dog);
            }
                
        });
    }
    //añadir el codigo para que si la opcion es mixed enseñe esos perros que estan en el array mixed, y si es la otra opcion muestre los otros perros.
    console.log("mixed",mixed);
    console.log("no mixed",nomixed);
    if(option==="mixed"){
        showDogsByMixed(mixed);
    }else{
        showDogsByMixed(nomixed);
    }
       
}

const getDogByFilter= async(valueFilter,paramSearch,currentPage) =>{
    let newToken=await getToken();
    // console.log("token del fetch",newToken);
    const tokenType=tokenJson.token_type;
    const tokenAcces=tokenJson.access_token;
    const tokenExpires=tokenJson.expires_in;
    console.log(tokenType,tokenAcces,tokenExpires);
    const dogsReponse= await fetch(`https://api.petfinder.com/v2/animals?type=${animalType}&${paramSearch}=${valueFilter}&location=texas&distance=50&page=${currentPage}`,{ //devuelve un array de objetos
     headers: {
     'Authorization': tokenType + ' ' + tokenAcces,
     'Content-Type': 'application/x-www/form-urlencoded'
     }
    }); //son 7 páginas y 133 perros en total

    return dogsJson=await dogsReponse.json();
}  

const filterDogs = async(valueFilter, paramSearch) =>{
    console.log("desde la funcion",valueFilter);
    let currentPage=1;
    let filterDogs=[];
    let dogJson=await getDogByFilter(valueFilter,paramSearch,currentPage)
    // console.log(dogsJson);
    let numPag=dogsJson["pagination"].total_pages;
    console.log(numPag);
    for(let indPag=1;indPag<=numPag;indPag++){
        let dogJson=await getDogByFilter(valueFilter,paramSearch,indPag);
        console.log(dogsJson);
        filterDogs.push(dogJson["animals"]);
    }
    console.log(filterDogs);
    showFilterDogs(filterDogs); 
}

const changeDogByGender = () => {
    //AÑADIR AL    
    // clearDiv();
    console.log(event.target.value);
    filterDogs(event.target.value,"gender");
    // dogsContainer.classList.remove('hide');//cuando cargue la primera selección ya no necesito esconderlo
}

const changeDogBySize = () => {
    console.log(event.target.value);
    filterDogs(event.target.value, "size");
}

const changeDogByAge = () => {
    console.log(event.target.value);
    filterDogs(event.target.value, "age");
}

const changeDogByBreed = () => {
    console.log(event.target.value);
    filterDogs(event.target.value, "breed");
}

const changeDogByMixed = () => {
    console.log(event.target.value);
    // clearDiv();
    filterDogsByMixed(event.target.value);
}
//get the breeds when the page has loaded
document.addEventListener('DOMContentLoaded', async() => {
    await breedOptions(); //SOLUCIONAR EL TIEMPO DE ESPERA
    // dogsContainer.classList.add('hide');
})

let genderSelect=document.querySelector('#gender_filter');
// genderSelect.addEventListener("change", () => {
//     let pruebaDiv=document.querySelector('.prueba');
//     console.log(pruebaDiv)
//     pruebaDiv.innerHTML='';
//     let dogs=document.querySelector('#dogs');
//     dogs.innerHTML='';
// })