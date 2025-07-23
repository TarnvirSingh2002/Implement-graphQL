import React from 'react'
import { gql, useQuery } from '@apollo/client'

  const query = gql`
  query getAllTodos
    {
      getTodo
      {
        id, 
        title, 
        post{ 
          id, 
          body
        }
      }
    }
  `
export default function App() {
  const {data, loading} = useQuery(query);
  if(loading)
    return <h1>Loading....</h1>;
  return (
    <div>
      
    </div>
  )
}
