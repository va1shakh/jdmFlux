import { useState } from "react";
import bg from "../assets/loginBg.mp4";
import { useMutation } from "@tanstack/react-query";
import { register } from '../api/auth/register';
import { useNavigate } from "react-router";
import { toast } from "sonner";

function Register() {
    const navigate = useNavigate();
    const registerMutation = useMutation({
        mutationFn: register,
        onSuccess: () => {
            toast.success("Successfully created");
            navigate('/login');
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const handleRegister = (e) => {
    e.preventDefault();
    registerMutation.mutate(formData);
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
            Join the JDMflux community
          </p>
          <br />

          <h1 className="text-3xl font-semibold tracking-tight">Register</h1>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleRegister}>
          {/* username */}
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm text-white/60"
            >
              Username
            </label>

            <input
              value={formData.username}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
              maxLength={10}
              min={3}
              pattern="[A-Za-z0-9]+"
              required
              id="username"
              type="text"
              placeholder="e.g. vaishakh"
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

          {/* phone */}
          <div>
            <label htmlFor="phone" className="mb-2 block text-sm text-white/60">
              Phone
            </label>

            <input
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
              required
              id="phone"
              type="tel"
              placeholder="+91 9845984876"
              maxLength={10}
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

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-white/60">
              Email
            </label>

            <input
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              required
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
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              minLength={6}
              maxLength={20}
              required
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

          {/* Register */}
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
export default Register;
