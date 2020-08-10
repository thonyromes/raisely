import React from "react";

import { Formik, Form } from "formik";

import { FormInput } from "../ui/FormTypes";

import * as Yup from "yup";

const Register = () => {
  return (
    <>
      <div className="wrapper">
        <main className="container-fluid">
          <div className="row">
            <div className="card col-11 col-sm-10 col-lg-8 col-xl-6 mx-auto my-5 py-3 px-md-5 border-0 shadow-sm">
              <div className="card-body px-0">
                <h4 className="text-center display-4">Raisely</h4>
                <div className="row">
                  <h4 className="col-12 col-md-6 mx-auto text-center mb-5 mb-md-5 f-w--6">
                    Create your Account
                  </h4>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 mx-auto">
                    <Formik
                      initialValues={{
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                      }}
                      validationSchema={Yup.object({
                        //Form validation
                        firstName: Yup.string()
                          .trim()
                          .required("First name Cannot be empty")
                          .max(50, "First name Must be 20 characters or less"),

                        lastName: Yup.string()
                          .trim()
                          .required("Last name Cannot be empty")
                          .max(50, "Last name Must be 20 characters or less"),

                        email: Yup.string()
                          .trim()
                          .required("Email Cannot be empty")
                          .email("Email address is not vaild"),

                        password: Yup.string()
                          .trim()
                          .required("Password Cannot be empty")
                          .min(8, "Password should be at least 8 chars long"),

                        confirmPassword: Yup.string()
                          .trim()
                          .required("Confirm Password Cannot be empty")
                          .oneOf(
                            [Yup.ref("password"), null],
                            "Passwords don't match"
                          ),
                      })}
                      onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                          // Insert using vanilla fetch api

                          let data = JSON.parse(JSON.stringify(values));
                          delete data.confirmPassword;

                          let user = {
                            campaignUuid:
                              "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
                            data,
                          };

                          fetch("https://api.raisely.com/v3/signup", {
                            method: "POST",
                            body: JSON.stringify(user),
                            headers: {
                              "Content-type": "application/json; charset=UTF-8",
                            },
                          })
                            .then(function (response) {
                              if (response.ok) {
                                return response.json();
                              }
                              return Promise.reject(response);
                            })
                            .then(function (data) {
                              console.log(data);
                              alert("Success, please check console");
                            })
                            .catch(function (error) {
                              console.log("Something went wrong.", error);
                            });

                          setSubmitting(false);
                        }, 250);
                      }}
                    >
                      {(formik) => (
                        <Form
                          className="form-horizontal form-custom"
                          onSubmit={formik.handleSubmit}
                        >
                          <div className="row">
                            <div className="col-12 col-md-6">
                              <FormInput
                                label="First name"
                                name="firstName"
                                type="text"
                                placeholder="Enter First name"
                                aria-label="firstName"
                                aria-describedby="firstName"
                              />
                            </div>
                            <div className="col-12 col-md-6">
                              <FormInput
                                label="Last name"
                                name="lastName"
                                type="text"
                                placeholder="Enter Last name"
                                aria-label="lastName"
                                aria-describedby="lastName"
                              />
                            </div>
                            <div className="col-12 col-md-6">
                              <FormInput
                                label="Email address"
                                name="email"
                                type="email"
                                placeholder="Enter Email address"
                                aria-label="email"
                                aria-describedby="email"
                              />
                            </div>

                            <div className="col-12 col-md-6">
                              <FormInput
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="Enter Password"
                                aria-label="password"
                                aria-describedby="password"
                              />
                            </div>

                            <div className="col-12 col-md-6">
                              <FormInput
                                label="Confirm password"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm password"
                                aria-label="confirmPassword"
                                aria-describedby="confirmPassword"
                              />
                            </div>
                          </div>
                          <div className="form-group mt-4">
                            <button
                              className="btn btn-dark btn-block btn-lg f-w--6"
                              type="submit"
                              disabled={formik.isSubmitting ? true : false}
                            >
                              {formik.isSubmitting
                                ? "Please wait..."
                                : "Register"}
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Register;
