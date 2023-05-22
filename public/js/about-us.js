// const sliderContainer = document.querySelector('.historia-carrusel');
// const selectorContainer = document.querySelector('.historia-carrusel__link');
// const selectors = document.querySelectorAll('.historia-carrusel__selector');
// const slides = document.querySelectorAll('.historia-slider-container__slides img');
// const slideCount = slides.length;

// let currentIndex = 0;

// function showSlide(index) {
//   if (index < 0) {
//     index = slideCount - 1;
//   } else if (index >= slideCount) {
//     index = 0;
//   }

//   sliderContainer.querySelector('.slide-active').classList.remove('slide-active');
//   slides[index].classList.add('slide-active');
//   currentIndex = index;

//   selectorContainer.querySelector('.active').classList.remove('active');
//   selectors[index].classList.add('active');
// }

// function nextSlide() {
//   showSlide(currentIndex + 1);
// }

// function prevSlide() {
//   showSlide(currentIndex - 1);
// }

// slides.forEach((slide, index) => {
//   slide.style.left = `${index * 100}%`;

//   const selector = selectors[index];
//   selector.addEventListener('click', () => {
//     showSlide(index);
//   });
// });

// showSlide(currentIndex);

// setInterval(() => {
//   nextSlide();
// }, 5000);
