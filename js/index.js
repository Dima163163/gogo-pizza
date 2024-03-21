const toppingsToggle = () => {
  const toppingsButton = document.querySelector('.toppings__button');
  const toppingsList = document.querySelector('.toppings__list');

  toppingsButton.addEventListener('click', () => {
    if (!toppingsList.classList.contains('toppings__list_show')) {
      toppingsList.classList.add('toppings__list_show');
      toppingsButton.classList.add('toppings__button_active');
      toppingsList.style.maxHeight = toppingsList.scrollHeight + 'px';
    } else {
      toppingsButton.classList.remove('toppings__button_active');
      toppingsList.style.maxHeight = null;
      setTimeout(() => {
        toppingsList.classList.remove('toppings__list_show');
      }, 300);
    }
  });
};

const getPizzas = async () => {
  try {
    const response = await fetch(
      `https://darkened-plant-hadrosaurus.glitch.me/api/products`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch pizza products');
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Error fetching pizza products: ${error}`);
  }
};

const getToppings = async () => {
  try {
    const response = await fetch(
      `https://darkened-plant-hadrosaurus.glitch.me/api/toppings`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch pizza products');
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Error fetching pizza products: ${error}`);
  }
};

const createCard = (data) => {
  const card = document.createElement('article');
  card.classList.add('card', 'pizza__card');

  card.innerHTML = `
  <picture>
  <source srcset="${data.images[1]}" type="image/webp">
    <img class="card__image" src="${data.images[0]}" alt="${data.name.ru}">
  </picture>

    <div class="card__content">
      <h3 class="card__title">${data.name['ru'][0].toUpperCase()}${data.name[
    'ru'
  ]
    .slice(1)
    .toLowerCase()}</h3>

      <p class="card__info">
        <span class="card__price">${data.price['25cm']}₽</span>
        <span>/</span>
        <span class="card__weight">25 см</span>
      </p>

      <button class="card__button" data-id='${data.id}'>Выбрать</button>
    </div>
  `;

  return card;
};

const renderToppings = async () => {
  const toppings = await getToppings();
  console.log('toppings: ', toppings);
  const toppingsList = document.querySelector('.toppings__list');

  toppingsList.textContent = '';

  const items = toppings.ru.map((name, i) => {
    console.log('data: ', name);
    const item = document.createElement('li');
    item.classList.add('toppings__item');

    const input = document.createElement('input');
    input.classList.add('toppings__checkbox');
    input.name = 'topping';
    input.type = 'checkbox';
    input.value = name;
    input.id = i + 1;

    const label = document.createElement('label');
    label.classList.add('toppings__label');
    label.for = i + 1;
    label.textContent = name[0].toUpperCase() + name.slice(1).toLowerCase();

    item.append(input, label);
    return item;
  });
  toppingsList.append(...items);
};

const renderPizzas = async () => {
  const pizzas = await getPizzas();
  const pizzaList = document.querySelector('.pizza__list');
  pizzaList.textContent = '';

  const items = pizzas.map((data) => {
    const item = document.createElement('li');
    item.classList.add('pizza__item');

    const card = createCard(data);
    item.append(card);

    return item;
  });

  pizzaList.append(...items);
};

const init = () => {
  toppingsToggle();

  renderPizzas();
  renderToppings();
};

init();
