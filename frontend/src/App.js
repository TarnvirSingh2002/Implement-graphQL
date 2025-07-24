import { gql, useQuery } from '@apollo/client';

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

  // devDependency is a package you need only while developing, testing, 
  // or building your project—not when it’s running in production.

  const {data, loading} = useQuery(query);
  if(loading)
    return <h1>Loading....</h1>;
  return (
    <div>
    {data.getTodo.map(ele=> <h1>{ele.title}</h1>)}
    </div>
  )
}
