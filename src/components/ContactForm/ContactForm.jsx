import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import { Notify } from 'notiflix';

const NAME_MATCH = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const NUMBER_MATCH = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const nameError = "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan";
const nameNumber = "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +";
const requiredError = 'This field is required'
 const SignupSchema = object().shape({
   name: string()
     .required(requiredError)
     .matches(NAME_MATCH, nameError),
   number: string()
     .required(requiredError)
     .matches(NUMBER_MATCH, nameNumber),
 });

const FormError = ({name}) => {
  return (
    <ErrorMessage name={name} render={message => Notify.failure(message)} />
  )
 }

const ContactForm = ({onSubmit, }) => {
    return (
    <Formik initialValues={{
        name: '',
        number: '',
      }}
        validationSchema={SignupSchema}
      >
          <Form onSubmit={onSubmit}>
            <label htmlFor="name">Name</label>
            <Field
              id="name"
              type="text"
              name="name"
              placeholder="Name"
            />
            <FormError name="name" />
            <label htmlFor="number">Number</label>
          <Field
              id="number"
              type="tel"
              name="number"
              placeholder="Number"
            />
            <FormError name="number" />
            <button type="submit">Add contact</button>
          </Form>
          </Formik>
)
}

export default ContactForm;