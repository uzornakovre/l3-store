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
