import { useSelector } from "react-redux";
import RoutingApp from "./components/RoutesApp/RoutingApp";
// import ContextProvider from "./store/ContextProvider";
import "./App.css";

function App() {
  const total = useSelector((state) => state.expense.total);
  const theme = useSelector((state) => state.theme.isThemeActivate);

  return (
    <div className={(total > 1000 ? "app" : "") + (theme ? "app" : "")}>
      {/* <ContextProvider> */}
      <RoutingApp />
      {/* </ContextProvider> */}
    </div>
  );
}

export default App;
