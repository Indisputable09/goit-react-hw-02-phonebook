import { Component } from "react";
import { nanoid } from "nanoid";
import ContactForm from "components/ContactForm";
import Filter from "components/Filter";

export default class Phonebook extends Component {
    state = {
        contacts: [
    { id: nanoid(), name: "Carla", number: 444555666 },
    { id: nanoid(), name: "Diana", number: 555666777 },
    {id: nanoid(), name: 'Rosie Simpson', number: '459-12-56'},
    {id: nanoid(), name: 'Hermione Kline', number: '443-89-12'},
    {id: nanoid(), name: 'Eden Clements', number: '645-17-79'},
    {id: nanoid(), name: 'Annie Copeland', number: '227-91-26'},],
    filter: ''
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const contactsNames = this.state.contacts.map(contact => contact.name);
        if (contactsNames.includes(e.target.name.value)) {
            alert('Sorry, this name is alreaady in your contacts')
            return
        }
        await this.setState(prevState => (
            {
               contacts: [{id: nanoid(), name: e.target.name.value, number: e.target.number.value }, ...prevState.contacts]
            }
        ))
        console.log(this.state.contacts)
        e.target.reset()
    }

    handleClick = (e) => {
        const filtered = this.state.contacts.filter(contact => (
          contact.name !== e.target.name
        ))
        this.setState({contacts: filtered})
        console.log(filtered)
    }

    handleChangeFilter = (e) => {
        this.setState({ filter: e.target.value })
    }

    render() {
        const {state, handleSubmit, handleChangeFilter, handleClick} = this;
        const normalizedFilterValue = state.filter.toLocaleLowerCase();
        const filteredContacts = state.contacts.filter(contact => {
            if (contact.name.toLocaleLowerCase().includes(normalizedFilterValue) || contact.number.toString().includes(normalizedFilterValue)) {
                return true;
            }
        });
      return (
        <div>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={handleSubmit} />
          <div>
            <h1>Contacts</h1>
                  <Filter handleChangeFilter={handleChangeFilter} filter={ state.filter} />
                  <ul>
                      {filteredContacts.map(contact => (
                          <li key={contact.id} name={contact.name}>
                              <p>{contact.name}: {contact.number}</p>
                              <button name={contact.name} type="button" onClick={handleClick}>Delete</button>
                          </li>
                      ))}
            </ul>
          </div>
        </div>
      )
    }
}