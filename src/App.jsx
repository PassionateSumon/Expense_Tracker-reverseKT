import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Header/Home";
import Profile from "./components/Header/Profile";
import Contact from "./components/Footer/Contact";
import { Provider, useSelector } from "react-redux";
import store from "./app/store";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Budget from "./components/Header/Budget";
import SignUp from "./components/Header/SignUp";
import LogIn from "./components/Header/LogIn";

const LayOut = () => {
  const isSignIn = useSelector((state) => state.auth.isSignIn);
  return (
    <>
      <Header />
      <Outlet />
      {isSignIn ? <Footer /> : null}
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      {
        path:'/',
        element: <Home />,
      },
      {
        path: "/budget",
        element: <Budget />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
