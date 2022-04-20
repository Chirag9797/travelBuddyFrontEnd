import React, {useReducer} from 'react';
import axios from 'axios';
//context
import TravelContext from './TravelContext';
//reducer
import TravelReducer from './TravelReducer';

import {
    REGISTER, LOGOUT, ADD_TRAVEL_LIST,
    DELETE_TRAVEL_LIST, SET_LOADING, ADD_TRAVEL_BUDDIES,
    GET_TRAVEL_LIST,
    LOGOUT_PASS,
    LOGOUT_FAIL,
    ERROR,
    LOGIN_FAIL,
    LOGIN_PASS
} from './Types'
// set auth token
import setAuthToken from '../utils/setAuthToken';



const TravelState = (props)=>{

    const initialState = {
        token:localStorage.getItem('token'),
        isAuthenticated:null,
        loading:true,
        travelList:[],
        trips:[],
        user:{},
        error:null
    }

    const [state, dispatch] = useReducer(TravelReducer, initialState);


    // login 
    // logout
    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('https://secret-caverns-72146.herokuapp.com/api/auth/register', formData, config);

            dispatch({
                type: LOGIN_PASS,
                payload: res.data
            })
            // loadUser()
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err
            })
        }
    }


    //Add travel list 

    const addTravelList = async(listData)=>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }
        setLoading();

        try {
            const res = await axios.post("https://secret-caverns-72146.herokuapp.com/addTravelList", listData, config);
            dispatch({
                type: ADD_TRAVEL_LIST,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error
            })
        }
    }


    // Get travel list

    const getTravelList = async()=>{
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }
        setLoading();

        try {
            const res = await axios.get("https://secret-caverns-72146.herokuapp.com/allTravelList");
            console.log(res.data)
            dispatch({
                type: GET_TRAVEL_LIST,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error
            })
        }
    }


    // logout 
    const logout = () => {
        dispatch({
            type: LOGOUT
        })
    }

// add travel buddies 

const addTravelBuddies = async(id)=>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    setLoading();

    try {
        const res = await axios.post(`https://secret-caverns-72146.herokuapp.com/addTravelBuddies/${id}`, config);
        dispatch({
            type: ADD_TRAVEL_BUDDIES,
            payload: res.data
        })
        getTravelList()
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error
        })
    }
}   
    


    //set loading
    const setLoading = () => {
        dispatch({ type: SET_LOADING })
    }
    return (
        <TravelContext.Provider
        value={{
            token:state.token,
            isAuthenticated:state.isAuthenticated,
            loading: state.loading,
            travelList: state.travelList,
            trips:state.trips,
            user:state.user,

            //login
            login,
            logout,
            setLoading,
            addTravelList,
            getTravelList,
            addTravelBuddies



        }}>
            {props.children}
        </TravelContext.Provider>
    )
}



export default TravelState;
