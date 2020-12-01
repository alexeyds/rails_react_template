export function flowError({message='Something went wrong.', details={}}={}) {
  return {
    error: {
      message,
      details,
      type: 'flow_error'
    }
  };
}

export function validationError({message='Invalid request data.', details={}}={}) {
  return {
    error: {
      message,
      details,
      type: 'validation_error'
    }
  };
}
