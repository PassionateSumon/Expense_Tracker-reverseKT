import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "../../features/expenseSlice";

const AddExpense = () => {
  const [valText, setValText] = useState("");
  const [valCost, setValCost] = useState(0);
  const dispatch = useDispatch();

  const addExpenseHandler = (e) => {
    e.preventDefault();
    const obj = {
        text: valText, 
        cost: valCost
    }
    if (valText !== "") dispatch(addExpense(obj));
    setValText("");
    setValCost(0);
  };

  return (
    <div>
      <form
        onSubmit={addExpenseHandler}
        className="mt-5 flex justify-center gap-[1rem]"
      >
        <input
          className="border-solid border-2 border-cyan-600 rounded-md text-black"
          type="text"
          value={valText}
          placeholder="Add product name"
          onChange={(e) => setValText(e.target.value)}
        />
        <input
          className="border-solid border-2 border-cyan-600 rounded-md text-black"
          type="number"
          value={valCost}
          placeholder="Add cost"
          onChange={(e) => setValCost(e.target.value)}
        />
        <button
          type="submit"
          className="border-solid bg-slate-200 p-2 rounded-2xl"
        >
          Add expense
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
