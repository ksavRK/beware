import './App.css';
import {
  BrowserRouter
} from "react-router-dom";
import { ReactNotifications } from 'react-notifications-component';
import { BewareProvider } from './context';
import { RouteList } from './routes';
import 'react-notifications-component/dist/theme.css'

function App() {
  return (
    <>
      <ReactNotifications />
      <BrowserRouter>
        <BewareProvider>
          <RouteList />
        </BewareProvider>
      </BrowserRouter>
    </>
  );
}

export default App;