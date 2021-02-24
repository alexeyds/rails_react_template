export function flowError({message='Something went wrong.'}={}) {
  let body = {
    error: {
      message,
      details: {},
      type: 'flow_error'
    }
  };

  return { body, status: 422 };
}

export function validationError({details={}}={}) {
  let body = {
    error: {
      message: 'Invalid request data.',
      details,
      type: 'validation_error'
    }
  };

  return { body, status: 422 };
}

export function authenticationError() {
  let body = {
    error: {
      message: 'Unauthenticated.',
      details: {},
      type: 'authentication_error'
    }
  };

  return { body, status: 401 };
}

export function notFoundError() {
  return { body: '', status: 404 };
}
