export const BASE_URL = "http://localhost:8000";
export const API_PATHS={
    AUTH:{
        REGISTER:"/api/auth/register",
        LOGIN:"/api/auth/login",
        GET_PROFILE:"/api/auth/profile"
    },
    IMAGE:{
        UPLOAD_IMAGE:"/api/auth/upload-image"
    },
    AI:{
        GENERATE_QUESTIONS:"/API/ai/generate-questions",
        GENERATE_EXPLANATION:"/API/ai/generate-explanation"
    },

    SESSION:{
        CREATE:"/api/sessions/create",
        GET_ALL:"/api/sessions/my-sessions",
        GET_ONE:(ID)=>`/api/sessions/${ID}`,
        DELETE:(ID)=>`/api/sessions/${ID}`
    },

    QUESTION:{
        ADD_TO_SESSION:"/api/questions/add",
        PIN:(id)=>`/api/questions/${id}/pin`,
       UPDATE_NOTE:(id)=>`/api/questions/${id}/note`
    }
};