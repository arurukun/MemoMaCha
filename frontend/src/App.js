import {BrowserRouter,Route} from "react-router-dom"
import { Header } from "./component/Header";
import { HomeScreen } from "./screen/HomeScreen";
import { UserLoginScreen } from "./screen/UserLoginScreen";
import { UserRegisterScreen } from "./screen/UserRegisterScreen";

function App() {
  return (

    <BrowserRouter>
      <main className="bg-gradient-to-tr from-teal-100 to-lime-300 min-h-screen min-w-screen">
      <Header/>
        <Route path="/login" component={UserLoginScreen}/>
        <Route path="/register" component={UserRegisterScreen}/>
        <Route path="/" component={HomeScreen} exact/>
      </main>
    </BrowserRouter>
  );
}

export default App;
