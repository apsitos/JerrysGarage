
// const jquery = require('jquery')

$(document).ready(() => {
  closeGarage()
})

//click events
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

$('#sort').on('click', () => {

})

//garage actions
const closeGarage = () => {
  $('#garage-open').hide()
}

const openGarage = () => {
  $('#garage-open').show();
  $('#garage-closed').hide();
};

//API calls
const showJunk = () => {
  axios.get('/api/v1/junk')
  .then(response => {
    appendJunk(response)
    countItems(response)
    sortQuality(response)
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
    sortQuality(response)
  });
};

const sortJunk = () => {
  let names = []
  
}

//helper functions
const appendJunk = (response) => {
  $('.junk-item').empty();
  response.data.map((junk) => {
    $('.junk-item').append(
      `<li class="name">${junk.name}</li>
      <p>Why is it here? ${junk.reason}</p>
      <p>What is its condition? ${junk.cleanliness}</p>`
    )
  });
  clearFields()
};

const clearFields = () => {
  $('#name').val('');
  $('#reason').val('');
}

const countItems = (response) => {
  let total = response.data.length;
  $('.detail-container').empty();
  $('.detail-container').append(
    `<h2 class="count">Total Count: ${total}</h2>`
  );
};

const sortQuality = (response) => {
  const quality = response.data.map((quality) => {
    return quality.cleanliness;
  });
  const sorted = quality.reduce((type, kind) => {
    if (!type[kind]) {
      type[kind] = 1
    } else {
      ++type[kind]
    }
    return type
  }, {});
  $('.detail-container').append(
    `<p># of Sparkling Clean: ${sorted.Sparkling}</p>
    <p># of Dusty: ${sorted.Dusty}</p>
    <p># of Rancid: ${sorted.Rancid}</p>`
  );
};
//
// const sortAlpha = () => {
//
// }
