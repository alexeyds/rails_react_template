import React, { useContext, createContext } from "react";

let RequestContext = createContext();
let ErrorsContext = createContext();

export function FormContext({request, errors, children}) {
  return (
    <RequestContext.Provider value={request}>
      <ErrorsContext.Provider value={errors}>
        {children}
      </ErrorsContext.Provider>
    </RequestContext.Provider>
  );
}

export function useFormContext() {
  let request = useContext(RequestContext);
  let errors = useContext(ErrorsContext);

  return { request, errors };
}
