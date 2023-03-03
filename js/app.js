//client credentials

const key='yCTWxvIK9RPRLhRxrjefKcqgcfn2gy3scxvQ8omqd18Pw9QpMO';
const secret='aB19kPT14oQ4UdEQ42SRmUaEPh1lUqvpYFzlSpB0';

let animalType='Dog'; //solo trabajo con la búsqueda de perros
let gender='male';
let dogsContainer=document.querySelector('#dogs');

//creo las variables en las que voy a almacenar los valores del token que obtenga
let token, tokenType, expires;

let output="";

// Call the API
// This is a POST request, because we need the API to generate a new token for us

function getToken(){
    return fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret, //enviamos los datos en el body
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' //indicamos el tipo de información que estamos enviando
        }
    })
    .then(resp => resp.json())
    .then(data => {
            // console.log('token', data)
            //Store token data, agrego el token a las variables
            token = data.access_token; 
            tokenType = data.token_type;
            expires = new Date().getTime() + (data.expires_in * 1000)
            console.log("token guardado", token,tokenType,expires);
            return data;
            // console.log(token,tokenType,expires); //confirmo que se asigna los valores
    }).catch(err => console.log('something went wrong', err));
};


getToken().then(resp => console.log(resp));

function getAnimals() {
    return fetch(`https://api.petfinder.com/v2/animals?page=1&type=${animalType}`,{ //devuelve un array de objetos
        headers: {
        'Authorization': tokenType + ' ' + token,
        'Content-Type': 'application/x-www/form-urlencoded'
    }
    })
    .then(resp => resp.json())
    .then(data => {
        return data;
    })
    .catch(err => console.log("wrong", err))
}

async function getPage1(){
    return (await fetch(`https://api.petfinder.com/v2/animals?page=1&type=${animalType}`,{ //devuelve un array de objetos
        headers: {
            'Authorization': tokenType + ' ' + token,
            'Content-Type': 'application/x-www/form-urlencoded'
        }
        }).then(resp => resp.json())
        .then(data => {
            return data;
        })
        .catch(err => console.log("wrong", err))
    )
}   
async function getPage2(){
    return (await fetch(`https://api.petfinder.com/v2/animals?page=2&type=${animalType}`,{ //devuelve un array de objetos
        headers: {
        'Authorization': tokenType + ' ' + token,
        'Content-Type': 'application/x-www/form-urlencoded'

        }
        }).then(resp => resp.json())
        .then(data => {
            return data;
        })
        .catch(err => console.log("wrong", err))
    )
}
    // return (await Promise.all([fetchPage1,fetchPage2]).then(values =>console.log(values)));

// async function getDogs(){
//     let dogsPage1=await getPage1();
//     let dogsPage2=await getPage2();
//     console.log(dogsPage1);
//     console.log(dogsPage2);
// }


let makecall=function(){
    // If current token is invalid, get a new one
	if (!expires || expires - new Date().getTime() < 1) {
		console.log('new call');
		getToken().then(function () {
			// getAnimals().then(resp => console.log(resp));
            getDogs().then(resp => console.log(resp));
		});
        return;
	}

    //if the current token is valid, get pets
    console.log("token still valid");
    getDogs().then(resp => console.log(resp));

    // getAnimals().then(resp => console.log(resp));
    // getAnimals().then(resp=>{ //para obtener un array en vez de un objeto
    //     const mappedResult= Object.keys(resp).map(key => {
    //         const dogs=resp[key]
    //         // console.log(key, '->' , dogs)
    //         if (key==='animals'){
    //             dogs.forEach(perro => { //recorro el array de objetos de perros
    //                 //añado un template a html para cada perro
    //                 if(perro.photos.length>0){
    //                     console.log("tengo foto");
    //                     let photo=perro.photos[0].large;
    //                     let breed=perro.breeds['primary'];
    //                     output+=`
    //                     <div class="dog">
    //                         <img class="dog__photo" src="${photo}" alt="">
    //                         <div class="dog__info">
    //                             <p class="name">${perro.name}</p>
    //                             <div class="info__description">
    //                                 <p class="info__p">Age</p>
    //                                 <p class="age">${perro.age}</p>
    //                             </div>
    //                             <div class="info__description">
    //                                 <p class="info__p">Gender</p>
    //                                 <p class="gender">${perro.gender}</p>
    //                             </div>
    //                             <div class="info__description">
    //                                 <p class="info__p">Size</p>
    //                                 <p class="size">${perro.size}</p>
    //                             </div>
    //                             <div class="info__description">
    //                                 <p class="info__p">Breed</p>
    //                                 <p class="breeds">${breed}</p>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     `
    //                 }
                    
                    
    //                 // if (perro['size']==='Medium'){
    //                 //     // console.log(perro);
    //                 // }
    //                 console.log(perro);
    //             });
    //             dogsContainer.innerHTML=output;
    //             // return dogs;
    //         }
    //     })
    //     // return mappedResult;
    // })
    
}

// async function getFemaleDogs(){
//     console.log(await getAnimals());
//     // dogs.forEach(perro => {
//     //     if (perro['size']==='Medium'){
//     //         console.log(perro);
//     //     }
//     // })
// }


const fetchData = async () => {
    try {
      const responsesJSON = await Promise.all([
          fetch(`https://api.petfinder.com/v2/animals?page=1&type=${animalType}`),
          fetch(`https://api.petfinder.com/v2/animals?page=2&type=${animalType}`)
      ]);
      const [todoOne, todoTwo] = await Promise.all(responsesJSON.map(r => r.json()));
      console.log(todoOne, 'todoOne');
      console.log(todoTwo, 'todoTwo');
    } catch (err) {
      throw err;
    }
  };
  
fetchData();




let btn=document.querySelector('#refresh');
btn.addEventListener('click', async()=>{
    let dogsPage1=await getPage1();
    let dogsPage2=await getPage2();
    console.log(dogsPage1);
    console.log(dogsPage2);
});
    // let dogsPage1=await getPage1();
    // let dogsPage2=await getPage2();
    // console.log(dogsPage1);
    // console.log(dogsPage2);


// let searchFemale=document.querySelector('#female');
// searchFemale.addEventListener('click', getFemaleDogs());
// getFemaleDogs();
