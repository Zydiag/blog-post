import { TopBar } from "./components"
import { AllRoutes } from "./routes/AllRoutes"

const App = () => {
  return (
    <div className="h-screen">
      <TopBar />
      <AllRoutes />
    </div>
  )
}
export default App