
console.log("start");
let API_KEY='live_OpCCk2ripJyb3YLXsdtpkGMP7BB1oWf5cdN1CX9a8m3Xyw28IojOCYveSPKVZUA4';
let output="";
let dogsContainer=document.querySelector('#dogs');
let baseAPIUrl="https://api.thedogAPI.com/v1";


let dogPhoto=document.querySelector('.dog__photo');
let dogBreed=document.querySelector('.name');


var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("x-api-key", {API_KEY});

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};


const fetchDogs= async () =>{
    const response= await fetch("https://api.thedogapi.com/v1/breeds", requestOptions);
    const responseJson= await response.json();
    console.log(response); //devuelve la respuesta de la promesa
    console.log(responseJson); //devuelve la data en formato json
    breedSelect(responseJson);
}

const breedSelect=(dogs) =>{
    console.log("dog loaded", dogs);
    const breeds=[];
    const select=document.querySelector('.breed__select');
    console.log(select);
    const dogsBreedsOptions=dogs.map(dog =>{
        breeds.push(dog.name);
        const breedOption=document.createElement('option');
        breedOption.textContent=dog.name;
        breedOption.value=dog.id; /*asi podemos acceder al objeto perro por la id */
        return breedOption;
    })
    console.log(dogsBreedsOptions);
    console.log("razas",breeds);
    dogsBreedsOptions.forEach(option => {
        select.appendChild(option);
    })
   
}   

const setDog = (imageUrl, breeds) => {
    dogPhoto.setAttribute('src', imageUrl);
    dogBreed.innerText=breeds[0];
}


const getDog= async (dogID) => {
    const [data]= await fetch(baseAPIUrl + '/images/search?include_breed=1&breed_id='+ dogID)
                        .then((data) => data.json());
    const {url:imageUrl, breeds}=data;
    let breed=breeds[0];
    console.log(breed);
    setDog(imageUrl, breed); /*SEPARAR LA INFORMACION EN OTRA FUNCION Y PASARLE LOS PARAMETROS SIGUIENDO EL VIDEO */
}


const changeDog = () => {
    console.log(event.target.value);
    getDog(event.target.value);
}

let button=document.querySelector('#añadir');
button.addEventListener("click", async() => {
    await fetchDogs();
})