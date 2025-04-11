

// import { Route, Routes } from 'react-router-dom';
// import './App.css';

// import Login from './Login';
// import Forgot from './Forgot';
// import Register from './Register';
// import NotFound from './NotFound';
// import DashBoard from './DashBoard';


// function App() {
//   return (
//     <>
//       <Routes>
//         <Route path='/' element={Login} />
//         <Route path='/register' element={Register} />
//         <Route path='/forgot' element={Forgot} />

      
//         <Route path='/dashboard' element={DashBoard }/>
        
        
        
        

//         <Route path='*' element={<NotFound />} />
//       </Routes>
//     </>
//   );
// }

// export default App;




import { Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './Login';
import Forgot from './Forgot';
import Register from './Register';
import NotFound from './NotFound';
import DashBoard from './DashBoard';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot' element={<Forgot />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
