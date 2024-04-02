import useAuth from "@/app/hooks/useAuth";
import useRegisterUser from "@/app/hooks/useRegisterUser";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Login() {
  const login = useAuth();
  const registerUser = useRegisterUser();

  const [isRegistering, setIsRegistering] = useState(false);

  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const schemaLogin = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const schemaRegister = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    username: z.string().min(3),
  });

  const onLogin: any = async (data: z.infer<typeof schemaLogin>) => {
    login.mutate(data);
  };

  const onRegister: any = async (data: z.infer<typeof schemaRegister>) => {
    registerUser.mutate(data);
  };

  return (
    <>
      {!isRegistering ? (
        <div
          id="login-screen"
          className="relative bg-gray-900 h-full w-full flex justify-center  items-center overflow-hidden"
          style={{
            backgroundImage: `url(https://img.freepik.com/premium-photo/medieval-town-anime-background-illustration_708558-453.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        >
          <div id="login-form" className="z-20 w-[50%] h-[50%] bg-opacity-95 bg-gray-900 border-2 border-gray-100 rounded-md">
            <form onSubmit={handleSubmit(onLogin)} className="flex flex-col items-center justify-center w-[50%] m-[0_auto] gap-4 h-full">
              <input
                type="email"
                className="border-gray-100 border-2 rounded-md
          focus:outline-none focus:border-gray-500 w-full p-2 
          "
                placeholder="Email"
                {...register("email")}
              />
              <input
                type="password"
                className="border-gray-100 border-2 rounded-md
          focus:outline-none focus:border-gray-500 w-full p-2 
          "
                placeholder="Password"
                {...register("password")}
              />

              <button
                type="submit"
                className="w-full p-2 bg-gray-300 rounded-md
          hover:bg-gray-400 focus:outline-none active:bg-gray-500 transition duration-300 ease-in-out
          "
                disabled={login.isPending}
              >
                {login.isPending ? "Logging in..." : "Login"}
              </button>
              {login.isSuccess ? <p className="text-green-500 text-sm">Logged in!</p> : null}
              {login.isError ? <p className="text-red-500 text-sm">Invalid credentials</p> : null}

              <div className="right-0 p-2">
                <p className="text-white text-sm">
                  Don&apos;t have an account?{" "}
                  <span className="cursor-pointer" onClick={() => (setIsRegistering(true), reset())}>
                    Register
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div
          id="register-screen"
          className="relative bg-gray-900 h-full w-full flex justify-center  items-center overflow-hidden"
          style={{
            backgroundImage: `url(https://img.freepik.com/premium-photo/medieval-town-anime-background-illustration_708558-453.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        >
          <div id="register-form" className="z-20 w-[50%] h-[50%] bg-opacity-95 bg-gray-900 border-2 border-gray-100 rounded-md">
            <form onSubmit={handleSubmit(onRegister)} className="relative flex flex-col items-center justify-center w-[50%] m-[0_auto] gap-4 h-full">
              <input
                type="email"
                className="border-gray-100 border-2 rounded-md
          focus:outline-none focus:border-gray-500 w-full p-2 
          "
                placeholder="Email"
                {...register("email")}
              />
              <input
                type="text"
                className="border-gray-100 border-2 rounded-md
          focus:outline-none focus:border-gray-500 w-full p-2 
          "
                placeholder="Username"
                {...register("username")}
              />
              <input
                type="password"
                className="border-gray-100 border-2 rounded-md
          focus:outline-none focus:border-gray-500 w-full p-2 
          "
                placeholder="Password"
                {...register("password")}
              />

              <button
                type="submit"
                className="w-full p-2 bg-gray-300 rounded-md
              hover:bg-gray-400 focus:outline-none active:bg-gray-500 transition duration-300 ease-in-out
                "
                disabled={registerUser.isPending}
              >
                {registerUser.isPending ? "Creating account..." : "Register"}
              </button>
              {registerUser.isSuccess ? <p className="text-green-500 text-sm">Account created!</p> : null}

              <div className="p-2">
                <p className="text-white text-sm">
                  Already have an account?{" "}
                  <span className="cursor-pointer" onClick={() => (setIsRegistering(false), reset())}>
                    Login
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
