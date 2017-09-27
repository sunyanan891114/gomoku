export const hideModal = () => {
  document.getElementsByClassName('modal')[0].className = "modal";
};

export const showModal = (text) => {
  document.getElementsByClassName('modal')[0].className = "modal active";
  document.getElementsByClassName('modal__info')[0].innerHTML = text;
};
