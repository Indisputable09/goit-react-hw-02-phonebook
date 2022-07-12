const ContactList = ({filter, handleClick}) => {
    return (
    <ul>
                {filter.map(contact => (
                    <li key={contact.id} name={contact.name}>
                        <p>{contact.name}: {contact.number}</p>
                        <button name={contact.name} type="button" onClick={handleClick}>Delete</button>
                    </li>
                ))}
            </ul>
)
}

export default ContactList;