import { Route, Routes } from 'react-router-dom';
import './App.css';
import Calendar from './pages/Calendar';
import CompletedTask from './pages/CompletedTask';
import Home from './pages/Home';

function App() {
  return (
    <main >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/completed' element={<CompletedTask />} />
        <Route path='/calendar' element={<Calendar />} />
      </Routes>
    </main>
  );
}

export default App;
