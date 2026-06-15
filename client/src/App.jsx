import { Outlet } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen flex flex-col">
      <Header />
      <main className="pt-20 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
