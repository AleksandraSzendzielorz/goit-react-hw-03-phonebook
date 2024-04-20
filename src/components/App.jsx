import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import css from '../styles/App.module.css';
import { ContactList } from './ContactList';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  add = event => {
    event.preventDefault();

    const form = event.currentTarget;
    const newName = form.elements.name.value;
    const newNumber = form.elements.number.value;

    const nameExists = this.state.contacts.some(
      contact => contact.name === newName
    );

    if (nameExists) {
      alert(newName + ' is already in contacts.');
    } else {
      const newContact = {
        name: newName,
        number: newNumber,
        id: nanoid(),
      };

      this.setState(
        prevState => ({
          contacts: [...prevState.contacts, newContact],
        }),
        () => {
          localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
        }
      );
    }

    form.reset();
  };

  deleteContact = id => {
    this.setState(
      prevState => ({
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      }),
      () => {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      }
    );
  };

  handleChange = evt => {
    this.setState({ filter: evt.target.value });
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <div className={css.appContainer}>
        <h1>Phonebook</h1>
        <ContactForm
          add={this.add}
          nameInputId={nanoid()}
          numberInputId={nanoid()}
        />
        <h2>Contacts</h2>
        <Filter handleChange={this.handleChange} filterInputId={nanoid()} />
        <ContactList
          contacts={contacts}
          filter={filter}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
