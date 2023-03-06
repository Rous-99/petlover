
console.log("start");
let API_KEY='live_OpCCk2ripJyb3YLXsdtpkGMP7BB1oWf5cdN1CX9a8m3Xyw28IojOCYveSPKVZUA4';
let dogContainer=document.querySelector('.dog');
let baseAPIUrl="https://api.thedogAPI.com/v1";
let output="";
let dogsContainer=document.querySelector('#dogs');



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
    lifeSpanSelect(responseJson);
}

const lifeSpanSelect = (dogs) => {
    console.log("dogs loaded");
    const lifespan=[];
    const lifeSpanSelect=document.querySelector('#lifespan__filter');
    console.log(lifeSpanSelect);
    const lifespanOptions=dogs.map( dog => {
        lifespan.push(dog.life_span);
    })
    console.log(lifespan);
    const lifespanFilter=[];
    //filtro las que se repiten
    lifespan.forEach((item)=>{
        if(!lifespanFilter.includes(item)){
            lifespanFilter.push(item);
        }
    })
    console.log(lifespanFilter);

}

const breedSelect=(dogs) =>{
    console.log("dog loaded", dogs);
    const breeds=[];
    const select=document.querySelector('#breed__filter');
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

// const setDog = async (imageUrl) => {
//     // dogPhoto.setAttribute('src', imageUrl);
//     const response=await fetch(baseAPIUrl + `/images/${imageUrl}`,requestOptions);
//     const responseJson=await response.json();
//     let dogPhotoById=responseJson.url;
//     console.log(dogPhotoById);
//     dogPhoto.setAttribute('src', dogPhotoById);
// }

// const setDescription = (temperament, lifespan, height, weight) =>{
//     console.log(lifespan,weight,height,temperament);
//     lifeSpanHTML.innerText=lifespan;
//     temperamentHTML.innerText=temperament;
//     heightHTML.innerText=height + " cm";
//     weightHTML.innerText=weight + " kg";
// }


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

    const getPhoto=await fetch(baseAPIUrl + `/images/${imageID}`,requestOptions);
    const getPhotJson=await getPhoto.json();
    let dogPhotoById=getPhotJson.url;
    console.log(dogLifespan, weight,height,temperament,imageID);
    console.log(dogsContainer.childNodes.length);
    if(dogsContainer.childNodes.length>1){
        let dog=document.querySelector('.dog');
        // console.log(dogsContainer.firstElementChild);
        console.log("soy el padre", dogsContainer);
        dogsContainer.removeChild(dogsContainer.firstElementChild); //no se elimina
    }
    output+=`
                            <div class="dog">
                                <img class="dog__photo" src="${dogPhotoById}" alt="">
                                <div class="dog__info">
                                    <div class="info__description">
                                        <p class="info__p">Lifespan</p>
                                        <p class="lifespan">${dogLifespan}</p>
                                    </div>
                                    <div class="info__description">
                                        <p class="info__p">Temperament</p>
                                        <p class="temperament">${temperament}</p>
                                    </div>
                                    <div class="info__description">
                                        <p class="info__p">Height</p>
                                        <p class="height">${height} cm</p>
                                    </div>
                                    <div class="info__description">
                                        <p class="info__p">Weight</p>
                                        <p class="weight">${weight} kg</p>
                                    </div>
                                </div>
                            </div>
                            `
                        dogsContainer.innerHTML=output;
}


const changeDog = () => {
    console.log(event.target.value);
    getDog(event.target.value);
    // dogsContainer.classList.remove('hide');//cuando cargue la primera selección ya no necesito esconderlo

}

//get the breeds when the page has loaded
document.addEventListener('DOMContentLoaded', async() => {
    await fetchDogs();
    // dogsContainer.classList.add('hide');
})