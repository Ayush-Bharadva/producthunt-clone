import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.scss"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,
  cache: new InMemoryCache(),
  headers: {
    "Authorization": `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);
