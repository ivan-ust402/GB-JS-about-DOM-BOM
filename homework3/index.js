const likeBtnEl = document.querySelector('.daily-photo__like-btn');
const photoCardEl = document.querySelector('.daily-photo');

likeBtnEl.addEventListener('click', () => {
    // daily-photo__like-btn_active
    likeBtnEl.classList.toggle('daily-photo__like-btn_active');
    photoCardEl.classList.toggle('daily-photo_active');
});