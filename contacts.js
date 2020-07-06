const fs = require("fs");
const path = require("path");
const { stringify } = require("querystring");
const uniqid = require("uniqid");

const contactsPath = path.join("./db/", "contact.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    {
      console.table(JSON.parse(data));
    }
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const filteredData = JSON.parse(data).find(
      (inside) => inside.id === contactId
    );
    console.log(filteredData);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const array = JSON.parse(data);
    const removedArray = array.filter((contacts) => contacts.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(removedArray), function (err) {
      if (err) throw err;
      console.log(`Contact removed: ${contactId}`);
      listContacts();
    });
  });
}

function addContact(name, email, phone) {
  const newContact = {
    id: uniqid(),
    name: name,
    email: email,
    phone: phone,
  };
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    const array = JSON.parse(data);
    array.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(array), function (err) {
      if (err) throw err;
      console.log("New contact is added");
      listContacts();
    });
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
