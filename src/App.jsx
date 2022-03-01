import Sidebar from "./components/sidebar/Sidebar";
import Ng from "./Pages/ng/Ng";
import Support from "./Pages/support/Support";
import "./app.css";
import API from './Modules/api-functions'

const getDataFiltered = async (from, to) => {
  const api = new API('http://localhost:4000')
  let data = api.postFilter(new Date(from), new Date(to))
  data.then((data)=>{
    console.log(data)
  })
}
getDataFiltered('2022-03-01', '2022-01-01')
function App() {
  return (
    <div className="container">
      <Sidebar />
      <Ng />
    </div>
  );
}

export default App;
