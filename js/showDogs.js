import {viewActualDog} from './viewActualDog.js';


export function dataDog(dog){
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

export const showDogs = (dogs) => {
    let dogsContainer=document.querySelector('#dogs');
    let output=""; //creamos una variable que almacenará el HTML de cada perro que queremos mostrar
    dogsContainer.innerHTML=''; //me aseguro que el contenedor esté limpio para recibir los nuevos datos
    // console.log(dogs);
    dogs.forEach(page => {
        page.forEach( dog => {
            if(dog.photos.length>0){ //solo si tiene fotos busco los datos que quiero mostrar
                let dataDogArray=dataDog(dog); //obtengo el array con los datos del perro a mostrar
                console.log(dataDogArray);
                //creo la estructura HTML con los datos del array a mostrar
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
                        <button class="dog__btn"><img src="./img/zoom-in.png">+INFO</button>
                    </div>
                </div>
                `
                dogsContainer.innerHTML=output; //inserto cada perro en el contenedor padre dogs
            }   
        })
    })
    let btnViewMore=document.querySelectorAll('.dog__btn');
    console.log(btnViewMore);
    btnViewMore.forEach(btn =>{ //a cada perro mostrado le añado la funcionalidad VIEW MORE para ver la información extra
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

