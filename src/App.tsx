import { Outlet } from 'react-router-dom';
import Layout from './components/Common/Layout/Layout';

// import './App.css';

function App() {
  return (
    <div className="App">
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
}

export default App;
