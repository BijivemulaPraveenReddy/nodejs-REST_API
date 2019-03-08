const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let contacts = require('./data');

app.get('/api/contacts', (request, response) => {
  if (!contacts) {
    //cwhen contact json file  not found
    response.status(404).json({ message: 'No contacts found.' }); 
  }
  // when contacy json found
  response.json(contacts);
});

app.get('/api/contacts/:id', (request, response) => {
    // to dosplay the given id contact details
  let contactId = request.params.id;

  let contact = contacts.filter(contact => {
    return contact.id == contactId;
  });

  if (!contact) {
    // if id not match to the given id display the message
    response.status(404).json({ message: 'Contact not found' });
  }
     response.json(contact[0]);
});

app.post('/api/contacts', (request, response) => {

  let contact = {
    id: contacts.length + 1,
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    email: request.body.email,
    website: request.body.website
  };

  contacts.push(contact);

  response.json(contact);

});

app.put('/api/contacts/:id', (request, response) => {

  let contactId = request.params.id;

  let contact = contacts.filter(contact => {
    return contact.id == contactId;
  })[0];

  const index = contacts.indexOf(contact);

  let keys = Object.keys(request.body);

  keys.forEach(key => {
    contact[key] = request.body[key];
  });

  contacts[index] = contact;

  response.json({ message: `User ${contactId} updated.`});
  response.json(contacts[index]);
});

app.delete('/api/contacts/:id', (request, response) => {
  
  let contactId = request.params.id;

  let contact = contacts.filter(contact => {
    return contact.id == contactId;
  })[0];

  const index = contacts.indexOf(contact);

  contacts.splice(index, 1);

  response.json({ message: `User ${contactId} deleted.`});

});

const server = app.listen(8081,'0.0.0.0', function(){
  const  host=server.address().address
  const port=server.address().port
  console.log("Examle of app listening at http://%s:%s",host,port)
});