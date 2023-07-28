import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchTree, setLoading, updateTree } from "./features/TreeSlice";

interface t {
  value: string;
  id: number;
  description: string;
  children: t[];
}

interface o {
  node: t;
  chosen: t;
  tree: t;
  update: any;
}
function AddRoleForm({ node, chosen, tree, updated }: o) {
  console.log("node: ", Object.isExtensible(node))
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const formSubmit = (data) => {
    const value: t = {};
    value.value = data.name;
    value.description = data.description;
    value.id = Date.now();
    value.children = [];
    console.log(node.children)
    node.children.push(value);

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

    
    dispatch(updateTree(tree)).then(() => {
      dispatch(fetchTree())
    }).catch((err) => {
      console.log('error while updating the tree : AddRoleForm: ', err);
    });
    console.log("dispatch finished")

    setDesc("");
    setName("");
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="flex flex-col  w-[600px] px-8 pt-6 pb-8 mb-4 gap-2"
      >
        <label
          className="uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
          htmlFor="grid-state"
        >
          Name
        </label>
        <input
          {...register("name", { required: true })}
          aria-invalid={errors.name ? "true" : "false"}
          className=" bg-white border border-1 border-gray-300
          shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder=". . . . ."
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label
          className="uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
          htmlFor="grid-state"
        >
          Description
        </label>
        <textarea
          {...register("description", { required: true })}
          aria-invalid={errors.description ? "true" : "false"}
          className=" bg-white border border-1 border-gray-300
          shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder=". . . . ."
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          ADD
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => {
            chosen(false);
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddRoleForm;
