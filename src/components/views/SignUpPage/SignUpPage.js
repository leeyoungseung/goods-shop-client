import React from "react";
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { signUp } from "../../../_actions/auth_actions";
import { useDispatch } from "react-redux";

import { Form, Input, Button } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function RegisterPage(props) {
  const dispatch = useDispatch();
  return (

    <Formik
      initialValues={{
        email: '',
        givenname: '',
        familyname: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object().shape({
        givenname: Yup.string()
          .required('Given Name is required'),
        familyname: Yup.string()
          .required('Family Name is required'),
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(8, 'Password must be at least 8 characters')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          let dataToSubmit = {
            username: values.email,
            password: values.password,
            givenName: values.givenname,
            familyName: values.familyname
          };

          dispatch(signUp(dataToSubmit)).then(response => {
            if (response.payload.message === "Success") {
              console.log(JSON.stringify(response));
              alert(JSON.stringify(response));
              props.history.push("/signin");
            } else {
              alert(response)
            }
          })

          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className="app">
            <h2>Sign up</h2>
            <Form style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit} >

              <Form.Item required label="Given Name">
                <Input
                  id="givenname"
                  placeholder="Enter your givenname"
                  type="text"
                  value={values.givenname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.givenname && touched.givenname ? 'text-input error' : 'text-input'
                  }
                />
                {errors.givenname && touched.givenname && (
                  <div className="input-feedback">{errors.givenname}</div>
                )}
              </Form.Item>

              <Form.Item required label="Family Name">
                <Input
                  id="familyname"
                  placeholder="Enter your Family Name"
                  type="text"
                  value={values.familyname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.familyname && touched.familyname ? 'text-input error' : 'text-input'
                  }
                />
                {errors.familyname && touched.familyname && (
                  <div className="input-feedback">{errors.familyname}</div>
                )}
              </Form.Item>

              <Form.Item required label="Email" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                <Input
                  id="email"
                  placeholder="Enter your Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required label="Password" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item required label="Confirm" hasFeedback>
                <Input
                  id="confirmPassword"
                  placeholder="Enter your confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

