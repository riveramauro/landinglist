import { Box, VStack } from "@chakra-ui/react";
import './linkList.css';

function LinkList(props) {

  const links = (props.link) ? props.link : null ;

  if(!links) return(
    <h3>Loading...</h3>
  )

  return(
    <VStack spacing='1rem'>
        {links && links.map((link, index) => (
          <Box key={index} className="link__container" as="a" href={link.url} target="_blank" p="3" w="100%" maxWidth="500px" shadow="sm" borderRadius="5" >
            {link.title}
          </Box>
        ))}
    </VStack>
  )
}

export default LinkList;