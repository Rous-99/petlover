

console.log("start");
const key='yCTWxvIK9RPRLhRxrjefKcqgcfn2gy3scxvQ8omqd18Pw9QpMO';
const secret='aB19kPT14oQ4UdEQ42SRmUaEPh1lUqvpYFzlSpB0';

let animalType='Dog'; //solo trabajo con la búsqueda de perros
// let dogsContainer=document.querySelector('#dogs');
// let pruebaDiv=document.querySelector('.prueba');
let indicePagina=1;
// let output="";
// let btnFilterCategory=document.querySelector("#btn__category");
let btnFilterAll=document.querySelector("#btn__all");
let btnSize=document.querySelector(".btn__size");
let btnGender=document.querySelector(".btn__gender");
let btnAge=document.querySelector('.btn__age');
let btnMixed=document.querySelector('.btn__mixed');
let btnBreed=document.querySelector('.btn__breed');
let btnFilter=document.querySelector("#btn__filter");
console.log(btnSize);
console.log(btnGender);
console.log(btnAge);
console.log(btnMixed);
console.log(btnBreed);
console.log(btnFilterAll);
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




const showFilterDogs = (filterDogs) =>{
    let dogsContainer=document.querySelector('#dogs');
    let pruebaDiv=document.querySelector('.prueba');
    let output="";
    console.log("perros filtrados", filterDogs);
    console.log(dogsContainer);
    dogsContainer.innerHTML='';
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
                        // console.log(mixed);
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
                        // console.log(dog);
                        // console.log(dogID,photo,age,breed,gender,Name,description, size); 
            
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
    localStorage.setItem('razas', JSON.stringify(breed));
    let listaRazas=localStorage.getItem('razas');
    console.log(listaRazas);
    // breed.forEach(breed => {
    //     const option=document.createElement('option');
    //     option.innerText=breed;
    //     option.value=breed;
    //     selectBreed.appendChild(option);
    // })
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

const showDogsByMixed = (dogs) =>{
    let dogsContainer=document.querySelector('#dogs');
    let output="";
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


const getDogByAllFilters = async(valueSize,valueGender,valueAge,valueBreed,currentPage) =>{
    let newToken=await getToken();
    const tokenType=tokenJson.token_type;
    const tokenAcces=tokenJson.access_token;
    const tokenExpires=tokenJson.expires_in;
    const dogsReponse= await fetch(`https://api.petfinder.com/v2/animals?type=${animalType}&size=${valueSize}&gender=${valueGender}&age=${valueAge}&breed=${valueBreed}&location=texas&distance=50&page=${currentPage}`,{ //devuelve un array de objetos
    headers: {
    'Authorization': tokenType + ' ' + tokenAcces,
    'Content-Type': 'application/x-www/form-urlencoded'
    }
   });
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
        // console.log(dogsJson);
        filterDogs.push(dogJson["animals"]);
    }
    console.log(filterDogs);
    showFilterDogs(filterDogs); 
}

const filterDogsByAllFilters = async (valueSize,valueGender,valueAge,valueBreed,valueMixed) => {
    console.log("desde la funcion", valueSize,valueGender,valueAge,valueBreed,valueMixed);
    let currentPage=1;
    let dogs=[];
    let dogJson=await getDogByAllFilters(valueSize,valueGender,valueAge,valueBreed,currentPage);
    console.log(dogJson);
    //ahora tengo que buscar si la opcion fue mixed y dividir
    const dogsOnly=dogsJson["animals"];
    if(valueMixed==="mixed"){
        dogsOnly.forEach((dog)=>{
            // console.log(dog);
            if(dog['breeds'].mixed===true) {//si tiene foto 
               dogs.push(dog);
            }
        });
        
    }else{
        dogsOnly.forEach((dog)=>{
            // console.log(dog);
            if(dog['breeds'].mixed===false) {//si tiene foto 
               dogs.push(dog);
            }
        });
    }
    showDogsByMixed(dogs);
}   


function changeDogByGender(){
    let gender=document.getElementById('gender_filter').value;
    console.log("gender selected was", gender);
    return gender;
}

function changeDogBySize(){
    let size=document.getElementById('size__filter').value;
    console.log(size);
    return size;
}

function changeDogByAge(){
    let age=document.getElementById('age__filter').value;
    console.log("age was selected",age);
    return age;
}

function changeDogByBreed(){
    let breed=document.getElementById('breed__filter').value;
    console.log("breed was selected", breed);
    return breed;
}


function changeDogByMixed(){
    let mixed=document.getElementById("mixed__filter").value;
    console.log(mixed);
    return mixed;
}

function changeDogByAllFilters(){
    let size=document.getElementById('size__filter').value;
    let gender=document.getElementById('gender_filter').value;
    let age=document.getElementById('age__filter').value;
    let breed=document.getElementById('breed__filter').value;
    let mixed=document.getElementById("mixed__filter").value;
    let values=[];
    values.push(size,gender,age,breed,mixed);
    return values;
}

function changeDogByFilters(){
    let sizeInput=document.getElementById('size__filter').value;
    let genderInput=document.getElementById('gender_filter').value;
    let ageInput=document.getElementById('age__filter').value;
    let breedInput=document.getElementById('breed__filter').value;
    let mixedInput=document.getElementById("mixed__filter").value;
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
        console.log(dogsJson);
        dogsArray.push(dogsJson);
    }
    console.log(dogsArray);
   console.log(totalPages);
//    showFilterDogs(dogsArray); //llamar a la funcion para mostrar los perros
}



btnSize.addEventListener("click",()=>{
    // filterDogs(size,"size")
    let size=changeDogBySize();
    console.log("size desde boton es", size);
    filterDogs(size,"size");

});

btnGender.addEventListener("click",()=>{
    // filterDogs(size,"size")
    let gender=changeDogByGender();
    console.log("gender desde boton es", gender);
    filterDogs(gender,"gender");

});

btnAge.addEventListener("click", () => {
    let age=changeDogByAge();
    console.log("age desde boton es ", age);
    filterDogs(age,"age");
})

btnBreed.addEventListener("click", () => {
    let breed=changeDogByBreed();
    console.log("breed desde boton es ", breed);
    filterDogs(breed,"breed");
})

btnMixed.addEventListener("click",()=>{
    let mixed=changeDogByMixed();
    console.log("mixed desde boton es", mixed);
    filterDogsByMixed(mixed);
});

btnFilterAll.addEventListener("click", () => {
    let values=changeDogByAllFilters();
    let size=values[0];
    let gender=values[1];
    let age=values[2];
    let breed=values[3];
    let mixed=values[4];
    console.log(values);
    console.log(size,gender,age,breed,mixed);
    filterDogsByAllFilters(size,gender,age,breed,mixed);
})

btnFilter.addEventListener("click", () => {
    console.log("clickado");
    let dog=changeDogByFilters();
    console.log(dog);
    filterDog(dog);
})







breedOptions();
setBreedsOptions();

//get the breeds when the page has loaded
// document.addEventListener('DOMContentLoaded', async() => {
//    setBreedsOptions(); //SOLUCIONAR EL TIEMPO DE ESPERA
//     // dogsContainer.classList.add('hide');
// })

// let genderSelect=document.querySelector('#gender_filter');
// genderSelect.addEventListener("change", () => {
//     let pruebaDiv=document.querySelector('.prueba');
//     console.log(pruebaDiv)
//     pruebaDiv.innerHTML='';
//     let dogs=document.querySelector('#dogs');
//     dogs.innerHTML='';
// })
