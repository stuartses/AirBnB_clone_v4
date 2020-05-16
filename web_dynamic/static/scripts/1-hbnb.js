$(document).ready(() => {
  if ($('input[type="checkbox"]:checked').length > 0) {
    $('input[type="checkbox"]:checked').prop('checked', false);
  }
  // this is the check
  const check = {};
  $(document).on('change', 'input[type="checkbox"]', function () {
    if (!this.checked) delete check[$(this).data('id')];
    else check[$(this).data('id')] = $(this).data('name');

    const obj = Object.values(check);
    if (obj < 0) $('div.amenities > h4');
    $('div.amenities > h4').text(Object.values(check).join(', '));
  });
});
