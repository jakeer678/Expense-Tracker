
import RoutingApp from "./components/RoutesApp/RoutingApp";
import ContextProvider from "./store/ContextProvider";

function App() {
  return (
    <ContextProvider>
      <RoutingApp />
    </ContextProvider>
  );
}

export default App;
