import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCost, updateCost } from "../../features/budgetSlice";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";

const BudgetList = () => {
  const budget = useSelector((state) => state.bud.budget);
  const dispatch = useDispatch();
  const [ipVal, setIpVal] = useState(0);
  const [ipText, setIpText] = useState('');
  const [editId, setEditId] = useState(null);
  const [err, setErr] = useState("");
  const MAX_VAL = 9999999999;

  const ref = useRef(null);

  useEffect(() => {
    // console.log(ref)
    function handleClickOutside(event) {
      // console.log(ref.current)
      // console.log(event.target)
      if (ref.current && !ref.current.contains(event.target)) {
        setEditId(null);
        setIpVal(0);
        setIpText('')
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  function handleUpdate(id) {
    if (ipVal > MAX_VAL) {
      setErr("Cost limit exceeded");
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
    setIpText('')
  }

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-slate-800 m-5 text-center text-2xl font-bold">
        My set budgets
      </h1>
      {budget.length === 0 ? (
        <div className="text-center text-2xl text-white font-semibold border-2 border-slate-400 border-solid w-[50%] m-auto bg-sky-800 rounded-xl p-2">
          Empty
        </div>
      ) : (
        <div className="w-[50%] ml-auto mr-auto mb-20 overflow-scroll overflow-x-hidden">
          {budget.map((bud) => (
            <li key={bud.id} className="mt-3 ml-32 list-none flex gap-3">
              {editId === bud.id ? (
                <div ref={ref} className="flex gap-3 items-center w-[70%]">
                  <input
                    type="text"
                    value={ipText}
                    className="bg-slate-300 w-[49%] rounded-md p-3 text-xl font-medium"
                    onChange={(e) => setIpText(e.target.value)}
                  />
                  <input
                    type="number"
                    value={ipVal}
                    className="bg-slate-300 w-[50%] rounded-md p-3 text-xl font-medium"
                    onChange={(e) => setIpVal(e.target.value)}
                  />
                  <button
                    onClick={() => handleUpdate(bud.id)}
                    className="bg-green-500 p-2 rounded-md font-bold text-xl"
                  >
                    Change
                  </button>
                  {err && <p>{err}</p> }
                </div>
              ) : (
                <div className="w-[70%] flex justify-around">
                  <div className="bg-slate-200 w-[49%] rounded-md p-2 text-xl font-medium">
                    {bud.text}
                  </div>
                  <div className="bg-slate-200 w-[50%] rounded-md p-2 text-xl font-medium">
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
                className="border-2 border-solid border-black p-2 rounded-md"
              >
                <CiEdit />
              </button>
              <button
                onClick={() => dispatch(removeCost(bud.id))}
                className="border-2 border-solid border-black p-2 rounded-md"
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
