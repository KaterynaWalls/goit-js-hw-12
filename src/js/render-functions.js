import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const renderImages = (images) => {
    const gallery = document.querySelector('.gallery');
    const markup = images
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
            <li class="gallery-item">
                <a href="${largeImageURL}" class="gallery-link">
                    <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
                    <div class="info">
                        <p class="info-item"><b>Likes:</b> ${likes}</p>
                        <p class="info-item"><b>Views:</b> ${views}</p>
                        <p class="info-item"><b>Comments:</b> ${comments}</p>
                        <p class="info-item"><b>Downloads:</b> ${downloads}</p>
                    </div>
                </a>
            </li>
        `)
        .join('');
    gallery.insertAdjacentHTML('beforeend', markup);
};

export const showError = (message, position = 'topRight') => {
    iziToast.error({
        title: 'Error',
        message: message,
        position: position,
        timeout: 2000,
        backgroundColor: '#EF4040',
    });


   
    setTimeout(() => {
        errorMessage.classList.add('fade-out');
        setTimeout(() => {
            errorMessage.remove();
        }, 500);
    }, 3000);
};

export const clearGallery = () => {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
};

export const showLoadMoreButton = () => {
    const loadMoreButton = document.querySelector('#loadmore');
    loadMoreButton.style.display = 'block';
};

export const hideLoadMoreButton = () => {
    const loadMoreButton = document.querySelector('#loadmore');
    loadMoreButton.style.display = 'none';
};
