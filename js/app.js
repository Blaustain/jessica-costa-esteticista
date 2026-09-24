/* Jéssica Costa — Landing Page
   Troque WHATSAPP_NUMBER pelo número comercial real, no formato 55 + DDD + número.
*/
const WHATSAPP_NUMBER = '5519997523602';

const services = [
  { name: 'Massagem relaxante', price: 80, icon: 'bi-person-arms-up', desc: 'Momento de relaxamento e cuidado corporal.' },
  { name: 'Massagem com ventosa', price: 90, icon: 'bi-circle-half', desc: 'Técnica corporal para um protocolo personalizado.' },
  { name: 'Massagem com pedras', price: 80, icon: 'bi-gem', desc: 'Experiência de relaxamento com pedras aquecidas.' },
  { name: 'Limpeza de pele', price: 130, icon: 'bi-stars', desc: 'Higienização e cuidado facial personalizado.' },
  { name: 'Drenagem linfática', price: 90, icon: 'bi-heart-pulse', desc: 'Protocolo corporal realizado com movimentos específicos.' },
  { name: 'Limpeza de pele + peeling de diamante', price: 150, icon: 'bi-diamond', desc: 'Limpeza associada à esfoliação mecânica facial.' },
  { name: 'Limpeza de pele + dermaplaning', price: 160, icon: 'bi-brush', desc: 'Cuidado facial com protocolo combinado.' },
  { name: 'Modeladora', price: 100, icon: 'bi-person-standing', desc: 'Massagem corporal com foco em modelagem.' }
];

const testimonials = [
  { name: 'Mariana S.', text: 'O ambiente é muito acolhedor e o atendimento foi extremamente cuidadoso. Saí me sentindo renovada!' },
  { name: 'Camila R.', text: 'Gostei muito da atenção aos detalhes. O espaço é lindo e a experiência foi muito tranquila do começo ao fim.'},
  { name: 'Fernanda A.', text: 'A experiência foi leve e agradável. Adorei poder conversar sobre o protocolo antes do atendimento.'}
];

const products = [
  ['Gel de limpeza facial', 'Higiene facial', '500 ml', 2, 'Em estoque'],
  ['Água micelar', 'Higiene facial', '500 ml', 2, 'Em estoque'],
  ['Esfoliante facial', 'Esfoliação', '300 g', 2, 'Em estoque'],
  ['Máscara facial calmante', 'Máscaras', '500 g', 2, 'Em estoque'],
  ['Protetor solar facial FPS 50', 'Fotoproteção', '120 g', 3, 'Em estoque'],
  ['Óleo vegetal para massagem', 'Massagem', '1 L', 2, 'Estoque baixo'],
  ['Creme corporal modelador', 'Corporal', '1 kg', 2, 'Em estoque'],
  ['Gel para drenagem', 'Corporal', '1 kg', 2, 'Em estoque'],
  ['Luva nitrílica descartável', 'Descartáveis', 'Caixa 100 un.', 3, 'Em estoque'],
  ['Touca descartável', 'Descartáveis', 'Pacote 100 un.', 2, 'Em estoque'],
  ['Algodão hidrófilo', 'Descartáveis', '500 g', 2, 'Estoque baixo'],
  ['Álcool 70%', 'Higienização', '1 L', 3, 'Em estoque']
];

const money = value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function renderServices() {
  const grid = document.querySelector('#priceGrid');
  grid.innerHTML = services.map(service => `
    <div class="col-sm-6 col-xl-3">
      <article class="service-card">
        <div class="service-icon"><i class="bi ${service.icon}"></i></div>
        <h3>${service.name}</h3>
        <p>${service.desc}</p>
        <div class="service-price"><span>Valor de referência</span><strong>${money(service.price)}</strong></div>
      </article>
    </div>`).join('');
}

function renderTestimonials() {
  const grid = document.querySelector('#testimonialGrid');
  grid.innerHTML = testimonials.map(item => `
    <div class="col-md-4">
      <article class="testimonial">
        <div class="stars" aria-label="5 estrelas">★★★★★</div>
        <p class="mt-3 mb-0">“${item.text}”</p>
        <footer><span class="avatar">${item.name.charAt(0)}</span><div><strong>${item.name}</strong><small>${item.role}</small></div></footer>
      </article>
    </div>`).join('');
}

function renderProducts() {
  const tbody = document.querySelector('#productTable');
  tbody.innerHTML = products.map(([name, category, unit, min, status]) => `
    <tr><td><strong>${name}</strong></td><td>${category}</td><td>${unit}</td><td>${min}</td><td><span class="badge-stock ${status === 'Estoque baixo' ? 'badge-low' : ''}">${status}</span></td></tr>`).join('');
}

function setMinDate() {
  const date = document.querySelector('#data');
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const local = new Date(today.getTime() - offset * 60 * 1000).toISOString().split('T')[0];
  date.min = local;
}

function setupBooking() {
  const form = document.querySelector('#bookingForm');
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    const data = new FormData(form);
    const nome = data.get('nome').trim();
    const dataAtendimento = data.get('data');
    const horario = data.get('horario');
    const servico = data.get('servico').trim() || 'Ainda não definido';
    const dataFormatada = new Date(`${dataAtendimento}T12:00:00`).toLocaleDateString('pt-BR');
    const message = [
      'Olá, Jéssica! Gostaria de solicitar um atendimento.',
      '',
      `*Nome:* ${nome}`,
      `*Data:* ${dataFormatada}`,
      `*Horário:* ${horario}`,
      `*Serviço:* ${servico}`,
      '',
      'Aguardo a confirmação do horário. Obrigada!'
    ].join('\n');
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

function setupNav() {
  const nav = document.querySelector('#mainNav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  document.querySelectorAll('.navbar .nav-link, .navbar .btn').forEach(link => {
    link.addEventListener('click', () => {
      const collapse = document.querySelector('#menu');
      if (collapse.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(collapse).hide();
    });
  });
}

function setupReveal() {
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  items.forEach(item => observer.observe(item));
}

function setupYear() { document.querySelector('#year').textContent = new Date().getFullYear(); }

renderServices();
renderTestimonials();
renderProducts();
setMinDate();
setupBooking();
setupNav();
setupReveal();
setupYear();
