import PropTypes from 'prop-types';

export const Filter = ({ handleChange, filterInputId }) => {
  return (
    <div>
      <p>Find contacts by name</p>
      <input
        onChange={handleChange}
        type="text"
        name="filter"
        id={filterInputId}
        pattern="^[a-zA-Zа-яА-Я]+((['\s\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      />
    </div>
  );
};

Filter.propTypes = {
  handleChange: PropTypes.func.isRequired,
  filterInputId: PropTypes.string.isRequired,
};
