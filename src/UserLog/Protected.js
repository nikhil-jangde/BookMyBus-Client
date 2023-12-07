import React, { useEffect } from 'react';
import { setauth } from '../Redux/actions/setauth';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

function Protected({ isDivVisible, setauth, Component }) {
  const navigate = useNavigate()
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      navigate('/')
      setauth(!isDivVisible);
    }
  }, []);

  
    return (
      <div>
        <Component />
      </div>
    ); 
}

const mapDispatchToProps = (dispatch) => {
  return {
    setauth:(condn) => dispatch(setauth(condn))
  };
};

export default connect(null,mapDispatchToProps)(Protected);
