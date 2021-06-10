import { BrowserRouter, Link, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Route path="/" component={HomeScreen}></Route>
      </main>
    </BrowserRouter>
  );
}

export default App;
