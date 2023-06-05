import { sendClientData } from "./clientsApi.js";
import { createClientItem } from "./createClientItem.js";
import { createClientForm } from "./createModalForm.js";
import { validateClientContact } from "./validateContact.js";
import { validateClientForm } from "./validateForm.js";

export const addClientModal = () => {
  const createForm = createClientForm();
  const modal = document.createElement("div");
  const modalContent = document.createElement("div");

  modal.classList.add("modal", "site-modal", "modal-active");
  modalContent.classList.add(
    "modal__content",
    "site-modal__content",
    "modal-active"
  );
  createForm.form.classList.add("add-client");

  modal.append(modalContent);

  modalContent.append(
    createForm.modalClose,
    createForm.modalTitle,
    createForm.form
  );

  const capitalize = (str) =>
    `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;

  createForm.form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateClientForm()) {
      return;
    }
    const contactTypes = document.querySelectorAll(".name__text");
    const contactValues = document.querySelectorAll(".contact__input");
    let contacts = [];
    let clientObj = {};

    for (let i = 0; i < contactTypes.length; i++) {
      if (!validateClientContact(contactTypes[i], contactValues[i])) {
        return;
      }
      contacts.push({
        type: contactTypes[i].innerHTML.trim(),
        value: contactValues[i].value.trim(),
      });
    }

    clientObj.name = capitalize(createForm.inputName.value).trim();
    clientObj.surname = capitalize(createForm.inputSurname.value).trim();
    clientObj.lastName = capitalize(createForm.inputLastName.value).trim();
    clientObj.contacts = contacts;

    const spinner = document.querySelector(".modal__spinner");

    try {
      spinner.style.display = "block";
      const data = await sendClientData(clientObj, "POST");
      setTimeout(() => {
        document
          .querySelector(".clients__tbody")
          .append(createClientItem(data));
        modal.remove();
      }, 1500);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => (spinner.style.display = "none"), 1500);
    }
  });

  createForm.modalClose.addEventListener("click", () => {
    modal.remove();
  });
  createForm.cancelBtn.addEventListener("click", () => {
    modal.remove();
  });

  document.addEventListener("click", (e) => {
    if (e.target == modal) {
      modal.remove();
    }
  });

  return modal;
};
