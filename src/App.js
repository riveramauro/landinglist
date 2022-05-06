import { useEffect, useState } from 'react'
import LinkList from "./components/linkList";
import ReactGA from "react-ga4";

import { Box, Heading } from "@chakra-ui/react";
import Logo from "../src/images/ssshape.svg";

import samplelinkJSON from './links.json';

const { REACT_APP_CF_SPACE, REACT_APP_CF_TOKEN, REACT_APP_CF_LISTID, REACT_APP_GA_MEASUREMENT_ID } = process.env;

if (REACT_APP_GA_MEASUREMENT_ID ){  
  ReactGA.initialize(REACT_APP_GA_MEASUREMENT_ID);
}

const query = `
query{
  linkList(id: "${REACT_APP_CF_LISTID}") {
    nameOfList,
    linksOnListCollection {
      total,
      items {
        title,
        url,
        enableField
      }
    }
  }
}`

function App() {

  const [linkList, setLinkList] = useState(null)

  useEffect(() => {
    
    if(REACT_APP_CF_SPACE) {
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
        // console.log(data.linkList.linksOnListCollection.items, errors)
        if(errors) console.log(errors)
        if(data) setLinkList(data.linkList.linksOnListCollection.items)
      })
      return;
    }
    
    setLinkList(samplelinkJSON.links)

  }, [])

  return (
    <div className="App" style={{padding: '2rem'}}>
      <Box display="flex" alignItems="center" flexDir="column" marginBottom='2em'>
        <img src={Logo} width="200px" alt="Logo" />
        <Heading as='h1'>Brand's Name</Heading>
      </Box>
      <LinkList link={linkList} />
    </div>
  );
}

export default App;
