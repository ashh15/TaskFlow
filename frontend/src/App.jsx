import './App.css'
import NavBar from './components/NavBar';
import {Routes,Route} from 'react-router-dom';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import UpdateTask from './components/UpdateTask';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Protected from './components/Protected';
function App() {
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path='/' element={<Protected><TaskList/></Protected>}/>
      <Route path='/add' element={<Protected><AddTask/></Protected>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/update/:id' element={<Protected><UpdateTask/></Protected>}/>
    </Routes>
    </>
  )
}

export default App;
