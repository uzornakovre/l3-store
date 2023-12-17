import { TEventType, TEventPayload } from 'types';

export const sendEvent = async (type: TEventType, payload: TEventPayload) => {
  const event = {
    type,
    payload,
    timestamp: new Date()
  };

  return fetch('/api/sendEvent', {
    method: 'POST',
    body: JSON.stringify(event)
  }).then(() => console.log(event));
};

export const isInViewport = (element: Element) => {
  const rect = element.getBoundingClientRect();
  const html = document.documentElement;
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || html.clientHeight) &&
    rect.right <= (window.innerWidth || html.clientWidth)
  );
};
