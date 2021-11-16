import { Box, VStack } from "@chakra-ui/react";
import './linkList.css';

function LinkList(props) {

  const links = (props.link) ? props.link : null ;

  if(!links) return(
    <h3>Loading...</h3>
  )

  return(
    <VStack>
        {links && links.map((link, index) => (
          <Box className="link__container" as="a" href={link.url} target="_blank" p="8" w="100%" shadow="md" borderRadius="10" key={index} >
            {link.title}
          </Box>
        ))}
    </VStack>
  )
}

export default LinkList;