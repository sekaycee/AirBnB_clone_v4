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
});
