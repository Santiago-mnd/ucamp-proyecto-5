export const getCurrentEmail = () => {
  return JSON.parse(localStorage.getItem('email'));
};
