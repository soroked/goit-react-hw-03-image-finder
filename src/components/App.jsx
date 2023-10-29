import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import ButtonModal from './Loader/ButtonModal';

// 1. СВГ не показуєтсья
// 2. прокручування не працює

export class App extends Component {
  state = {
    searchName: '',
    page: 1,
    images: [],
    isLoading: false,
    error: null,
    imageId: null,
    totalHits: null,
  };

  componentDidMount() {}

  async componentDidUpdate(_, { searchName: prevSearchName, page: prevPage }) {
    const { searchName, page } = this.state;

    if (searchName !== prevSearchName) {
      this.fetchData(searchName, page);
      return;
    }

    if (page !== prevPage) {
      this.fetchData(searchName, page);
      window.scrollBy({ top: 100, behavior: 'smooth' });
      return;
    }
  }

  async fetchData(searchName, page) {
    try {
      this.setState({ isLoading: true });

      const response = await fetch(
        `https://pixabay.com/api/?q=${searchName}&page=${page}&key=39437968-8994b31ccac94168d8d24ad3e&image_type=photo&orientation=horizontal&per_page=12`
      ).then(resp => resp.json());

      if (!response.hits.length) {
        throw new Error(`There are no images for ${searchName}`);
      }

      this.setState({
        images: [...this.state.images, ...response.hits],
        totalHits: response.totalHits,
      });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  getSearchName = searchName => {
    const normalizedName = searchName.trim().toLowerCase();

    if (!normalizedName) {
      alert('Please enter something into the search field!');
      return;
    }
    if (this.state.searchName === normalizedName) {
      alert(`You are already searching for ${normalizedName}`);
      return;
    }
    this.setState({
      searchName: normalizedName,
      images: [],
      error: null,
      page: 1,
      totalHits: null,
    });
  };

  loadMore = () => {
    const pageIncrement = this.state.page + 1;
    this.setState({ page: pageIncrement });
  };

  onImageClick = imageId => {
    this.setState({ imageId });
  };

  handleCloseModal = () => {
    this.setState({ imageId: null });
  };

  render() {
    const { imageId, images, isLoading, error, totalHits, page } = this.state;

    let image = null;
    if (imageId) {
      image = images.find(({ id }) => id === imageId);
    }

    return (
      <>
        <Searchbar onSubmit={this.getSearchName} />
        {isLoading && <ButtonModal />}
        {images.length !== 0 && (
          <>
            <ImageGallery images={images} onImageClick={this.onImageClick} />
            {page * 12 < totalHits && <Button onClick={this.loadMore} />}
          </>
        )}
        {error !== null && `${error}`}
        {imageId && (
          <Modal image={image} handleCloseModal={this.handleCloseModal} />
        )}
      </>
    );
  }
}
