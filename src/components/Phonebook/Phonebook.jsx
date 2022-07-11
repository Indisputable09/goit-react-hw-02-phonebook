import { Component } from "react";
import { Formik, Form, Field } from 'formik';
import { nanoid } from "nanoid";

export default class Phonebook extends Component {
    state = {
        contacts: [
    { id: nanoid(), name: "Carla", number: 444555666 },
    { id: nanoid(), name: "Diana", number: 555666777 },
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},],
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
        const normalizedFilterValue = this.state.filter.toLocaleLowerCase();
        const filteredContacts = this.state.contacts.filter(contact => contact.name.toLocaleLowerCase().includes(normalizedFilterValue))
      return (
        <div>
          <h1>Phonebook</h1>
          <Formik initialValues={{
        name: '',
        number: '',
              }}>
          <Form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Name</label>
            <Field
  id="name"
  type="text"
  name="name"
  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
  placeholder="Name"
  required
/>
              <label htmlFor="number">Number</label>
              <Field
  type="tel"
  name="number"
  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
  placeholder="Number"
  required
/>
          <button type="submit">Add contact</button>    
          </Form>
          </Formik>
          <div>
            <h1>Contacts</h1>
                  <input type="text" onChange={this.handleChangeFilter} value={this.state.filter} />
            <ul>
                {filteredContacts.map(contact => (
                    <li key={contact.id} name={contact.name}>
                        <p>{contact.name}: {contact.number}</p>
                        <button name={contact.name} type="button" onClick={this.handleClick}>Delete</button>
                    </li>
                ))}
            </ul>
          </div>
        </div>
      )
    }
}