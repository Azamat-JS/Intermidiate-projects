import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from './pages/Auth/SignUp'
import Login from './pages/Auth/Login'
import Dashboard from './pages/Admin/AdminDashboard'
import ManageTasks from './pages/Admin/ManageTasks'
import CreateTask from './pages/Admin/CreateTask'
import ManageUsers from './pages/Admin/ManageUsers'
import UserDashboard from './pages/User/UserDashboard'
import MyTasks from './pages/User/MyTasks'
import ViewTaskDetails from './pages/User/ViewTaskDetails'
import PrivateRoute from "./Routes/PrivateRoute"

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />

          {/* Admin routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/tasks" element={<ManageTasks />} />
            <Route path="/admin/create-tasks" element={<CreateTask />} />
            <Route path="/admin/users" element={<ManageUsers />} />
          </Route>

          {/* User routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/tasks" element={<MyTasks />} />
            <Route path="/user/task-details/:id" element={<ViewTaskDetails />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}
