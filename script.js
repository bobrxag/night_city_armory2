/* ===== Тема: светлая / тёмная (на всех страницах) ===== */
const themeButton = document.querySelector('#theme');

function applyTheme(isLight) {
  document.body.classList.toggle('light-theme', isLight);
  document.documentElement.setAttribute('data-bs-theme', isLight ? 'light' : 'dark');
  if (themeButton) {
    themeButton.textContent = isLight ? 'Тёмная тема' : 'Светлая тема';
  }
}

let savedLight = false;
try { savedLight = localStorage.getItem('theme') === 'light'; } catch (e) {}
applyTheme(savedLight);

if (themeButton) {
  themeButton.addEventListener('click', () => {
    const isLight = !document.body.classList.contains('light-theme');
    applyTheme(isLight);
    try { localStorage.setItem('theme', isLight ? 'light' : 'dark'); } catch (e) {}
  });
}

/* ===== Страница «О проекте»: кнопка «Подробнее» ===== */
const showMore = document.querySelector('#showMore');
const moreText = document.querySelector('#moreText');

if (showMore && moreText) {
  showMore.addEventListener('click', () => {
    moreText.classList.toggle('d-none');
    showMore.textContent = moreText.classList.contains('d-none') ? 'Подробнее' : 'Скрыть';
  });
}

/* ===== Страница «Магазин»: товары из данных + окно заказа ===== */
const products = [
  { title: 'Vex-9 «Стрекоза»',   text: 'Пистолет. Лёгкий и надёжный, с умным прицелом.',        price: '2 500' },
  { title: 'Каскад-12',          text: 'Дробовик для ближнего боя в тесных коридорах.',         price: '4 200' },
  { title: 'Лезвие «Сайлент»',   text: 'Выдвижные клинки для тихой работы.',                    price: '3 000' },
  { title: 'Призрак ST-7',       text: 'Снайперская винтовка с самонаводящимися пулями.',       price: '9 800' },
  { title: 'Шторм М-40',         text: 'Скорострельный штурмовой автомат.',                     price: '6 500' },
  { title: 'Нейрошок «Импульс»', text: 'Нелетальное оружие, выводит противника из строя.',      price: '1 800' }
];

const productsBox = document.querySelector('#products');
const orderModal = document.querySelector('#orderModal');

if (productsBox) {
  productsBox.innerHTML = products.map((product, index) => `
    <article class="item">
      <h3>${product.title}</h3>
      <p>${product.text}</p>
      <p class="price">${product.price} €$</p>
      <button class="button" type="button" data-index="${index}">Заказать</button>
    </article>
  `).join('');
}

if (productsBox && orderModal) {
  productsBox.addEventListener('click', (event) => {
    const orderButton = event.target.closest('button[data-index]');
    if (!orderButton) return;

    const product = products[orderButton.dataset.index];
    document.querySelector('#orderModalTitle').textContent = 'Заказ: ' + product.title;
    document.querySelector('#orderModalBody').textContent =
      'Вы выбрали «' + product.title + '» за ' + product.price + ' €$. ' +
      'Это учебный сайт, поэтому заказ не оформляется.';

    bootstrap.Modal.getOrCreateInstance(orderModal).show();
  });
}

/* ===== Страница «Обратная связь»: проверка формы ===== */
const contactForm = document.querySelector('#contactForm');
const formMessage = document.querySelector('#formMessage');

if (contactForm && formMessage) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); // страница не перезагружается

    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const message = document.querySelector('#message').value.trim();

    if (!name || !email.includes('@') || !email.includes('.') || !message) {
      formMessage.textContent = 'Заполните все поля и проверьте email.';
      formMessage.className = 'text-danger';
      return;
    }

    formMessage.textContent = 'Спасибо, ' + name + '! Сообщение принято (учебный сайт, письмо не отправляется).';
    formMessage.className = 'text-success';
    contactForm.reset();
  });
}
