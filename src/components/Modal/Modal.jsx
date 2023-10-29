import { Component } from 'react';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
    document.body.style.overflowY = 'hidden';
    // by clicking on a pic a window scrolls to the top
    // document.body.style.position = 'fixed';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
    document.querySelector('body').style.overflow = 'auto';
    // document.querySelector('body').style.position = 'absolute';
  }

  closeModal = e => {
    if (e.target.className === 'Overlay') {
      this.props.handleCloseModal();
      return;
    }

    if (e.code === 'Escape') {
      this.props.handleCloseModal();
      return;
    }
  };

  render() {
    const { largeImageURL, tags } = this.props.image;

    return (
      <div className="Overlay" onClick={this.closeModal}>
        <div className="Modal">
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}
