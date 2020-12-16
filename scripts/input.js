const main = document.getElementById('main');

main.addEventListener('click', () => {
  const inputs = document.querySelectorAll('.effect-16');
  inputs.forEach((input) => {
    input.value === ''
      ? input.classList.remove('has-content')
      : input.classList.add('has-content');
  });
});

main.addEventListener('keydown', () => {
  const inputs = document.querySelectorAll('.effect-16');
  inputs.forEach((input) => {
    input.value === ''
      ? input.classList.remove('has-content')
      : input.classList.add('has-content');
  });
});
