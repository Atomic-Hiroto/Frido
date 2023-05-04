import { Box, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import logo from "../assets/images/logo-no-background.png";
import {motion} from "framer-motion"

function NavBar(props) {
    return (
        <motion.div
        initial={{y:-200,opacity:0}}
        animate={{y:0,opacity:100}}
        transition={{duration:1.5}}
        >
        <Flex justifyContent={"center"} >
            <motion.div whileHover={{scale:1.1}} >
            <Flex cursor={"pointer"} m={10} p={[2,10]} transition={"padding 1s"} justifyContent={"center"} alignItems={"center"} borderRadius={10} background={"blackAlpha.400"} >
                <Image src={logo} w={"150px"} />
            </Flex>
            </motion.div>
        </Flex>
        </motion.div>
    );
}

export default NavBar;