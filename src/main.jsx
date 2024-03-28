import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.scss"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { showToast } from "./utils/helper.js";

const token = localStorage.getItem("token");

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,
  cache: new InMemoryCache(),
  headers: {
    "Authorization": `Bearer ${token ?? import.meta.env.VITE_DEV_TOKEN}`
  },
  onError: ({ networkErrors, graphQLErrors }) => {
    console.error('graphQLErrors :', graphQLErrors);
    console.error('networkErrors :', networkErrors);
    showToast("error", "GraphQL Error");
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  //</React.StrictMode>
);
