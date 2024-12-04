document.querySelector('.search-form__submit').addEventListener('click', (e) => {
    e.preventDefault(); // Предотвращает отправку формы

    const purpose = document.querySelector('#visit-purpose').value;
    const city = document.querySelector('#destination').value;

    alert(`Purpose: ${purpose}\nDestination: ${city}`);
});

