import { Route, Routes } from 'react-router-dom';
import './App.css';
import Calendar from './pages/Calendar';
import CompletedTask from './pages/CompletedTask';
import Home from './pages/Home';
import NavBar from './shared/NavBar';

function App() {
  return (
    <main >
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/completed' element={<CompletedTask />} />
        <Route path='/calendar' element={<Calendar />} />
      </Routes>
    </main>
  );
}

export default App;
