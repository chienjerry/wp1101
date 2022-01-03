import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { WebSocketLink } from "apollo-link-ws";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.min.css";
const httpLink = new HttpLink({
  uri: "http://localhost:5000/",
});
const wsLink = new WebSocketLink({
  uri: "ws://localhost:5000/",
  options: { reconnect: true },
});
const link = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return (
      def.kind === "OperationDefinition" && def.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);
const apolloClient = new ApolloClient({
  link: link,
  cache: new InMemoryCache().restore({}),
});
ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
reportWebVitals();
