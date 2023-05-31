import {BrowserRouter,Route} from "react-router-dom"
import { Header } from "./component/Header";
import { HomeScreen } from "./screen/HomeScreen";
import { UserLoginScreen } from "./screen/UserLoginScreen";
import { UserRegisterScreen } from "./screen/UserRegisterScreen";
import { MemoScreen } from "./screen/MemoScreen";
import { TodoScreen } from "./screen/TodoScreen";

function App() {
  return (

    <BrowserRouter>
      <Header/>
      <main className="bg-gradient-to-tr from-teal-100 to-lime-300 min-h-screen min-w-screen">
        <Route path="/login" component={UserLoginScreen}/>
        <Route path="/register" component={UserRegisterScreen}/>
        <Route path="/memo" component={MemoScreen}/>
        <Route path="/todo" component={TodoScreen}/>
        <Route path="/" component={HomeScreen} exact/>
      </main>
    </BrowserRouter>
  );
}

export default App;
