import "./index.css";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import EmployeeCRUD from "./EmployeeCRUD";
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

function AllEmployees() {
  const [employees, setEmployees] = useState<employee[]>();
  const [roles, setRoles] = useState();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState<boolean>(true);

  useEffect(() => {
    console.log("refresh called");
    (async () => {
      const response = await axios.get(
        "http://127.0.0.1:5001/employee-managment-a84ff/us-central1/app/getEmployees"
      );
      const response2 = await axios.get(
        "http://127.0.0.1:5001/employee-managment-a84ff/us-central1/app/getRoles"
      );
      setEmployees(response.data.data);
      setRoles(response2.data.data);
      setLoading(false);
    })();
  }, [refresh]);

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
          Employees
        </p>
      </div>
      <div className="w-full">
        <EmployeeCRUD
          firstName="First Name"
          lastName="Last Name"
          email="Email"
          phone="Phone Number"
          id="id"
          role="role"
          AllRoles="all"
          employees="employees"
          el="el"
          refresh={setRefresh}
        />
        {employees?.map((el) => {
          return (
            <EmployeeCRUD
              key={el.id}
              email={el.email}
              firstName={el.firstName}
              lastName={el.lastName}
              phone={el.phone}
              id={el.id}
              role={el.role}
              AllRoles={roles}
              employees={employees}
              el={el}
              refresh={setRefresh}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AllEmployees;
