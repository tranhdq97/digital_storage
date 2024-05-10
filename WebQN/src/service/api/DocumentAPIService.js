
import axiosHttpService from "src/utils/httpService";
const API_SEARCH = import.meta.env.VITE_API_SEARCH;
const API_DOCUMENT_GET = import.meta.env.VITE_API_DOCUMENT_GET;
const API_GET_FOND_BY_ORGAN = import.meta.env.VITE_API_GET_FOND_BY_ORGAN;
const API_LANGUAGE = import.meta.env.VITE_API_LANGUAGE;
const API_PHYSICAL_STATE = import.meta.env.VITE_API_PHYSICAL_STATE;
const API_EOFFICE_DOCUMENT_LIST = import.meta.env.VITE_API_EOFFICE_DOCUMENT_LIST;
const API_EOFFICE_ATTACHMENT_LIST = import.meta.env.VITE_API_EOFFICE_ATTACHMENT_LIST;
const DocumentAPIService = {
    getDocumentByTitle: async (title) => {
        const response = await axiosHttpService.post(`${API_SEARCH}`,
            {
                query: title
            })
        return response.data;
    },

    getDocumentById: async (idFile, idDoc) => {
        const response = await axiosHttpService.get(`${API_DOCUMENT_GET}${idFile}`)
        const doc = response.data.filter((doc) => doc.id == idDoc);
        return doc[0] || [];
    },

    getAllDocumentByFileId: async (idFile) => {
        const response = await axiosHttpService.get(`${API_DOCUMENT_GET}${idFile}`)
        return response.data;
    },

    getFondByOrgan: async (id) => {
        const res = await axiosHttpService.get(API_GET_FOND_BY_ORGAN + '/' + id);
        return res.data;
    },

    getFormat: async () => {
        const res = await axiosHttpService.get(API_PHYSICAL_STATE);
        return res.data;
    },

    getLanguage: async () => {
        const res = await axiosHttpService.get(API_LANGUAGE);
        return res.data;
    },

    getEofficeDoc: async (page, param) => {
        const token = localStorage.getItem('eoffice_token');
        if (!token)
            return null;
        const payload = {
            "pageNo": page,
            "pageRec": "20",
            "param": param,
            "kho": ""
        }
        try {
            const res = await axiosHttpService.post(API_EOFFICE_DOCUMENT_LIST, payload, {
                headers: {
                    'X-AUTHENTICATION-TOKEN': token,
                }
            });
            return res.data.data;
        } catch (e) {
            console.log('err in get eoffice doc', e);
            return null;

        }
    },

    getEofficeAttachmentByDocId: async (id) => {
        const token = localStorage.getItem('eoffice_token');
        if (!token)
            return null;
        try {
            const res = await axiosHttpService.get(API_EOFFICE_ATTACHMENT_LIST + '/' + id, {
                headers: {
                    'X-AUTHENTICATION-TOKEN': token,
                }
            });
            return res.data.data;
        } catch (e) {
            console.log('err in get eoffice attachment', e);
            return null;
        }

    }
}

export default DocumentAPIService;
