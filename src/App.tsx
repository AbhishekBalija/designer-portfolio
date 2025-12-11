import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/layout/Layout";
import Loading from "./components/ui/Loading";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Work from "./components/sections/Work";
import Philosophy from "./components/sections/Philosophy";
import Services from "./components/sections/Services";
import Contact from "./components/sections/Contact";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      {loading ? (
        <Loading onComplete={() => setLoading(false)} />
      ) : (
        <Layout>
          <Hero />
          <About />
          <Work />
          <Philosophy />
          <Services />
          <Contact />
        </Layout>
      )}
    </ThemeProvider>
  );
}

export default App;
