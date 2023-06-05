import { sendClientData } from "./clientsApi.js";
import { createContactItem } from "./createContact.js";
import { deleteClientModal } from "./createDeleteModal.js";
import { createClientForm } from "./createModalForm.js";
import { createClientItem } from "./createClientItem.js";
import { validateClientContact } from "./validateContact.js";
import { validateClientForm } from "./validateForm.js";

export const editClientModal = (data) => {
  const editModal = document.createElement("div");
  const editModalContent = document.createElement("div");
  const createForms = createClientForm();
  const titleId = document.createElement("span");

  titleId.classList.add("modal__id");
  editModal.classList.add("modal-edit", "site-modal", "modal-active");
  editModalContent.classList.add(
    "edit-modal__content",
    "site-modal__content",
    "modal-active"
  );

  titleId.textContent = "ID: " + data.id.slice(-6);
  createForms.modalTitle.textContent = "Изменить данные";
  createForms.cancelBtn.textContent = "Удалить клиента";

  createForms.cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const deleteModal = deleteClientModal();
    document.body.append(deleteModal.deleteModal);

    for (let i = 0; i < contactTypes.length; i++) {
      if (!validateClientContact(contactTypes[i], contactValues[i])) {
        return;
      }
      contacts.push({
        type: contactTypes[i].innerHTML.trim(),
        value: contactValues[i].value.trim(),
      });
    }

    import("./clientsApi.js").then(({ deleteClientItem }) => {
      deleteModal.deleteModalDelete.addEventListener("click", () => {
        try {
          deleteModal.deleteSpinner.style.display = "block";

          setTimeout(() => {
            deleteClientItem(data.id);
            document.getElementById(data.id).remove();
            deleteModal.deleteModal.remove();
            editModal.remove();
          }, 1500);
        } catch (error) {
          console.log(error);
        } finally {
          setTimeout(
            () => (deleteModal.deleteSpinner.style.display = "none"),
            1500
          );
        }
      });
    });
  });

  createForms.modalClose.addEventListener("click", () => {
    editModal.remove();
  });

  createForms.inputName.value = data.name;
  createForms.inputSurname.value = data.surname;
  createForms.inputLastName.value = data.lastName;

  for (let contact of data.contacts) {
    const createContact = createContactItem();

    createContact.contactName.textContent = contact.type;
    createContact.contactInput.value = contact.value;

    createForms.contactsBlock.prepend(createContact.contact);
    createForms.contactsBlock.style.backgroundColor =
      "var( --color-athens-gray)";
  }

  if (data.contacts.length === 10) {
    createForms.addContactBtn.classList.remove("modal__btn--active");
  }

  const capitalize = (str) =>
    `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;

  createForms.form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateClientForm()) {
      return;
    }

    const contactTypes = document.querySelectorAll(".contact__name");
    const contactValues = document.querySelectorAll(".contact__input");
    let contacts = [];

    for (let i = 0; i < contactTypes.length; i++) {
      if (!validateClientContact(contactTypes[i], contactValues[i])) {
        return;
      }
      contacts.push({
        type: contactTypes[i].textContent,
        value: contactValues[i].value,
      });
    }

    const client = {
      name: capitalize(createForms.inputName.value),
      surname: capitalize(createForms.inputSurname.value),
      lastName: capitalize(createForms.inputLastName.value),
      contacts,
    };

    const spinner = document.querySelector(".modal__spinner");

    try {
      spinner.style.display = "block";
      const editedData = await sendClientData(client, "PATCH", data.id);
      setTimeout(() => {
        document.getElementById(editedData.id).remove();
        document
          .querySelector(".clients__tbody")
          .append(createClientItem(editedData));
        editModal.remove();
      }, 1500);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => (spinner.style.display = "none"), 1500);
    }
  });

  document.body.addEventListener("click", (e) => {
    if (e.target === editModal) {
      editModal.remove();
    }
  });

  createForms.modalTitle.append(titleId);
  editModalContent.append(
    createForms.modalClose,
    createForms.modalTitle,
    createForms.form
  );
  editModal.append(editModalContent);

  return {
    editModal,
    editModalContent,
  };
};
