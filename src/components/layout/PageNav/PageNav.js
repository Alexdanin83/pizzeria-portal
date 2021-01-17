import React from 'react';
//import PropTypes from 'prop-types';
//import styles from './PageNav.module.scss';
import { NavLink } from 'react-router-dom';


const PageNav = () => {
  return (
    <nav>
      <NavLink exact to={`${process.env.PUBLIC_URL}/`} activeClassName='active'>Home</NavLink>
      <NavLink to={`${process.env.PUBLIC_URL}/login`} activeClassName='active'>Login</NavLink>
      <NavLink to={`${process.env.PUBLIC_URL}/tables`} activeClassName='active'>Tables</NavLink>
      <NavLink to={`${process.env.PUBLIC_URL}/kitchen`} activeClassName='active'>Kitchen</NavLink>
      <NavLink to={`${process.env.PUBLIC_URL}/waiter`} activeClassName='active'>Waiter</NavLink>
      <NavLink to={`${process.env.PUBLIC_URL}/order`} activeClassName='active'>Order</NavLink>
      <NavLink to={`${process.env.PUBLIC_URL}/booking`} activeClassName='active'>Booking</NavLink>
    </nav>
  );
};
PageNav.propTypes = {

};

export default PageNav;
