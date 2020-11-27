export function flowError({message='Invalid request data.'}) {
  return {
    error: {
      message,
      details: {},
      type: 'flow_error'
    }
  };
}
