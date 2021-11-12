import React from "react";
import { Redirect } from "react-router-dom";

import store from '../../../redux/store';
import {clearUser} from '../../../redux/actionCreators';

import {logout} from '../../../apis/admin';

import PageLoader from '../../../components/PageLoader';

function Logout() {

  const [authStatus, setAuthStatus] = React.useState(true);
  const [loading,setisLoading] = React.useState(true)

  React.useEffect(() => {
    logoutUser()

    return () => {
      // const cleanup = logoutUser();
    }
  }, [])

  const logoutUser = async () => {
    await logout().then( result => {
      //  
      if(result.status === true){
        console.log(result);
        store.dispatch(clearUser("clear"));
        setisLoading(false);
        setAuthStatus(false);
      }
    })
  }

  if(!loading){
    return (
      <>{
        authStatus ?
          <Redirect to={"/admin"} /> 
          :<Redirect to={"/admin/login"} /> 
      }</>
    );
  }else{
    return (
      <>
        <PageLoader status={loading} />
      </>
    )
  }

  
}

export default Logout;
