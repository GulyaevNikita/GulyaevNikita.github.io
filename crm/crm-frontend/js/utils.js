import {
  contactFb,
  contactMail,
  contactOther,
  contactPhone,
  contactVk,
} from "./svg.js";

import { contactTooltip } from "./createTooltip.js";

export const createContactLink = (type, value, element, svg, item) => {
  const setTooltip = contactTooltip(type, value);
  element = document.createElement("a");
  element.classList.add("contacts__link");
  element.innerHTML = svg;

  element.addEventListener("mouseover", () => {
    setTooltip.tooltip.classList.add("contact-tooltip--act");
  });
  element.addEventListener("mouseout", () => {
    setTooltip.tooltip.classList.remove("contact-tooltip--act");
  });

  if (type === "Email") {
    element.href = `mailto:${value.trim()}`;
  } else if (type === "Телефон") {
    element.href = `tel:${value.trim()}`;
    setTooltip.tooltipValue.style.color = "--color-white";
    setTooltip.tooltipValue.style.textDecoration = "none";
  } else {
    element.href = value.trim();
  }

  element.append(setTooltip.tooltip);
  item.append(element);
};

export const createContactItemByType = (type, value, item) => {
  switch (type) {
    case "Телефон":
      let phone;
      createContactLink(type, value, phone, contactPhone, item);
      break;
    case "Вконтакте":
      let vk;
      createContactLink(type, value, vk, contactVk, item);
      break;
    case "Facebook":
      let facebook;
      createContactLink(type, value, facebook, contactFb, item);
      break;
    case "Email":
      let email;
      createContactLink(type, value, email, contactMail, item);
      break;
    case "Другое":
      let other;
      createContactLink(type, value, other, contactOther, item);
      break;
  }
};

export const formatDate = (data) => {
  const newDate = new Date(data);

  const correctDate = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  const resultDate = newDate.toLocaleString("ru", correctDate);

  return resultDate;
};
export const formatTime = (data) => {
  const newDate = new Date(data);

  const correctDate = {
    hour: "numeric",
    minute: "numeric",
  };

  const resultDate = newDate.toLocaleString("ru", correctDate);

  return resultDate;
};
