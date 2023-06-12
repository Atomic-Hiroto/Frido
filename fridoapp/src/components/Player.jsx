import {
  Button,
  Flex,
  Heading,
  Input,
  useToast,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
import { IconButton } from "@chakra-ui/react";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
  TbPlaylistX
} from "react-icons/tb";

function Player(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSeeking,setIsSeeking] = useState(false);
  const [queue, setQueue] = useState([
    {
      title: "Cupid - FIFTY FIFTY (Twin Ver)",
      url: "https://www.youtube.com/watch?v=IshXvhbfy8I&pp=ygURY3VwaWQgZmlmdHkgZmlmdHk%3D",
    },
  ]);
  const [input, setInput] = useState("");
  const [currSong, setCurrSong] = useState(0);
  const [progress,setProgress] = useState(0);
  let player = useRef(null)

  const toast = useToast();

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  const handleRemove = (idx) => {
    const newque = queue.splice(idx+1,1)
    setQueue(newque)
  }
  const playIndex = (idx) =>{
    setCurrSong(idx)
  }

  return (
    <>
    <Flex borderRadius={10}
      background={"blackAlpha.400"} maxHeight={230} m={10} mt={0} p={5} alignItems={"center"} flexDirection={"column"} >
        <Heading color={"white"} fontSize={20} mb={5} >Queue</Heading>
        <Flex flexDirection={"column"} w={"80%"} overflowY={"scroll"} >
        {
            queue.map((elem,idx)=>{
                return <Flex alignItems={"center"} color={"white"} onClick={()=>{
                  playIndex(idx)
                }} cursor={"pointer"} _hover={{backgroundColor:"blackAlpha.300"}} justifyContent={"space-between"} >
                    <Flex alignItems={"center"} gap={1} >
                    <p>{idx+1}.</p>
                    <h4>{elem.title}</h4>
                    </Flex>
                    <IconButton
                    colorScheme="white"
                    variant={"ghost"}
                    style={{ backgroundColor: "transparent" }} 
                    icon={<TbPlaylistX />} 
                    onClick={()=>{
                        handleRemove(idx)
                    }}
                    />
                </Flex>
            })
        }
        </Flex>
    </Flex>
    <Flex
      position={["relative", "relative","relative","relative","absolute"]}
      bottom={0}
      m={10}
      p={10}
      borderRadius={10}
      background={"blackAlpha.500"}
      flexDirection={"column"}
    >
      <motion.div whileHover={{ y: -10 }}>
        <Heading
          fontSize={"25px"}
          bgClip="text"
          bgGradient="linear(to-l, blue.400, green.400)"
        >
          Enter song url (Youtube)
        </Heading>
      </motion.div>
      <Flex my={5}>
        <motion.div whileHover={{ scale: 1.1 }}>
          <Input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            color={"white"}
          />
        </motion.div>
        <motion.div whileTap={{ scale: 1.2 }}>
          <Button
            onClick={() => {
              const data = fetch(
                `https://noembed.com/embed?dataType=json&url=${input}`
              )
                .then((res) => res.json())
                .then((data) => {
                  if (data.error == "400 Bad Request"||!ReactPlayer.canPlay(input)) {
                    toast({
                      title: "Wrong URL",
                      description:
                        "Please make sure the url starts with https://youtu.be or https://www.youtube/watch",
                      status: "error",
                      duration: 4000,
                      isClosable: true,
                    });
                    return;
                  }
                  if (queue.some(e => e.title === data.title)) {
                    toast({
                        title: `${data.title} already exists.`,
                        description: "Song is already present in the queue",
                        status: "warning",
                        duration: 4000,
                        isClosable: true,
                      })
                  }else{
                    setQueue((prevQueue) => [...prevQueue, data]);
                    setInput("");
                    toast({
                      title: `${data.title} added.`,
                      description: "Song added to the queue",
                      status: "success",
                      duration: 2000,
                      isClosable: true,
                    });
                  }
                
                });
            }}
            ml={5}
            variant={"solid"}
            colorScheme="purple"
            bgGradient="linear(to-l, blue.400, green.400)"
          >
            add
          </Button>
        </motion.div>
      </Flex>
      <ReactPlayer
        style={{ display: "none" }}
        url={queue.length>0 ? queue[currSong].url : null}
        playing={isPlaying}
        onError={(err) => {
          console.log(err);
        }}
        onProgress={(data)=>{
            if (!isSeeking) {
                setProgress(Math.round(data.played*100))
              }
        }}
        ref={player}
      />
      <Flex flexDirection={["column","row"]} >
        <Button
          bgGradient="linear(to-l, red.500, purple.500)"
          colorScheme="red"
          onClick={handlePlayPause}
        >
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <IconButton
          colorScheme="cyan"
          variant={"ghost"}
          style={{ backgroundColor: "transparent" }}
          icon={<TbPlayerTrackPrevFilled />}
          onClick={() => {
            if (currSong > 0) {
              console.log(currSong);
              setCurrSong((prevCurrSong) => prevCurrSong - 1);
            }
          }}
        />
        <IconButton
          colorScheme="cyan"
          variant={"ghost"}
          style={{ backgroundColor: "transparent" }}
          icon={<TbPlayerTrackNextFilled />}
          onClick={() => {
            console.log(currSong);
            setCurrSong((prevCurrSong) => (prevCurrSong + 1) % queue.length);
          }}
        />
        <Flex flexDirection={"column"} >
          <Heading mb={2} color={"white"} ml={5} fontSize={15}>
            Now Playing: {`${queue.length>0 ? queue[currSong].title : "No Tracks in Queue"}`}
          </Heading>
          <Slider aria-label='slider-ex-1' colorScheme='cyan'  onMouseDown={()=>{
            setIsSeeking(true)
          }} onChange={(v) => {
                
                setProgress(v)
                player.current.seekTo(v/100)
            }} value={progress} onMouseUp={()=>{
                setIsSeeking(false)
            }} >
            <SliderTrack>
                <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
            </Slider>
        </Flex>
      </Flex>
    </Flex>
    </>
  );
}

export default Player;
