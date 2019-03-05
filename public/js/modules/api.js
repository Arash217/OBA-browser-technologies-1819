const username = '9a3b72cc-6f4b-4023-b9fe-d414d684b45b';
const password = 'M39PJCP';

export const get = async () => {
  const res = await fetch('https://api.cdr.nl/engine/version');
  console.log(res);
};