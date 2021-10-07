import { Box, VStack } from "@chakra-ui/react";

function LinkList(props) {

  console.log(props)

  const links = (props.link) ? props.link.linkCollection.items : null ;

  if(!links) return(
    <h3>Loading...</h3>
  )

  return(
    <VStack>
        {links && links.map((link, index) => (
          <Box p="8" minWidth="500px" shadow="md" borderRadius="10" key={index} >
            <a href={link.url}>{link.title}</a>
          </Box>
        ))}
    </VStack>
  )
}

export default LinkList;