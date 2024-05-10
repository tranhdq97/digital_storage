
import axiosCrossDomainHttpService from "src/utils/httpService";
const API_SEARCH = import.meta.env.VITE_API_SEARCH;
const API_DOCUMENT_GET = import.meta.env.VITE_API_DOCUMENT_GET
const DocumentAPIService = {
    getDocumentByTitle: async (title) => {
        const response = await axiosCrossDomainHttpService.post(`${API_SEARCH}`,
            {
                query: title
            })
        return response.data;
    },

    getDocumentById: async (idFile, idDoc) => {
        const response = await axiosCrossDomainHttpService.get(`${API_DOCUMENT_GET}${idFile}`)
        const doc = response.data.filter((doc) => doc.id == idDoc);
        return doc[0] || [];
    },

    getAllDocumentByFileId: async (idFile) => {
        const response = await axiosCrossDomainHttpService.get(`${API_DOCUMENT_GET}${idFile}`)
        return response.data;
    }
}

export default DocumentAPIService;
