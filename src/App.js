import Login from "./components/Login";
import ContextProvider from "./store/ContextProvider";

function App() {
  return (
    <ContextProvider>
      <Login />
    </ContextProvider>
  );
}

export default App;
