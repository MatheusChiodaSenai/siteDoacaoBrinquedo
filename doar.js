document.addEventListener('DOMContentLoaded', () => {
  const amountButtons = document.querySelectorAll('.amount-btn');
  const amountInput = document.querySelector('.amount-input');
  const paymentButtons = document.querySelectorAll('.payment-btn');
  const donateValue = document.querySelector('.donate-btn__value');

  function updateDonateValue(value) {
    donateValue.textContent = value ? value : '-';
  }


  amountButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      amountButtons.forEach(b => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      amountInput.value = btn.dataset.value;
      updateDonateValue(btn.dataset.value);
    });
  });

 
  amountInput.addEventListener('input', () => {
    amountButtons.forEach(b => b.classList.remove('is-selected'));
    updateDonateValue(amountInput.value);
  });

 
  paymentButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      paymentButtons.forEach(b => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
    });
  });
});
