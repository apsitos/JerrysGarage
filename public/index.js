
$(document).ready(() => {
  closeGarage()
})

//opens the garage door and retrieves all items
$('#open-btn').on('click', () => {
  openGarage();
  showJunk();
});

$('#close-btn').on('click', () => {
  closeGarage()
  $('.junk-item').empty();
  $('#garage-closed').show();
});

$('#more-junk').submit((e) => {
  e.preventDefault();
  addJunk()
});

const closeGarage = () => {
  $('#garage-open').hide()
}

const openGarage = () => {
  $('#garage-open').show();
  $('#garage-closed').hide();
};

const showJunk = () => {
  axios.get('/api/v1/junk')
  .then((response) => {
    appendJunk(response)
    countItems(response)
  });
};

const addJunk = () => {
  axios.post('/api/v1/junk', {
    name: $('#name').val(),
    reason: $('#reason').val(),
    cleanliness: $('#quality').val()
  })
  .then(response => {
    appendJunk(response)
    countItems(response)
  });
};

const appendJunk = (response) => {
  $('.junk-item').empty();
  response.data.map((junk) => {
    $('.junk-item').append(
      `<li class="name">${junk.name}</li>
      <p>Why is it here? ${junk.reason}</p>
      <p>What is its condition? ${junk.cleanliness}</p>`
    )
  });
};

const countItems = (response) => {
  let total = response.data.length;
  $('.detail-container').append(
    `<h2 class="count">Total Count: ${total}</h2>`
  );
};
