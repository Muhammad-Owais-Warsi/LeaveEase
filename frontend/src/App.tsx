import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import Application from "./components/leaveApplication";
import CongratsCard from "./components/success";
import FacultyAdvisorLogin from "./components/facultyAdvisorLogin";
import HostelCoordinatorLogin from "./components/hostelCoordinatorLogin";
import HeadOfDepartmentLogin from "./components/headOfDepartmentLogin";
import ApplicationStatusLogin from "./components/applicationStatusLogin";
import ApplicationStatus from "./components/applicationStatus";
import WithdrawnCard from "./components/withdrawSuccess";
import FacultyAdvisorApplications from "./components/facultyAdvisorApplications";
import {NextUIProvider} from "@nextui-org/react";
import { useState } from "react";


function App() {


  const [isStudentLoggedIn,setIsStudentLoggedIn] = useState<boolean>(false);
  const [isApplicationStatusLoggedIn,setIsApplicationStatusLoggedIn] = useState<boolean>(false);
  const [isApplicationSubmitted,setIsApplicationSubmitted] = useState<boolean>(false);
  const [isApplicationWithdrawn,setIsApplicationWithdrawn] = useState<boolean>(false);
  const [isFacultyAdvisorLoggedIn,setIsacultyAdvisorLoggedIn] = useState<boolean>(false);

  const updateStatus = () => {
      setIsStudentLoggedIn(true);
  }

  const updateApplication = () => {
    setIsApplicationSubmitted(true);
  }

  const updateApplicationStatus = () => {
    setIsApplicationStatusLoggedIn(true);
  } 

  const updateApplicationWithdrawn = () => {
    setIsApplicationWithdrawn(true);
  }

  const updateFacultyAdvisorLoggedIn = () => {
    setIsacultyAdvisorLoggedIn(true)
  }

 

  return (
    
    <NextUIProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home updateStatus={updateStatus}/>}></Route>
            <Route path="/leaveApplication" element={ isStudentLoggedIn ? <Application updateApplication={updateApplication}/> : <Navigate to="/" />}></Route>
            <Route path="/success" element={isApplicationSubmitted ? <CongratsCard/> : <Navigate to="/" />}></Route>
            <Route path="/facultyAdvisor/login" element={<FacultyAdvisorLogin updateFacultyAdvisorLoggedIn={updateFacultyAdvisorLoggedIn}/>}></Route>
            <Route path="/facultyAdvisor/application" element={isFacultyAdvisorLoggedIn ? <FacultyAdvisorApplications/> : <Navigate to="/facultyAdvisor/login"/>}></Route>
            <Route path="/hostelCoordinator/login" element={<HostelCoordinatorLogin/>}></Route>
            <Route path="/headOfDepartment/login" element={<HeadOfDepartmentLogin/>}></Route>
            <Route path="/applicationStatus/login" element={<ApplicationStatusLogin updateApplicationStatus={updateApplicationStatus}/>}></Route>
            <Route path="/application/status" element={isApplicationStatusLoggedIn ? <ApplicationStatus updateApplicationWithdrawn={updateApplicationWithdrawn} /> : <Navigate to="/applicationStatus/login"/>}></Route>
            <Route path="application/withdrawn/success" element={isApplicationWithdrawn ? <WithdrawnCard/> : <Navigate to="/applicationStatus/login"/>}></Route>
          </Routes>
        </BrowserRouter>
    </NextUIProvider>
  )
}

export default App
