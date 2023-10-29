import { Component } from 'react';
import { BsSearchHeartFill } from 'react-icons/bs';

export default class Searchbar extends Component {
  state = {
    searchName: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.searchName);
    this.resetForm();
  };

  handleInputChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  resetForm = () => {
    this.setState({ searchName: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <BsSearchHeartFill className="SearchForm-button-label" />
          </button>

          <input
            className="SearchForm-input"
            type="text"
            name="searchName"
            value={this.state.searchName}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}
