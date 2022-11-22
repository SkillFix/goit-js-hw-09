import Notiflix from 'notiflix';
const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const btnCreatePromise = document.querySelector('button[type="submit"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

btnCreatePromise.addEventListener('click', e => {
  e.preventDefault();
  btnCreatePromise.disabled = true;

  let firstDelay = Number(delay.value);
  let delayStep = Number(step.value);
  let sumDelaysStep = 0;

  for (let i = 1; i < amount.value; i += 1) {
    sumDelaysStep += delayStep;
    createPromise(i, firstDelay + i * delayStep)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      })
      .finally(() => {
        const totalDelay = (firstDelay += sumDelaysStep);
        setTimeout(() => {
          btnCreatePromise.disabled = false;
        }, totalDelay);
      });
  }
});
