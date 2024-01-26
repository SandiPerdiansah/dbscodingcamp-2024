const menu = document.querySelector('#menu');
const navbarLink = document.querySelector('.navbar-link');
menu.addEventListener('click', (e) => {
  navbarLink.classList.toggle('show');
  e.preventDefault();
});

document.addEventListener('click', (e) => {
  if (!navbarLink.contains(e.target) && !menu.contains(e.target)) {
    navbarLink.classList.remove('show');
  }
});

const singglePost = [
  {
    image: 'service-img1-1.jpg',
    title: 'Dessert',
    description: 'This is the best Dessert in the world, especially in West Java',
    background: 'background-color: #fff',
    color: {
      background: 'background-color: #fff',
      header: 'color: #3d170c',
      text: 'color: #737171',
    },
  },
  {
    image: 'service-img2-1.png',
    title: 'Cofee',
    description: 'This is the best coffee in the world, especially in West Java',
    background: 'background-color: #7b3826',
    color: {
      background: 'background-color: #7b3826',
      header: 'color: #fff',
      text: 'color: #fff',
    },
  },
  {
    image: 'service-img3-1.jpg',
    title: 'Pastry',
    description: 'This is the best Pastry in the world, especially in West Java',
    color: {
      background: 'background-color: #fff',
      header: 'color: #3d170c',
      text: 'color: #737171',
    },
  },
];

singglePost.forEach((post) => {
  const itemPost = itemSingglePost(post);
  document.querySelector('.singgle-post').innerHTML += itemPost;
});

function itemSingglePost(data) {
  return /*html*/ ` <div class="card" style="${data.color.background};">
    <div class="card-image">
      <img src="assets/${data.image}" alt="${data.title}" />
    </div>
    <div class="card-title">
      <h2 style="${data.color.header};">${data.title}</h2>
    </div>
    <div class="card-description">
      <p style="${data.color.text};">${data.description}</p>
    </div>
  </div>`;
}

const menuItem = [
  {
    image: 'assets/menu1.png',
    title: 'AMERICANO',
    price: 4,
    description: 'made with the best coffee grounds from various regions around the world',
  },
  {
    image: 'assets/menu2.jpg',
    title: 'COFEE ACEH',
    price: 4,
    description: 'made with the best coffee grounds from various regions around the world',
  },
  {
    image: 'assets/menu1.png',
    title: 'COFEE AREN',
    price: 4,
    description: 'made with the best coffee grounds from various regions around the world',
  },
  {
    image: 'assets/menu1.png',
    title: 'WEDANG JAHE KOPI',
    price: 4,
    description: 'made with the best coffee grounds from various regions around the world',
  },
  {
    image: 'assets/menu1.png',
    title: 'COFEE GAYO ACEH',
    price: 4,
    description: 'made with the best coffee grounds from various regions around the world',
  },
  {
    image: 'assets/menu2.jpg',
    title: 'COFEE SUMATRA',
    price: 4,
    description: 'made with the best coffee grounds from various regions around the world',
  },
];

menuItem.forEach((menu) => {
  const containerMenu = document.querySelector('.menu div.container');
  const item = itemMenu(menu);
  containerMenu.innerHTML += item;
});

function itemMenu(menu) {
  return /*html*/ `<div class="menu-item">
  <div class="menu-image">
    <img src="${menu.image}" alt="${menu.title}" />
  </div>
  <div class="menu-title">${menu.title}</div>
  <div class="menu-price">$${menu.price}.00</div>
  <div class="menu-description">
    <p>${menu.description}</p>
  </div>
  <button>Add To Cart</button>
</div>`;
}
