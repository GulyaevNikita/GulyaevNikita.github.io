let burger = document.querySelector(".burger");
let menu = document.querySelector(".header__list");
let menuLinks = menu.querySelectorAll(".header__list-item");
let search = document.querySelector(".header__search");
let searchForm = document.querySelector(".form-search");
let searchClose = searchForm.querySelector(".search-close--active")


// Search

search.addEventListener("click",

function () {
  searchForm.classList.toggle("form-search--active");

}
);

searchClose.addEventListener("click",

function () {
  searchForm.classList.remove("form-search--active");

}
);

// Бургер
burger.addEventListener("click",

  function () {
    burger.classList.toggle("burger_active");

    menu.classList.toggle("header__list_active");

    document.body.classList.toggle("stop-scroll");

  }
);

menuLinks.forEach(function (el) {
  el.addEventListener("click", function () {
    burger.classList.remove("burger_active");

    menu.classList.remove("header__list_active");

    document.body.classList.remove("stop-scroll");
  });
});

// Слайдер

const swiper = new Swiper('.swiper-container', {
  slidePerView: 1,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  effect: 'fade',
  autoplay: {
    delay: 4000,
  }
});

// Аккордеон

document.addEventListener('DOMContentLoaded', () => {
  const accordions = document.querySelectorAll('.questions__list-item')

  accordions.forEach(el => {
    el.addEventListener('click', (e) => {
      const self = e.currentTarget;
      const control = self.querySelector('.questions__button');
      const content = self.querySelector('.info');

      self.classList.toggle('open');

      if (self.classList.contains('open')) {
        control.setAttribute('aria-expanded', true);
        content.setAttribute('aria-hidden', false);
        content.style.maxHeight = content.scrollHeight + 'px';
      }

      else {
        control.setAttribute('aria-expanded', false);
        content.setAttribute('aria-hidden', true);
        content.style.maxHeight = null;

      }

    });
  });
})

// Табы

  const tabsBtn = document.querySelectorAll('.step-button')
  const tabsContent = document.querySelectorAll('.plan__cart')

tabsBtn.forEach(function(element){
  element.addEventListener('click', function(e){
    const path = e.currentTarget.dataset.path;

    tabsBtn.forEach(function(tabsBtn){ tabsBtn.classList.remove('step--active')});
    e.currentTarget.classList.add('step--active');

    tabsContent.forEach(function(e){ e.classList.remove('plan__cart--active')});
    document.querySelector(`[data-target="${path}"]`).classList.add('plan__cart--active');
  });
  });




