import { useEffect } from "react";

function HomePage() {
  useEffect(() => {
    window.location.replace("https://mneia.net")
  }, []);
  return null;
}

export default HomePage;
