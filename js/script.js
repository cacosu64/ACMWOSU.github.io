var events = "https://raw.githubusercontent.com/jmkuehn/ACMWsite/js-events/events/2016.json";
$.getJSON(events)
  .done(function( data ) {
    console.log(data);
    })
  .fail( function( ) {
    console.log("fuck");
    });