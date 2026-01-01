import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Configuration du lien HTTP pour les requêtes GraphQL
const httpLink = createHttpLink({
    uri: '/graphql',
    credentials: 'include',
});

// Configuration du client Apollo
export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'network-only',
        },
        query: {
            fetchPolicy: 'network-only',
        },
    },
});
