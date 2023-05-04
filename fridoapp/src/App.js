import { Box } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import Visuals from "./components/Visuals";
import Player from "./components/Player";
import bgVid from "../src/assets/videos/raindrops-25fps.mp4"



function App() {

  return (
    <Box  h={"100vh"} >
      <video style={{position:"fixed",top:"0",right:"0",bottom:"0",left:"0",zIndex:-1,width:"100vw",height:"100vh",objectFit: "cover"}} float autoPlay loop muted>
        <source src={bgVid} type='video/mp4' />
      </video>
      <NavBar />
      {/* <Visuals audioRef={audioRef} /> */}
      <Player/>
      
    </Box>
  );
}

export default App;
