import { useEffect, useState } from 'react'
import LinkList from "./components/linkList";

import './App.css';

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
        <LinkList link={linkList} />
      </div>  
    </div>
  );
}

export default App;
