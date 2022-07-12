import { Formik, Form, Field } from 'formik';

const ContactForm = ({onSubmit, }) => {
    return (
    <Formik initialValues={{
        name: '',
        number: '',
              }}>
          <Form onSubmit={onSubmit}>
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
)
}

export default ContactForm;