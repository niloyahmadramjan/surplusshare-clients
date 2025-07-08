import { useState } from "react";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/lottieanimation/foodanimation.json";
import { Leaf, Github, LogIn, Mail } from "lucide-react";
import Logo from "../../components/Logo";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // handle email/password login
  };

  const handleGoogleLogin = () => {
    // trigger Google login
  };

  const handleGithubLogin = () => {
    // trigger GitHub login
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-base-100">
      {/* Left - Login Form */}
      <div className="w-full md:w-1/2 px-6 py-6">
        {/* Top Logo + Heading */}
        <div className="mb-8 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
            <Logo></Logo>
          </div>
          <p className="text-base-content/70 text-sm">
            Welcome back! Please log in to continue reducing food waste 💚
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              required
              className="input input-bordered w-full"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              required
              className="input input-bordered w-full"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-secondary hover:btn-accent hover:text-primary text-accent w-full flex items-center gap-2">
            <LogIn className="h-4 w-4" /> Login
          </button>
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
        <Lottie animationData={loginAnimation} loop className="max-w-xl mx-auto" />
      </div>
    </section>
  );
};

export default Login;
