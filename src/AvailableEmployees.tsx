import "./index.css";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import SingleEmployee from "./SingleEmployee";
import { Loader } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointLeft } from "@fortawesome/free-regular-svg-icons";

interface employee {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  phone: string;
  role: string;
}

function AvailableEmployees() {
  let { id, value } = useParams();
  let all = Object.values(useParams());

  const [employees, setEmployees] = useState<employee[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "http://127.0.0.1:5001/employee-managment-a84ff/us-central1/app/getEmployees"
      );
      setEmployees(response.data.data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex w-full h-[100vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center h-[100vh]">
      <div className="flex w-full mb-7 bg-gray-200">
        {/* <NavLink to={'/tree'} className="flex items-center bg-gray-200 p-3 border-b-2 border-gray-300">back</NavLink> */}
        <NavLink
          to={"/tree"}
          className="tracking-wide text-gray-500 text-2xl font-bold justify-self-start pl-3 flex items-center"
        >
          <FontAwesomeIcon icon={faHandPointLeft} />{" "}
          <span className="text-gray-500 text-sm font-bold">Back</span>
        </NavLink>
        <p
          className=" w-full text-center p-3 uppercase tracking-wide text-gray-500 text-lg font-bold"
          htmlFor="grid-state"
        >
          {value}
        </p>
      </div>
      <div className="w-full">
        <SingleEmployee
          firstName="First Name"
          lastName="Last Name"
          email="Email"
          phone="Phone Number"
          id="id"
          role="role"
          All={false}
        />
        {employees?.map((el) => {
          if (all.length > 0) {
            if (el.role == id) {
              return (
                <SingleEmployee
                  key={el.id}
                  email={el.email}
                  firstName={el.firstName}
                  lastName={el.lastName}
                  phone={el.phone}
                  id={el.id}
                  role={el.role}
                  All={false}
                />
              );
            }
          } else {
            return (
              <SingleEmployee
                key={el.id}
                email={el.email}
                firstName={el.firstName}
                lastName={el.lastName}
                phone={el.phone}
                id={el.id}
                role={el.role}
                All={false}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default AvailableEmployees;
