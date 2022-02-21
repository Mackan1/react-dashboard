import Sidebar from "./components/sidebar/Sidebar";
import Ng from "./Pages/ng/Ng";
import Support from "./Pages/support/Support";
import "./app.css";

function App() {
  return (
    <div className="container">
      <Sidebar />
      <Ng />
    </div>
  );
}

export default App;
