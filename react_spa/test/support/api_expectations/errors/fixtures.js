export function flowError({message='Invalid request data.', details={}}={}) {
  return {
    error: {
      message,
      details,
      type: 'flow_error'
    }
  };
}
