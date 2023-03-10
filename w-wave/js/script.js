// Бургер меню

const burger = document.querySelector(".burger-menu");
const menu = document.querySelector(".header__nav-top");
const menuLinks = document.querySelectorAll(".nav__list-item");
const menuDown = document.querySelector(".header__nav-down");
const container = document.querySelector(".container");

burger.addEventListener(
  "click",

  function () {
    burger.classList.toggle("burger_active");

    menu.classList.toggle("nav__list_active");

    menuDown.classList.toggle("nav__list-down_active");

    document.body.classList.toggle("stop-scroll");
  }
);

menuLinks.forEach(function (el) {
  el.addEventListener("click", function () {
    burger.classList.remove("burger_active");

    menu.classList.remove("nav__list_active");

    menuDown.classList.remove("nav__list-down_active");

    document.body.classList.remove("stop-scroll");
  });
});

// Кнопка поиска

const searchButton = document.querySelector(".header__search");
const searchForm = document.querySelector(".header__search-form");

searchButton.addEventListener("click", function () {
  searchForm.classList.toggle("header__search--active");
});

// Это модалка кнопки "Войти"

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".overlay");
  const popup = document.querySelector(".popup");
  const popupOpen = document.querySelector(".enter");
  const popupOpenHidden = document.querySelector(".header__button--hidden");
  const popupClose = document.querySelector(".popup__close");

  popupOpen.onclick = function () {
    popup.classList.add("popup--active");
    overlay.classList.add("overlay--active");
    document.body.classList.add("stop-scroll");
  };

  popupClose.onclick = function () {
    popup.classList.remove("popup--active");
    overlay.classList.remove("overlay--active");
    document.body.classList.remove("stop-scroll");
  };

  popupOpenHidden.onclick = function () {
    popup.classList.add("popup--active");
    overlay.classList.add("overlay--active");
    document.body.classList.add("stop-scroll");
  };
});

// Поле валидации для формы аккаунта

// плей в блоке трансляции

let item = document.querySelector(".button");
let play = document.querySelectorAll(".js-play");
play.forEach((item) => {
  item.addEventListener("click", (e) => {
    play.forEach((el) => {
      el.classList.remove("play");
    });
    item.classList.add("play");

    let isMainPresent = item.classList.contains("play");

    if (isMainPresent) {
      console.log("Found the class name");
      item.classList.add("play");

      item.addEventListener("click", (el) => {
        item.classList.remove("play");
      });
    } else {
      console.log("Not found the class name");
      item.classList.add("play");
    }
  });
});

// Плей в блоке с подкастами

console.log('helo World')

const itemPodcast = document.querySelector(".podcast__descr-button");
const playPodcast = document.querySelectorAll(".js-play");

playPodcast.forEach((itemPodcast) => {
  itemPodcast.addEventListener("click", (e) => {
    playPodcast.forEach((el) => {
      el.classList.remove("play-podcast");
    });
    itemPodcast.classList.add("play-podcast");

    let isMainPresent = itemPodcast.classList.contains("play-podcast");

    if (isMainPresent) {
      console.log("Found the class name");
      itemPodcast.classList.add("play-podcast");

      itemPodcast.addEventListener("click", (el) => {
        itemPodcast.classList.remove("play-podcast");
      });
    } else {
      console.log("Not found the class name");
      itemPodcast.classList.remove("play-podcast");
    }
  });
});



// Секция с трансляциями

let translationMobile = document.querySelector(
  ".header__translation-mobile-button"
);
let translation = document.querySelector(".header__block-translation-mobile");
let translationButtonContainer = document.querySelector(".header-down");

translationMobile.addEventListener(
  "click",

  function () {
    translation.classList.toggle("header__block-translation-mobile--active");
    translationButtonContainer.classList.toggle(
      "header__down-container--active"
    );
  }
);

// Селект

const defaultSelect = () => {
  const element = document.querySelector("#selectCustom");
  const choices = new Choices(element, {
    searchEnabled: false,
    shouldSort: false,
  });
};

defaultSelect();

// Кнопка еще...

const showMore = document.querySelector(".podcast__button-more");
const productsLength = document.querySelectorAll(".podcast__list-item").length;
let items = 8;

showMore.addEventListener("click", () => {
  items += 2;
  const array = Array.from(document.querySelector(".podcast__list").children);
  const visItems = array.slice(0, items);

  visItems.forEach((el) => el.classList.add("is-visible"));

  if (visItems.length === productsLength) {
    showMore.style.display = "none";
  }
});

// Фильтр жанров

const genreList = document.querySelector(".playlist__checkbox"),
  teamItems = document.querySelectorAll(".team__list-item");

function filter() {
  genreList.addEventListener("click", (Event) => {
    const targetId = Event.target.dataset.id;
    console.log(targetId);

    switch (targetId) {
      case "post-punk":
        getItems(targetId);
        break;
      case "hardcore":
        getItems(targetId);
        break;
      case "punk-rock":
        getItems(targetId);
        break;
      case "rock":
        getItems(targetId);
        break;
      case "progressive-rock":
        getItems(targetId);
        break;
      case "electic-music":
        getItems(targetId);
        break;
      case "classic-music":
        getItems(targetId);
        break;
      case "nature-music":
        getItems(targetId);
        break;
    }
  });
}

filter();

function getItems(className) {
  teamItems.forEach((teamItems) => {
    if (teamItems.classList.contains(className)) {
      teamItems.style.display = "grid";
    } else {
      teamItems.style.display = "none";
    }
  });
}

// Свайпер жанров

// const swiperGenre = new Swiper('.swiper-genre', {
//   direction: 'horizontal',
//   loop: false,

//   slidesPerView: 'auto',
//   slidesPerGroup: 1,

//   spaceBetween: 15,

//   slideClass: 'genre-slide',
//   wrapperClass: 'swiper-wrap-genre',

// })

// Свайпер карточек в плейлисте

const swiperPlaylist = new Swiper(".swiper-play", {
  direction: "horizontal",
  loop: false,

  slidesPerView: 1,
  slidesPerGroup: 1,

  spaceBetween: 30,

  slideClass: "slide-play",
  wrapperClass: "swiper-wrap-play",

  pagination: {
    el: ".swiper-play-pagination",
    type: "fraction",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-play-button-next",
    prevEl: ".swiper-play-button-prev",
  },
});

// Свайпер жанров на мобилке в разделе плейлистов

// window.addEventListener('resize', resizeHandlerSlider);

// const slider = document.querySelector('.swiper-genre');
// let { clientWidth } = document.body;
// let yourSlider;

// const sliderInit = () => {
//     yourSlider = new Swiper(slider, {
//       direction: 'horizontal',
//       loop: true,

//       slidesPerView: 'auto',

//       initialSlide: 0,

//       slideClass: 'swiper-slide-genre',
//       wrapperClass: 'swiper-wrapper-genre',
//     })
// }

// const resizeHandlerSlider = () => {
//     if (clientWidth !== document.body.clientWidth) {
//         clientWidth = document.body.clientWidth;

//         if (yourSlider) {
//             yourSlider.destroy();
//         }

//         sliderInit();
//     }
// }

// let catalogSlider = null;
// let mediaQuerySize = 570;

// function catalogSliderInit () {
//   if (!catalogSlider) {
//     catalogSlider = new Swiper('.swiper-genre', {
//       direction: 'horizontal',
//       loop: true,

//       slidesPerView: 'auto',

//       initialSlide: 0,

//       slideClass: 'swiper-slide-genre',
//       wrapperClass: 'swiper-wrapper-genre',
//     });
//   }
// }

// function catalogSliderDestroy () {
//   if (catalogSlider) {
//     catalogSlider.destroy();
//     catalogSlider = null;
//   }
// }

// const swiperGenre = new Swiper(".swiper-genre", {
//   direction: 'horizontal',
//   loop: true,

//   slidesPerView: 'auto',

//   initialSlide: 0,

//   slideClass: 'swiper-slide-genre',
//   wrapperClass: 'swiper-wrapper-genre',

// });

// $(window).on('load resize', function () {
//   // Берём текущую ширину экрана
//   var windowWidth = $(this).innerWidth();

//   // Если ширина экрана меньше или равна mediaQuerySize(1024)
//   if (windowWidth <= mediaQuerySize) {
//     // Инициализировать слайдер если он ещё не был инициализирован
//     catalogSliderInit()
//   } else {
//     // Уничтожить слайдер если он был инициализирован
//     catalogSliderDestroy()
//   }
// });

// Аккордеон раздела "Гости"

document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".drop-down__list-item");

  accordions.forEach((el) => {
    el.addEventListener("click", (e) => {
      const self = e.currentTarget;
      const control = self.querySelector(".drop-down__button");
      const content = self.querySelector(".drop-down__content");

      self.classList.toggle("open");

      if (self.classList.contains("open")) {
        control.setAttribute("aria-expanded", true);
        content.setAttribute("aria-hidden", false);
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.borderTop = "1px solid #AA9DFA";
      } else {
        control.setAttribute("aria-expanded", false);
        content.setAttribute("aria-hidden", true);
        content.style.maxHeight = null;
      }
    });
  });
});

// Табы аккордеона в разделе "Гости"

const tabsBtn = document.querySelectorAll(".drop-down__content-button");
const tabsContent = document.querySelectorAll(".guest__card");

tabsBtn.forEach(function (element) {
  element.addEventListener("click", function (e) {
    const path = e.currentTarget.dataset.path;

    tabsBtn.forEach(function (tabsBtn) {
      tabsBtn.classList.remove("drop-down__content-button--active");
    });
    e.currentTarget.classList.add("drop-down__content-button--active");

    tabsContent.forEach(function (e) {
      e.classList.remove("guest__card--active");
    });
    document
      .querySelector(`[data-target="${path}"]`)
      .classList.add("guest__card--active");
  });
});

// Свайпер "О нас"

const swiperAbout = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,

  slidesPerView: "auto",
  slidesPerGroup: 1,

  spaceBetween: 30,

  breakpoints: {
    320: {
      spaceBetween: 20,
    },

    570: {
      spaceBetween: 30,
    },
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Валидация формы в разделе "О нас"

const validation = new JustValidate("#about-us__form");

validation
  .addField("#name", [
    {
      rule: "required",
      errorMessage: "Вы не ввели имя",
    },
    {
      rule: "minLength",
      value: 2,
      errorMessage: "Минимум 2 символа",
    },
    {
      rule: "maxLength",
      value: 30,
      errorMessage: "Максимум 30 символов",
    },
  ])
  .addField("#email", [
    {
      rule: "required",
      errorMessage: "Вы не ввели email",
    },
    {
      rule: "email",
      errorMessage: "Некорректный email",
    },
  ]);

const validationPopup = new JustValidate("#popup__form");

validationPopup
  .addField("#account-name", [
    {
      rule: "required",
      errorMessage: "Некорректное имя пользователя",
    },
  ])
  .addField("#account-password", [
    {
      rule: "required",
      errorMessage: "Вы не ввели пароль",
    },
    {
      rule: "password",
      errorMessage: "Некорректный пароль",
    },
  ]);

// Focus-trap для модалки
// import * as focusTrap from 'focus-trap';

// const containerTrap = document.getElementById('popup');

// const focusTrap = createFocusTrap('#popup', {
//   onActivate: () => container.classList.add('popup--active'),
//   onDeactivate: () => container.classList.remove('popup--active'),
// });

// document
//   .getElementById('enter')
//   .addEventListener('click', focusTrap.activate);
// document
//   .getElementById('popup__close')
//   .addEventListener('click', focusTrap.deactivate);
