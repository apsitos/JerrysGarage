
$(document).ready(() => {
  closeGarage()
})

//opens the garage door and retrieves all items
$('#open-btn').on('click', () => {
  openGarage();
  showJunk();
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
    response.data.map((junk) => {
      console.log(junk);
      $('.junk-item').append(
        `<p class="name">${junk.name}</p>`
      )
    })
  })
}
