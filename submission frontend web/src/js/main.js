const fileBackdrop = document.querySelector('.file-backdrop');
document.querySelector('#edit').addEventListener('click', () => {
  fileBackdrop.classList.toggle('show');
});

document.querySelector('#cancel-profile').addEventListener('click', () => {
  fileBackdrop.classList.remove('show');
});

document.querySelector('.image-profile').addEventListener('change', function () {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    localStorage.setItem('image', reader.result);
    imageSrc(localStorage.getItem('image'));
  });
  reader.readAsDataURL(this.files[0]);
});

function imageSrc(data) {
  const imageUser = document.querySelectorAll('#image-user');
  imageUser.forEach((profile) => {
    profile.src = data;
  });
}

function UpdateProfile(name, status) {
  return {
    name,
    status,
  };
}

function saveDataProfile(name, status) {
  const file = new UpdateProfile(name, status);
  localStorage.setItem('profile', JSON.stringify(file));
}

const dataProfile = () => JSON.parse(localStorage.getItem('profile'));

function getDataProfile({ name, status }) {
  const nameUser = document.querySelector('#name-user');
  const statusUser = document.querySelector('#status-user');
  nameUser.innerHTML = name;
  statusUser.innerHTML = status;
}

document.querySelector('#save-profile').addEventListener('click', () => {
  const name = document.querySelector('#name').value;
  const status = document.querySelector('#status').value;

  if (name !== '' && status !== '') {
    saveDataProfile(name, status);
    const data = dataProfile();
    getDataProfile(data);
    fileBackdrop.classList.remove('show');
  } else {
    alert('Mohon Isi Dengan Lengkap');
    localStorage.removeItem('profile');
  }
});

const bookBackdrop = document.querySelector('.book-backdrop');
document.querySelector('#add-book').addEventListener('click', () => {
  bookBackdrop.classList.toggle('show');
});

document.querySelector('#cancel-book').addEventListener('click', () => {
  bookBackdrop.classList.remove('show');
});

// ================================================================================================== //
let arrBookRead = [];
let arrBookNotRead = [];
const keyBookRead = 'sudah dibaca';
const keyBookNotRead = 'belum dibaca';

let arrCountNumber = [];
let count = 0;
let comb, step;

class BookShelf {
  constructor(id, title, author, year, isComplete) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = year;
    this.isComplete = isComplete;
  }

  saveDataBook(arrBook, key, objects) {
    arrBook.push(objects);
    localStorage.setItem(key, JSON.stringify(arrBook));
  }

  getDataBook(key) {
    return JSON.parse(localStorage.getItem(key));
  }
}

document.querySelector('#save-book').addEventListener('click', () => {
  const id = +new Date();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const year = document.querySelector('#year').value;
  const shelf = document.querySelector('#rak').value;

  let step, isComplete;

  if (title !== '' && author !== '' && year !== '') {
    if (shelf === 'sudah dibaca') {
      isComplete = true;
      const bookShelfRead = new BookShelf(id, title, author, parseInt(year), isComplete);
      bookComponents(bookShelfRead, arrBookRead, keyBookRead, '.bookRead', step);
    } else {
      isComplete = false;
      const bookShelfNotRead = new BookShelf(id, title, author, parseInt(year), isComplete);
      bookComponents(bookShelfNotRead, arrBookNotRead, keyBookNotRead, '.bookNotRead', step);
    }
    bookBackdrop.classList.remove('show');
    createCount(count);
  } else {
    alert('mohon isi data dengan lengakap');
  }
});

function bookComponents(objects, arr, key, container, step) {
  objects.saveDataBook(arr, key, objects);
  const containerBook = document.querySelector(container);
  objects.getDataBook(key).forEach((book) => (step = book));
  createBook(step, containerBook);
}

function createBook(items, container) {
  const item = itemBook(items);
  container.innerHTML += item;
}

function counterNumber(count, arr) {
  arr.push(count);
  localStorage.setItem('count', JSON.stringify(arr));
  document.querySelector('#total').innerHTML = count;
}

function createCount(count) {
  const dataCounter = JSON.parse(localStorage.getItem('count'));
  if (dataCounter !== null) {
    count = dataCounter.length;
    count++;
    counterNumber(count, arrCountNumber);
  } else {
    count++;
    counterNumber(count, arrCountNumber);
  }
}

function itemBook(data) {
  return /*html*/ ` <div class="book-item shadow-sm w-100 p-4 d-flex align-items-center justify-content-between rounded-3" id=${data.id}>
  <div>
    <h5 class="fw-bold">${data.title}</h5>
    <p class="text-secondary">${data.author}</p>
    <p style="margin-top: -0.5rem">${data.year}</p>
  </div>
  <div>
    <button class="btn btn-secondary fs-4 " id="move"><i class="bx bx-chevron-right"></i></button>
    <button class="btn btn-primary fs-4 " id="delete"><i class="bx bx-trash"></i></button>
  </div>
</div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const profile = dataProfile();
  const image = localStorage.getItem('image');
  if (profile !== null && image !== null) {
    getDataProfile(profile);
    imageSrc(image);
  }

  const dataBookRead = JSON.parse(localStorage.getItem(keyBookRead));
  if (dataBookRead !== null) {
    const containerBookRead = document.querySelector('.bookRead');
    dataBookRead.forEach((book) => {
      arrBookRead.push(book);
      createBook(book, containerBookRead);
    });
  }

  const dataBookNotRead = JSON.parse(localStorage.getItem(keyBookNotRead));
  if (dataBookNotRead !== null) {
    const containerBookNotRead = document.querySelector('.bookNotRead');
    dataBookNotRead.forEach((book) => {
      arrBookNotRead.push(book);
      createBook(book, containerBookNotRead);
    });
  }

  const counter = JSON.parse(localStorage.getItem('count'));
  if (counter !== null) {
    counter.forEach((num) => arrCountNumber.push(num));
    document.querySelector('#total').innerHTML = counter.length;
  } else {
    document.querySelector('#total').innerHTML = 0;
  }
});

const parentBookRead = document.querySelector('.bookRead');
const parentBookNotRead = document.querySelector('.bookNotRead');

document.addEventListener('click', function (e) {
  document.querySelectorAll('#move').forEach((btn) => {
    if (e.target === btn.querySelector('i') || e.target === btn) {
      if (btn.parentElement.parentElement.parentElement === parentBookRead) {
        comb = arrBookRead.find((book) => book.id === parseInt(btn.parentElement.parentElement.getAttribute('id')));
        parentBookNotRead.innerHTML += itemBook(comb);
        arrBookNotRead.push(comb);
        localStorage.setItem(keyBookNotRead, JSON.stringify(arrBookNotRead));
        arrBookRead = arrBookRead.filter((book) => book.id !== comb.id);
        localStorage.setItem(keyBookRead, JSON.stringify(arrBookRead));
        parentBookRead.removeChild(btn.parentElement.parentElement);
      }

      if (btn.parentElement.parentElement.parentElement === parentBookNotRead) {
        comb = arrBookNotRead.find((book) => book.id === parseInt(btn.parentElement.parentElement.getAttribute('id')));
        parentBookRead.innerHTML += itemBook(comb);
        arrBookRead.push(comb);
        localStorage.setItem(keyBookRead, JSON.stringify(arrBookRead));
        arrBookNotRead = arrBookNotRead.filter((book) => book.id !== comb.id);
        localStorage.setItem(keyBookNotRead, JSON.stringify(arrBookNotRead));
        parentBookNotRead.removeChild(btn.parentElement.parentElement);
      }
    }
  });

  document.querySelectorAll('#delete').forEach((btn) => {
    if (e.target === btn.querySelector('i') || e.target === btn) {
      if (btn.parentElement.parentElement.parentElement === parentBookRead) {
        comb = arrBookRead.find((book) => book.id === parseInt(btn.parentElement.parentElement.getAttribute('id')));
        parentBookRead.removeChild(btn.parentElement.parentElement);
        arrBookRead = arrBookRead.filter((book) => book.id !== comb.id);
        localStorage.setItem(keyBookRead, JSON.stringify(arrBookRead));
      }

      if (btn.parentElement.parentElement.parentElement === parentBookNotRead) {
        comb = arrBookNotRead.find((book) => book.id === parseInt(btn.parentElement.parentElement.getAttribute('id')));
        parentBookNotRead.removeChild(btn.parentElement.parentElement);
        arrBookNotRead = arrBookNotRead.filter((book) => book.id !== comb.id);
        localStorage.setItem(keyBookNotRead, JSON.stringify(arrBookNotRead));
      }
      arrCountNumber.pop();
      document.querySelector('#total').innerHTML = arrCountNumber.length;
      localStorage.setItem('count', JSON.stringify(arrCountNumber));
    }
  });
});
