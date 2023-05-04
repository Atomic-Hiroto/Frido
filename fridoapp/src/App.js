import { Box } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import Visuals from "./components/Visuals";
import Player from "./components/Player";
import { useState } from "react";


function App() {
  const [audioRef, setAudioRef] = useState(null);
  const handleAudioReady = (ref) => {
    setAudioRef(ref);
  };
  return (
    <Box bgGradient='linear(to-b, purple.600, pink.700)' h={"100vh"} >
      <NavBar />
      <Visuals audioRef={audioRef} />
      <Player onAudioReady={handleAudioReady} />
    </Box>
  );
}

export default App;
