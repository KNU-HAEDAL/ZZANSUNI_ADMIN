import './App.css'
import RQProvider from "@/components/RQProvider.tsx";
import Router from "@/pages/Router.tsx";

function App() {

  return (
    <RQProvider>
      <Router />
    </RQProvider>
  )
}

export default App
