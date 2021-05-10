const { json } = require('express')
const fs = require('fs')


// membuat folder data jika belum ada
const dirPath = './data'
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)
}

// membuat file contacts.json jika belum ada
const contactsPath = './data/contacts.json'
if(!fs.existsSync(contactsPath)){
    fs.writeFileSync(contactsPath, '[]', 'utf-8')
}

// membaca isi contacts.json
const loadContacts = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(fileBuffer)
    return contacts
}

// mencari contact berdasarkan id
const findContact = (id) => {
    const contacts = loadContacts()
    const contact = contacts.find((contact) => contact.id === id)
    return contact
}

module.exports = {loadContacts, findContact}