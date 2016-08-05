$(() => {

  $('table').on('click', '.delete', deleteCat);

});

function deleteCat() {
  console.log('delete');

  let catId = $(this).closest('tr').data('id');

  $.ajax(`/cats/${catId}`, {
    method: 'DELETE'
  })
  .done(() => {
    console.log('delete success!');

    // $(this).closest('tr').remove()
    renderList();

    // update the DOM
  })
  .fail(err => {
    console.log('err:', err);
  });
}


function renderList() {
  $.get('/cats')
    .done(cats => {

      let $trs = cats.map(cat => {
        let $tr = $('#template').clone();
        $tr.removeAttr('id');
        $tr.find('.name').text(cat.name);
        $tr.find('.type').text(cat.type);
        $tr.find('.color').text(cat.color);
        $tr.data('id', cat.id);
        return $tr;
      })

      $('#catList').empty().append($trs);

    });
}





