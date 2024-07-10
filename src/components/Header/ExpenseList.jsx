import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeExpense, updateExpense } from "../../features/expenseSlice";

const ExpenseList = () => {
  const expenses = useSelector((state) => state.crud.expense);
  const dispatch = useDispatch();
  const [ipVal, setIpVal] = useState(0);
  const [editId, setEditId] = useState(null);

  function handleUpdate(id) {
    const payload = {
      id,
      cost: ipVal,
    };
    dispatch(updateExpense(payload));
    setEditId(null);
    setIpVal(0);
  }

  return (
    <div>
      <h1 className="text-slate-800 m-5 text-center text-2xl font-bold">
        My Expenses
      </h1>
      {expenses.length === 0 ? (
        <div className="text-center text-2xl text-white font-semibold border-2 border-slate-400 border-solid w-[50%] m-auto bg-sky-800 rounded-xl p-2">
          Empty
        </div>
      ) : (
        <div className="w-[50%] ml-auto mr-auto mb-20">
          {expenses.map((expense) => (
            <li key={expense.id} className="mt-3 ml-32 list-none flex gap-3">
              {editId === expense.id ? (
                <input
                  type="number"
                  value={ipVal}
                  className="bg-slate-400 w-[70%] rounded-md p-3 text-xl font-medium"
                  onChange={(e) => setIpVal(e.target.value)}
                />
              ) : (
                <div className="w-[70%] flex justify-around">
                  <div className="bg-slate-400 w-[49%] rounded-md p-3 text-xl font-medium">{expense.text}</div>
                  <div className="bg-slate-400 w-[50%] rounded-md p-3 text-xl font-medium">{expense.cost}</div>
                </div>
              )}

              {editId === expense.id ? (
                <button
                  onClick={() => handleUpdate(expense.id)}
                  className="bg-green-500 px-[20px] rounded-md font-bold text-xl"
                >
                  Save changes
                </button>
              ) : (
                <button
                  onClick={() => setEditId(expense.id)}
                  className="bg-orange-500 px-[20px] rounded-md font-bold text-xl"
                >
                  U
                </button>
              )}
              <button
                onClick={() => dispatch(removeExpense(expense.id))}
                className="bg-orange-500 px-[20px] rounded-md font-bold text-xl"
              >
                X
              </button>
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
