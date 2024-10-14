import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Registration } from "./pages/Registration";
import HomePage from "./router/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import { ResetPassword } from "./pages/ResetPassword";
import { Student } from "./pages/Student";
import { Teacher } from "./pages/Teacher";
import Dashboard from "./pages/Dashboard";
import { getUser } from "./router/apis";
import { OtherTopics } from "./pages/OtherTopics";
import Questions from "./pages/Questions";
import { Report } from "./pages/Report";
import { Toaster } from "react-hot-toast";

const AppWrapper = ({ children }) => (
  <>
    <HomePage />
    {children}
  </>
);

function App() {
  const userType = getUser("user")?.userType;
  const getUserComponent = (userType) => {
    switch (userType) {
      case "student":
        return <Student />;
      case "teacher":
        return <Teacher />;
      default:
        return <Login />;
    }
  };
  return (
    <>
      <Toaster
        toastOptions={{
          duration: 3000,
          success: {
            style: {
              borderBottom: "2px solid black",
              borderRight: "1px solid green",
            },
          },
          error: {
            style: {
              borderBottom: "2px solid black",
              borderRight: "1px solid red",
            },
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route
            path='/registration'
            element={
              <AppWrapper>
                <Registration />
              </AppWrapper>
            }
          />
          <Route
            path='/'
            element={<AppWrapper>{getUserComponent(userType)}</AppWrapper>}
          />
          <Route
            path='/login'
            element={
              <AppWrapper>
                <Login />
              </AppWrapper>
            }
          />
          <Route path='/verifiedReset/:id' element={<ResetPassword />} />
          <Route
            path='/student'
            element={
              <AppWrapper>
                <Student />
              </AppWrapper>
            }
          />
          <Route
            path='/teacher'
            element={
              <AppWrapper>
                <Teacher />
              </AppWrapper>
            }
          />
          <Route
            path='/dashboard'
            element={
              <AppWrapper>
                <Dashboard />
              </AppWrapper>
            }
          />
          <Route
            path='/otherTopics'
            element={
              <AppWrapper>
                <OtherTopics />
              </AppWrapper>
            }
          />

          <Route
            path='/questions'
            element={
              <AppWrapper>
                <Questions />
              </AppWrapper>
            }
          />
          <Route
            path='/report'
            element={
              <AppWrapper>
                <Report />
              </AppWrapper>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
