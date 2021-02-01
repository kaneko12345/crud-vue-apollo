// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const CREATE_WINE = gql`
    mutation createWine(
            $title: String,
            $description: String,
            $grapeType: String,
            $type: String,
            $drinkDate: String,
            $handle: String,
            $fileName: String,
            $size: Number,
            $mimeType: String) {
        createWine(data: {
            status: PUBLISHED, 
            title: $title, 
            description: 
            $description, 
            grapeType: 
            $grapeType, 
            type: $type, 
            drinkDate: $drinkDate,
            handle: $handle,
            fileName: $fileName,
            size: $size,
            mimeType: $mimeType,
            }) {
            id
            title
            description
            grapeType
            type
            drinkDate
            handle
            fileName
            size
            mimeType
        }
    }
`;

export const UPDATE_WINE = gql`
    mutation updateWine($id: ID, $title: String, $description: String, $grapeType: String, $type: String, $drinkDate: String) {
        updateWine(data: {title: $title, description: $description, grapeType: $grapeType, type: $type, drinkDate: $drinkDate}, where:{id:$id}) {
            title
            description
            grapeType
            type
            drinkDate
        }
    }
`;

export const DELETE_WINE = gql`
    mutation deleteWine($id: ID) {
        deleteWine(where:{id: $id}){
            id
        }
    }
`;
