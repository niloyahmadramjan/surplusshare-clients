import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/lottieanimation/foodanimation.json";
import { Github, LogIn } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { firebaseErrorMessage } from "../../utils/firebaseErrorMessage";
import { useState } from "react";
import FoodAnimation from "../LoadingAnimation/FoodLoading";
import useUserDeviceInfo from "../../hooks/userDeviceInfo";

const Login = () => {
  
    const userDeviceData = useUserDeviceInfo()
  const {
    handleSignInEmailPass,
    handleGoogleLogin,
    handleGithubLogin,
    setLoader,
    setUser,
    loader,
  } = useAuth();

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage,setErrorMessage]= useState("");
////////////////////////////////////////////////////////////// optional just for login
   const [show, setShow] = useState(false); 
     const credentials = [
    { role: "Normal User", email: "normal@user.com", password: "user123" },
    { role: "Charity", email: "charity@jaagobangla.com", password: "charity123" },
    { role: "Admin", email: "admin@johnking.com", password: "admin123" },
    { role: "Restaurant", email: "restorent@barbqbd.com", password: "restorent123" },
  ];

  /////////////////////////////////////////////////////////////////////////////////////

  // handle firebase error 
  const handleError = (error)=>{
    const errorMessage = firebaseErrorMessage(error.code);
    setErrorMessage(errorMessage)
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 🔐 Email/password login submit
  const onLoginSubmit = async (data) => {
    try {
      const result = await handleSignInEmailPass(data.email, data.password);
      const user = result.user;
      setUser(user);

      // ✅ Update backend login time
      const userData = {
        name: user.displayName || "No Name",
        email: user.email,
        photoURL: user.photoURL || "",
        role: "user",
        userDeviceData
      };

      await axiosSecure.post("/users", userData);

      Swal.fire({
        icon: "success",
        title: "Login successful!",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate(`${location.state ? location.state : "/"}`);
      reset();
    } catch (error) {
      handleError(error)
      setLoader(false)
      console.error("Login Error:", error);
      Swal.fire({
        icon: "error",
        title: errorMessage || "Login failed",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  // 🔵 Google login handler
  const OnSubmitHandleGoogleLogin = async () => {
    setLoader(true);
    try {
      const result = await handleGoogleLogin();
      const user = result.user;
      setUser(user);

      const userData = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: 'user',
        firebaseUID: user?.uid,
        userDeviceData,
      }

      await axiosSecure.post("/users", userData);

      Swal.fire({
        icon: "success",
        title: "Google login successful!",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate(`${location.state ? location.state : "/"}`);
      return result;
    } catch (error) {
      setLoader(false)
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

  // ⚫ GitHub login handler
  const OnSubmitHandleGithubLogin = async () => {
    setLoader(true);
    try {
      const result = await handleGithubLogin();
      const user = result.user;
      setUser(user);

      const userData = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: 'user',
        firebaseUID: user.uid,
        userDeviceData,
      }

      await axiosSecure.post("/users", userData);

      Swal.fire({
        icon: "success",
        title: "GitHub login successful!",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate(`${location.state ? location.state : "/"}`);
      return result;
    } catch (error) {
      setLoader(false)
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
      {/* Left - Login Form */}
      <div className="w-full md:w-1/2 px-6 py-6">
        {/* Top Logo + Heading */}
        <div className="mb-8 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
            <h1 className="text-3xl">Login your Account</h1>
          </div>
          <p className="text-base-content/70 text-sm">
            Welcome back! Please log in to continue reducing food waste 💚
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
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
              placeholder="••••••••"
              className="input input-bordered w-full"
              {...register("password", {
                required: "Password is required",
                
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center text-sm text-base-content/70">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="checkbox checkbox-sm" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="link link-hover">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button className="btn btn-secondary w-full flex items-center gap-2 hover:btn-accent hover:text-primary text-accent">
            <LogIn className="h-4 w-4" /> Login
          </button>
          <p className="text-sm mt-4">
            Don't have an account?{" "}
            <Link to="/register" state={location.state} className="link link-secondary">
              Register
            </Link>
          </p>
        </form>

        {/* Divider */}
        <div className="divider my-6">OR</div>

        {/* Social Logins */}
        <div className="flex flex-col gap-3">
          <button
            onClick={OnSubmitHandleGoogleLogin}
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
            onClick={OnSubmitHandleGithubLogin}
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
          animationData={loginAnimation}
          loop
          className="max-w-xl mx-auto"
        />
      </div>
      {/* ///////////////////////////////////////////////////////////////////////////////////// */}
      <div className="fixed bottom-5 right-4 z-50">
      <button
        className="btn btn-sm btn-outline btn-secondary"
        onClick={() => setShow(!show)}
      >
        {show ? "Hide Demo Logins" : "Show Demo Logins"}
      </button>

      {show && (
        <div className="mt-2 bg-white shadow-xl rounded-lg p-4 w-80 text-sm border border-accent">
          <h3 className="font-bold text-accent mb-2">Demo Accounts:</h3>
          <ul className="space-y-2">
            {credentials.map((cred, idx) => (
              <li key={idx} className="border-b pb-2">
                <p className="font-semibold">{cred.role}</p>
                <p><span className="font-medium">Email:</span> {cred.email}</p>
                <p><span className="font-medium">Password:</span> {cred.password}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
     {/* ///////////////////////////////////////////////////////////////////////////////////// */}
    </section>
  );
};

export default Login;
