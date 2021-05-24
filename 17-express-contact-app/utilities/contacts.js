const { json } = require("express");
const fs = require("fs");

// membuat folder data jika belum ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// membuat file contacts.json jika belum ada
const contactsPath = "./data/contacts.json";
if (!fs.existsSync(contactsPath)) {
    fs.writeFileSync(contactsPath, "[]", "utf-8");
}

// membaca isi contacts.json
const loadContacts = () => {
    const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
    const contacts = JSON.parse(fileBuffer);
    return contacts;
};

// mencari contact berdasarkan id
const findContact = (id) => {
    const contacts = loadContacts();
    const contact = contacts.find((contact) => contact.id === id);
    return contact;
};

// menuliskan / menimpa file contacts.json dengan data baru
const saveContacts = (contacts) => {
    fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
};

// menambah data contact baru
const addContact = (contact) => {
    const contacts = loadContacts();
    contacts.push(contact);
    saveContacts(contacts);
};

// cek duplikat id
const cekDuplikat = (id) => {
    const contacts = loadContacts();
    const contact = contacts.find((contact) => contact.id === id);
    return contact;
};

// menghapus data contact
const deleteContact = (id) => {
    const contacts = loadContacts();
    const filteredContacts = contacts.filter((contact) => contact.id !== id);
    saveContacts(filteredContacts);
};

// mengubah data contact
const updateContacts = (contactBaru) => {
    const contacts = loadContacts();
    const filteredContacts = contacts.filter((contact) => contact.id !== contactBaru.oldId);
    // saveContacts(filteredContacts, contactBaru);
    delete contactBaru.oldId;
    filteredContacts.push(contactBaru);
    saveContacts(filteredContacts);
};
module.exports = { loadContacts, findContact, addContact, cekDuplikat, deleteContact, updateContacts };
