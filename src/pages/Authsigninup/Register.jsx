import { useForm } from "react-hook-form";
import { useState } from "react";
import Lottie from "lottie-react";
import registerAnimation from "../../assets/lottieanimation/foodanimation.json";
import { Github, UserPlus } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import { auth } from "../../services/authService";
import { firebaseErrorMessage } from "../../utils/firebaseErrorMessage";
import FoodAnimation from "../LoadingAnimation/FoodLoading";

const Register = () => {
  const {
    signUpUserWithEmailPass,
    handleGoogleLogin,
    handleGithubLogin,
    updateUserProfile,
    setLoader,
    setUser,
    loader
  } = useAuth();

  const axiosSecure = useAxiosSecure();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
    const [errorMessage,setErrorMessage]= useState("");
  
    // handle firebase error 
    const handleError = (error)=>{
      const errorMessage = firebaseErrorMessage(error.code);
      setErrorMessage(errorMessage)
    }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  // 🖼️ Handle image preview on file select
  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  // 📤 Handle form submit for email/password registration
  const onSubmit = async (data) => {
    setLoading(true);
    
    const { email, password, name, photo } = data;

    try {
      // ✅ Upload photo to imgbb
      const formData = new FormData();
      formData.append("image", photo[0]);

      const imgbbApiKey = import.meta.env.VITE_imgbbApi_Key;
      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );

      const imageUrl = imgbbRes.data.data.url;

      // ✅ Create user in Firebase
      await signUpUserWithEmailPass(email, password);

      // ✅ Update Firebase user profile
      await updateUserProfile(name, imageUrl);

      // ✅ Firebase currentUser
      const loggedInUser = auth.currentUser;

      // ✅ Set user in context manually
      setUser({
        ...loggedInUser,
        displayName: name,
        photoURL: imageUrl,
      });

      // ✅ Save user to backend
      const newUser = {
        name,
        email,
        photoURL: imageUrl,
        role: "user",
        firebaseUID: loggedInUser?.uid,
      };

      await axiosSecure.post("/users", newUser);

      // ✅ Success Toast
      Swal.fire({
        icon: "success",
        title: "Registration successful!",
        timer: 1500,
        showConfirmButton: false,
      });
       navigate(`${location.state ? location.state : "/"}`);
      // ✅ Reset form
      reset();
      setPreview(null);
    } catch (error) {
      handleError(error)
      setLoader(false);
      Swal.fire({
        icon: "error",
        title: errorMessage,
        timer: 1500,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔵 Handle Google login & save to DB
  const OnSubmitHandleGoogleLogin = async () => {
    setLoader(true);
    try {
      const result = await handleGoogleLogin();
      const user = result.user;
      setUser(user)

      const newUser = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "user",
         firebaseUID: user?.uid,
      };

      await axiosSecure.post("/users", newUser);

      Swal.fire({
        icon: "success",
        title: "Google login successful!",
        timer: 1500,
        showConfirmButton: false,
      });
       navigate(`${location.state ? location.state : "/"}`);
      return result;
    } catch (error) {
      setLoader(false);
      handleError(error)
      Swal.fire({
        icon: "error",
        title: "Google login failed",
        text: errorMessage,
      });
    } finally {
      setLoader(false);
    }
  };

  // ⚫ Handle GitHub login & save to DB
  const OnSubmitHandleGithubLogin = async () => {
    setLoader(true);
    try {
      const result = await handleGithubLogin();
      const user = result.user;
      setUser(user)

      const newUser = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "user",
         firebaseUID: user?.uid,
      };

      await axiosSecure.post("/users", newUser);

      Swal.fire({
        icon: "success",
        title: "GitHub login successful!",
        timer: 1500,
        showConfirmButton: false,
      });
       navigate(`${location.state ? location.state : "/"}`);
      return result;
    } catch (error) {
      setLoader(false);
      handleError(error)
      Swal.fire({
        icon: "error",
        title: "GitHub login failed",
        text: errorMessage,
      });
    } finally {
      setLoader(false);
    }
  };
  if(loader){
    return <FoodAnimation></FoodAnimation>
  }

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-base-100">
      {/* Left - Form */}
      <div className="w-full md:w-1/2 px-6 py-10">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2 flex justify-center md:justify-start items-center gap-2">
            <UserPlus className="h-6 w-6" /> Register Your Account
          </h1>
          <p className="text-sm text-base-content/70">
            Create your free account to join the food-saving movement 🌱
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
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
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
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
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
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
              <p className="text-red-500 text-sm mt-1">
                {errors.confirm.message}
              </p>
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
              onChange={handleImagePreview}
            />
            {preview && (
              <div className="mt-2">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            className="btn btn-secondary w-full flex items-center gap-2 hover:btn-accent"
            disabled={loading}
          >
            <UserPlus className="h-4 w-4" />{" "}
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Already have account */}
          <p className="text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="link link-secondary">
              Login
            </Link>
          </p>
        </form>

        <div className="divider my-6">OR</div>

        {/* Social Logins */}
        <div className="flex flex-col gap-3">
          <button
            onClick={OnSubmitHandleGoogleLogin}
            className="btn btn-outline btn-accent w-full flex items-center justify-center gap-2"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="Google"
              className="h-5 w-5"
            />
            Continue with Google
          </button>

          <button
            onClick={OnSubmitHandleGithubLogin}
            className="btn btn-outline btn-accent w-full flex items-center justify-center gap-2"
          >
            <Github className="h-5 w-5" />
            Continue with GitHub
          </button>
        </div>
      </div>

      {/* Right - Animation */}
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
