const $ = window.$;
$(document).ready(function () {
  const amenities = {};
  $('.popover li input').click(function () {
    const dataID = $(this).attr('data-id');
    const dataName = $(this).attr('data-name');
    if ($(this).prop('checked') === true) {
      amenities[dataID] = dataName;
    } else {
      delete amenities[dataID];
    }
    const amenitiesN = Object.values(amenities);
    $('.amenities h4').text(amenitiesN.join(', '));
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
    if (data.status === 'OK') {
      $('#api_status').css('background-color', '');
      $('#api_status').addClass('available');
    }
  });
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: '{}',
    headers: { 'Content-Type': 'application/json' }
  }).done(function (data) {
    data.sort(compare);
    for (let i = 0; i < data.length; i++) {
      const place = data[i];

      // Creating title
      const divTitle = document.createElement('div');
      $(divTitle).addClass('title');
      $(divTitle).append('<h2>' + place.name + '</h2>');
      const divPrice = document.createElement('div');
      $(divPrice).append(place.price_by_night);
      $(divPrice).addClass('price_by_night');
      $(divTitle).append(divPrice);

      // Creating information
      const divInformation = document.createElement('div');
      $(divInformation).addClass('information');

      const divMaxGuest = document.createElement('div');
      $(divMaxGuest).addClass('max_guest');
      const iUser = document.createElement('i');
      $(iUser).addClass('fa fa-users fa-3x');
      $(divMaxGuest).append(iUser);
      const br1 = document.createElement('br');
      $(divMaxGuest).append(br1);
      $(divMaxGuest).append(place.max_guest + ' Guests');

      const divNumberRooms = document.createElement('div');
      $(divNumberRooms).addClass('number_rooms');
      const iBed = document.createElement('i');
      $(iBed).addClass('fa fa-bed fa-3x');
      $(divNumberRooms).append(iBed);
      const br2 = document.createElement('br');
      $(divNumberRooms).append(br2);
      $(divNumberRooms).append(place.number_rooms + ' Bedrooms');

      const divNumberBathrooms = document.createElement('div');
      $(divNumberBathrooms).addClass('number_bathrooms');
      const iBath = document.createElement('i');
      $(iBath).addClass('fa fa-bath fa-3x');
      $(divNumberBathrooms).append(iBath);
      const br3 = document.createElement('br');
      $(divNumberBathrooms).append(br3);
      $(divNumberBathrooms).append(place.number_bathrooms + ' Bathroom');

      $(divInformation).append(divMaxGuest);
      $(divInformation).append(divNumberRooms);
      $(divInformation).append(divNumberBathrooms);

      // Creating description
      const divDescription = document.createElement('div');
      $(divDescription).addClass('description');
      $(divDescription).append(place.description);

      const article = document.createElement('article');
      $(article).append(divTitle);
      $(article).append(divInformation);
      $(article).append(divDescription);

      $('.places').append(article);
    }
  });
});

function compare (a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}
