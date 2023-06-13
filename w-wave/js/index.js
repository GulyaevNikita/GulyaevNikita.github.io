// форма поиска

let form = document.querySelector('.form--search');
let search = document.querySelector('.js-search');

search.addEventListener('click',
function() {
    form.classList.toggle('open');
}
)

// вырывание 2 списка навигации в первый в хедере

let destination = document.querySelector('.navigation--wrapper-mobile');
let bottom = document.querySelector('.navigation--header-bottom');
let toBack = document.querySelector('.header__wrapper-bottom');

if (document.documentElement.clientWidth < 767) {
    destination.append(bottom);
} else {
  toBack.append(bottom);
}

window.addEventListener("resize", function () {

    if (document.documentElement.clientWidth < 767) {
        destination.append(bottom);
    } else {
      toBack.append(bottom);
    }
});


// БУРГЕР

let burger = document.querySelector('.js-burger');
let navigation = document.querySelector('.js-navigation');
let links = document.querySelectorAll('.navigation__link');

burger.addEventListener('click',
function() {
    navigation.classList.toggle('active');
    document.body.classList.toggle('stop-scroll');

});

links.forEach(function(link) {
  link.addEventListener('click', function() {
    navigation.classList.remove('active');
    document.body.classList.remove('stop-scroll');
  });
});




// ПОПАП

let popupButton = document.querySelector('.js-login');
let popup = document.querySelector('.js-popup');
let closePopup = document.querySelector('.js-close-popup');

popupButton.addEventListener('click',
function() {
    popup.classList.add('open');
    document.body.classList.add('stop-scroll');
})

closePopup.addEventListener('click',
function() {
    popup.classList.remove('open');
    document.body.classList.remove('stop-scroll');
})

// открытие формы в эфире


let etherMenu = document.querySelector('.js-ether-menu');
let buttonEther = document.querySelectorAll('.button--ether');
let innerEther = document.querySelectorAll('.header__ether-wrapper');
let headerEtherButton = document.querySelector('.header__button-ether');

etherMenu.addEventListener('click',
function() {
    etherMenu.classList.toggle('open');
    innerEther.forEach(el=>{ el.classList.toggle('active'); })
    headerEtherButton.classList.toggle('active');
})


// пауза в секции подкасты

let play = document.querySelectorAll('.js-play')

 play.forEach(item =>{
        item.addEventListener('click', (el) =>{

            play.forEach(el=>{ el.classList.remove('play'); });
            item.classList.add('play');

            let findClass = item.classList.contains("play");

            if (findClass){
                console.log("Found the class name");

                item.addEventListener('click', (el) =>{
                    item.classList.remove('play');
                })

            }else{
                console.log("Not found the class name");
                item.classList.add('play');
            }
    })
})


// добавить класс активности радиокнопкам

let label = document.querySelectorAll('.js-label');

label.forEach(item =>{
    item.addEventListener('click',(e) =>{

        label.forEach(el=>{ el.classList.remove('active'); })
        item.classList.add('active');
    })
})


let swiperAboutus = new Swiper('.js-about-us-swiper', {
  direction: 'horizontal',
  loop: true,

  slidesPerView: 'auto',
  slidesPerGroup: 1,

  spaceBetween: 30,


    breakpoints: {
        320: {
            slidesPerView: 2.5,
        },
        768: {
            slidesPerView: 2,
        },
        1440: {
            slidesPerView: 4,
            spaceBetween: 32,
        },
    },

    navigation: {
      nextEl: '.about-us__swiper-button-next',
      prevEl: '.about-us__swiper-button-prev',
  },
  });

// СЕЛЕКТ

let element = document.querySelector('.js-choice');
let choices = new Choices(element, {
    searchEnabled: false,
    shouldSort: false,
    itemSelectText: '',
});


// валидия в секции about

new JustValidate('.js-form-about', {
    rules: {
        name: {
            required: true,
            minLength: 2,
            maxLength: 15,
        },
        mail: {
            required: true,
            email: true
        }
    },
    messages: {
        name: {
            required: 'Вы не ввели имя',
            minLength: 'Минимальное количество символов 2',
            maxLength: 'Максимальное количество символов 15'
        },
        mail: {
          required: 'Вы не ввели почту',
          email: 'Введите корректный email'
        }
    }
});


// валидация в попап

new JustValidate('.js-form-popup', {
    rules: {
        login: {
            required: true,
            minLength: 2,
            maxLength: 15,
        },
        password: {
            required: true,
            // email: true
        }
    },
    messages: {
        login: {
            required: 'Вы не ввели логин',
            minLength: 'Минимальное количество символов 2',
            // maxLength: 'Максимальное количество символов 15'
        },
        password: {
          required: 'Вы не ввели пароль',
        //   email: 'Введите корректный пароль'
        }
    }
});


// аккордионы в секции guests

document.addEventListener('DOMContentLoaded', () => {
    let accordions = document.querySelectorAll('.js-accordion');
    accordions.forEach(element => {
        let control = element.querySelector('.button--accordion');
        control.addEventListener('click', function () {
            this.closest('.js-accordion').classList.toggle('open');
        })
    });
});

// табы в секции quests


document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelector('.js-tabs-wrapper');
    const tabsBtn = document.querySelectorAll('.js-tabs');
    const tabsContent = document.querySelectorAll('.js-tabs-content');

    if (tabs) {
        tabs.addEventListener('click', (e) => {
            if (e.target.classList.contains('js-tabs')) {
                const tabsPath = e.target.dataset.tabsPath;
                tabsHandler(tabsPath);
            }
        });
    }

    const tabsHandler = (path) => {
        tabsBtn.forEach(el => {el.classList.remove('active')});
        document.querySelector(`[data-tabs-path="${path}"]`).classList.add('active');


        tabsContent.forEach(el => {el.classList.remove('active')});
        document.querySelector(`[data-tabs-target="${path}"]`).classList.add('active');
    };
});



// подключение свайпера в секции playlists

let swiperPlaylists = new Swiper('.js-swiper-playlists', {

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
    },
});


// ПОЯВЛЕНИЕ БЛОКОВ В СЕКЦИИ ПОДКАСТЫ

const showMore = document.querySelector('.js-podcasts');
const productsLength = document.querySelectorAll('.podcasts__wrapper-big').length;
let items = 4;

showMore.addEventListener('click', () => {
  items += 2;
  const array = Array.from(document.querySelector('.podcasts__container').children);
  const visItems = array.slice(0, items);

  visItems.forEach(el => el.classList.add('active'));


  if (visItems.length === productsLength) {
    showMore.style.display = 'none';
  }
});

const genreList = document.querySelector('.playlists__wrapper-button'),
      teamItems = document.querySelectorAll('.playlists__item');

function filter() {
  genreList.addEventListener('click', Event => {
    const targetId = Event.target.dataset.id;

    switch(targetId) {
      case 'post-punk':
        getItems(targetId)
        break
      case 'hardcore':
        getItems(targetId)
        break
      case 'punk-rock':
        getItems(targetId)
        break
      case 'rock':
        getItems(targetId)
        break
      case 'progressive-rock':
        getItems(targetId)
        break
      case 'electic-music':
        getItems(targetId)
        break
      case 'classic-music':
        getItems(targetId)
        break
      case 'nature-music':
        getItems(targetId)
        break
    }
  })
}

filter();

function getItems(className) {
  teamItems.forEach(teamItems => {
    if (teamItems.classList.contains(className)) {
      teamItems.style.display = 'block'
    } else {
      teamItems.style.display = 'none'

    }

  })
};
