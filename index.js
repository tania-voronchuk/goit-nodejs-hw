const contacts = require("./contacts.js");
const { program } = require("commander");

program
  .option("-a, --action, <type>", "data operation")
  .option("-i, --id, <type>", "contact id")
  .option("-n, --name, <type>", "contact name")
  .option("-e, --email, <type>", "contact email")
  .option("-p, --phone, <type>", "contact phone")

  program.parse(process.argv);
  const options = program.opts();

const invokeAction = async({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;

    case 'get':
      const getContact = await contacts.getContactById(id);
      console.log(getContact);
      break;

    case 'add':
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);
      break;

    case 'remove':
       const removeContact = await contacts.removeContact(id);
       console.log(removeContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

const start = async (options) => {
  try {
      await invokeAction(options);
  } catch (error) {
      console.log(error);
  }
};

start(options);