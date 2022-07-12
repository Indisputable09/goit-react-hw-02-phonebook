import { Component } from "react";
import { nanoid } from "nanoid";
import ContactForm from "components/ContactForm";
import Filter from "components/Filter";
import ContactList from "components/ContactList";

export default class Phonebook extends Component {
    state = {
        contacts: [
    {id: nanoid(), name: "Carla", number: 444555666 },
    {id: nanoid(), name: "Diana", number: 555666777 },
    {id: nanoid(), name: 'Rosie Simpson', number: '459-12-56'},
    {id: nanoid(), name: 'Hermione Kline', number: '443-89-12'},
    {id: nanoid(), name: 'Eden Clements', number: '645-17-79'},
    {id: nanoid(), name: 'Annie Copeland', number: '227-91-26'},],
    filter: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const contactsNames = this.state.contacts.map(contact => contact.name);
        if (contactsNames.includes(e.target.name.value)) {
            alert(`Sorry, ${e.target.name.value} is already in your contacts`)
            return
        }
        this.setState(prevState => (
            {
               contacts: [{id: nanoid(), name: e.target.name.value, number: e.target.number.value }, ...prevState.contacts]
            }
        ))
        e.target.reset()
    }

    handleClick = (e) => {
        const filtered = this.state.contacts.filter(contact => (
          contact.name !== e.target.name
        ))
        this.setState({contacts: filtered})
    }

    handleChangeFilter = (e) => {
        this.setState({ filter: e.target.value })
    }

    createFilter = () => {
        const normalizedFilterValue = this.state.filter.toLocaleLowerCase();
        const filteredContacts = this.state.contacts.filter(contact => contact.name.toLocaleLowerCase().includes(normalizedFilterValue) || contact.number.toString().includes(normalizedFilterValue)
        );
        return filteredContacts;
    }
    render() {
        const {state, handleSubmit, handleChangeFilter, handleClick, createFilter} = this;
        const filteredContacts = createFilter();
      return (
        <div>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={handleSubmit} />
          <div>
            <h1>Contacts</h1>
            <Filter handleChangeFilter={handleChangeFilter} filter={state.filter} />
            <ContactList filter={filteredContacts} handleClick={handleClick} />
          </div>
        </div>
      )
    }
}