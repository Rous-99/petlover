//client credentials

const key='yCTWxvIK9RPRLhRxrjefKcqgcfn2gy3scxvQ8omqd18Pw9QpMO';
const secret='aB19kPT14oQ4UdEQ42SRmUaEPh1lUqvpYFzlSpB0';

//creo las variables en las que voy a almacenar los valores del token que obtenga
let token, tokenType, expires;

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
    return fetch('https://api.petfinder.com/v2/animals',{
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

let makecall=function(){
    // If current token is invalid, get a new one
	if (!expires || expires - new Date().getTime() < 1) {
		console.log('new call');
		getToken().then(function () {
			getAnimals().then(resp => console.log(resp));
		});
        return;
	}

    //if the current token is valid, get pets
    console.log("token still valid");
    getAnimals().then(resp => console.log(resp));
}

let btn=document.querySelector('#refresh');
btn.addEventListener('click', makecall);