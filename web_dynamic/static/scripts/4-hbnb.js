/*
   Insert places
   Make the loop and insert html
*/
function insertPlaces (place) {
  for (let i = 0; i < place.length; i++) {
    let guest = '';
    if (place[i].max_guest !== 1) guest = 's';

    let bedroom = '';
    if (place[i].number_rooms !== 1) bedroom = 's';

    let bathroom = '';
    if (place[i].number_rooms !== 1) bathroom = 's';

    const sectionHtml = '<article>' +
        '<div class="title_box">' +
        '<h2>' + place[i].name + '</h2>' +
        '<div class="price_by_night">' +
        place[i].price_by_night +
        '</div>' +
        '</div>' +
        '<div class="information">' +
        '<div class="max_guest">' + place[i].max_guest + ' Guest' + guest +
        '</div>' +
        '<div class="number_rooms">' + place[i].number_rooms +
        ' Bedroom' + bedroom + '</div>' +
        '<div class="number_bathrooms">' + place[i].number_bathrooms +
        ' Bathroom' + bathroom + '</div>' +
        '</div>' +
        '<div class="user"></div>' +
        '<div class="description">' + place[i].description + '</div>' +
        '</acticle>';

    $('section.places').append(sectionHtml);
  }
}

/*
 Onload document
 Load after DOM
*/

$(document).ready(() => {
  // reset checkboxes
  if ($('input[type="checkbox"]:checked').length > 0) {
    $('input[type="checkbox"]:checked').prop('checked', false);
  }

  // this is the check. Append amenity to object "check"
  const check = {};
  $(document).on('change', 'input[type="checkbox"]', function () {
    if (!this.checked) delete check[$(this).data('id')];
    else check[$(this).data('id')] = $(this).data('name');

    const obj = Object.values(check);
    if (obj < 0) $('div.amenities > h4');
    $('div.amenities > h4').text(Object.values(check).join(', '));
  });

  // request to check status
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
    if (data.status === 'OK') {
      $('div#api_status').toggleClass('not-available available');
    }
  })
    .fail(function () {
      /* doesn't works with toggle, when load at first time,
         and port 5001 is down */
      $('div#api_status').removeClass('available');
      $('div#api_status').addClass('not-available');
    });

  // get places and insert in html
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    dataType: 'json',
    type: 'post',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (data, textStatus, jQxhr) {
      insertPlaces(data); // make the loop and insert html
    },
    error: function (jqXhr, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });

  // when the button is pressed
  $('.filters > button').click(() => {
    $('.places > article').remove();
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:5001/api/v1/places_search',
      data: JSON.stringify({ amenities: Object.keys(check) }),
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        insertPlaces(data); // make the loop and insert html
      }
    });
  }); // end when the button is pressed
});
