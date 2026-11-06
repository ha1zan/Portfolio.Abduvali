// 1. Тема
function initTheme() {
  const btn = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const dark = localStorage.getItem('theme') === 'dark';
  const apply = d => {
    root.dataset.theme = d ? 'dark' : 'light';
    btn.textContent = d ? '☀️' : '🌙';
  };
  apply(dark);
  btn.onclick = () => {
    const d = root.dataset.theme !== 'dark';
    apply(d);
    localStorage.setItem('theme', d ? 'dark' : 'light');
  };
}

// 2. Мобильное меню
function initMobileMenu() {
  const menu = document.getElementById('menu');
  document.getElementById('burger').onclick = () => menu.classList.toggle('open');
  menu.onclick = () => menu.classList.remove('open');
}

// 3. Фильтр и поиск проектов
function initProjectFilter() {
  const chips = document.querySelectorAll('.chip');
  const items = document.querySelectorAll('.project');
  const search = document.getElementById('search');
  const empty = document.getElementById('empty');
  let category = 'all';

  function update() {
    const q = search.value.trim().toLowerCase();
    let shown = 0;
    items.forEach(i => {
      i.hidden = !((category === 'all' || i.dataset.category === category) && i.dataset.title.includes(q));
      if (!i.hidden) shown++;
    });
    empty.hidden = shown > 0;
  }

  chips.forEach(chip => chip.onclick = () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    category = chip.dataset.filter;
    update();
  });
  search.oninput = update;
}

// 4. Проверка формы
function initContactForm() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');

  function check(id, ok, text) {
    document.getElementById(id).classList.toggle('invalid', !ok);
    document.getElementById(id + '-error').textContent = ok ? '' : text;
    return ok;
  }

  form.onsubmit = e => {
    e.preventDefault();
    const val = id => document.getElementById(id).value.trim();
    const name = val('name');
    const results = [
      check('name', name.length >= 2, 'Enter at least 2 characters.'),
      check('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val('email')), 'Enter a valid email.'),
      check('message', val('message').length >= 10, 'Write at least 10 characters.')
    ];
    success.hidden = true;
    if (results.includes(false)) return form.querySelector('.invalid').focus();
    success.textContent = 'Thanks, ' + name + '! Your message is ready to send.';
    success.hidden = false;
    form.reset();
  };
}

initTheme();
initMobileMenu();
initProjectFilter();
initContactForm();
