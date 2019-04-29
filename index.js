//restCountryURL
const restCountryURL = 'https://restcountries.eu/rest/v2/name/';
//calendaricURL and API
const calendarURL = 'https://calendarific.com/api/v2/holidays';
const calendarAPI = 'd59ac09ada464f0db44133ab65417cbfabcfda23';
//youtubeURL and API
const youTubeAPI = 'AIzaSyC3NuguJJDNUuhGc2cYiKhsr2ZHXxFb3ic'; 
const youtTubeURL = 'https://www.googleapis.com/youtube/v3/search';
//restCountries API call
function getCountry(country){
  const url = restCountryURL + country;
  fetch(url)
  .then(response => {
    if(response.ok && response.body!==null && response.body!==0){
      return response.json();
    }else if(response.body==undefined){
    $('#js-error-message').text('Something went wrong.Try other words!'); 
    }else{
     $('#js-error-message').text('No data.Try other words!');
    }
    throw new Error(response.statusText);
  })
  .then (responseJson => displayCountry(responseJson))
  .catch(err => {
    $('#js-error-message').text('Something went wrong: The input is invalid. Try another word.')
    $('.bg').addClass('position');
    }
  );
}

//restCountries API display
function displayCountry(responseJson){
  $('#countryInfo').removeClass('hidden');
  const countryCode = responseJson[0].alpha2Code;
  const countryFullCode = responseJson[0].alpha3Code;
  getHolidays(countryCode);
    $('#countryInfo').append(
    `<div id="center"> 
   <h1 class="azure header">${responseJson[0].name} </h1>
  <img class="imgSize margin2" src='${responseJson[0].flag}' alt='flag'>
    <ul class="ulFormat">
      <li class="liFormat"><b>Capital:</b>${responseJson[0].capital?responseJson[0].capital:"N/A"} </li>
      <li class= "liFormat"><b>Timezone:</b>${responseJson[0].timezones} </li>
      <li class= "liFormat"><b>Language:</b>${responseJson[0].languages[0]?responseJson[0].languages[0].name:"N/A"} </li>
      <li class= "liFormat"><b>Currency:</b>
        ${responseJson[0].currencies[0]?responseJson[0].currencies[0].symbol:"N/A"} ${responseJson[0].currencies[0]?responseJson[0].currencies[0].code:" N/A"} (${responseJson[0].currencies[0]?responseJson[0].name:" N/A"})</li>
        <li class= "liFormat"><b>Regonal Blocs:</b>${responseJson[0].regionalBlocs[0] ? responseJson[0].regionalBlocs[0].name : " N/A"}</li>
    </ul></div>`); 

  getYouTube(countryFullCode); 
}
//get holidays
function getHolidays(countryCode){
 const url = calendarURL +'?api_key='+calendarAPI+'&country='+countryCode+'&year=2020&type=national';
 fetch(url)
 .then(response =>{
   if(response.ok && response.body!==null && response.body!==0){
     return response.json();
   }
   throw new Error(response.statusText);
 })
 .then(responseJson =>displayHolidays(responseJson,maxResults=10))
 .catch(err => {
    $('#js-error-message').text('Something went wrong: The holiday API does not work now. Try again later.');
 });
}
//display holidays
function displayHolidays(responseJson,maxResults){
 $('#calendarInfo').removeClass('hidden');
 $('#calendarHead').removeClass('hidden');
 for (let i= 0; i<responseJson.response.holidays.length & i< maxResults; i++)
 {
 $('#calendarInfo').append(
   
    `<div class="azure">
      <ul class="ulFormat2">
      <li class="liFormat2"><h3>${responseJson.response.holidays[i].name}</h3>
       <li>Year/Month/Date:${responseJson.response.holidays[i].date.iso} </li>
       <li>${responseJson.response.holidays[i].description} </li>
      </li>
     </ul>
     </div>`)
  };
}
/*get Youtube*/
function getYouTube(countryFullCode) {
 /* const options = {
      "Authorization": "Bearer" + youTubeAPI,
      "Accept": 'application/json'
      };*/
  const url = youtTubeURL + '?' + 'part=snippet&order=relevance&q='+countryFullCode+'travel'+'&type=video'+'&key='+youTubeAPI;
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok && response.body!==null && response.body!==0) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayYouTube(responseJson, maxResults=10))
    .catch(err => {
      $('#js-error-message').text('Something went wrong: YouTube API does not work now. Try again later.');
    });
    console.log('app ran');
}

function displayYouTube(responseJson,maxResults){
  for (let i = 0; i < responseJson.items.length & i < maxResults; i++){
    const videoURL = responseJson.items[i].id.videoId;
    console.log(videoURL);
   $('#videoInfo').removeClass('hidden');
    $('#videoInfo').append(
      `<ul class="ulFormat textAlign>"<li><h3 class="azure">${responseJson.items[i].snippet.title}</h3>
      <p class="liFormat">${responseJson.items[i].snippet.description}</p>
      <a href="https://www.youtube.com/watch?v=${videoURL}" target="_blank"> <img src='${responseJson.items[i].snippet.thumbnails.default.url}' class="textAlign"></a>
      </li></ul>`
    )};
    
}

function watchForm(){
  $('form').submit(event => {
   event.preventDefault();
   $('#mainDiv').hide();
   $('.kidDiv').hide();
   $('form').hide();
   $('footer').hide();
   $('#restart').removeClass('hidden');
   const inputText = $('#inputText').val();
   getCountry(inputText);
   $('.bg').removeClass('position');
  });
}

$("#restart").on("click",function restart(){
   event.preventDefault();
   $('#mainDiv').show();
   $('.kidDiv').show();
   $('form').show();
   $('footer').show();
   $("#countryInfo").empty();
   $("#calendarInfo").empty();
   $("#videoInfo").empty();
   $('#restart').addClass('hidden');
   $('#inputText').val('');
   $('#js-error-message').empty();
   $('.bg').addClass('position');
});

$(watchForm);