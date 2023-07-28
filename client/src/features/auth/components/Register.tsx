import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../providers";
import { register } from "../api";
import { storage } from "@/utils/storage";
import { AxiosError } from "axios";
import { TRegister } from "../types";
import { ZodError, z } from "zod";

const schema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters" }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

export const Register = () => {
  const [data, setData] = useState<TRegister>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    remember: false,
  });
  const [errors, setErrors] = useState<{ [k in keyof TRegister]?: string }>({});
  const { updateCurrentUser } = useAuth();

  const updateField = (updated: Partial<TRegister>) => {
    setData({
      ...data,
      ...updated,
    });
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      console.log(data);

      schema.parse(data);
      const { token } = await register(data);
      storage.setToken(token);
      updateCurrentUser();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.errors);
      }
      if (error instanceof ZodError) {
        setErrors(
          error.errors.reduce((obj, err) => {
            return { ...obj, [err.path[0]]: err.message };
          }, {})
        );
      }
    }
  };
  return (
    <section className="bg-gray-50">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full rounded-lg bg-white shadow dark:border sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={data.name}
                  onChange={(ev) => updateField({ name: ev.target.value })}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
                  placeholder="John Doe"
                />
                {errors["name"] && (
                  <span className="text-sm text-red-500">{errors["name"]}</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(ev) => updateField({ email: ev.target.value })}
                  id="email"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
                  placeholder="name@company.com"
                />
                {errors["email"] && (
                  <span className="text-sm text-red-500">
                    {errors["email"]}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  value={data.password}
                  onChange={(ev) => updateField({ password: ev.target.value })}
                  id="password"
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
                />
                {errors["password"] && (
                  <span className="text-sm text-red-500">
                    {errors["password"]}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="password_confirmation"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={data.password_confirmation}
                  onChange={(ev) =>
                    updateField({ password_confirmation: ev.target.value })
                  }
                  id="password_confirmation"
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
                />
                {errors["password_confirmation"] && (
                  <span className="text-sm text-red-500">
                    {errors["password_confirmation"]}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      checked={data.remember}
                      onChange={(ev) =>
                        updateField({ remember: ev.target.checked })
                      }
                      className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500">
                      Remember me
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
