const URL = "http://localhost:3000/api/clients";
export const getClients = async () => {
  try {
    const response = await fetch(URL, {
      method: "GET",
    });

    const result = await response.json();

    return result;
  } catch (err) {
    console.log(err);
  }
};

export const sendClientData = async (client, method, id = null) => {
  try {
    const response = await fetch(`${URL}/${method === "POST" ? "" : id}`, {
      method,
      body: JSON.stringify(client),
    });
    const result = await response.json();

    return result;
  } catch (err) {
    console.log(err);
  }
};

export const deleteClientItem = async (id) => {
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.log(err);
  }
};
export const findClient = async (value) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/clients?search=${value}`,
      {
        method: "GET",
      }
    );

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};
