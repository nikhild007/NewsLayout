const WindowEventService = {
  fire: (event, body) => {
    const customEvent = new CustomEvent(event, { detail: body });
    window.dispatchEvent(customEvent);
  },
  subscribe: (event, listener) => {
    window.addEventListener(event, listener);
  },
  unsubscribe: (event, listener) => {
    window.removeEventListener(event, listener);
  },
};

export default WindowEventService;
