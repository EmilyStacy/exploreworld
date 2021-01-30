const restCountryURL = 'https://restcountries.eu/rest/v2/name/';
const calendarURL = 'https://calendarific.com/api/v2/holidays';
const calendarAPI = '	eb09f2389a52b877dbf8d29f1b4efee9c95ba222';
const youTubeAPI = REACT_APP_API_KEY;
const youtTubeURL = 'https://www.googleapis.com/youtube/v3/search';
function getCountry(country){
  const url = restCountryURL + country;
  fetch(url)
  .then(response => {
    if(response.ok && response.body!==null && response.body!==0){
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then (responseJson => displayCountry(responseJson))
  .catch(err => {
    $('#js-error-message').text('Something went wrong: The input is invalid.Try another word.');
    $('#js-error-message').addClass('js-error-message');
    $('.bg').addClass('position');
    }
  );
}
function displayCountry(responseJson){
  $('#countryInfo').removeClass('hidden');
  $('#js-error-message').addClass('hidden');
  $('.bg').removeClass('position');
  const countryCode = responseJson[0].alpha2Code;
  const countryFullCode = responseJson[0].alpha3Code;
  getHolidays(countryCode);
    $('#countryInfo').append(
    `<div id="center" class="transitionColor"> 
    <p id="footer2">photo by <a href="https://unsplash.com/@nasa">Nasa</a></p>
   <h1 class="azure">${responseJson[0].name} </h1>
  <img class="imgSize margin2 transitionColor" src='${responseJson[0].flag}' alt='flag'>
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
function getHolidays(countryCode){
 const url = calendarURL +'?api_key='+calendarAPI+'&country='+countryCode+'&year=2020&type=national';
 fetch(url)
 .then(response =>{
   if(response.ok && response.body!==null && response.body!==0){
     return response.json();
   }
   throw new Error(response.statusText);
 })
 .then(responseJson =>displayHolidays(responseJson,maxResults=8))
 .catch(err => {
    $('#calendarInfo').text('Something went wrong: The calendar API does not work now. Try again later.');
 });
}
function displayHolidays(responseJson,maxResults){
 $('#calendarInfo').removeClass('hidden');
 for (let i= 0; i<responseJson.response.holidays.length & i< maxResults; i++)
 {
 $('#calendarInfo').append(
    `<div class="greyBackground">
      <ul class="ulFormat2">
      <li class="liFormat2"><h3 class="blueGreen h3">${responseJson.response.holidays[i].name}</h3>
      <li class="kidDiv calendarPsize">${responseJson.response.holidays[i].type} </li>
       <li class="kidDiv calendarHSize">Year/Month/Date:${responseJson.response.holidays[i].date.iso} </li>
       <li class="kidDiv calendarPsize">${responseJson.response.holidays[i].description} </li>
      </li>
     </ul>
     </div>`)
  };
}
function getYouTube(countryFullCode) {
  const url = youtTubeURL + '?' + 'part=snippet&relevanceLanguage=en&order=relevance&q='+countryFullCode+'travel'+'&type=video'+'&key='+youTubeAPI;
  fetch(url)
    .then(response => {
      if (response.ok && response.body!==null && response.body!==0) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayYouTube(responseJson, maxResults=8))
    .catch(err => {
      $('#videoInfo').text('Something went wrong: The YouTube API does not work now. Try again later.');
      $('#videoInfo').addClass('js-error-message');
      $('#videoInfo').addClass('bgColor');
    });
}

function displayYouTube(responseJson,maxResults){
  for (let i = 0; i < responseJson.items.length & i < maxResults; i++){
    const videoURL = responseJson.items[i].id.videoId;
   $('#videoInfo').removeClass('hidden');
    $('#videoInfo').append(
      `
      <ul class="ulFormat3 textAlign>"<li><h3 class="h3">${responseJson.items[i].snippet.title}</h6>
      <h6>${responseJson.items[i].id.kind}</h3>
      <p class="liFormat">${responseJson.items[i].snippet.description}</p>
      <a href="https://www.youtube.com/watch?v=${videoURL}" target="_blank"> <img src='${responseJson.items[i].snippet.thumbnails.medium.url}'"></a>
      </li></ul>`
    )};
    
}
function watchForm(){
  $('form').submit(event => {
   event.preventDefault();
   $('#mainDiv').hide();
   $('.kidDiv').hide();
   $('form').hide();
   $("#footer").hide();
   $('#restart').removeClass('hidden');
   $('#mainDiv').removeClass('centerDiv');
   const inputText = $('#inputText').val();
   $("#footer2").show();
  //  getCountry(inputText);
   $('.bg').removeClass('position');
   $(".bg").css("background-image","url(https://images.unsplash.com/photo-1446776899648-aa78eefe8ed0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjIyNjY2fQ&auto=format&fit=crop&w=1652&q=80)").animate({opacity: 0.9}, 300);
  });
}

$("#restart").on("click",function restart(){
   event.preventDefault();
   $('#mainDiv').show();
   $('#mainDiv').addClass('centerDiv');
   $('.kidDiv').show();
   $('form').show();
   $('#footer').show();
   $("#footer2").hide();
   $("#countryInfo").empty();
   $("#calendarInfo").empty();
   $("#videoInfo").empty();
   $('#js-error-message').empty();
   $('#restart').addClass('hidden');
   $('#inputText').val('');
   $(".bg").css("background-image","url(https://images.unsplash.com/photo-1506111583091-becfd4bfa05d?ixlib=rb-1.2.1…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80)");
   $('.bg').addClass('position');
   $('#js-error-message').removeClass('js-error-message');
   $('html').removeClass('bgColor');
   $('#js-button').show();
});

$(watchForm);