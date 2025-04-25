import { useState } from 'react'
import './App.css'
import fetchPhotos from '../gallery-api.ts'
import ErrorMessage from '../ErrorMessage/ErrorMessage.ts'
import ImageGallery from '../ImageGallery/ImageGallery.ts'
import ImageModal from '../ImageModal/ImageModal.ts'
import Loader from '../Loader/Loader.js'
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.ts'
import SearchBar from '../SearchBar/SearchBar.ts'

type Photo = {
  id: number;
  urls: {
      regular: string;
      small: string;
  };
      description?: string;
}

function App() {
  const [gallery, setGallery] = useState<Photo[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  async function handleSubmit (search:string) {
    try {
      setLoading(true);
      setError(null);
      setGallery([]);
      setSearch(search);
      const data = await fetchPhotos(search) as Photo[];
      setGallery(data);
    } catch(error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }
  const handleLoadMore = async() => {
    try {
      setLoading(true);
      const nextPage = page + 1;
      const data = await fetchPhotos(search, nextPage) as Photo[];
      setGallery((prevGallery) => [...prevGallery, ...data]);
      setPage(nextPage);
    } catch (error) {
      setError(`Failed to load more images. Error ${error}`);
    } finally {
      setLoading(false);
    }
  }

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalIsOpen(false);
  };

  
  return (
    <>
      <SearchBar onSubmit={handleSubmit}/>
      {error && <ErrorMessage message={error} />}
      {loading && <Loader/>}
      {!loading && gallery.length === 0 && search !=='' && <p>No photos found.</p>}
      {gallery.length > 0 && (
    <>
      <ImageGallery photos={gallery} onImageClick={openModal}/>
      <LoadMoreBtn onClick={handleLoadMore} />
    </>
  )}
  <ImageModal
      isOpen={modalIsOpen}
      onClose={closeModal}
      imageSrc={selectedImage}
    /></>
  )
}

export default App