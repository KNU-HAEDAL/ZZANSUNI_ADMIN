import './App.css'
import RQProvider from "@/components/RQProvider.tsx";
import Router from "@/global/pages/Router.tsx";

function App() {

  return (
    <RQProvider>
      <Router />
    </RQProvider>
  )
}

export default App
