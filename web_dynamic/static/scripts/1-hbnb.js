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
});
