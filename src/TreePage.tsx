// const tree = require("./Resouces/tree.json") as t;
import { useEffect, useState } from "react";
// import {Tree} from "./Resouces/Tree.js";
import "./index.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Loader } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchTree, setTree } from "./features/TreeSlice";

// const Tree: t = axios.get("127.0.0.1:8000/tree");
// let Tree: t = {
//     value: "no data",
//     children: []
// };
function TreePage() {
  interface t {
    value: string;
    id: number;
    description: string;
    children: t[];
  }
  interface rolesInterface {
    name: string;
    id: number;
    parentID: number | null;
  }

  const dispatch = useDispatch();
  const {Tree, isLoading} = useSelector((state)=> state.Tree)
  // const [Tree, setTree] = useState();
  const [roles, setRoles] = useState<rolesInterface | []>([]);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(fetchTree());
  }, [])

  // useEffect(() => {
  //   (async () => {
  //     const Ans = await axios.get(
  //       "http://127.0.0.1:5001/employee-managment-a84ff/us-central1/app/getTree"
  //     );
  //     const Allroles = Ans.data.data;
  //     setTree(Allroles);
  //     setLoading(false);
  //     console.log("tree>>>", Tree);
  //   })();
  // }, []);

  function dfs(node: t, isRoot = true, prefix = "", childNum?: number) {
    const children = node.children.map((child, i) => {
      const isLastChild = i === node.children.length - 1;
      const childLength = node.children.length;
      let childPrefix: string = "";
      if (childNum) {
        if (childNum > 1) {
          childPrefix = prefix + "  |   ";
        } else {
          childPrefix = prefix + "      ";
        }
      }

      return dfs(child, false, childPrefix, childLength);
    });

    return (
      <div key={node.value} className="">
        {isRoot && (
          <NavLink
            to={`/employee/${node.id}/${node.value}`}
            onMouseOver={() => {
              setDescription(node.description);
            }}
            className="hover:text-gray-200"
          >
            {node.value}
          </NavLink>
        )}
        <span className="text-gray-600">{!isRoot && prefix + "  └──"}</span>
        {!isRoot && (
          <NavLink
            to={`/employee/${node.id}/${node.value}`}
            onMouseOver={() => {
              setDescription(node.description);
            }}
            className="hover:text-gray-200"
          >
            {"  "}
            {node.value}
          </NavLink>
        )}
        <pre>{children}</pre>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex w-full h-[100vh] items-center justify-center">
        <Loader />
      </div>
    );
  } else {
    return (
      <div className="flex">
        <div className=" flex flex-col  gap-14 leading-[24px] flex-1 bg-black pl-5 text-gray-400 tracking-wide text-gray-400 text-lg font-bold">
          <p className="justify-self-start self-center text-xs">
            Click to see employees
          </p>
          {dfs(Tree)}
        </div>
        <div
          className="flex justify-center items-center flex-1 h-[100vh] w-full text-center p-3 mb-5 tracking-wide text-gray-600 text-lg font-bold mb-2 r"
          onMouseOver={() => setDescription("")}
        >
          {!(description == "") && (
            <div className="h-[100vh] flex flex-col justify-center">
              <p className="flex-1 text-center flex items-center justify-center text-xs text-gray-400">
                hover over here for more options
              </p>
              <p className="flex-1">{description}</p>
            </div>
          )}
          {description == "" && (
            <div className="flex flex-col items-center gap-5">
              <p className="mb-5 text-xl">Welcome</p>
              <div className="flex gap-3">
                <NavLink
                  to={"/employee/All"}
                  className="w-[160px] transition duration-500 hover:shadow-xl hover:shadow-gray-400 bg-blue-500 font-semibold text-white py-2  px-4 border border-blue-500 hover:border-transparent rounded"
                >
                  All Employees
                </NavLink>
                <NavLink
                  to={"/role/register"}
                  className="w-[160px] transition duration-500 hover:shadow-xl hover:shadow-gray-400 bg-blue-500 font-semibold text-white py-2  px-4 border border-blue-500 hover:border-transparent rounded"
                >
                  Add Employee
                </NavLink>
              </div>

              <NavLink
                to={"/role/add"}
                className="w-[160px] transition duration-500 hover:shadow-xl hover:shadow-gray-400 bg-blue-500 font-semibold text-white py-2  px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Update Roles
              </NavLink>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TreePage;
