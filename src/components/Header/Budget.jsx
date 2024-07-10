import React from "react";
import BudgetList from "./BudgetList";
import AddBudget from "./addBudget";
import { useSelector } from "react-redux";

const Budget = () => {
  const isSignIn = useSelector((state) => state.auth.isSignIn);

  return (
    <div>
      {isSignIn === false ? (
        null
      ) : (
        <div className="h-[79.6vh]">
          <AddBudget />
          <BudgetList />
        </div>
      )}
    </div>
  );
};

export default Budget;
