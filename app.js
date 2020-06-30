const api = 
{
  key: "c1ce0280b592e3fe4c86287fcd828f13",
  base: "https://api.openweathermap.org/data/2.5/"
}

const search_box = document.querySelector('.search-box');
search_box.addEventListener('keypress', set_query);

function set_query(e) 
{
  if (e.keyCode==13) 
  {
    get_results(search_box.value);
  }
}

function get_results(query) 
{
  fetch(`${api.base}weather?q=${query}&appid=${api.key}`).then(weather =>
  { 
    return weather.json();
  }).then(display_results);  
}

function display_results(weather) 
{
  let city=document.querySelector('.location .city');
  city.innerText=`${weather.name}, ${weather.sys.country}`;

  let now=new Date();
  let date=document.querySelector('.location .date');
  date.innerText=date_builder(now);

  let temp=document.querySelector('.current .temp');
  temp.innerHTML=`${Math.round(weather.main.temp)-273}<span>°c</span>`;

  let weather_cond=document.querySelector('.current .weather');
  weather_cond.innerText=weather.weather[0].main;
  //console.log(weather_cond.innerText);

  display_gif(document.querySelector('.icon'));

  //let hilow=document.querySelector('.hi-low');
  //hilow.innerText=`${Math.round(weather.main.temp_min)-273}°c / ${Math.round(weather.main.temp_max)-273}°c`;
}

function date_builder (d) 
{
  let months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day=days[d.getDay()];
  let date=d.getDate();
  let month=months[d.getMonth()];
  let year=d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

function display_gif(iconID)
{
  const skycons=new Skycons({color:"white"});
  let current_gif;
  let weather_cond=document.querySelector('.current .weather');
  if(weather_cond.innerText=='Rain')
  {
    current_gif='RAIN';
  }
  else if(weather_cond.innerText=='Clouds')
  {
    current_gif='CLOUDY';
  }
  else if(weather_cond.innerText=='Thunderstorm')
  {
    current_gif='WIND';
  }
  else if(weather_cond.innerText=='Clear')
  {
    current_gif='CLEAR_DAY';
  }
  else if(weather_cond.innerText=='Haze')
  {
    current_gif='FOG';
  }

  skycons.play();
  return skycons.set(iconID,Skycons[current_gif]);
}