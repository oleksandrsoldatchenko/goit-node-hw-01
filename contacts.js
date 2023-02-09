const path = require("path");
const fs = require("fs").promises;
const shortid = require("shortid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const gottenContact = data.find((contact) => contact.id === contactId);
    return gottenContact;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const removedContact = data.find((contact) => contact.id === contactId);
    const filteredContacts = data.filter((contact) => contact.id !== contactId);
    if (!removedContact) {
      return;
    } else {
    }
    await fs.writeFile(
      contactsPath,
      JSON.stringify(filteredContacts, null, 2),
      "utf8"
    );
    return removedContact;
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await listContacts();
    const newData = {
      id: shortid.generate(),
      name,
      email,
      phone,
    };

    data.push(newData);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2), "utf8");

    return newData;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
