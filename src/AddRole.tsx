import { Loader } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./index.css";
import AddRoleForm from "./AddRoleForm";
import DeleteRole from "./DeleteRole";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointLeft,
  faMinusSquare,
  faPenToSquare,
  faPlusSquare,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import EditRole from "./EditRole";
import { fetchTree } from "./features/TreeSlice";
import { useDispatch, useSelector } from "react-redux"; 
// import _ from 'lodash';
import _ from 'lodash';


function AddRole() {
  const dispatch = useDispatch();
  const { Tree, isLoading } = useSelector((state) => state.Tree);
  // const TempTree = {};

  // const [Tree, setTree] = useState();
  // const [Tree2, setTree2] = useState<t>();
  const [TempTree, setTempTree] = useState<t>();
  const [loading, setLoading] = useState(true);
  const [chosen, setChosen] = useState(false);
  const [chosenNode, setChosenNode] = useState<t>();
  const [chosenIndex, setChosenIndex] = useState();
  const [updated, setUpdated] = useState();
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [editNode, setEditNode] = useState();
  const [nodeChildren, setNodeChildren] = useState<t>();

  interface t {
    value: string;
    id: number;
    description: string;
    children: t[];
  }

  useEffect(() => {
    dispatch(fetchTree());
  }, []);

  useEffect(() => {
    setLoading(isLoading);
    setTempTree(_.cloneDeep(Tree))
  }, [isLoading])
  
  // console.log("node::", Object.isExtensible(TempTree?.children[0]));
  // useEffect(() => {
  //   (async () => {
  //     const Ans = await axios.get(
  //       "http://127.0.0.1:5001/employee-managment-a84ff/us-central1/app/getTree"
  //     );
  //     const Allroles = Ans.data.data;
  //     setTree(Allroles);
  //     setTree2(Allroles);
  //     setLoading(false);
  //     console.log("tree>>>", Tree);
  //   })();
  // }, [updated]);


  function dfs(node: t, isRoot = true, prefix = "", childNum?: number) {
    const children = node.children.map((child, i) => {
      //   console.log("node", node.parent);
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
      return dfs(child, false, childPrefix, childLength, node);
    });

    return (
      <div key={node.value} className="w-full">
        {isRoot && (
          <div className="inline hover:cursor-default text-gray-700">
            {node.value}{" "}
            <span
              className="hover:cursor-pointer font-bold text-black pl-3 rounded-full border-1 border-gray-400"
              onClick={() => {
                setChosen(true);
                console.log('>>',Object.isExtensible(node))
                setChosenNode(node);
              }}
            >
              <FontAwesomeIcon icon={faPlusSquare} />
            </span>{" "}
            {node.children.length > 0 && (
              <span
                className="hover:cursor-pointer  text-black font-bold pl-3 rounded-full border-1 border-gray-400"
                onClick={() => {
                  setShowDelete(true);
                  setNodeChildren(node);
                }}
              >
                <FontAwesomeIcon icon={faMinusSquare} />
              </span>
            )}
            <span
              className="hover:cursor-pointer  text-black font-bold pl-4 rounded-full border-1 border-gray-400"
              onClick={() => {
                setShowEdit(true);
                setEditNode(node);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </span>
          </div>
        )}
        <span className="text-gray-600">{!isRoot && prefix + "  └──"}</span>
        {!isRoot && (
          <div className="inline hover:cursor-default text-gray-700">
            {node.value}{" "}
            <span
              className="hover:cursor-pointer font-bold text-black pl-3 rounded-full border-1 border-gray-400"
              onClick={() => {
                setChosen(true);
                setChosenNode(node);
              }}
            >
              <FontAwesomeIcon icon={faPlusSquare} />
            </span>{" "}
            {node.children.length > 0 && (
              <span
                className="hover:cursor-pointer  text-black font-bold pl-3 rounded-full border-1 border-gray-400"
                onClick={() => {
                  setChosen(true);
                  setShowDelete(true);
                  setNodeChildren(node);
                }}
              >
                <FontAwesomeIcon icon={faMinusSquare} />
              </span>
            )}
            <span
              className="hover:cursor-pointer  text-black font-bold pl-5 rounded-full border-1 border-gray-400"
              onClick={() => {
                setShowEdit(true);
                setEditNode(node);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </span>
          </div>
        )}
        <pre>{children}</pre>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex w-full h-[100vh] items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <div>
      <div className="w-full grid grid-cols-3 bg-black items-center h-[40px]">
        <NavLink
          to={"/tree"}
          className="tracking-wide text-gray-500 text-2xl font-bold justify-self-start pl-3 flex items-center"
        >
          <FontAwesomeIcon icon={faHandPointLeft} />{" "}
          <span className="text-gray-500 text-sm font-bold">Back</span>
        </NavLink>
        <h6 className=" tracking-wide text-gray-500 text-xl font-bold justify-self-center">
          Edit Roles
        </h6>
      </div>
      <div className="h-full flex z-1 ">
        <div className="min-h-[100vh] leading-[30px] flex-1 pl-5 text-gray-700 tracking-wide text-md flex justify-center items-center pt-5">
          {dfs(TempTree)}
        </div>
        <div className="flex-1 flex flex-col justify-center items-center  bg-gray-900">
          {!chosen && !showDelete && !showEdit && (
            <p className="text-gray-600 text-sm">
              Press the '+' icon to add a new role
            </p>
          )}
          {chosen && (
            <p className="text-gray-400 text-sm">
              Add a role under {chosenNode?.value}
            </p>
          )}
          {chosen && (
            <AddRoleForm
              node={chosenNode}
              chosen={setChosen}
              tree={TempTree}
              updated={setUpdated}
            />
          )}
          {showDelete && (
            <DeleteRole
              showDelete={setShowDelete}
              children={nodeChildren}
              tree={TempTree}
              updated={setUpdated}
            />
          )}
          {showEdit && (
            <EditRole
              node={editNode}
              update={setShowEdit}
              tree={TempTree}
              rerenderTree={setUpdated}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AddRole;
