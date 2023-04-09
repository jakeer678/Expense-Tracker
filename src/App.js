import { useSelector } from "react-redux";
import RoutingApp from "./components/RoutesApp/RoutingApp";
import ContextProvider from "./store/ContextProvider";
import './App.css'

function App() {

  const theme = useSelector((state) => state.theme.isThemeActivate);


  return (
    <div className={theme && "app"}>
      <ContextProvider>
        <RoutingApp />
      </ContextProvider>
    </div>
  );
}

export default App;
