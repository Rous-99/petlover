console.log("form");

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
})