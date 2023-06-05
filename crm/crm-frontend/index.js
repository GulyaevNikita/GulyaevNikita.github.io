import { createClientsHeader } from "./js/createHeader.js";
import { createClientsSection } from "./js/createClientsSection.js";
import { getClients } from "./js/clientsApi.js";
import { createClientItem } from "./js/createClientItem.js";
import { sortTable } from "./js/sortClientTable.js";
import { serchClients } from "./js/serchClient.js";

const createApp = async () => {
  const header = createClientsHeader();
  const clientSection = createClientsSection();
  document.body.append(header, clientSection.main);
  const preloader = document.querySelector(".preloader");

  try {
    const clients = await getClients();
    serchClients(clients);

    for (const client of clients) {
      document
        .querySelector(".clients__tbody")
        .append(createClientItem(client));
    }
  } catch (error) {
    console.log(error);
  } finally {
    preloader.remove();
  }
};

createApp();
document.addEventListener("DOMContentLoaded", () => sortTable());
