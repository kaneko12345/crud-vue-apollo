// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const ALL_POSTS = gql`
    query allPosts {
        posts {
            id
            title
            content
            description
            createdAt
            thumbnail {
                url
            }
        }
    }
`;
