import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchTree, updateTree } from "./features/TreeSlice";

interface t {
  value: string;
  id: number;
  description: string;
  children: t[];
}

interface o {
  node: t;
  update: CallableFunction;
  tree: t;
  rerenderTree: CallableFunction;
}

function EditRole({ node, update, tree, rerenderTree }: o) {
  const [name, setName] = useState<string>();
  const dispatch = useDispatch();

  const formSubmit = (data) => {
    console.log(data);
    node.value = data.name;
    console.log(tree);

    //
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
    //     rerenderTree((state) => !state);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // })();
    //

    dispatch(updateTree(tree))
      .then(() => {
        dispatch(fetchTree());
      })
      .catch((err) => {
        console.log("error while updating the tree : AddRoleForm: ", err);
      });

    setName("");
  };
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <form
      className="flex flex-col gap-10 w-[70%]"
      onSubmit={handleSubmit(formSubmit)}
    >
      <label
        className="tracking-wide text-gray-200 text-xs font-bold mb-2"
        htmlFor="grid-state"
      >
        Editing{" "}
        <span className="uppercase px-1 underline">' {node.value} '</span> to...
      </label>
      <input
        {...register("name", { required: true })}
        className=" bg-white border border-1 border-gray-300
          shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder={node.value}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <div className="flex gap-3 p-3">
        <button
          className="bg-blue-500 flex-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Edit
        </button>
        <button
          className="bg-red-500 flex-1 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => {
            update(false);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditRole;
