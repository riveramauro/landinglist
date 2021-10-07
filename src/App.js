import { useEffect, useState } from 'react'

import './App.css';
import { Box, VStack } from "@chakra-ui/react";


const { REACT_APP_CF_SPACE, REACT_APP_CF_TOKEN } = process.env;

const query = `
query {
  linkCollection (where: {
   enableField: true
  } ) {
    items {
      title,
      url,
      enableField
    }
  }
}`

function App() {

  const [linkList, setLinkList] = useState(null)

  useEffect(() => {
    window.fetch(`https://graphql.contentful.com/content/v1/spaces/${REACT_APP_CF_SPACE}?access_token=${REACT_APP_CF_TOKEN}`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query })
    })
    .then((response) => response.json())
    .then(({data, errors}) => {
      console.log(data, errors)
      if(errors) console.log(errors)
      if(data) setLinkList(data)
    })
  }, [])

  return (
    <div className="App">
      <div>
        <Link link={linkList} />
      </div>  
    </div>
  );
}

function Link(props) {

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

export default App;
