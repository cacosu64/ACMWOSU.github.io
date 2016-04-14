var icons = ["",
  " <i class='fa fa-external-link'></i>",
  " <i class='fa fa-facebook-square'></i>"];
var mapLinkIcon= " <i class='fa fa-map-marker'></i>";

var eventsURL = "https://raw.githubusercontent.com/jmkuehn/ACMWsite/js/events.json";


$.getJSON(eventsURL)
  .done(function(data){//On successful import populate the page
    populateEvents(data);
  })
  .fail(function(a, b, c){ //When fail contact me or link to github to submit pull request
  });
      
function populateEvents(EventsJSON){
  for (var i=0; i < EventsJSON.length; i++){  //Loop through events
    var eventElement = newEvent(EventsJSON[i])
    var eventDate = new Date(EventsJSON[i]['date']);
    var today = new Date();
    var upcoming = document.getElementById('upcoming');
    var past = document.getElementById('past');
    if(eventDate.getTime() > today.getTime()){
      upcoming.insertBefore(eventElement, upcoming.firstChild);
    } else {
      past.appendChild(eventElement);
    }
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
  date.innerHTML= EventJSON['date_string'];
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

  if(EventJSON['desc']){
    var desc = document.createElement("h3");
    desc.setAttribute('class', 'desc');
    desc.innerHTML = EventJSON['desc'];
    if(EventJSON['rsvp']){
      desc.innerHTML+=  "<br/>"
      desc.appendChild(link(EventJSON['rsvp_link'], EventJSON['rsvp'], icons[0]));
    }
    event.appendChild(desc);
  }

  return event;
}

link = function(url, text, icon){
  var anchor = document.createElement("a");
  anchor.innerHTML = text;
  if(url){
    anchor.setAttribute('href', url);
    anchor.setAttribute('target', '_blank');
  }
  if(icon)anchor.innerHTML += icon;
  return anchor;
}