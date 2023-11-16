/* 
Урок 2. События, формы
Скрыть
Вашей задачей является создание веб-слайдера для отображения изображений на веб-странице. Слайдер должен позволять переключаться между изображениями и отображать их в центре экрана.

1. Создайте интерфейс веб-страницы, который включает в себя следующие элементы:

a. Контейнер для отображения текущего изображения.
b. Кнопки "Предыдущее изображение" и "Следующее изображение" для переключения между изображениями.
c. Навигационные точки (индикаторы) для быстрого переключения между изображениями.

2. Используйте HTML для создания элементов интерфейса.

3. Используйте JavaScript для обработки событий:

a. При клике на кнопку "Предыдущее изображение" должно отображаться предыдущее изображение.
b. При клике на кнопку "Следующее изображение" должно отображаться следующее изображение.
c. При клике на навигационные точки, слайдер должен переключаться к соответствующему изображению.

4. Слайдер должен циклически переключаться между изображениями, то есть после последнего изображения должно отображаться первое, и наоборот.

5. Добавьте стилизацию для слайдера и элементов интерфейса с использованием CSS для улучшения внешнего вида.
*/

const partialPathesOfImages = [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg',
    '6.jpg',
    '7.jpg',
    '8.jpg',
    '9.jpg',
    '10.jpg',
];

let getTemplateOfSlider = (imgs) => {
    return `
    <div class="slider">
            <div class="slider__img-block">
                ${getTemplateOfImages(imgs)}
            </div>
            <div class="slider__toolpad">
                <svg 
                class="slider__arrow slider__arrow_left"
                fill="#000000" width="80px" height="80px" viewBox="-128 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"/></svg>
                <svg 
                class="slider__arrow slider__arrow_right"
                fill="#000000" width="80px" height="80px" viewBox="-128 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"/></svg>
                <div class="slider__pagination">
                    ${getTemplateOfDottes(imgs.length)}
                </div>
            </div>
        </div>
    `
}

let getTemplateOfImages = (imgs) => {
    let temp = '';
    imgs.forEach((img, index) => {
        if (index === 0) {
            temp += `            
            <div class="slider__item">
                <img 
                    class="slider__img" 
                    src="img/${img}" 
                    alt="slide"
                >
            </div>`
        } 
        else {
            temp += `            
            <div class="slider__item slider__hidden">
                <img 
                    class="slider__img" 
                    src="img/${img}" 
                    alt="slide"
                >
            </div>`
        }
        
    });
    return temp;
}

let getTemplateOfDottes = (length) => {
    let temp = '';
    for (let index = 0; index < length; index++) {
        if (index === 0) {
        temp += `
        <a href="#" class="slider__dot-link slider__dot-link_active">
            <svg 
            class="slider__dot"
            width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </a>
        `
        } else {
            temp += `
        <a href="#" class="slider__dot-link">
            <svg 
            class="slider__dot"
            width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </a>
        `
        }
    }
    return temp;
}




const contentEl = document.querySelector('.content');
contentEl.innerHTML = getTemplateOfSlider(partialPathesOfImages);

const leftArrowEl = contentEl.querySelector('.slider__arrow_left');
const rightArrowEl = contentEl.querySelector('.slider__arrow_right');
const imgBlocksArrEl = contentEl.querySelectorAll('.slider__item');
const linksArrEl = contentEl.querySelectorAll('.slider__dot-link');
const paginationEl = contentEl.querySelector('.slider__pagination');

let index = 0;
const lastIndex = imgBlocksArrEl.length - 1;


const toggleSlide = (currentIndex, nextIndex) => {
    imgBlocksArrEl[currentIndex].classList.add('slider__hidden');
    linksArrEl[currentIndex].classList.remove('slider__dot-link_active');
    imgBlocksArrEl[nextIndex].classList.remove('slider__hidden');
    linksArrEl[nextIndex].classList.add('slider__dot-link_active');
}


const handlerForLeftArrow = () => {
    let nextIndex;
    let currentIndex = index;
    if (index === 0) {
        nextIndex = lastIndex;
    } else {
        nextIndex = --index;
    }
    toggleSlide(currentIndex, nextIndex);
}

const handlerForRightArrow = () => {
    let nextIndex;
    let currentIndex = index;
    if (index === lastIndex) {
        nextIndex = 0;
    } else {
        nextIndex = ++index;
    }
    toggleSlide(currentIndex, nextIndex);
}

leftArrowEl.addEventListener('click', () => handlerForLeftArrow());

rightArrowEl.addEventListener('click', () => handlerForRightArrow());


document.addEventListener('keyup', (event) => {
    if(event.code === 'ArrowRight') {
        handlerForRightArrow();
    }
    if(event.code === 'ArrowLeft') {
        handlerForLeftArrow();
    }
});