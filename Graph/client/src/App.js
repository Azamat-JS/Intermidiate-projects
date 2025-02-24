import Header from '../src/components/Header'
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client'
import Client from '../src/components/Client'
import AddClientModal from './components/AddClientModal'

const cache = new InMemoryCache({
  typePolicies: {
    Query:{
      fields:{
        clients:{
          merge(existing, incoming){
            return incoming;
          },
        },
        projects:{
          merge(existing, incoming){
            return incoming;
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:4002/graphql',
  cache,
})


function App() {
  return (
    <>
    <ApolloProvider client={client}>
    <Header/>
    <div className="container">
      <AddClientModal/>
    <Client/>
    </div>
    </ApolloProvider>
    </>
  );
}

export default App;
