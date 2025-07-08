import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import registerAnimation from "../../assets/lottieanimation/foodanimation.json";
import { Github, LogIn, UserPlus } from "lucide-react";
import Logo from "../../components/Logo";
import { Link } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // TODO: Upload image to imgbb and get image URL
    // const image = data.photo[0];
    // Send image to imgbb API
  };

  const handleGoogleLogin = () => {
    // trigger Google login
  };

  const handleGithubLogin = () => {
    // trigger GitHub login
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-base-100">
      {/* Left - Form */}
      <div className="w-full md:w-1/2 px-6 py-6">
        {/* Header */}
        <div className="mb-8 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
            <h1 className="text-3xl">Registration your Account</h1>
          </div>
          <p className="text-base-content/70 text-sm">
            Create your free account to join the food-saving movement 🌱
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="John Doe"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="••••••••"
              {...register("confirm", {
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirm && (
              <p className="text-red-500 text-sm mt-1">{errors.confirm.message}</p>
            )}
          </div>

          {/* Photo Upload */}
          <div>
            <label className="label">
              <span className="label-text">Profile Image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              {...register("photo", { required: "Image is required" })}
            />
            {/* 👇 You will upload this image to imgbb and get the URL */}
            {/* const image = data.photo[0]; */}
          </div>

          {/* Submit Button */}
          <button className="btn btn-secondary w-full flex items-center gap-2 hover:btn-accent hover:text-primary text-accent">
            <UserPlus className="h-4 w-4" /> Register
          </button>
           {/* Already have account */}
        <p className="text-sm  mt-4">
          Already have an account?{" "}
          <Link to="/login" className="link link-secondary">
            Login
          </Link>
        </p>
        </form>

        {/* Divider */}
        <div className="divider my-6">OR</div>

        {/* Social Logins */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline btn-accent hover:text-secondary w-full flex items-center justify-center gap-2"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="Google"
              className="h-5 w-5"
            />
            Continue with Google
          </button>

          <button
            onClick={handleGithubLogin}
            className="btn btn-outline btn-accent hover:text-secondary w-full flex items-center justify-center gap-2"
          >
            <Github className="h-5 w-5" />
            Continue with GitHub
          </button>
        </div>

       
      </div>

      {/* Right - Lottie Animation */}
      <div className="hidden md:block w-full md:w-1/2 p-6">
        <Lottie
          animationData={registerAnimation}
          loop
          className="max-w-xl mx-auto"
        />
      </div>
    </section>
  );
};

export default Register;
