import { fetchImages } from './js/pixabay-api.js';
import { renderImages, showError, clearGallery, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#searchform');
const loadMoreButton = document.querySelector('#loadmore');
const loader = document.querySelector('#loader');
const lightbox = new SimpleLightbox('.gallery a');

let searchQuery = '';
let currentPage = 1;
const perPage = 15;


form.addEventListener('submit', async (event) => {
    event.preventDefault();
    searchQuery = event.target.elements.query.value.trim();
    currentPage = 1; // Reset to first page
    clearGallery();

    if (!searchQuery) {
        showError('Please enter a search query', 'topRight');
        return;
    }
    loader.style.display = 'block';
    try {
        const data = await fetchImages(searchQuery, currentPage);
        renderImages(data.hits);
        lightbox.refresh();

        if (data.totalHits > 0) {
            if (data.totalHits > 15) {
                showLoadMoreButton();
            } else {
                hideLoadMoreButton();
                showError("We're sorry, but you've reached the end of search results.", 'bottomRight' );
            
            }
        } else {
            hideLoadMoreButton();
            showError('No images found', 'topRight');
        }
    } catch (error) {
        showError('Failed to load images. Please try again later.', 'topRight');
    } finally {
        loader.style.display = 'none';
    }
});

loadMoreButton.addEventListener('click', async () => {
    currentPage += 1;
    loader.style.display = 'block';
    try {
        const data = await fetchImages(searchQuery, currentPage);
        renderImages(data.hits);
        lightbox.refresh();

         const galleryItem = document.querySelector('.gallery-item');
        if (galleryItem) {
            const { height } = galleryItem.getBoundingClientRect();
            window.scrollBy({
                top: height * 2, // Прокрутка на дві висоти карточки
                behavior: 'smooth' // Плавна прокрутка
            });
        }



         // Перевірка на кінець колекції
        if (data.hits.length < perPage || currentPage * perPage >= data.totalHits) {
            hideLoadMoreButton();
            showError("We're sorry, but you've reached the end of search results.", 'bottomRight');

        }
    } catch (error) {
        showError('Failed to load more images. Please try again later.', 'topRight');
    } finally {
        loader.style.display = 'none';
    }
});

        

  
