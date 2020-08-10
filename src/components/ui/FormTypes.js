import React from "react";

import { useField } from "formik";

const FormInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="form-group">
        <label className="f-w--6" htmlFor={props.id || props.name}>
          {label}
        </label>
        <input className="form-control" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="form-text text-danger error-text">{meta.error}</div>
        ) : null}
      </div>
    </>
  );
};

export { FormInput };
