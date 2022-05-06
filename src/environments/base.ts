const base = document.querySelector('base');

export default {
  appName: 'today-preowned',
  baseUrl: (base && base.href) || window.location.origin + '/',
};
