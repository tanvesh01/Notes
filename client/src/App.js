import React, { useState } from "react";
import "./App.css";
import BookInfo from "./components/bookInfo";
import List from "./components/List";
import AddBook from "./components/AddBook";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
    onError: (e) => {
        console.log(e);
        // console.log("graphQLErrors", graphQLErrors);
        // console.log("networkError", networkError);
    },
});

function App() {
    const [selected, setselected] = useState("");
    const handle = (x) => {
        setselected(x);
    };
    return (
        <ApolloProvider client={client}>
            <div className="App-header">
                <BookInfo selected={selected} />
                <AddBook />
                <h1>GraphQL</h1>
                <List handle={handle} />
            </div>
        </ApolloProvider>
    );
}

export default App;
