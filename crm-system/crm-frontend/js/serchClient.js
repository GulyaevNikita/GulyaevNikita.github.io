import { findClient } from "./clientsApi.js";
import { createClientItem } from "./createClientItem.js";

export const serchClients = (clients) => {
  const findList = document.querySelector(".find-list");
  const input = document.querySelector(".header__input");

  clients.forEach((client) => {
    const findItem = document.createElement("li");
    const findLink = document.createElement("a");

    findItem.classList.add("find-list__item");
    findLink.classList.add("find-list__link");

    findLink.textContent = `${client.name} ${client.surname} ${client.lastName}`;
    findLink.href = "#";

    findItem.append(findLink);
    findList.append(findItem);
  });

  const rewriteTable = async (str) => {
    const response = await findClient(str);
    const tBody = document.querySelector(".clients__tbody");
    tBody.innerHTML = "";

    for (const client of response) {
      tBody.append(createClientItem(client));
    }
  };

  input.addEventListener("input", async () => {
    const value = input.value.trim();
    const foundItems = document.querySelectorAll(".find-list__link");

    if (value !== "") {
      rewriteTable(value);

      foundItems.forEach((link) => {
        if (link.innerText.search(value) == -1) {
          link.classList.add("hide");
          link.innerHTML = link.innerText;
        } else {
          link.classList.remove("hide");
          findList.classList.remove("hide");
          const str = link.innerText;
          link.innerHTML = insertMark(
            str,
            link.innerText.search(value),
            value.length
          );
        }
      });
    } else {
      foundItems.forEach((link) => {
        const tBody = document.querySelector(".clients__tbody");
        tBody.innerHTML = "";
        clients.forEach((client) => tBody.append(createClientItem(client)));
        link.classList.remove("hide");
        findList.classList.add("hide");
        link.innerHTML = link.innerText;
      });
    }
  });

  const insertMark = (str, pos, len) =>
    str.slice(0, pos) +
    "<mark>" +
    str.slice(pos, pos + len) +
    "</mark>" +
    str.slice(pos + len);
};
