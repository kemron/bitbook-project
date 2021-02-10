import "./App.css";
import DashboardPage from "pages/Dashboard";
import StoreProvider from "data/StoreProvider";
import Transport from "data/Transport";

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <Transport>
          <DashboardPage />
        </Transport>
      </StoreProvider>
    </div>
  );
}

export default App;
