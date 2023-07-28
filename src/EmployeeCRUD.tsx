import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import UpdateEmployee from "./UpdateEmployee";
function EmployeeCRUD({
  email,
  firstName,
  id,
  lastName,
  phone,
  role,
  AllRoles,
  employees,
  el,
  refresh
}) {
  const [updatePane, setUpdatePane] = useState<boolean>();

  const arr = Object.values(AllRoles);
  const position = employees.indexOf(el);
  let job;
  arr.forEach((element) => {
    // console.log(id, element.id);
    if (element.id == role) {
      console.log(role, element.id);
      job = element.name;
    }
  });
  // console.log(Object.values(employees));

  const deleteEmp = () => {
    console.log("id: ", id);
    (async () => {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:5001/employee-managment-a84ff/us-central1/app/deleteEmployee/${id}`
        );
        employees.pop(position);
        console.log(response.data.data, id);
      } catch (err) {
        console.log(err);
      }
    })();
  };

  if (id == "id") {
    return (
      <div className="flex w-full gap-20 justify-center text-gray-400 text-xs mb-2">
        <p className="w-[70px]">{firstName}</p>
        <p className="w-[70px]">{lastName}</p>
        <p className="w-[150px]">{email}</p>
        <p className="w-[100px]">{phone}</p>
        <p className="w-[100px]">{role}</p>
        <p className="w-[100px]"></p>
      </div>
    );
  }
  return (
    <div>
      <div className="flex w-full gap-20 justify-center text-gray-700 border border-b-gray-200 mb-2">
        <p className="w-[70px]">{firstName}</p>
        <p className="w-[70px]">{lastName}</p>
        <p className="w-[150px]">{email}</p>
        <p className="w-[100px]">{phone}</p>
        <p className="w-[100px]">{job}</p>
        <div className="flex gap-5">
          <p
            className="w-[100divx] text-red-400 hover:text-red-600 hover:cursor-pointer font-bold"
            onClick={deleteEmp}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </p>
          <p
            className="w-[100divx] text-green-700 hover:text-red-600 hover:cursor-pointer font-bold"
              onClick={()=>{setUpdatePane(true)}}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </p>
        </div>
      </div>
      {updatePane && <UpdateEmployee email={email}
        firstName={firstName}
        id={id}
        lastName={lastName}
        phone={phone}
        role={role}
        AllRoles={AllRoles}
        employees={employees}
        el={el}
        refresh={refresh}
        update={setUpdatePane}
      />}
    </div>
  );
}

export default EmployeeCRUD;
