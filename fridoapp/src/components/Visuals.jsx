import { Flex } from '@chakra-ui/react';
import React from 'react';
import { motion } from 'framer-motion';

function Visuals({audioRef}) {
    return (
        <Flex m={"auto"} w={"80%"} mt={"20px"} justifyContent={"center"} alignItems={"center"} >
            <motion.div initial={{opacity:0}} animate={{opacity:100}} transition={{duration:"1.5"}} >
                <Flex background={"blackAlpha.300"} m={10} p={[2,10]} borderRadius={10} >
                    visual
                </Flex>
            </motion.div>
        </Flex>
    );
}

export default Visuals;