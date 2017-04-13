
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
})

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
    response.data.map((junk) => {
      console.log(junk);
      $('.junk-item').append(
        `<li class="name">${junk.name}</li>
        <p>Why is it here? ${junk.reason}</p>
        <p>What is its condition? ${junk.cleanliness}</p>`
      )
    })
  })
}
