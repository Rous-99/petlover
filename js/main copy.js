
console.log("start");
const key='yCTWxvIK9RPRLhRxrjefKcqgcfn2gy3scxvQ8omqd18Pw9QpMO';
const secret='aB19kPT14oQ4UdEQ42SRmUaEPh1lUqvpYFzlSpB0';


let dogsContainer=document.querySelector('#dogs');
let animalType='Dog'; //solo trabajo con la búsqueda de perros
let indicePagina=1;
let scrollBtn=document.querySelector('.scroll');


let buttonNext=document.querySelector('.next');
let buttonAnt=document.querySelector('.ant')

buttonNext.addEventListener('click', async() => {
    if(indicePagina<=7){
        indicePagina+=1;
        await getToken();
    }
    //funciona pero necesito que cuando cargue la siguiente pagina se borre la anterior
})

buttonAnt.addEventListener("click", async() => {
    if(indicePagina>1){
        indicePagina-=1;
        await getToken();
    }
})

const getToken=async() =>{
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
    // console.log(tokenType,tokenAcces,tokenExpires);
    console.log(tokenJson);
    fetchDogs(tokenType,tokenAcces);
}


const fetchDogs= async (tokenType,tokenAcces) =>{
   const dogsReponse= await fetch(`https://api.petfinder.com/v2/animals?type=${animalType}&location=texas&distance=50&page=${indicePagina}`,{ //devuelve un array de objetos
    headers: {
    'Authorization': tokenType + ' ' + tokenAcces,
    'Content-Type': 'application/x-www/form-urlencoded'
    }
    }); //son 7 páginas y 133 perros en total
    const dogsJson=await dogsReponse.json();
    console.log(dogsJson);
    const dogInfo=dogsJson.animals;
    console.log(dogInfo);
    showAlldogs(dogInfo);
}


const showAlldogs = (dogs) => {
    let dogsContainer=document.querySelector('#dogs');
    let output="";
    console.log("desde la funcion show", dogs)
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
                    <div class="info">
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
            </div>
            `
            dogsContainer.innerHTML=output;
        }   
       
    });
}


document.addEventListener('DOMContentLoaded', async() => {
    await getToken();
})



