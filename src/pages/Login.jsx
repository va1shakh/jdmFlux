import { useState } from "react";
import bg from "../assets/loginBg.mp4";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth/login";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/auth/authSlice";
import { toast } from "sonner";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      const userData = {
        id: user.id,
        username: user.username,
        email: user.email
      };
      dispatch(setUser(userData));
      localStorage.setItem("user", JSON.stringify(userData));
      navigate('/mods');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate({
      email: email,
      password: password
    })
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 text-white">
      {/* Background decoration */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src={bg} type="video/mp4" />
      </video>
      <div className="bg-black/50 inset-0 absolute"></div>

      {/* Glass Card */}
      <div
        className="
          relative z-10 w-full max-w-md
          rounded-3xl
          border border-white/10
          bg-white/[0.06]
          p-8
          shadow-2xl shadow-black/50
          backdrop-blur-2xl
          backdrop-saturate-150
        "
      >
        {/* Heading */}
        <div className="mb-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-white/40">
            Welcome back
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">Login</h1>

          <p className="mt-2 text-sm text-white/40">
            Enter your credentials to continue.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-white/60">
              Email
            </label>

            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="you@example.com"
              className="
                w-full rounded-xl
                border border-white/10
                bg-black/20
                px-4 py-3
                text-sm text-white
                outline-none
                placeholder:text-white/20
                transition
                focus:border-white/30
                focus:bg-white/[0.06]
              "
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm text-white/60"
            >
              Password
            </label>

            <input
              required
              minLength={6}
              maxLength={20}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="••••••••"
              className="
                w-full rounded-xl
                border border-white/10
                bg-black/20
                px-4 py-3
                text-sm text-white
                outline-none
                placeholder:text-white/20
                transition
                focus:border-white/30
                focus:bg-white/[0.06]
              "
            />
          </div>

          {/* Login */}
          <button
            type="submit"
            className="
              w-full rounded-xl
              bg-white
              py-3
              text-sm font-medium
              text-black
              transition
              hover:bg-white/90
              active:scale-[0.98]
            "
          >
            Login
          </button>
        </form>

        {/* Register */}
        <div className="mt-6 text-center">
          <p className="text-sm text-white/40">Don't have an account?</p>

          <Link
            to="/register"
            className="
              mt-2 inline-block
              text-sm font-medium
              text-white
              underline-offset-4
              transition
              hover:text-white/60
              hover:underline
            "
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Login;
