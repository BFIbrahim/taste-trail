import React from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";

const Login = () => {

  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/login", data);
      localStorage.setItem("access-token", res.data.token);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back, ${res.data.user.name}!`,
        timer: 1500,
        showConfirmButton: false
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1600);

    } catch (error) {
      console.error(error);

      if (error.response?.status === 404) {
        Swal.fire("User not found", "Please register first.", "warning");
      } else if (error.response?.status === 400) {
        Swal.fire("Invalid Credentials", "Check your password or email.", "error");
      } else {
        Swal.fire("Login Failed", "Something went wrong. Try again.", "error");
      }
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl flex flex-col lg:flex-row w-full max-w-4xl overflow-hidden">

        <div className="lg:w-1/2 hidden lg:flex items-center justify-center bg-gray-50">
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80"
            alt="Cooking"
            className="w-3/4 h-3/4 object-cover rounded-xl"
          />
        </div>

        <div className="lg:w-1/2 w-full p-10 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-primary mb-6 text-center">
              Login to TasteTrail
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              <div>
                <label className="block text-accent mb-1 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input input-bordered w-full"
                  {...register("email", {
                    required: "Email is required"
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-accent mb-1 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full text-white"
              >
                Login
              </button>
            </form>

            <p className="text-center text-gray-500 mt-4">
              Don't have an account?{" "}
              <Link to="/auth/register" className="text-primary font-medium">
                Sign Up
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
