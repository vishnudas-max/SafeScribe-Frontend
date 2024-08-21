import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { setAuth, deleteAuth } from '../Redux/AuthSlice';
import api from '../config'
import { HistoryContext } from '../Contexts/OpenHistoryContext';

function CheckAuth(Component) {
  return (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (accessToken) {
        try {
          const decodedToken = jwtDecode(accessToken);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp < currentTime) {
            if (refreshToken) {
              api.post('token/refresh/', { refresh: refreshToken })
                .then(newAccessToken => {
                  localStorage.setItem('accessToken', newAccessToken);
                  const newDecodedToken = jwtDecode(newAccessToken);
                  dispatch(setAuth({
                    username: newDecodedToken.username,
                    is_admin: newDecodedToken.is_admin,
                    userID: newDecodedToken.user_id,
                  }));
                  console.log('getting new acces token')
                })
                .catch(() => {
                  // Handle token refresh failure
                  dispatch(deleteAuth());
                  localStorage.removeItem('accessToken');
                  localStorage.removeItem('refreshToken');

                });
            } else {
              // No refresh token available, log out the user
              dispatch(deleteAuth());
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');

            }
          } else {
            dispatch(setAuth({
              username: decodedToken.username,
              is_admin: decodedToken.is_admin,
              userID: decodedToken.user_id,
            }));

          }
        } catch (error) {
          console.error('Failed to decode token', error);
          dispatch(deleteAuth());
        }
      } else {

        dispatch(deleteAuth());
      }
    }, [dispatch]);

    return <Component {...props} />;
  };
}

export default CheckAuth;
