// onload document

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
});
