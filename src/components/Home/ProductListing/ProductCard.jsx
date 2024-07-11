import React, { useState } from "react";
import { addingPurchaseCost } from "../../../features/budgetSlice";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { setToast } from "../../../features/toastSlice";

const ProductCard = ({
  productName,
  purchaseCost,
  remainingCost,
  id,
  msg,
  colorChanging,
}) => {
  const dispatch = useDispatch();
  const [val, setVal] = useState({});

  const handleSave = (id) => {
    const cost = val[id] || 0;
    if (cost < 0) {
      dispatch(
        setToast({ text: "-ve values are not accepted", type: "error" })
      );
    } else {
      dispatch(addingPurchaseCost({ id, cost }));
      dispatch(setToast({ text: "Cost added successfully", type: "success" }));
      setVal((prev) => ({
        ...prev,
        [id]: 0,
      }));
    }
  };

  const handleChange = (id, cost) => {
    setVal((prev) => ({
      ...prev,
      [id]: cost,
    }));
  };

  return (
    <div
      className={`max-w-sm bg-white shadow-md rounded-lg overflow-hidden ${colorChanging}`}
    >
      <Toaster />
      <div className="p-6">
        <h1 className="text-xl font-bold mb-2 capitalize">{productName}</h1>
        <p className="text-gray-700 text-base">
          Purchase Cost: {purchaseCost || 0}
        </p>
        <p className="text-gray-700 text-base">
          Remaining Cost: {remainingCost}
        </p>
        <div className="mt-4">
          <input
            type="number"
            className="border-2 border-solid border-black  rounded-xl w-full py-3 px-3 text-gray-700 leading-tight"
            placeholder="Enter amount"
            value={val[id] || ""}
            onChange={(e) => handleChange(id, e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center pt-3">
          <button
            onClick={() => handleSave(id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
          <span>{msg}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
