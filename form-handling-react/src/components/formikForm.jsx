import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function FormikForm() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const onSubmit = (values, { resetForm }) => {
    console.log("Formik Submitted:", values);
    alert("Formik Registration Successful!");
    resetForm();
  };

  return (
    <div>
      <h2>Formik Registration</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div>
            <label>Username:</label><br />
            <Field type="text" name="username" />
            <ErrorMessage name="username" component="p" style={{color: "red"}} />
          </div>

          <div>
            <label>Email:</label><br />
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="p" style={{color: "red"}} />
          </div>

          <div>
            <label>Password:</label><br />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="p" style={{color: "red"}} />
          </div>

          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
}