var events = "https://raw.githubusercontent.com/jmkuehn/ACMWsite/js-events/events/";
/*for(var year = 2015; year <= 2016; year++){
  for(var month = 1; month <= 12; month++){
    $.getJSON(events+year+'/'+month+'.json')
      .done(function(data){
        for (var event in events){
          console.log(newEvent(event));
        }
      })
      .fail(function(a, b, c){
        console.log(c);
      });
  }
}
*/
$.getJSON(events+'2016/4.json')
      .done(function(data){
        for (var event in events){
          console.log(newEvent(event));
        }
      })
      .fail(function(a, b, c){
        console.log(c);
      });
function errorMessage(){
  console.log('fuck');
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
    var location = EventJSON['location_url'] ? 
    link(EventJSON['location_url'], EventJSON['location'], mapLinkIcon):
    EventJSON['location'];
    date.innerHTML+= ' | ' + location;
  }
  event.appendChild(date);

  var desc = document.createElement("h3");
  desc.setAttribute('class', 'desc');
  desc.innerHTML = EventJSON['desc'];
  event.appendChild(desc);

  var RSVP = link(EventJSON['rsvp_url'], EventJSON['rsvp']);
  event.appendChild(RSVP);
}

link = function(text){
  var anchor = document.createElement("a");
  anchor.innerHTML = text;
  return anchor;
}
link = function(url, text){
  var anchor = link(text);
  anchor.setAttribute('href', url);
  anchor.setAttribute('target', '_blank');
  return anchor;
}
link = function(url, text, icon){
  var anchor = link(url, text);
  anchor.innerHTML += icon;
  return anchor;
}
var icons = ["", extLinkIcon, fbLinkIcon];
var fbLinkIcon = "<i class='fa fa-facebook-square'></i>";
var extLinkIcon= "<i class='fa fa-external-link'></i>";
var mapLinkIcon= "<i class='fa fa-map-marker'></i>";
/*
<div class="event">
    <a class="name" href="http://www.cura.osu.edu/rsvptolle" target="_blank">
    Collaborative analytics: Meeting global challenges through shared research and development</a>
    <h3 class="date">April 19th | 4:00-5:00pm | 
    <a href="https://goo.gl/maps/bwsSxh9xKno" target="_blank">Wexner Center for the Arts <i class="fa fa-map-marker"></i></a></h3>
    <h3 class="desc">This talk will focus on research collaborations that cut across disciplinary, organizational, and geographical boundaries to generate research and development breakthroughs on global challenges such as healthcare and climate change. Pushing the state of the art can be facilitated through these partnerships--public/private and academic/industry--when each group bring their unique strengths and perspectives to bear on scientific problems.</br>
    <a href="http://www.cura.osu.edu/rsvptolle" target="_blank">RSVP</a></h3>
</div> */