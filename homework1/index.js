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