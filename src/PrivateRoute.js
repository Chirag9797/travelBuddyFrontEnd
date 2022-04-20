import React,{useContext} from 'react'
import {Route, Navigate} from 'react-router-dom'
import TravelContext from './context/TravelContext';

const PrivateRoutes = ({component: Component, ...rest}) => {

    const travelContext = useContext(TravelContext);
    const {token} = travelContext;

    return (
    <Route {...rest} render={props => !token  ? (
         <Navigate to="/login" replace={true} />
        // <Redirect to="/login" /> 
    ):(
        <Component {...props}/>
    )} />
    )
}

export default PrivateRoutes;