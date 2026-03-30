import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ReactGA from "react-ga4";    

const GA_ID = import.meta.env.REACT_APP_GA_MEASUREMENT_ID;

if (GA_ID && process.env.NODE_ENV === "production") {
  ReactGA.initialize(GA_ID);
}

createRoot(document.getElementById("root")!).render(<App />);
