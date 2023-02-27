//client credentials

const key='yCTWxvIK9RPRLhRxrjefKcqgcfn2gy3scxvQ8omqd18Pw9QpMO';
const secret='aB19kPT14oQ4UdEQ42SRmUaEPh1lUqvpYFzlSpB0';

let org='R177';
let status='adoptable';

//creo un objeto cache para que almacene el token
cache=({
    token:null,
    tokenType:null,
    expires:null
})

// Call the API
// This is a POST request, because we need the API to generate a new token for us

fetch('https://api.petfinder.com/v2/oauth2/token', {
	method: 'POST',
	body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret, //enviamos los datos en el body
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded' //indicamos el tipo de información que estamos enviando
	}
}).then(resp => resp.json())
    .then(data => {
        console.log('token', data)
        //Store token data, agrego el token al cache
        cache.token = data.access_token; 
        cache.tokenType = data.token_type;
        cache.expires = new Date().getTime() + (data.expires_in * 1000)
    }).catch(err => console.log('something went wrong', err));

//if the request is succesfull the API will return our OAuth token
console.log(cache);
// fetch('https://api.petfinder.com/v2/animals?type=dog&page=2',{
//     method: 'GET',
//     headers: {
//         'Authorization':data,
//         'Content-Type': 'application/x-www-form-urlencoded' //indicamos el tipo de información que estamos enviando
// }}).then(resp => resp.json())
//     .then(data => console.log('animal', data))
//     .catch(err => console.log('something went wrong', err));

fetch('https://api.petfinder.com/v2/animals',{
    headers: {
      'Authorization':`${cache.tokenType} ${cache.token}`,
      'Content-Type': 'application/x-www/form-urlencoded'
    }
}).then(resp => resp.json())
    .then(data => console.log('pets',data))
    .catch(err => console.log("wrong", err))