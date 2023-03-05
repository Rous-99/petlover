
console.log("start");
let API_KEY='live_OpCCk2ripJyb3YLXsdtpkGMP7BB1oWf5cdN1CX9a8m3Xyw28IojOCYveSPKVZUA4';
let output="";
let dogsContainer=document.querySelector('#dogs');
let baseAPIUrl="https://api.thedogAPI.com/v1";


let dogPhoto=document.querySelector('.dog__photo');
let dogBreed=document.querySelector('.name');
let lifeSpanHTML=document.querySelector('.lifespan');
let temperamentHTML=document.querySelector('.temperament');
let heightHTML=document.querySelector('.height');
let weightHTML=document.querySelector('.weight');


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

const setDog = async (imageUrl) => {
    // dogPhoto.setAttribute('src', imageUrl);
    const response=await fetch(baseAPIUrl + `/images/${imageUrl}`,requestOptions);
    const responseJson=await response.json();
    let dogPhotoById=responseJson.url;
    console.log(dogPhotoById);
    dogPhoto.setAttribute('src', dogPhotoById);
}

const setDescription = (temperament, lifespan, height, weight) =>{
    console.log(lifespan,weight,height,temperament);
    lifeSpanHTML.innerText=lifespan;
    temperamentHTML.innerText=temperament;
    heightHTML.innerText=height + " cm";
    weightHTML.innerText=weight + " kg";
}


const getDog= async (dogID) => {
    //hacemos unpacking del array
    const response = await fetch(baseAPIUrl+`/breeds/${dogID}`, requestOptions);
    const responseJson=await response.json();
    console.log(responseJson);
    let dogLifespan=responseJson.life_span;
    let weight=responseJson["weight"].metric;
    let height=responseJson["height"].metric;
    let temperament=responseJson.temperament;
    let imageID=responseJson.reference_image_id;
    console.log(dogLifespan, weight,height,temperament,imageID);
    setDescription(temperament,dogLifespan,height,weight);
    setDog(imageID);   
}


const changeDog = () => {
    console.log(event.target.value);
    getDog(event.target.value);
}

let button=document.querySelector('#añadir');
button.addEventListener("click", async() => {
    await fetchDogs();
})