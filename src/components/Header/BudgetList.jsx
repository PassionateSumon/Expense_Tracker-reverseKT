import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCost, updateCost } from "../../features/budgetSlice";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";

const BudgetList = () => {
  const budget = useSelector((state) => state.bud.budget);
  const dispatch = useDispatch();
  const [ipVal, setIpVal] = useState(0);
  const [ipText, setIpText] = useState("");
  const [editId, setEditId] = useState(null);
  const [err, setErr] = useState("");
  const MAX_VAL = 9999999999;

  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setEditId(null);
        setIpVal(0);
        setIpText("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  function handleUpdate(id) {
    if (ipVal > MAX_VAL) {
      setErr("Budget should be between 1 - 10^10");
      return;
    }

    const payload = {
      id,
      text: ipText,
      cost: Number(ipVal),
    };
    dispatch(updateCost(payload));
    setEditId(null);
    setIpVal(0);
    setIpText("");
  }

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-slate-800 m-5 text-center text-2xl font-bold">
        My Set Budgets
      </h1>
      {budget.length === 0 ? (
        <div className="text-center text-2xl text-white font-semibold border-2 border-slate-400 w-[50%] m-auto bg-sky-800 rounded-xl p-4">
          Empty
        </div>
      ) : (
        <div className="w-[50%] ml-auto mr-auto mb-20 overflow-auto overflow-x-hidden">
          {budget?.map((bud) => (
            <li key={bud.id} className="mt-4 list-none flex gap-4 items-center">
              {editId === bud.id ? (
                <div ref={ref} className="flex gap-3 items-center w-full">
                  <input
                    type="text"
                    value={ipText}
                    className="bg-slate-100 w-[40%] rounded-md p-2 text-lg font-medium border border-gray-300"
                    onChange={(e) => setIpText(e.target.value)}
                  />
                  <input
                    type="number"
                    value={ipVal}
                    className="bg-slate-100 w-[30%] rounded-md p-2 text-lg font-medium border border-gray-300"
                    onChange={(e) => setIpVal(e.target.value)}
                  />
                  <button
                    onClick={() => handleUpdate(bud.id)}
                    className="bg-green-500 hover:bg-green-600 p-2 rounded-md font-bold text-lg text-white"
                  >
                    Save
                  </button>
                  {err && <p className="text-red-500 text-sm ml-2">{err}</p>}
                </div>
              ) : (
                <div className="flex w-full justify-between items-center bg-slate-200 p-2 rounded-md">
                  <div className="w-[40%] text-lg font-medium capitalize">{bud.text}</div>
                  <div className="w-[30%] text-lg font-medium">
                    {bud.cost.toLocaleString()}
                  </div>
                </div>
              )}
              <button
                onClick={() => {
                  setEditId(bud.id);
                  setIpVal(bud.cost);
                  setIpText(bud.text);
                }}
                className="bg-yellow-300 hover:bg-yellow-400 p-2 rounded-md"
              >
                <CiEdit />
              </button>
              <button
                onClick={() => dispatch(removeCost(bud.id))}
                className="bg-red-500 hover:bg-red-600 p-2 rounded-md text-white"
              >
                <AiOutlineDelete />
              </button>
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default BudgetList;
