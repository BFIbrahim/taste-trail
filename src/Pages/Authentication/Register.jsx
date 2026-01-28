import React, { useState } from "react";
import { Link } from "react-router";
import { FaUserCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";

const Register = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data) => {
    console.log({
      ...data,
      profilePhoto
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl flex flex-col lg:flex-row w-full max-w-4xl overflow-hidden">

        <div className="lg:w-1/2 hidden lg:flex items-center justify-center bg-gray-50">
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
            alt="Cooking"
            className="w-3/4 h-3/4 object-cover rounded-xl"
          />
        </div>

        <div className="lg:w-1/2 w-full p-10 flex items-center justify-center">
          <div className="w-full max-w-md">

            <h2 className="text-3xl font-bold text-primary mb-6 text-center">
              Join TasteTrail Today
            </h2>

            <div className="flex justify-center mb-6">
              <label className="cursor-pointer relative">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-primary"
                  />
                ) : (
                  <FaUserCircle className="w-28 h-28 text-gray-300" />
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              <div>
                <label className="block text-accent mb-1 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="John Doe"
                  {...register("fullName", {
                    required: "Full name is required"
                  })}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-accent mb-1 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="you@example.com"
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
                  className="input input-bordered w-full"
                  placeholder="Enter your password"
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

              <button className="btn btn-primary w-full text-white">
                Register
              </button>
            </form>

            <p className="text-center text-gray-500 mt-4">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-primary font-medium">
                Login
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;
