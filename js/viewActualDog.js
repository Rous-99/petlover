
export function dataActualDog(dogInfoFetch){
    let photo=dogInfoFetch['primary_photo_cropped'].large;
    let age=dogInfoFetch.age;
    let breed=dogInfoFetch['breeds'].primary;
    let mixed=dogInfoFetch['breeds'].mixed;
    let breed2="";
    console.log(mixed);
    let mixedValue="";
    if (mixed===true){
        mixedValue="Yes";
        breed2=dogInfoFetch['breeds'].secondary;
        if (breed2===null){
            breed2="";
        }
    }else{
        mixedValue="No";
    }
    let goodWith=[] //añado con que se lleva bien el perro si hay información (perros, gatos, niños)
    let ArrayValues=dogInfoFetch.environment;
    for(let value in ArrayValues){
        if (ArrayValues[value]===true){
            goodWith.push(value);
        }
    }
    console.log(goodWith);
    let gender=dogInfoFetch.gender;
    let Name=dogInfoFetch.name;
    let size=dogInfoFetch.size;
    let color=dogInfoFetch.colors["primary"]; //can be null
    let coat=dogInfoFetch.coat;
    let status=dogInfoFetch.status;
    let messageStatus=`${status}`;
    let descriptionDog=dogInfoFetch.description;
    let personality=dogInfoFetch["tags"];
    let messageColor, messageCoat, messageDescriptionDog, messageGoodWith,  titlePersonality,messagePersonality,colorTitle, colorCoat, iconColor, iconCoat,goodTitle;
    console.log(messagePersonality);
    console.log(photo,age,breed,gender,Name, size, color,coat, personality, descriptionDog,status, goodWith); 
    //SOLO MUESTRO LOS VALORES DE AQUELLAS PROPIEDADES QUE TIENEN VALOR DIFERENTE A NULL
    if (color!==null){
        colorTitle="Color";
        iconColor=` <img src="./img/gota-de-tinta.png">`;
        messageColor=`${color}`;
    }else{
        colorTitle="";
        iconColor="";
        messageColor="";
    }
    if(coat!==null){
        colorCoat="Coat";
        iconCoat=` <img src="./img/coat.png">`
        messageCoat=`${coat}`;
    }
    else{
        colorCoat="";
        iconCoat="";
        messageCoat="";
    }
    if(descriptionDog!==null){
        messageDescriptionDog=`About me <br><br> ${descriptionDog}`;
    }
    if(personality.length!==0){
        messagePersonality="";
        let adj="";
        titlePersonality="Personality";
        personality.forEach(value =>{
            console.log(value);
            adj=`<p>${value}</p>`;
            console.log(adj);
            messagePersonality=messagePersonality.concat(adj);
            console.log(messagePersonality);
        })
    }else{
        titlePersonality="";
        messagePersonality="";
    }
    if(goodWith.length!==0){
        goodTitle="Good with";
        let GoodWithDogs="";
        let GoodWithChildren="";
        let GoodWithCats="";
        goodWith.forEach(value =>{
            if(value==="dogs"){
                GoodWithDogs=`<div class="option"><img src="./img/love-dog.png"><p>${value}</p></div> `;
            }
            if(value==="children"){
                GoodWithChildren=`<div class="option"><img src="./img/chupete.png"><p>${value}</p></div>`;
            }
            if(value==="cats"){
                GoodWithCats=`<div class="option"><img src="./img/cat.png"><p>${value}</p></div>`;
            }
        })
        messageGoodWith=`${GoodWithDogs} ${GoodWithChildren} ${GoodWithCats}`;
    }else{
        goodTitle="";
        messageGoodWith="";
    }
    let structureActualDog={
        nameKey:Name,
        photoKey:photo,
        ageKey:age, 
        breedKey:breed, 
        breed2Key:breed2,
        genderKey:gender,
        sizeKey:size,
        mixedValueKey:mixedValue,
        iconColorKey:iconColor,
        colorTitleKey:colorTitle,
        messageColorKey:messageColor,
        iconCoatKey:iconCoat,
        colorCoatKey:colorCoat,
        messageCoatKey:messageCoat,
        messageStatusKey:messageStatus,
        titlePersonalityKey:titlePersonality,
        messagePersonalityKey:messagePersonality,
        goodTitleKey:goodTitle,
        messageGoodWithKey:messageGoodWith
    };
    return structureActualDog;
}

// export default dataActualDog;
