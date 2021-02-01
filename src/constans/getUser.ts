import gql from 'graphql-tag';

export const ALL_WINES = gql`
  query getUser {
    user {
      id
      title
    }
  }
`;
