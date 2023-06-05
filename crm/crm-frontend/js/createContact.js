import { svgArrow, svgDelete } from "./svg.js";

export const createContactItem = () => {
  const contact = document.createElement("div");
  const contactType = document.createElement("div");
  const contactName = document.createElement("button");
  const contactNameText = document.createElement("span");
  const contactNameSvg = document.createElement("span");
  const contactList = document.createElement("ul");
  const contactPhone = document.createElement("li");
  const contactVk = document.createElement("li");
  const contactFb = document.createElement("li");
  const contactEmail = document.createElement("li");
  const contactOther = document.createElement("li");
  const contactInput = document.createElement("input");
  const contactDelete = document.createElement("button");
  const contactDeleteTooltip = document.createElement("span");

  contact.classList.add("contact");
  contactDeleteTooltip.classList.add("contact-tooltip", "site-tooltip");
  contactType.classList.add("contact__type");
  contactName.classList.add("contact__name");
  contactNameText.classList.add("name__text");
  contactNameSvg.classList.add("name__svg");
  contactList.classList.add("contact__list", "list-reset");
  contactPhone.classList.add("contact__item");
  contactVk.classList.add("contact__item");
  contactFb.classList.add("contact__item");
  contactEmail.classList.add("contact__item");
  contactOther.classList.add("contact__item");
  contactInput.classList.add("contact__input");
  contactDelete.classList.add("contact__delete", "btn-reset");

  contactNameText.textContent = "Телефон";
  contactNameSvg.innerHTML = svgArrow;
  contactDeleteTooltip.textContent = "Удалить контакт";
  contactPhone.textContent = "Телефон";
  contactVk.textContent = "Вконтакте";
  contactFb.textContent = "Facebook";
  contactEmail.textContent = "Email";
  contactOther.textContent = "Другое";
  contactInput.placeholder = "Введите данные контакта";
  contactInput.type = "text";
  contactDelete.innerHTML = svgDelete;

  contactDelete.append(contactDeleteTooltip);
  contact.append(contactType, contactInput, contactDelete);
  contactType.append(contactName, contactList);
  contactName.append(contactNameText, contactNameSvg);
  contactList.append(
    contactPhone,
    contactEmail,
    contactVk,
    contactFb,
    contactOther
  );

  contactDelete.addEventListener("click", (e) => {
    e.preventDefault();
    contact.remove();
    document
      .querySelector(".modal__btn-contact")
      .classList.add("modal__btn-contact--active");
  });
  contactName.addEventListener("click", (e) => {
    e.preventDefault();
    contactList.classList.toggle("contact__list--active");
    contactNameSvg.classList.toggle("name__svg--active");
  });

  contactType.addEventListener("mouseleave", () => {
    contactList.classList.remove("contact__list--active");
    contactNameSvg.classList.remove("name__svg--active");
  });

  const setType = (type) => {
    type.addEventListener("click", () => {
      contactNameText.textContent = type.textContent;
      contactList.classList.remove("contact__list--active");
      contactNameSvg.classList.remove("name__svg--active");
    });
  };

  const typesArray = [
    contactEmail,
    contactFb,
    contactPhone,
    contactVk,
    contactOther,
  ];

  for (const type of typesArray) {
    setType(type);
  }

  contactDelete.append(contactDeleteTooltip);
  contact.append(contactType, contactInput, contactDelete);
  contactType.append(contactName, contactList);
  contactList.append(
    contactPhone,
    contactEmail,
    contactVk,
    contactFb,
    contactOther
  );

  return {
    contact,
    contactName,
    contactInput,
    contactDelete,
  };
};