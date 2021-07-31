import React from "react";
import { Link, withRouter } from "react-router-dom";
import styles from './App.module.css';

function DtrNavbar(props) {
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
                  props.location.pathname === "/TempMonitoring" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/TempMonitoring" className={styles.navbarlinks}>
                Temperature
                Monitoring
                </Link>
              </li>         
              <li
                class={`nav-item  ${
                  props.location.pathname === "/DeliveredVaccine" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/DeliveredVaccine" className={styles.navbarlinks}>
                DeliveredVaccine
                  <span class="sr-only">(current)</span>
                </Link>
              </li>     
            </ul>
          </div>
        </div>
        
      </nav>
    </div>
  );
}

export default withRouter(DtrNavbar);