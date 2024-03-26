import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.scss"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { GoogleOAuthProvider } from "@react-oauth/google"

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,
  cache: new InMemoryCache(),
  headers: {
    "Authorization": `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
  },
  onError: ({ networkErrors, graphQLErrors }) => {
    console.error('graphQLErrors :', graphQLErrors);
    console.error('networkErrors :', networkErrors);
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="710618875060-pnfhfiarsioofdaasi9f0aqgs17u6q5b.apps.googleusercontent.com">
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>,
);
