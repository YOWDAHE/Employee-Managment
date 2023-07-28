import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { fetchTree, updateTree } from "./features/TreeSlice";

interface t {
  value: string;
  id: number;
  description: string;
  children: t[];
}

interface o {
  showDelete: CallableFunction;
  children: t;
  tree: t;
  updated: CallableFunction;
}


function renderChildren(node: t, tree: t, updated) {
  const dispatch = useDispatch();

  function deleteRole(node: t, parent: t, tree: t, updated) {
    const children: t[] = node.children;
    const place = parent.children.indexOf(node);
    parent.children.pop(place);
    parent.children.push(...children);

    // (async () => {
    //   try {
    //     const responce = axios.post(
    //       "http://127.0.0.1:5001/employee-managment-a84ff/us-central1/app/makeTree",
    //       tree
    //     );
    //     console.log("tree updated!");
    //     const responce2 = axios.post(
    //       "http://127.0.0.1:5001/employee-managment-a84ff/us-central1/app/makeRoles",
    //       tree
    //     );
    //     updated((state) => !state);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // })();
    // console.log('tree: ', tree);

    dispatch(updateTree(tree))
      .then(() => {
        dispatch(fetchTree());
      })
      .catch((err) => {
        console.log("error while updating the tree : AddRoleForm: ", err);
      });
  }

  return (
    <div className="">
      {node.children.map((el) => (
        <div className="flex gap-20 text-white p-3">
          <span className="w-[200px]"> {el.value}</span>
          <button
            className="bg-red-500 text-white p-1 rounded-[3px]"
            onClick={() => {
              deleteRole(el, node, tree, updated);
            }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

function DeleteRole({ showDelete, children, tree, updated }: o) {
  console.log(children);
  return (
    <div className="p-5 flex flex-col gap-3 justify-center items-center border-1 border-gray-400 rounded-lg">
      <div className="text-red-500 tracking-wide font-bold">DeleteRole</div>
      <div className="text-sm">
        {renderChildren(children, tree, updated)} <hr className="mt-4" />
      </div>
      <div className="flex gap-3">
        <button
          className="px-3 py-1 rounded-md bg-blue-600 text-white"
          onClick={() => {
            showDelete(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteRole;
