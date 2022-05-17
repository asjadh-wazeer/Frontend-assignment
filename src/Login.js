import React, { Fragment } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {FormControlLabel} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required("Full Name is required"),
  username: Yup.string()
    .required("Username is required")
    .min(6, "Username must be at least 6 characters")
    .max(20, "Username must not exceed 20 characters"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
  acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
});


  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
    navigate("/chart");
  };

  return (
    <Fragment>
      <div className="login__container">
        <div className="">
          <h2>Create an account</h2>
          <div className="name__container">
            <label>Full Name</label>
            <input
              required
              id="fullname"
              name="fullname"
              label="Full Name"
              {...register("fullname")}
              error={errors.fullname ? true : false}
            />
            <h5 className="error__container">{errors.fullname?.message}</h5>
          </div>

          <div className="username__container">
            <label>Username</label>
            <input
              required
              id="username"
              name="username"
              label="Username"
              {...register("username")}
              error={errors.username ? true : false}
            />
            <h5 className="error__container">{errors.username?.message}</h5>
          </div>

          <div className="email__container">
            <label>Email</label>
            <input
              required
              id="email"
              name="email"
              label="Email"
              {...register("email")}
              error={errors.email ? true : false}
            />
            <h5 className="error__container">{errors.email?.message}</h5>
          </div>

          <div className="password__container">
            <label>Password</label>
            <input
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              {...register("password")}
              error={errors.password ? true : false}
            />
            <h5 className="error__container">{errors.password?.message}</h5>
          </div>

          <div className="confirm__password__container">
            <label>Confirm Password</label>
            <input
              required
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              {...register("confirmPassword")}
              error={errors.confirmPassword ? true : false}
            />
            <h5 className="error__container">
              {errors.confirmPassword?.message}
            </h5>
          </div>

          <div>
            <FormControlLabel
              className="checkbox__container"
              control={
                <Controller
                  control={control}
                  name="acceptTerms"
                  defaultValue="false"
                  inputRef={register()}
                  render={({ field: { onChange } }) => (
                    <input
                      type="checkbox"
                      onChange={(e) => onChange(e.target.checked)}
                    />
                    
                  )}
                />
              }
              label={
                <h5 className="checkbox__label">
                  I have read and agree to the Terms *
                </h5>
              }
            />
            <br />
            <h5 className="checkbox__error__container">
              {errors.acceptTerms ? "(" + errors.acceptTerms.message + ")" : ""}
            </h5>
          </div>

          <button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Create Account
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;




