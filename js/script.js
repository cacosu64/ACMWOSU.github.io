var icons = ["",
  " <i class='fa fa-external-link-square'></i>",
  " <i class='fa fa-facebook-square'></i>"];
var mapLinkIcon= " <i class='fa fa-map-marker'></i>";
var startYear=2016;
var events = "https://raw.githubusercontent.com/jmkuehn/ACMWsite/js-events/events/";

//From startYear to current year, look for any files [monthnumber].json
for(var year = startYear; year <= (new Date).getUTCFullYear(); year++){ 
  for(var month = 4; month <= 4; month++){
    $.getJSON(events+year+'/'+month+'.json')
      .done(function(data){//On successful import populate the page
        populateEvents(data);
      })
      .fail(function(a, b, c){ //When fail contact me or link to github to submit pull request
        console.log(c);
      });
  }
}
function populateEvents(EventsJSON){
  for (var i=0; i < EventsJSON.length; i++){  //Loop through events in that month
    document.getElementsByClassName('events_container')[0].appendChild(newEvent(EventsJSON[i]));
  }
}
function newEvent(EventJSON){
  var event = document.createElement("div");
  event.setAttribute('class', 'event');

  var name = link(EventJSON['title_url'], EventJSON['name'], icons[EventJSON['link_type']]);
  name.setAttribute('class', 'name');
  event.appendChild(name);

  var date = document.createElement("h3");
  date.setAttribute('class', 'date');
  date.innerHTML= EventJSON['date']
  if(EventJSON['time']){date.innerHTML+= ' | ' + EventJSON['time']}; 
  if(EventJSON['location']){
    var location = EventJSON['location'];
    date.innerHTML+= ' | ';
    if(EventJSON['location_url']){
      date.appendChild(link(EventJSON['location_url'], location, mapLinkIcon));
    } else {
      date.innerHTML+=location;
    }
  }
  event.appendChild(date);

  var desc = document.createElement("h3");
  desc.setAttribute('class', 'desc');
  desc.innerHTML = EventJSON['desc'];
  if(EventJSON['rsvp']){
    desc.innerHTML+=  "<br/>"
    desc.appendChild(link(EventJSON['rsvp_link'], EventJSON['rsvp'], icons[0]));
  }
  event.appendChild(desc);

  return event;
}

link = function(url, text, icon){
  var anchor = document.createElement("a");
  anchor.innerHTML = text;
  if(url){
    anchor.setAttribute('href', url);
    anchor.setAttribute('target', '_blank');
  }
  anchor.innerHTML += icon;
  return anchor;
}

/*
<div class="event">
    <a class="name" href="http://www.cura.osu.edu/rsvptolle" target="_blank">
    Collaborative analytics: Meeting global challenges through shared research and development</a>
    <h3 class="date">April 19th | 4:00-5:00pm | 
    <a href="https://goo.gl/maps/bwsSxh9xKno" target="_blank">Wexner Center for the Arts <i class="fa fa-map-marker"></i></a></h3>
    <h3 class="desc">This talk will focus on research collaborations that cut across disciplinary, organizational, and geographical boundaries to generate research and development breakthroughs on global challenges such as healthcare and climate change. Pushing the state of the art can be facilitated through these partnerships--public/private and academic/industry--when each group bring their unique strengths and perspectives to bear on scientific problems.</br>
    <a href="http://www.cura.osu.edu/rsvptolle" target="_blank">RSVP</a></h3>
</div> */