import React from "react";
import { useForm } from "react-hook-form";
import ClosestForm, { ClosestFormContext } from "form/closest_form";

export default function Form({name, defaultValues, onSubmit, ...customProps}) {
  let { register, handleSubmit } = useForm();
  let closestForm = new ClosestForm({name, defaultValues, register});

  let submit = handleSubmit(data => {
    onSubmit(closestForm.extractSubmittedData(data));
  });

  return (
    <ClosestFormContext.Provider value={closestForm}>
      <form name={closestForm.name} onSubmit={submit} {...customProps}/>
    </ClosestFormContext.Provider>
  );
}
