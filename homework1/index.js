/* 
Задание 1
Отслеживание изменения ориентации экрана:
Напишите код, который отслеживает изменение ориентации экрана устройства (с портретной на ландшафтную и наоборот) и выводит сообщение об этом на веб-странице.
*/
console.log('------------------');
console.log('Задание 1');

window.addEventListener('DOMContentLoaded', () => {
    console.log(`Ориентация экрана: ${screen.orientation.angle === 90 ? 'ландшафная' : 'портретная'}`);
})

window.addEventListener('orientationchange', () => {
    console.log(`Ориентация экрана: ${screen.orientation.angle === 90 ? 'ландшафная' : 'портретная'}`);
})
/* 
Задание 2
Предупреждение о несохраненных данных:
Создайте веб-форму с текстовым полем. Реализуйте функционал, при котором при попытке закрыть вкладку браузера появляется диалоговое окно с предупреждением о возможности потери введенных, но несохраненных данных.
*/
console.log('------------------');
console.log('Задание 2');

const inputEl = document.querySelector('.input');

/* window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    console.log(1)
    if (inputEl.value.trim() == '') {
        console.log(2)
        confirm('Закрытие окна приведет к потере несохраненных данных. Вы уверены, что хотите покинуть страницу, не отправив форму?');
    }
}) */

const beforeUnloadHandler = event => {
    event.preventDefault();
    // Кастомное отображение сообщения не работает при событии beforeunload
    return event.returnValue = 'Закрытие окна приведет к потере несохраненных данных. Вы уверены, что хотите покинуть страницу, не отправив форму?';

    // Игнорируется по версии HTML спецификации
    // confirm('Закрытие окна приведет к потере несохраненных данных. Вы уверены, что хотите покинуть страницу, не отправив форму?');
}

inputEl.addEventListener('input', event => {
    if(event.target.value.trim() !== '') {
        addEventListener('beforeunload', beforeUnloadHandler, {capture: true});
    } else {
        removeEventListener("beforeunload", beforeUnloadHandler, {capture: true});
    }
})