// HTML містить розмітку форми, в поля якої користувач буде вводити першу затримку в мілісекундах, крок збільшення
// затримки для кожного промісу після першого і кількість промісів, яку необхідно створити.
// Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay) стільки разів, скільки ввели в
// поле amount.Під час кожного виклику передай їй номер промісу(position), що створюється, і затримку, враховуючи першу затримку(delay),
//   введену користувачем, і крок(step).
// Доповни код функції createPromise таким чином, щоб вона повертала один проміс, який виконується або відхиляється через delay часу.
//  Значенням промісу повинен бути об'єкт, в якому будуть властивості position і delay зі значеннями однойменних параметрів.
//  Використовуй початковий код функції для вибору того, що потрібно зробити з промісом - виконати або відхилити.
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const ref = document.querySelector('.form');
ref.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const stepValue = Number(ref.step.value);
  const amountValue = Number(ref.amount.value);
  let delay = Number(ref.delay.value);

  for (let i = 0; i < amountValue; i += 1) {
    const position = i + 1;

    createPromise(position, delay)
      .then(resolve => Notify.success(resolve))
      .catch(reject => Notify.failure(reject));

    delay += stepValue;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
  });
}
