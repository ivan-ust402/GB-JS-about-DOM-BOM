'use strict';
// Зарегистрируйтесь или войдите в свой аккаунт unsplash,
// Создайте новое приложение, получите свой ACCESS_KEY и вставьте 
// его на место строки 'MY_ACCESS_KEY' для проверки работоспособности 
// приложения
const MY_ACCESS_KEY = 'INSERT YOUR ACCESS_KEY';
const photoCardEl = document.querySelector('.daily-photo');


function fetchPhotoById(id) {
    fetch(`https://api.unsplash.com/photos/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Client-ID ${MY_ACCESS_KEY}`
        }
    })
        .then(response => response.json())
        .then(data => {
            photoCardEl.innerHTML = getTemplateDailyPhoto(data);
            toggleLike(data, photoCardEl);
        })
        .catch(e => {
            console.log(e.message);
        })
}

function fetchRandomPhoto() {
    fetch(`https://api.unsplash.com/photos/random/`, {
        method: 'GET',
        headers: {
            'Authorization': `Client-ID ${MY_ACCESS_KEY}`
        }
    })
        .then(response => response.json())
        .then(data => {
            photoCardEl.innerHTML = getTemplateDailyPhoto(data);
            localStorage.setItem('photoid', data.id);
            toggleLike(data, photoCardEl);
        })
        .catch(e => {
            console.log(e.message);
        })
}

function addLikeToPhoto(id) {
    fetch(`https://api.unsplash.com/photos/${id}/like`, {
        method: 'POST',
        headers: {
            'Authorization': `Client-ID ${MY_ACCESS_KEY}`
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Отвечает сокращенными версиями пользователя и понравившейся фотографии.
        })
        .catch(e => {
            console.log(e.message);
        })
}

function removeLikeFromPhoto(id) {
    fetch(`https://api.unsplash.com/photos/${id}/like`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Client-ID ${MY_ACCESS_KEY}`
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Отвечает статусом 204 и пустым телом.
        })
        .catch(e => {
            console.log(e.message);
        })
}

function getTemplateDailyPhoto(data) {
    return `
    <div class="daily-photo ${data.liked_by_user ? 'daily-photo_active': ''}">
    <img
      class="daily-photo__image"
      src="${data.urls.regular}"
      alt="random photo from unsplash.com"
    />
    <div class="daily-photo__info">
      <h3 class="daily-photo__author-name">
        <span>Author: </span>${data.user.name}
      </h3>
      <div class="daily-photo__like-container">
        
        <button class="daily-photo__like-btn ${data.liked_by_user ? 'daily-photo__like-btn_active': ''}">
          Мне нравится
          <svg
            fill="#000000"
            height="50px"
            width="50px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512.001 512.001"
            xml:space="preserve"
          >
            <g>
              <g>
                <circle cx="110.202" cy="394.611" r="17.302" />
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M501.619,301.273c0-8.503-2.634-16.4-7.121-22.929c10.566-7.335,17.503-19.547,17.503-33.354
                      c0-22.378-18.206-40.585-40.583-40.585H364.723l6.758-15.152c9.88-22.156,14.916-45.692,14.968-69.951
                      c0,0,0.061-29.607,0.061-29.773c0-22.999-18.711-41.711-41.711-41.711c-17.096,0-32.282,10.241-38.688,26.092
                      c-0.282,0.699-9.989,29.296-9.989,29.296c-8.753,25.429-24.283,47.989-44.908,65.245l-49.492,41.403H173.11v-13.061
                      c0-13.721-11.163-24.885-24.885-24.885H24.885C11.163,171.908,0,183.071,0,196.793v242.506c0,13.721,11.163,24.885,24.885,24.885
                      h123.338c13.721,0,24.885-11.163,24.885-24.885v-19.48h15.621l15.509,7.497c36.688,17.734,77.618,27.108,118.367,27.108h56.72
                      h17.302h43.644c22.378,0,40.585-18.206,40.585-40.583c0-8.503-2.634-16.4-7.121-22.929c10.566-7.335,17.503-19.547,17.503-33.354
                      c0-8.503-2.634-16.4-7.121-22.929C494.683,327.294,501.619,315.081,501.619,301.273z M148.223,439.299H24.885V196.792h123.338
                      l0.016,242.506C148.239,439.298,148.234,439.299,148.223,439.299z M471.418,260.691h-17.706c-6.872,0-12.442,5.57-12.442,12.442
                      c0,6.872,5.57,12.442,12.442,12.442h7.324c8.657,0,15.7,7.042,15.7,15.7s-7.042,15.7-15.7,15.7h-17.704
                      c-6.872,0-12.442,5.57-12.442,12.442s5.57,12.442,12.442,12.442h7.324c8.656,0,15.7,7.042,15.7,15.7
                      c0,8.656-7.042,15.699-15.7,15.699h-17.704c-6.872,0-12.442,5.57-12.442,12.442s5.57,12.442,12.442,12.442h7.324
                      c8.657,0,15.7,7.044,15.7,15.7c-0.002,8.654-7.045,15.696-15.702,15.696h-43.644h-17.302h-56.72
                      c-37.021,0-74.206-8.516-107.537-24.627l-18.075-8.737c-1.688-0.816-3.54-1.241-5.415-1.241h-18.471V234.737h33.13
                      c2.919,0,5.745-1.026,7.983-2.899l52.957-44.302c24.1-20.16,42.244-46.521,52.471-76.232c0,0,9.9-28.823,9.958-29.019
                      c2.79-5.852,8.64-9.582,15.191-9.582c9.278,0,16.826,7.548,16.826,16.826c0,0.165-0.061,29.721-0.061,29.721
                      c-0.044,20.764-4.354,40.906-12.811,59.869l-14.493,32.502c-1.27,2.849-1.374,5.918-0.53,8.685
                      c0.071,0.245,2.758,8.986,11.946,8.986h125.743c8.656,0,15.699,7.042,15.699,15.7
                      C487.116,253.648,480.074,260.691,471.418,260.691z"
                />
              </g>
            </g>
          </svg>
        </button>
        <span class="daily-photo__like-count">${formatLikeCount(Number(data.likes))}</span>
      </div>
      
    </div>
  </div>
    `
}

function formatLikeCount(count) {
    if (count > 999 && count < 1000000) {
        return `${count / 1000}K`;
    } else if (count > 999999 && count < 1000000000) {
        return `${count / 1000000}M`;
    } else if (count > 999999999 && count < 1000000000000) {
        return `${count / 1000000000}B`;
    } else if (count > 999999999999){
        return `over a billion`;
    }
    return count;
}

function setCookie (name, value, days) {
    let expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);  
    
    let cookieValue = encodeURIComponent(value) + '; expires=' 
        + expirationDate.toUTCString();
    document.cookie = name + '=' + cookieValue;
}

function setCookieMinutes (name, value, minutes) {
    let expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + minutes);  
    
    let cookieValue = encodeURIComponent(value) + '; expires=' 
        + expirationDate.toUTCString();
    document.cookie = name + '=' + cookieValue;
}

function getCookie (name) {
    let cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        let [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}

function deleteCookie (name) {
    setCookie(name, "", 0);
}

function checkDate() {
    if (getCookie('request') === null){
        setCookieMinutes('request','request', 1);
        fetchRandomPhoto();
    } else {
        const id = localStorage.getItem('photoid');
        fetchPhotoById(id);
    }
}

function toggleLike(data, rootEl) {
    let liked = data.liked_by_user;
    let currentCount = Number(data.likes);
    const likeBtnEl = rootEl.querySelector('.daily-photo__like-btn');
    const countLikesEl = rootEl.querySelector('.daily-photo__like-count');
    
    likeBtnEl.addEventListener('click', () => {
        if (liked === true) {
            liked = false;
            currentCount -= 1;
            likeBtnEl.classList.remove('daily-photo__like-btn_active');
            photoCardEl.classList.remove('daily-photo_active');
            countLikesEl.textContent = formatLikeCount(currentCount);
            removeLikeFromPhoto(data.id);

        } else if (liked === false){
            liked = true;
            currentCount += 1;
            likeBtnEl.classList.add('daily-photo__like-btn_active');
            photoCardEl.classList.add('daily-photo_active');
            countLikesEl.textContent = formatLikeCount(currentCount);
            addLikeToPhoto(data.id);
        }
        
    });
}

checkDate();

// Функция для ежедневной смены фото
setInterval(() => {
    if (getCookie('request') === null) {
        setCookieMinutes('request','request', 1);
        fetchRandomPhoto();
    }
}, 3600000);

// Функция для ежеминутной смены фото
// setInterval(() => {
//     if (getCookie('request') === null) {
//         setCookieMinutes('request','request', 1);
//         fetchRandomPhoto();
//     }
// }, 70000);






