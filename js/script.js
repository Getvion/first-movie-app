const
  modalTrigger = document.querySelector('.show-modal'),
  modal = document.querySelector('.modal'),
  modalCloseBtn = document.querySelector('[data-close]');

function openModal() {
  modal.classList.toggle('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.toggle('show');
  document.body.style.overflow = '';
}
modalTrigger.addEventListener('click', openModal);
// modalTrigger.forEach(btn => {
//   btn.addEventListener('click', openModal);
// });



modalCloseBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 27 && modal.classList.contains('show')) {
    closeModal();
  }
});

