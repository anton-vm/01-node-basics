const yargs = require("yargs").argv;
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const cont = require(".");
const { argv } = require("yargs");
// const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

// console.log("Hello world");
// console.log(contact);

// const {action, id, name, email, phone} = yargs;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;
    case "get":
      console.log(id, "Hey");
      getContactById(id);
      break;
    case "remove":
      removeContact(id);
      break;
    case "add":
      addContact(name, email, phone);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
