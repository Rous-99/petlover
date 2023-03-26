import {viewActualDog} from './viewActualDog.js';
import {showDogs,dataDog} from './showDogs.js';
import {getToken} from './token.js';
import{setBreedsOptions,breedOptions} from './breeds.js';

console.log("start");
let animalType='Dog'; //solo trabajo con la búsqueda de perros
let indicePagina=1;
let btnFilter=document.querySelector("#btn__filter"); //obtengo el boton de filtrar


//FUNCIÓN QUE SERÁ EJECUTADA CUANDO DEMOS EN "VIEW MORE" DE ALGÚN PERRO Y QUERAMOS VOLVER A LA PÁGINA ANTERIOR, MOSTRANDO LOS PERROS QUE YA HABÍAN SIDO FILTRADOS
function goBack(){
    let actualDogContainer=document.querySelector(".actualDog");
    actualDogContainer.innerHTML=""; //limpio el contenedor y lo dejo vacío para el próximo perro 
    actualDogContainer.style.display = "none"; 
    let dogsContainer=document.querySelector('#dogs');
    dogsContainer.style.display="grid"; //vuelvo a mostrar los perros filtrados del contenedor dogs
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
    let dataToken=await getToken();
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
