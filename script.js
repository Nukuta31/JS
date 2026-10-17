// Переключение вкладок
const tabs = document.querySelectorAll('.tab');
const pages = document.querySelectorAll('.page');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => item.classList.remove('active'));
    pages.forEach((page) => page.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(tab.dataset.page).classList.add('active');
  });
});

// Вывод введённого текста
document.getElementById('textForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const input = document.getElementById('userText');
  const result = document.getElementById('result');
  const line = document.createElement('p');

  line.textContent = input.value;
  result.prepend(line);
  input.value = '';
});

// Получение случайного цвета через API
document.getElementById('colorButton').addEventListener('click', async () => {
  const button = document.getElementById('colorButton');
  const box = document.getElementById('colorBox');
  const info = document.getElementById('colorInfo');
  const status = document.getElementById('apiStatus');

  button.disabled = true;
  status.textContent = 'Загрузка...';

  try {
    const random = Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
    const response = await fetch('https://www.thecolorapi.com/id?hex=' + random);
    if (!response.ok) throw new Error('Ошибка запроса');

    const data = await response.json();
    const color = '#' + data.hex.clean;

    box.style.backgroundColor = color;
    info.textContent = 'Цвет: ' + data.name.value + ' (' + color + ')';
    status.textContent = 'Цвет загружен через API.';
  } catch (error) {
    status.textContent = 'Не удалось получить цвет. Проверь интернет.';
  } finally {
    button.disabled = false;
  }
});
