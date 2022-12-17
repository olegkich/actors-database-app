import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddActors from "./components/AddActors";
import Auth from "./components/Auth";
import FindActors from "./components/FindActors";
import Home from "./components/Home";
import UpdateActors from "./components/UpdateActors";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route element={<Auth />} path="/" />
					{localStorage.getItem("token") ? (
						<>
							<Route element={<Home />} path="/admin" />
							<Route element={<AddActors />} path="/admin/add" />
							<Route
								element={<FindActors />}
								path="/admin/find"
							/>
							<Route
								element={<UpdateActors />}
								path="/admin/update"
							/>
						</>
					) : null}
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
