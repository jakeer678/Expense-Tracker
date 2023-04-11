import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../../store/ThemeSlice";
import "./TotalExp.css";

const TotalExpense = () => {
  const theme = useSelector((state) => state.theme.isThemeActivate);
  const total = useSelector((state) => state.expense.total);

  const dispatch = useDispatch();
  const themeSWitchHanfler = () => {
    dispatch(themeActions.themeActivation());
  };

  return (
    <>
      <div className="premium">
        <h5>Total Amount - {total.toFixed(2)}</h5>
        <div>
          {total > 1000 && (
            <button onClick={themeSWitchHanfler}>
              {theme ? "Premium-Dark" : "Premium-Light"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default TotalExpense;
