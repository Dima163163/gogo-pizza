import {getData} from './getData.js';
import {changeFirstUpperCase} from './helpers.js';
import {renderPizzas} from './renderPizzas.js';

export const renderToppings = async () => {
  const {en: enToppings, ru: ruToppings} = await getData(
    `https://go-go-pizza-api.onrender.com/api/toppings`
  );
  const toppingsList = document.querySelector('.toppings__list');

  toppingsList.textContent = '';

  const items = enToppings.map((name, i) => {
    const item = document.createElement('li');
    item.classList.add('toppings__item');

    const input = document.createElement('input');
    input.classList.add('toppings__checkbox');
    input.name = 'topping';
    input.type = 'checkbox';
    input.value = name;
    input.id = name;

    const label = document.createElement('label');
    label.classList.add('toppings__label');
    label.setAttribute('for', name);
    label.textContent = `${changeFirstUpperCase(ruToppings[i])}`;

    item.append(input, label);
    return item;
  });

  const itemReset = document.createElement('li');
  itemReset.classList.add('toppings__item');

  const buttonReset = document.createElement('button');
  buttonReset.classList.add('toppings__reset');

  buttonReset.textContent = 'Сбросить';
  buttonReset.type = 'reset';

  itemReset.append(buttonReset);

  toppingsList.append(...items);

  const toppingsForm = document.querySelector('.toppings__form');

  toppingsForm.addEventListener('change', (event) => {
    const formData = new FormData(toppingsForm);
    const checkedToppings = [];

    for (const [, value] of formData.entries()) {
      checkedToppings.push(value);
    }

    renderPizzas(checkedToppings);
    if (checkedToppings.length) {
      toppingsList.append(itemReset);
    } else {
      itemReset.remove();
    }
  });

  buttonReset.addEventListener('click', () => {
    itemReset.remove();
    toppingsForm.reset();
    renderPizzas();
  });
};

// `https://darkened-plant-hadrosaurus.glitch.me/api/toppings`
