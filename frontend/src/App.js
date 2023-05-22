import {BrowserRouter,Route} from "react-router-dom"
import { Header } from "./component/Header";
import { HomeScreen } from "./screen/HomeScreen";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <main>
        <Route path="/" component={HomeScreen} exact/>
      </main>
    </BrowserRouter>
  );
}

export default App;
