export const FILTER_STATE = (subName: string) => (payload, variables) =>
  payload[subName].state === variables.input.subscribe.state;
