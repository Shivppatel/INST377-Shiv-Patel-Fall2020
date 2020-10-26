// You may wish to find an effective randomizer function on MDN.

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function getRandomIntInclusive(min, max) {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
  // The maximum is inclusive and the minimum is inclusive
}

function sortByKey(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  }
  if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      if (document.querySelector('.flex-inner')) {
        document.querySelector('.flex-inner').remove();
      }
      const newArr = range(10);
      const tempArr = newArr.map(() => {
        const number = getRandomIntInclusive(0, 243);
        return fromServer[number];
      });
      const uniqueCountries = [];
      tempArr.forEach((c) => {
        if (!uniqueCountries.includes(c)) {
          uniqueCountries.push(c);
        }
      });
      while (uniqueCountries.length < 10) {
        const randomCountry = fromServer[getRandomIntInclusive(0, 243)];
        if (!uniqueCountries.includes(randomCountry)) {
          uniqueCountries.push(randomCountry);
        }
      }
      const newArr2 = uniqueCountries;
      const reversList = newArr2.sort((a, b) => sortByKey(b, a, 'name'));
      const ul = document.createElement('ul');
      ul.className = 'flex-inner';
      $('form').prepend(ul);
      reversList.forEach((el, i) => {
        const li = document.createElement('li');
        $(li).append(`<input type="checkbox" value=${el.code} id=${el.code}/>`);
        $(li).append(`<label for=${el.code}>${el.name}</label>`);
        $(ul).append(li);
      });
    })
    .catch((err) => console.log(err));
});
