
firebase.initializeApp({
    apiKey: "AIzaSyCEGr5MTGVw3RllCyKbsx4bmcKsVebPaJI",
    authDomain: "adopt-page.firebaseapp.com",
    projectId: "adopt-page",
    storageBucket: "adopt-page.appspot.com",
    messagingSenderId: "242844642262",
    appId: "1:242844642262:web:b273ed533feea6c3b19277",
    measurementId: "G-88C7HWG5DM"
});



// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();



//ELEMENTS DATA
// let petName=document.querySelector(".pet__name").value;
let btnSubmit=document.querySelector(".send__btn");
let form=document.querySelector(".form__adopt");

form.addEventListener("submit", function(ev){
    ev.preventDefault();
    let petName=document.querySelector("#pet__name").value;
    let dogBreed=document.querySelector("#pet__breed").value;
    let adopterName=document.querySelector("#owner__name").value;
    let adopterPhone=document.querySelector("#owner__number").value;
    let adopterEmail=document.querySelector("#email__owner").value;
    let gender="";
    let mixed="";
    let size="";
    let age="";
    let genderInput=document.getElementsByName("pet__gender");
    let mixedInput=document.getElementsByName("pet__mixed");
    let sizeInput=document.getElementsByName("pet__size");
    let ageInput=document.getElementsByName("pet__age");
    // console.log("a",genderInput);
    for(let i=0; i<genderInput.length;i++){
        if(genderInput[i].checked){
            gender=genderInput[i].value;
        }
    }

    for(let i=0;i<mixedInput.length;i++){
        if(mixedInput[i].checked){
            mixed=mixedInput[i].value;
        }
    }

    for(let i=0; i<sizeInput.length;i++){
        if(sizeInput[i].checked){
            size=sizeInput[i].value;
        }
    }

    for(let i=0; i<ageInput.length;i++){
        if(ageInput[i].checked){
            age=ageInput[i].value;
        }
    }
    console.log(petName,dogBreed,adopterName,adopterPhone,adopterEmail, gender,mixed,size,age);
  //get the value of radio inputs, how to?
    validateInputs(petName,dogBreed,adopterName,adopterPhone,adopterEmail, gender,mixed,size,age);
    //if it's true llamamos a guardar y sino no dejamos guardar
    // function guardar(){
    //     db.collection("adopt-users").add({
    //         userName: adopterName,
    //         phoneNumber:adopterPhone,
    //         dogName:petName,
    //         Size:size,
    //         Mixed:mixed,
    //         Gender:gender,
    //         Email:adopterEmail,
    //         Breed:dogBreed,
    //         Age:age,
    //     })
    //     .then((docRef) => {
    //         console.log("Datos insertados en la base de datos");
    //     })
    //     .catch((error) => {
    //         console.error("Error adding document: ", error);
    //     });
    //     }
    //     guardar();
})

const setError = (element, message) => {
    const inputControl=element.parentElement;
    const errorDisplay=inputControl.querySelector('.error');

    errorDisplay.innerText=message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSucces= element =>{
    const inputControl=element.parentElement;
    const errorDisplay=inputControl.querySelector('.error');

    errorDisplay.innerText='';
    inputControl.classList.remove('error');
    inputControl.classList.add('success');
}

function isValidEmail(email){
    console.log("email es:",email);
    const re=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    /*
        PRUEBAS PARA EL TESTING 
        isValidEmail('david@davidburgos.blog'); // true
        isValidEmail('david@ejemplo.com.es'); // true 
        isValidEmail('@google.com'); // false 
        isValidEmail('hola@.com'); // false 
        isValidEmail('hola@google.c'); // false 
        isValidEmail('hola@google'); // false
    */
    console.log(re.test(email));
    return re.test(email);
}

function isValidPhone(phone){
    console.log("phone es:", phone);
    const telefono=/^\+?\d{2}(\s\d{3}){2}\s\d{3}$/;
      /*
    ^ inicio de linea
    \+? que tenga o no el caracter +
    \d{2} seguido de 2 digitos
    (\s\d{3}){2} un patron de 3 digitos que se repita dos veces y con un espacio en blanco
    \s espacio en blanco
    \d{3} seguido de 3 digitos
    $ fin de linea
   */
    console.log(telefono.test(phone));
    return telefono.test(phone);
}


const validateInputs= (petName,dogBreed,adopterName,adopterPhone,adopterEmail, gender,mixed,size,age) =>{
    // let adopterEmail=document.querySelector("#email__owner").value;
    // if (adopterEmail===){
        
    // }
    console.log(adopterPhone);
    console.log(adopterEmail);
    //EXPRESION REGULAR PARA QUE VALIDE EL TELEFONO CON FORMATO: +?? ??? ??? ????
   
   let Email=adopterEmail;
   let phone=adopterPhone;
   console.log(Email);
   console.log(phone);
    let genderInput=document.getElementsByName("pet__gender");
    let mixedInput=document.getElementsByName("pet__mixed");
    let sizeInput=document.getElementsByName("pet__size");
    let ageInput=document.getElementsByName("pet__age");
    let errorGender=document.querySelector('#error__gender');
    let errorMixed=document.querySelector("#error__mixed");
    let errorSize=document.querySelector("#error__size");
    let errorAge=document.querySelector("#error__age");
    let genderCheck=0;
    let mixedCheck=0;
    let sizeCheck=0;
    let ageCheck=0;
 
    for(let i=0; i<genderInput.length;i++){
        console.log(genderInput[i]);
        if(genderInput[i].checked){
           genderCheck+=1;
        }
    }
    for(let i=0; i<mixedInput.length;i++){
        console.log(mixedInput[i]);
        if(mixedInput[i].checked){
           mixedCheck+=1;
        }
    }
    for(let i=0; i<sizeInput.length;i++){
        console.log(sizeInput[i]);
        if(sizeInput[i].checked){
           sizeCheck+=1;
        }
    }
    for(let i=0; i<ageInput.length;i++){
        console.log(ageInput[i]);
        if(ageInput[i].checked){
           ageCheck+=1;
        }
    }


    //validate the name of the adopter is not empty
    if(adopterName===''){
        setError(owner__name, 'Username is required');
    }else{
        setSucces(owner__name);
    }
    if(adopterPhone===""){
        setError(owner__number, 'Phone is required');
    }else if (!isValidPhone(phone)){
        setError(owner__number, 'Not valid, must follow the pattern: +?? ??? ??? ???');
    }else{
        setSucces(owner__number);
    }
    if(adopterEmail=""){
        setError(email__owner, 'Email is required');
    } else if (!isValidEmail(Email)){
        setError(email__owner, 'Provide a valid email adress');
    }else{
        setSucces(email__owner);
    }
    if(genderCheck>0){
       errorGender.innerText="";
    }else{
        errorGender.innerText="You must select the gender";
    }
    if(mixedCheck>0){
        errorMixed.innerText="";
    }else{
        errorMixed.innerText="You must select a value";
    }
    if(sizeCheck>0){
        errorSize.innerText="";
    }else{
        errorSize.innerText="You must select a size";
    }
    if(ageCheck>0){
        errorAge.innerText="";
    }else{
        errorAge.innerText="You must select a age";
    }
}
