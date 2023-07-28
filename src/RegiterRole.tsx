import { Input, Loader } from "@mantine/core";
import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getRoles } from "./features/RoleSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointLeft } from "@fortawesome/free-regular-svg-icons";

interface roles {
  name: string;
  id: number;
  parentID: number;
}

function RegiterRole() {
  const [ans, setAns] = useState<roles[]>([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("none");
  const dispatch = useDispatch();
  const { roles, rolesLoading } = useSelector((state) => state.Roles);

  const clearFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setRole("none");
  };

  // useEffect(() => {
  //   (async () => {
  //     const response = await axios.get(
  //       "http://127.0.0.1:5001/employee-managment-a84ff/us-central1/app/getRoles"
  //     );
  //     setAns(Object.values(response.data.data));
  //     setLoading(false);
  //   })();
  // }, []);

  useEffect(() => {
    dispatch(getRoles());
    console.log("top called");
  },[]);
  
  useEffect(() => {
    setAns(roles);
    setLoading(rolesLoading);
    console.log("bottom called");
  }, [roles]);

  const optionGenerator = (data: roles) => {
    return <option value={data.id}>{data.name}</option>;
  };

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const formSubmit = async (data) => {
    if (data.role == "none") {
      alert("Please select a role");
      return;
    }
    setButtonLoading(true);
    const response = await axios.post(
      "http://127.0.0.1:5001/employee-managment-a84ff/us-central1/app/addEmployee",
      data
    );
    setButtonLoading(false);
    clearFields();
    console.log(response.data);
  };

  if (loading) {
    return <div className="w-full h-screen flex justify-center items-center"><Loader/></div>;
  } else {
    return (
      <div className="flex flex-col w-full items-center">
        <div className="w-full grid grid-cols-3 bg-gray-200 items-center h-[50px]">
          <NavLink
            to={"/tree"}
            className="tracking-wide text-gray-500 text-2xl font-bold justify-self-start pl-3 flex items-center"
          >
            <FontAwesomeIcon icon={faHandPointLeft} />{" "}
            <span className="text-gray-500 text-sm font-bold">Back</span>
          </NavLink>
          <h6 className=" tracking-wide text-gray-500 text-2xl font-bold justify-self-center">
            <span>Register</span> a{" "}
            <span className="text-blue-600 underline">new</span>comer
          </h6>
        </div>

        <form
          onSubmit={handleSubmit(formSubmit)}
          className="flex flex-col  w-[600px] px-8 pt-6 pb-8 mb-4 gap-2"
        >
          {/* first name */}
          <div>
            <label
              className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              First Name
            </label>
            <input
              {...register("firstName", { required: true })}
              aria-invalid={errors.firstName ? "true" : "false"}
              className=" bg-white border border-1 border-gray-300
          shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder=". . . . ."
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            {errors.firstName?.type === "required" && (
              <p role="alert" className="text-xs text-red-600">
                First name is required
              </p>
            )}
          </div>

          {/* Last name */}
          <div>
            <label
              className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Last Name
            </label>
            <input
              {...register("lastName", { required: true })}
              aria-invalid={errors.lastName ? "true" : "false"}
              className=" bg-white border border-1 border-gray-300
          shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder=". . . . ."
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            {errors.lastName?.type === "required" && (
              <p role="alert" className="text-xs text-red-600">
                last name is required
              </p>
            )}
          </div>

          {/* email */}
          <div>
            <label
              className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})$/i,
              })}
              aria-invalid={errors.email ? "true" : "false"}
              className=" bg-white border border-1 border-gray-300
          shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder=". . . . ."
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {errors.email?.type === "required" && (
              <p role="alert" className="text-xs text-red-600">
                Email is required
              </p>
            )}
          </div>

          {/* phone  */}
          <div>
            <label
              className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Phone
            </label>
            <input
              {...register("phone", {
                required: true,
              })}
              aria-invalid={errors.phone ? "true" : "false"}
              className=" bg-white border border-1 border-gray-300
          shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder=". . . . ."
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            {errors.phone?.type === "required" && (
              <p role="alert" className="text-xs text-red-600">
                Email is required
              </p>
            )}
          </div>

          {/* drop down */}
          <div>
            <label
              className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Role
            </label>
            <div className="relative">
              <select
                {...register("role", {
                  required: true,
                })}
                aria-invalid={errors.role ? "true" : "false"}
                className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <option value="none" selected>
                  --Select--
                </option>
                {ans.map((el) => optionGenerator(el))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            {errors.role?.type === "required" && (
              <p role="alert" className="text-xs text-red-600">
                Drop down should be chosen
              </p>
            )}
          </div>
          <div>
            {buttonLoading && <Loader />}
            {!buttonLoading && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                ADD
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default RegiterRole;
