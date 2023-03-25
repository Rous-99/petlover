import {dataActualDog} from './viewActualDog.js';

console.log("start");
const key='yCTWxvIK9RPRLhRxrjefKcqgcfn2gy3scxvQ8omqd18Pw9QpMO';
const secret='aB19kPT14oQ4UdEQ42SRmUaEPh1lUqvpYFzlSpB0';
let animalType='Dog'; //solo trabajo con la búsqueda de perros
let indicePagina=1;
let btnFilter=document.querySelector("#btn__filter"); //obtengo el boton de filtrar


//OBTENGO EL TOKEN NECESARIO PARA OBTENER LOS DATOS DE LA API
const getToken=async() =>{
    const tokenResponse= await fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret, //enviamos los datos en el body
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' //indicamos el tipo de información que estamos enviando
        }
    });
    let tokenJson;
    return tokenJson= await tokenResponse.json();
}

async function getDataToken(){
    let newToken=await getToken();
    console.log(newToken);
    const tokenType=newToken.token_type;
    const tokenAcces=newToken.access_token;
    const tokenExpires=newToken.expires_in;
    return [tokenType,tokenAcces,tokenExpires];
}

const breedOptions=async () =>{
    let dataToken=await getDataToken();
    // console.log(dataToken);
    const selectBreed=document.querySelector('#breed__filter');
    console.log(selectBreed);
    const breed=[]; //array que almacenará todas las razas de los perros que se obtienen de la API
    //son 7 paginas con las que voy a trabajar (me interesa un máximo de perros)
    for(let indexPage=1;indexPage<=7; indexPage++){
        const dogsReponse= await fetch(`https://api.petfinder.com/v2/animals?type=${animalType}&location=texas&distance=50&page=${indexPage}`,{ //devuelve un array de objetos
         headers: {
            'Authorization': dataToken[0] + ' ' + dataToken[1],
            'Content-Type': 'application/x-www/form-urlencoded'
        }
        }); 
        const dogsJson=await dogsReponse.json();
        // console.log(dogsJson);
        const dogsOnly=dogsJson["animals"];
        // console.log(dogsOnly);
        dogsOnly.forEach((dog)=>{
            // console.log(dog);
            if(dog.photos.length>0) {//si tiene foto 
                let dogBreed=dog["breeds"].primary; //obtengo el valor de la raza
                if(!breed.includes(dogBreed)){ //si no existe la raza aún en el array la inserto, así   filtro para no meter razas de manera repetida
                    breed.push(dogBreed);
                }
            }
        })
    }
    // console.log(breed); 
    localStorage.setItem('razas', JSON.stringify(breed)); //guardo el array con las razas en el localStorage creando un item
    // console.log(listaRazas);
    setBreedsOptions();
}   

function setBreedsOptions(){
    let razasString= localStorage.getItem('razas'); //accedo a los valores de las razas del item guardado en Localstorage
    let razas=JSON.parse(razasString);
    const selectBreed=document.querySelector('#breed__filter'); //accedo al select que tendrá las opciones de las razas en el filtro
    // console.log("desde funcion");
    // console.log(razas);
    razas.forEach(raza => {
        const option=document.createElement('option'); //por cada raza creo una opcion dentro del select, colocando su valor y su texto correspondiente
        option.innerText=raza;
        option.value=raza;
        selectBreed.appendChild(option); //agrego la opcion al select padre
    })
}

//FUNCIÓN QUE SERÁ EJECUTADA CUANDO DEMOS EN "VIEW MORE" DE ALGÚN PERRO Y QUERAMOS VOLVER A LA PÁGINA ANTERIOR, MOSTRANDO LOS PERROS QUE YA HABÍAN SIDO FILTRADOS
function goBack(){
    let actualDogContainer=document.querySelector(".actualDog");
    actualDogContainer.innerHTML=""; //limpio el contenedor y lo dejo vacío para el próximo perro 
    actualDogContainer.style.display = "none"; 
    let dogsContainer=document.querySelector('#dogs');
    dogsContainer.style.display="grid"; //vuelvo a mostrar los perros filtrados del contenedor dogs
}


//FUNCIÓN "VIEW MORE" SOBRE UN PERRO
async function viewActualDog(dogInfo){
    console.log("desde la funcion", dogInfo);
    let info=dogInfo.innerHTML;
    let actualDogId=dogInfo.children[1].innerText; //accedo a la ID del perro del que queremos obtener más ifnormación
    let actualDogID=parseInt(actualDogId); //lo convertimos a un entero para que el fetch lo pueda hacer
    // console.log("aqui",actualDogID);
    let dataToken= await getDataToken();
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
    //CREAMOS LAS VARIABLES CON LOS VALORES QUE QUEREMOS MOSTRAR DEL PERRO
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
        let actualDogContainer=document.querySelector(".actualDog");
        actualDogContainer.innerHTML=""; //limpio el contenedor y lo dejo vacío para el próximo perro 
        actualDogContainer.style.display = "none"; 
        let dogsContainer=document.querySelector('#dogs');
        dogsContainer.style.display="grid"; //vuelvo a mostrar los perros filtrados del contenedor dogs
    })
    
}


function dataDog(dog){
    console.log(dog);
    let photo=""
    if (dog.primary_photo_cropped!==null){
        photo=dog['primary_photo_cropped'].large;
    }
    let age=dog.age;
    let breed=dog['breeds'].primary;
    let mixed=dog['breeds'].mixed; //veo si es de raza pura o no
    let breed2=""; //no todos los perros tienen una raza secundaria puesto que algunos son de raza pura
    console.log(mixed);
    let mixedValue="";
    if (mixed===true){ //para obtener la raza secundaria si existe de los que no son puros
        mixedValue="Yes"; //separo los perros entre los que son de raza pura y los que no
        breed2=dog['breeds'].secondary; //obtengo la raza secundaria
        if (breed2===null){ //puede ser que no sean de raza pura pero no se tenga información sobre la raza secundaria
            breed2=""; //si no la sabemos no la mostramos
        }
    }else{
        mixedValue="No";
    }
    let gender=dog.gender;
    let Name=dog.name;
    let size=dog.size;
    let id=dog.id; //quiero que no se vea pero que esté en la estructura para poder hacer fetch segun la ID del perro cuando se clicke en "VIEW MORE"
    let description=dog["tags"];
    return [photo,age,breed,mixed, mixedValue,breed2,gender,Name,size,id,description];
}   



//FUNCIÓN MOSTRAR PERROS

const showDogs = (dogs) => {
    let dogsContainer=document.querySelector('#dogs');
    let output=""; //creamos una variable que almacenará el HTML de cada perro que queremos mostrar
    dogsContainer.innerHTML=''; //me aseguro que el contenedor esté limpio para recibir los nuevos datos
    // console.log(dogs);
    dogs.forEach(page => {
        page.forEach( dog => {
            if(dog.photos.length>0){ //solo si tiene fotos busco los datos que quiero mostrar
                let dataDogArray=dataDog(dog);
                console.log(dataDogArray);
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
                dogsContainer.innerHTML=output; //inserto cada perro en el contenedor padre dogs
            }   
        })
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
            viewActualDog(dogInfo);
        })
    })
    
}


//MOSTRAMOS LOS PERROS FILTRADOS SEGÚN EL VALOR MIXED
const showDogsMixedOption= (arrayDogs) => {
    let dogsContainer=document.querySelector('#dogs');
    let output="";
    dogsContainer.innerHTML='';
    // console.log(dogs);
    arrayDogs.forEach(dog => { 
        if(dog.photos.length>0){
            let dataDogArray=dataDog(dog);
                console.log(dataDogArray);
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
                dogsContainer.innerHTML=output; //inserto cada perro en el contenedor padre dogs
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
            viewActualDog(dogInfo);
        })
    })
}

//2 FILTRADO DE PERROS, SEGÚN EL VALOR MIXED SELECCIONADO
const SelectDogs = (dogs) =>{
    let mixedOption=document.getElementById("mixed__filter").value;
    // console.log(mixedOption);
    if (mixedOption==="np"){ //si no tengo preferencia
        let flatArrayDogs=dogs.flat(); //aplanamos para tener un array 
        let numDogs=flatArrayDogs.length; //vemos el numero total de perros filtrados
        // console.log(numDogs);
        let loadingInput=document.querySelector('.loading__text').innerText='';
        let dogsFoundMessage=document.querySelector('.message__text').innerText=`${numDogs} results found`; //mostramos los perros que han sido encontrados según los filtros seleccionados
        showDogs(dogs); //llamamos a la función para mostrar los perros
    }
    else if (mixedOption==="mixed"){ //si queremos filtrar a los perros obtenidos según el valor MIXED
        let MixedDogs=[];
        dogs.forEach(page =>{
            page.forEach(dog => {
                // console.log(dog);
                let mixed=dog['breeds'].mixed;
                if (mixed===true){ 
                    MixedDogs.push(dog) //meto en el array solo a los que tienen el valor TRUE en MIXED;
                }
            })
           
        })
        // console.log(MixedDogs);
        let numDogs=MixedDogs.length; //numero de perro filtrados que nos interesan
        let loadingInput=document.querySelector('.loading__text').innerText='';
        let dogsFoundMessage=document.querySelector('.message__text').innerText=`${numDogs} results found`;
        showDogsMixedOption(MixedDogs); //llamo a la función para mostrar los perros, que es otra diferente a la anterior, para poder recorrer el array y mostrarlos
    }
    else{ //lo mismo que lo anterior pero con el valor contrario
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
        showDogsMixedOption(noMixedDogs); //pasamos el array de los perros filtrados con valor NO MIXED
    }
}

//FUNCIÓN PARA OBTENER LOS VALORES DE LOS FILTROS PARA BUSCAR A LOS PERROS
function changeDogByFilters(){
    //Como en la API no se pueden buscar los perros en función de su valor MIXED, buscamos por el resto de datos y luego filtramos entre esos perros según el valor de MIXED que el cliente haya elegido
    let sizeInput=document.getElementById('size__filter').value;
    let genderInput=document.getElementById('gender_filter').value;
    let ageInput=document.getElementById('age__filter').value;
    let breedInput=document.getElementById('breed__filter').value;
    let dogtoSearch={ //creo un objeto perro con los parametros de busqueda y su valor
        size:sizeInput,
        gender:genderInput,
        age:ageInput,
        breed:breedInput,
    };
    return dogtoSearch; //devolvemos el objeto perro 
}

//FUNCIÓN PARA HACER LAS PETICIONES CON LOS PARÁMETROS DE FILTRO SELECCIONADOS
const filterDog=async(dog) =>{ //recibe el objeto perro que buscamos
    let dogsContainer=document.querySelector('#dogs');
    dogsContainer.style.display="grid"; //muestro el contenedor 
    //OBTENEMOS NUEVO TOKEN PARA HACER LA PETICIÓN
    let dataToken=await getDataToken();
    let dogtoFilter=Object.entries(dog); //obtengo las llaves del objeto perro
    let page=1;
    // console.log(dogtoFilter);
    let dogFilter=dogtoFilter.filter(function([key,value]){
        return value!=="np"; //filtramos para dejar solo los parametros de busqueda que no tengan el valor np, es decir, los que SÍ necesito para filtrar que han sido seleccionados
    })
    // console.log(dogFilter);
    let dogFilterObj=Object.fromEntries(dogFilter); //vuelvo a obtener un objeto perro
    // console.log(dogFilterObj);
    let paramsFetch=Object.keys(dogFilterObj).length; //busco cuántos parámetros de búsqueda tendré que pasarle a la URL del fetch
    // console.log(paramsFetch);
    let paramkeys=Object.entries(dogFilterObj); //obtengo el nombre de los parámetros de búsqueda
    // console.log(paramkeys);
    let toSearch=[]; //array para guardar key-value y pasarlo a la URL del fetch
    paramkeys.forEach(param => {
        let paramKey=`${param[0]}=${param[1]}&`;
        toSearch.push(paramKey);
        // console.log(paramKey);
    })
    let urlFetch=`https://api.petfinder.com/v2/animals?type=${animalType}&`; //url base del fetch
    // console.log(toSearch);
    let toInsert="";//cadena final que va a unir todos los param Key-Value del array toSearch
    for(let i=0;i<toSearch.length;i++){
        toInsert=toInsert.concat(toSearch[i]);
    }
    // console.log(toInsert);
    urlFetch=urlFetch.concat(toInsert); //insertamos esa cadena con los parametros de busqueda a la URL base
    // console.log(urlFetch);
    let finalFetch=`location=texas&distance=50&page=1`;
    urlFetch=urlFetch.concat(finalFetch);
    // console.log(urlFetch);

    //PETICIÓN DEL PERRO FILTRADO
    const dogsReponse= await fetch(urlFetch,{ //devuelve un array de objetos
    headers: {
    'Authorization': dataToken[0] + ' ' + dataToken[1],
    'Content-Type': 'application/x-www/form-urlencoded'
    }
   });
   let dogsJson=await dogsReponse.json();
   let totalPages=dogsJson["pagination"].total_pages; //obtengo el numero de paginas totales que hay de los perros filtrados
   console.log(dogsJson);
   let dogsArray=[];
    for(let currentPage=1; currentPage<=totalPages; currentPage++){ //SIGO HACIENDO PETICIONES DEL RESTO DE PÁGINAS HASTA OBTENER TODAS SI ES QUE HAY MÁS DE UNA
        urlFetch=urlFetch+`&page=${currentPage}` //paso el valor de la nueva página a buscar
        const dogsReponse= await fetch(urlFetch,{ //devuelve un array de objetos
            headers: {
            'Authorization': dataToken[0] + ' ' + dataToken[1],
            'Content-Type': 'application/x-www/form-urlencoded'
            }
        });
        let dogsJson=await dogsReponse.json(); 
        dogsArray.push(dogsJson["animals"]); //guardo los perros de cada página en el array dogsArray
    }
    // console.log(dogsArray);
    // console.log(totalPages);
    if(dogsArray[0].length>=1){ //si el array tiene perros
        SelectDogs(dogsArray); //FILTRAMOS SEGÚN EL VALOR DE MIXED SELECCIONADO
    }
    else{ //si después de filtrar el perro no hemos obtenido respuesta porque ningún perro cumplía todos los requisitos
        let loadingInput=document.querySelector('.loading__text').innerText='';
        let dogsFoundMessage=document.querySelector('.message__text').innerText='No dogs found';
    }
}

function cleanDogs(){
    let dogsFoundMessage=document.querySelector('.message__text').innerText=''; //limpio el mensaje de dogs found
    let dogsContainer=document.querySelector('#dogs').innerHTML=''; //limpio el contenedor de los perros filtrados anteriormente
    let actualDogContainer=document.querySelector(".actualDog").innerHTML='';
}


btnFilter.addEventListener("click", () => {
    console.log("clickado");
    cleanDogs();
    let loadingInput=document.querySelector('.loading__text').innerText='Loading...'; //muestro el mensaje de loading
    let dog=changeDogByFilters(); //obtengo los datos de los filtros para buscar los perros filtrados
    // console.log(dog);
    filterDog(dog); //paso el objeto perro a la función de filtrado
})

//RESETEAMOS LOS FILTROS Y CONTENEDORES
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
    cleanDogs();
    let actualDogContainer=document.querySelector(".actualDog");
    actualDogContainer.style.display="none";
})



//COLOCAMOS LAS OPCIONES DE RAZAS EN EL SELECT CUANDO LA PÁGINA HA CARGADO
document.addEventListener('DOMContentLoaded', async() => {
    let actualDogContainer=document.querySelector(".actualDog");
    actualDogContainer.style.display="none";
    console.log(localStorage.length);
    if(localStorage.length===0){ //si no tiene el item aun creado, entonces hacemos la petición y lo creamos, sino simplemente accedemos al item para mostrar las razas
        console.log("primera carga");
        breedOptions();
    }
    let breedFilter=document.querySelector("#breed__filter");
    if(breedFilter.length<=1 && localStorage.length>0){
        console.log("segunda carga");
        setBreedsOptions();
    }
    // console.log(breedFilter);
})
