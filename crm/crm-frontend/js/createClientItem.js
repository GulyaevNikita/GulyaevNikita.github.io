import { deleteClientModal } from "./createDeleteModal.js";
import { editClientModal } from "./editClient.js";
import { svgSpinner } from "./svg.js";
import { createContactItemByType, formatDate, formatTime } from "./utils.js";

export const createClientItem = (data) => {
  const clientTr = document.createElement("tr");
  const clientIdTd = document.createElement("td");
  const clientId = document.createElement("span");
  const clientFullname = document.createElement("td");
  const clientName = document.createElement("span");
  const clientSurname = document.createElement("span");
  const clientLastName = document.createElement("span");
  const clientCreated = document.createElement("td");
  const creaetedDate = document.createElement("span");
  const creaetedTime = document.createElement("span");

  const clientChanged = document.createElement("td");
  const changedDate = document.createElement("span");
  const changedTime = document.createElement("span");

  const clientContacts = document.createElement("td");
  const clientActions = document.createElement("td");
  const clientEdit = document.createElement("button");
  const clientDelete = document.createElement("button");
  const editSpinner = document.createElement("span");
  const deleteSpinner = document.createElement("span");
  const editClient = editClientModal(data);
  const deleteClient = deleteClientModal();

  editSpinner.classList.add("actions__spinner");
  deleteSpinner.classList.add("actions__spinner");
  clientTr.classList.add("clients__item");
  clientTr.id = data.id;
  clientIdTd.classList.add("clients__id");
  clientFullname.classList.add("clients__fullname");
  clientName.classList.add("clients__name");
  clientSurname.classList.add("clients__surname");
  clientLastName.classList.add("clients__lastname");
  clientCreated.classList.add("clients__created");
  creaetedDate.classList.add("created__date");
  creaetedTime.classList.add("created__time");
  clientChanged.classList.add("clients__changed");
  changedDate.classList.add("changed__date");
  changedTime.classList.add("changed__time");
  clientContacts.classList.add("clients__contacts");
  clientActions.classList.add("clients__actions");
  clientDelete.classList.add("actions__delete", "btn-reset");
  clientEdit.classList.add("actions__edit", "btn-reset");

  for (const contact of data.contacts) {
    createContactItemByType(contact.type, contact.value, clientContacts);
  }

  const deleteById = () => {
    import("./clientsApi.js").then(({ deleteClientItem }) => {
      deleteClient.deleteModalDelete.addEventListener("click", () => {
        try {
          deleteClient.deleteSpinner.style.display = "block";

          deleteClientItem(data.id);
          document.getElementById(data.id).remove();
          deleteClient.deleteModal.remove();
        } catch (error) {
          console.log(error);
        } finally {
          deleteClient.deleteSpinner.style.display = "none";
        }
      });
    });
  };

  clientDelete.addEventListener("click", () => {
    deleteSpinner.style.display = "block";
    clientDelete.classList.add("action-wait");
    deleteById();
    document.body.append(deleteClient.deleteModal);
    deleteSpinner.style.display = "none";
    clientDelete.classList.remove("action-wait");
  });

  clientEdit.addEventListener("click", () => {
    editSpinner.style.display = "block";
    clientEdit.classList.add("action-wait");
    deleteById();
    document.body.append(editClient.editModal);
    editSpinner.style.display = "none";
    clientEdit.classList.remove("action-wait");
  });

  deleteSpinner.innerHTML = svgSpinner;
  editSpinner.innerHTML = svgSpinner;
  clientId.textContent = data.id.slice(-6);
  clientName.textContent = data.name;
  clientSurname.textContent = data.surname;
  clientLastName.textContent = data.lastName;
  clientEdit.textContent = "Изменить";
  clientDelete.textContent = "Удалить";
  creaetedDate.textContent = formatDate(data.createdAt);
  creaetedTime.textContent = formatTime(data.createdAt);
  changedDate.textContent = formatDate(data.updatedAt);
  changedTime.textContent = formatTime(data.updatedAt);

  clientIdTd.append(clientId);
  clientFullname.append(clientSurname, clientName, clientLastName);
  clientCreated.append(creaetedDate, creaetedTime);
  clientChanged.append(changedDate, changedTime);
  clientDelete.append(deleteSpinner);
  clientEdit.append(editSpinner);
  clientActions.append(clientEdit, clientDelete);
  clientTr.append(
    clientIdTd,
    clientFullname,
    clientCreated,
    clientChanged,
    clientContacts,
    clientActions
  );

  return clientTr;
};
