import "./index.css";
import { Group } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import "./index.css";

function LoginPage() {
  // const [value, setValue] = useState<Date | null>(null);

  interface err {
    firstname: string,
    password: string
  }

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const formSubmit = (data: object) => {
    console.log("data"); 
    if (errors.password) {
      setPasswordErr(true);
    }
  };

  const [passwordErr, setPasswordErr] = useState<boolean>(false);

  return (
    <div className="h-[100vh] w-full flex items-center justify-center ">
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="flex flex-col  w-[300px] bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 gap-3"
      >
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            {...register("userName", { required: true })}
            aria-invalid={errors.userName ? "true" : "false"}
            className=" bg-white border border-1 border-gray-300
          shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.userName?.type === "required" && (
            <p role="alert" className="text-xs text-red-600">
              First name is required
            </p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: true,
              pattern:
                /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/i,
            })}
            aria-invalid={errors.password ? "true" : "false"}
            className="bg-white border border-1 border-gray-300
          shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={() => {
              console.log("changed");
              handleSubmit(() => {
                errors.password
              })
            }}
          />
          {errors.password?.type === "required" && (
            <p role="alert" className="text-xs text-red-600">
              Password is required
            </p>
          )}
          {passwordErr && (
            <p role="alert" className="text-xs text-red-600">
              Password is incorrect
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Validate
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
