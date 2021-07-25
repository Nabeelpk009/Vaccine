import React from "react";
import { Link, withRouter } from "react-router-dom";
import styles from './App.module.css';

function Navbar(props) {
  return (
    <div className="navigation" style={{backgroundColor: props.color}}>
      <nav class="py-3 navbar navbar-expand-sm">
        <div class="container">
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
            <li
                class={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/" className={styles.navbarlinks}>
                  Home
                  <span class="sr-only">(current)</span>
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/Manfacture" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Manufacture" className={styles.navbarlinks}>
                Manufacture
                  <span class="sr-only">(current)</span>
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/Distributor" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Distributor" className={styles.navbarlinks}>
                Distributor
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/VaccineCenter" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/VaccineCenter" className={styles.navbarlinks}>
                VaccineCenter
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/Doctor" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Doctor" className={styles.navbarlinks}>
                Doctor
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/Beneficiary" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Beneficiary" className={styles.navbarlinks}>
                Beneficiary
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
      </nav>
    </div>
  );
}

export default withRouter(Navbar);





















// import React, { Component } from 'react';

// class Navbar extends Component {

//   render() {
//     return (
//       <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
//         <a
//           className="navbar-brand col-sm-3 col-md-2 mr-0"
//           href="http://www.dappuniversity.com/bootcamp"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Vaxichain
//         </a>
//         <ul className="navbar-nav px-3">
//           <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
//             <small className="text-white"><span id="account">{this.props.account}</span></small>
//           </li>
//         </ul>
//       </nav>
//     );
//   }
// }

// export default Navbar;
