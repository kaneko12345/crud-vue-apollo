// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const ALL_WINES = gql`
   query allWines {
       wines(where: {status: PUBLISHED}) {
           id
           createdAt
           title
           description
           thumbnail {
               url
           }
           grapeType
           type
           drinkDate
       }
   }
`;
