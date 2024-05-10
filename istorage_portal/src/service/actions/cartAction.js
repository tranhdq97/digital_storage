import { ADD_DOC_TO_CART, ADD_FILE_TO_CART, REMOVE_DOC_FROM_CART, REMOVE_FILE_FROM_CART } from "../key"
import DocumentAPIService from "../api/DocumentAPIService"
import FileAPIService from "../api/FileAPIService";
export const addFileToCart = (file) => {
    return async (dispatch) => {
        try {
            const doc = await DocumentAPIService.getAllDocumentByFileId(file.id);
            dispatch({
                type: ADD_FILE_TO_CART,
                payload: {
                    file,
                    doc,
                },
            });
        } catch (error) {
            console.error('Error while adding file to cart:', error);
        }
    };
};

export const addDocToCart = (idFile, idDoc) => {
    return async (dispatch) => {
        try {
            const doc = await DocumentAPIService.getDocumentById(idFile, idDoc);
            const files = await FileAPIService.getFileById(idFile);
            dispatch({
                type: ADD_DOC_TO_CART,
                payload: {
                    file: files[0],
                    doc,
                },
            });
        } catch (error) {
            console.error('Error while adding file to cart:', error);
        }
    };
}

export const removeFileFromCart = (file) => {
    return {
        type: REMOVE_FILE_FROM_CART,
        payload: {
            file
        }
    }
}

export const removeDocFromCart = (doc, file) => {
    return {
        type: REMOVE_DOC_FROM_CART,
        payload: {
            doc,
            file
        }
    }
}
