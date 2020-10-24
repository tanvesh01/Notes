import "./App.css";
import List from "./components/List";
import AddBook from "./components/AddBook";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="App-header">
                <AddBook />
                <h1>GraphQL</h1>
                <List />
            </div>
        </ApolloProvider>
    );
}

export default App;
