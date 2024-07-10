import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addingPurchaseCost } from "../../features/budgetSlice";
import ProductCard from "../Home/ProductListing/ProductCard";

const Home = () => {
  const isSignIn = useSelector((state) => state.auth.isSignIn);
  const allBudgetList = useSelector((state) => state.bud.budget);
  // const dispatch = useDispatch();
  // const [val, setVal] = useState({});

  // const handlePurchase = (id) => {
  //   // console.log(val[id]);
  //   const cost = val[id] || 0;
  //   dispatch(addingPurchaseCost({ id, cost }));
  //   setVal((prev) => ({
  //     ...prev,
  //     [id]: 0,
  //   }));
  // };

  // const handleChange = (id, cost) => {
  //   setVal((prev) => ({
  //     ...prev,
  //     [id]: cost,
  //   }));
  // };

  return (
    <div>
      {isSignIn === false ? (
        <div className="h-[82.3vh] flex justify-center items-center text-xl font-bold p-3">
          <div className="text-2xl">Please Signup/Login first to access...</div>
        </div>
      ) : (
        <div className="h-full w-full">
          <div className="text-center text-2xl font-semibold text-slate-300 bg-slate-700 rounded-md p-2 cursor-pointer">
            Products List
          </div>

          <div className="flex flex-wrap gap-4 p-4">
            {allBudgetList.map((item) => {
              const diff = item.cost - item.purchasedCost;

              let colorChanging = "border-2 border-black border-solid";
              if (diff < 11 && diff > 0) {
                colorChanging =
                  "border-2 border-orange-500 border-solid bg-orange-100";
              } else if (diff < 0) {
                colorChanging =
                  "border-2 border-red-500 border-solid bg-red-100";
              } else if (diff === 0) {
                colorChanging =
                  "border-2 border-red-500 border-solid bg-red-100";
              } else {
                colorChanging =
                  "border-2 border-green-500 border-solid bg-green-100";
              }

              return (
                <div
                  key={item.id}
                  className={`w-fit text-xl rounded-xl cursor-pointer`}
                >
                  {diff < 0 ? (
                    <ProductCard
                      productName={item.text}
                      purchaseCost={item.purchasedCost}
                      remainingCost={item.remainingCost}
                      // onSave={handlePurchase}
                      id={item.id}
                      msg={"*Over Budget"}
                      colorChanging={colorChanging}
                    />
                  ) : diff < 11 && diff > 0 ? (
                    <ProductCard
                      productName={item.text}
                      purchaseCost={item.purchasedCost}
                      remainingCost={item.remainingCost}
                      // onSave={handlePurchase}
                      id={item.id}
                      msg={"*Near to hit"}
                      colorChanging={colorChanging}
                    />
                  ) : diff === 0 ? (
                    <ProductCard
                      productName={item.text}
                      purchaseCost={item.purchasedCost}
                      remainingCost={item.remainingCost}
                      // onSave={handlePurchase}
                      id={item.id}
                      msg={"*Hits budget"}
                      colorChanging={colorChanging}
                    />
                  ) : (
                    <ProductCard
                      productName={item.text}
                      purchaseCost={item.purchasedCost}
                      remainingCost={item.remainingCost}
                      // onSave={handlePurchase}
                      id={item.id}
                      msg={""}
                      colorChanging={colorChanging}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
