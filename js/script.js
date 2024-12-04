const cards = document.querySelectorAll('.excursion-card');
const cart = document.getElementById('cart');
const cartItems = document.getElementById('cart-items');
const checkoutButton = document.getElementById('checkout-button');
const clearCartButton = document.querySelector('.clear-cart');
const totalCostElement = document.getElementById('total-cost'); // Элемент для отображения итоговой стоимости

let totalCost = 0; // Переменная для хранения текущей стоимости

// Обработчик для добавления/удаления экскурсии
cards.forEach(card => {
    card.addEventListener('click', () => {
        // Переключение подсветки карточки
        card.classList.toggle('selected');

        // Получение данных экскурсии
        const excursionName = card.dataset.name; // Название экскурсии
        const cartItem = Array.from(cartItems.children).find(item => item.dataset.name === excursionName); // Элемент в корзине
        const priceText = card.querySelector('.excursion-price > span').textContent.trim(); // Цена
        const excursionPrice = parseFloat(priceText.replace(/[^\d]/g, '')); // Цена в виде числа

        if (card.classList.contains('selected')) {
            // Если выбрана, добавляем в корзину
            if (!cartItem) {
                const li = document.createElement('li');
                li.dataset.name = excursionName; // Сохраняем название экскурсии в data-атрибуте
                li.textContent = `${excursionName} - ${excursionPrice.toLocaleString('ru-RU')} ₽`;
                cartItems.appendChild(li);
                totalCost += excursionPrice; // Увеличиваем итоговую стоимость
            }
        } else {
            // Если снята подсветка, удаляем из корзины
            if (cartItem) {
                cartItem.remove();
                totalCost -= excursionPrice; // Уменьшаем итоговую стоимость
            }
        }

        updateCartDisplay(); // Обновляем корзину
    });
});

// Очистка корзины
clearCartButton.addEventListener('click', () => {
    cartItems.innerHTML = ''; // Удаляем все элементы из корзины
    cards.forEach(card => card.classList.remove('selected')); // Убираем подсветку с карточек
    totalCost = 0; // Сбрасываем стоимость
    updateCartDisplay();
});

// Перенаправление по кнопке "Оплатить"
checkoutButton.addEventListener('click', () => {
    const items = Array.from(cartItems.querySelectorAll('li')).map(li => li.textContent); // Собираем выбранные экскурсии
    const query = items.join(", "); // Формируем строку запроса
    const baseUrl = "https://www.bing.com/search";
    window.location.href = `${baseUrl}?q=${encodeURIComponent(query)}`; // Перенаправляем на Bing
});

// Обновление отображения корзины и стоимости
function updateCartDisplay() {
    cart.style.display = cartItems.children.length > 0 ? 'block' : 'none'; // Показываем/скрываем корзину
    toggleCheckoutButton(); // Показываем/скрываем кнопку "Оплатить"
    totalCostElement.textContent = `Итоговая стоимость: ${totalCost.toLocaleString('ru-RU')} ₽`; // Обновляем итоговую стоимость
}

// Управление отображением кнопки "Оплатить"
function toggleCheckoutButton() {
    checkoutButton.style.display = cartItems.children.length > 0 ? 'block' : 'none';
}


//выбор карточки автоматически 
document.addEventListener('DOMContentLoaded', function () {
    // Получаем параметры из URL
    const params = new URLSearchParams(window.location.search);
    const selectedCity = params.get('city');

    if (selectedCity) {
        // Приводим выбранный город к верхнему регистру для сравнения
        const cityUpper = selectedCity.toUpperCase();

        // Найти все карточки экскурсий
        const cards = document.querySelectorAll('.excursion-card');

        cards.forEach(card => {
            // Получаем значение атрибута data-name
            const excursionName = card.getAttribute('data-name').toUpperCase();

            // Проверяем, содержит ли название города выбранный город
            if (!excursionName.includes(cityUpper)) {
                // Скрываем карточку, если город не совпадает
                card.style.display = 'none';
            }
        });

        // Сообщение, если карточек нет
        const visibleCards = document.querySelectorAll('.excursion-card:not([style*="display: none"])');
        if (visibleCards.length === 0) {
            const message = document.createElement('p');
            message.textContent = 'No excursions found for the selected city.';
            document.body.appendChild(message);
        }
    }
});