// import React, { useContext } from "react";
// import { userContext } from "../../store/ContextStore";
import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import axios from "axios";
import EditExpense from "./EditExpense";
import DeleteIcon from "@mui/icons-material/Delete";
import "./ExpensesList.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ExpenseList = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteItems = async (id) => {
    const response = await axios.delete(
      `https://expense-list-270ee-default-rtdb.firebaseio.com/expenses/${id}.json`
    );
    const responseData = response.data;
    props.fetchData();
    console.log(responseData);
  };

  return (
    <>
      <ul className="flex justify-between items-center mt-8 expenselist">
        <li>{props.price}</li>
        <li>{props.description}</li>
        <li>{props.productType}</li>
        <Button
          variant="outlined"
          onClick={() => deleteItems(props.id)}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>

        <Button variant="outlined" onClick={handleClickOpen}>
          Edit
        </Button>
      </ul>
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Edit the expense details and save"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <EditExpense
                moneySpent={props.price}
                description={props.description}
                productType={props.productType}
                id={props.id}
                fetchData={props.fetchData}
                onSave={handleClose}
              />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ExpenseList;

// const Petrol = listItems?.filter((item) => {
//   if (item.productType === "Petrol") return item;
// });
// const food = listItems?.filter((item) => {
//   if (item.productType === "food") return item;
// });
// const salary = listItems?.filter((item) => {
//   if (item.productType === "salary") return item;
// })

// {/* <div> */}

// {/* <div>{total}</div>
//   <div>
//     {total > 1000 && (
//       <div>
//         <button onClick={themeSWitchHanfler}>
//           {theme ? "Premium-Dark" : "Premium-Light"}
//         </button>
//       </div>
//     )}
//     <a href={urlDownload} download="Expense.csv">
//       Download Expense
//     </a>
//   </div>
//   {console.log(Petrol, "pppppppp")}
//   {Petrol.map((item) => {
//     return (
//       <div key={item.id}>
//         <li>{item.moneySpent}</li>
//         <li>{item.description}</li>
//         <li>{item.productType}</li>
//         <div>

//         </div>
//       </div>
//     );
//   })}
// </div>
// <div>
//   {food?.map((item) => {
//     return (
//       <div key={item.id}>
//         <li>{item.moneySpent}</li>
//         <li>{item.description}</li>
//         <li>{item.productType}</li>
//         <div>
//           <button onClick={() => deleteItems(item.id)}>Delete</button>
//         </div>
//       </div>
//     );
//   })}
// </div>
// <div>
//   {salary?.map((item) => {
//     return (
//       <div key={item.id}>
//         <li>{item.moneySpent}</li>
//         <li>{item.description}</li>
//         <li>{item.productType}</li>
//         <div>
//           <button onClick={() => deleteItems(item.id)}>Delete</button>
//         </div>
//       </div>
//     );
//   })} */}
// {/* </div> */}
