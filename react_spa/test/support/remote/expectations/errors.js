import expect from "test/support/remote/expect";

export function expectFlowError(path, error=flowError()) {
  expect(path, { 
    response: { body: error, status: 422 }
  });
}

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
