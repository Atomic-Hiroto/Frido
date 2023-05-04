import { Button, Flex, Input } from '@chakra-ui/react';
import React,{useRef,useState} from 'react';
import song from "../assets/songs/remember.mp3"
import ReactPlayer from 'react-player';

function Player({onAudioReady}) {
    const audioRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
      };
    
      const handleAudioReady = () => {
        onAudioReady(audioRef.current);
      };

    return (
        <Flex position={"absolute"} bottom={0} m={10} p={10} borderRadius={10} background={"blackAlpha.500"}  >
            <Input type='text' />
            <Button ml={5} variant={"solid"} colorScheme='purple' >add</Button>
            <ReactPlayer
                style={{display:"none"}}
                url={song}
                playing={isPlaying}
                ref={audioRef}
                onReady={handleAudioReady}
            />
            <Button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</Button>
        </Flex>
    );
}

export default Player;