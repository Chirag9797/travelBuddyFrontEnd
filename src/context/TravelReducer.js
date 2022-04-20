import {
    LOGOUT, LOGIN_PASS,LOGIN_FAIL, ADD_TRAVEL_LIST,
    DELETE_TRAVEL_LIST, SET_LOADING, ADD_TRAVEL_BUDDIES,
    GET_TRAVEL_LIST, ERROR
} from './Types'


// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    
        switch(action.type){

                case LOGIN_PASS:
                    localStorage.setItem('token',action.payload.token)
                    return {
                        ...state,
                        ...action.payload,
                        isAuthenticated:true,
                        loading:false  
                    }

                    case LOGIN_FAIL:
                        localStorage.removeItem('token')
                        return {
                            ...state,
                            token:null,
                            isAuthenticated:false,
                            loading:false,
                            user:null,
                            error:action.payload
                        }
                    
                    case ADD_TRAVEL_LIST:
                        return {
                            ...state,
                            loading:false,
                            isAuthenticated:true
                        }

                    case GET_TRAVEL_LIST:
                            return {
                                ...state,
                                travelList:action.payload,
                                loading:false,
                                isAuthenticated:true
                            }

                     case ADD_TRAVEL_BUDDIES:
                                return {
                                    ...state,
                                    loading:false,
                                    isAuthenticated:true
                                }

                    case LOGOUT:
                        localStorage.removeItem('token');

                        return{
                            ...state,
                            token:null,
                            isAuthenticated:false,
                            loading:false,
                            user:null,
                        }
                        
                    
                    

                default:
                    return state;
                


        }


}




