export const WindowEventService = {
  fire: (event, body) => {
    const customEvent = new CustomEvent(event, body);

    window.dispatchEvent(customEvent);
  },
  subscribe: (event, listener) => {
    window.addEventListener(event, listener);
  },
  unsubscribe: (event, listener) => {
    window.removeEventListener(event, listener);
  },
};
