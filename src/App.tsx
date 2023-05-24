
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './components/pages/dashboard';
import { SideMenu } from './components/common/SideMenu';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Instagram from './components/pages/instagram';
import Facebook from './components/pages/facebook';
import Google from './components/pages/google';

function App() {
  return (
    <BrowserRouter>
    <SideMenu>
    <Routes>
      <Route path="/" element={<Dashboard/>}/>  
      <Route path="/google/*" element={<GoogleOAuthProvider clientId="205953643516-lloa8om0bdraoomcjf9uia1lbl0fna2m.apps.googleusercontent.com"><Google/></GoogleOAuthProvider>}/>  
      
      <Route path="/facebook" element={<Facebook />}/>
      <Route path="/instagram/*" element={<Instagram/>}/>
    </Routes>
    </SideMenu>
    </BrowserRouter>
  );
}

export default App;
