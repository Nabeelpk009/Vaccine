import React from "react";
import { Link, withRouter } from "react-router-dom";
import styles from './App.module.css';

function BfyNavbar(props) {
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
                  props.location.pathname === "/Tracking" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Tracking" className={styles.navbarlinks}>
                TrackVaccine
                  <span class="sr-only">(current)</span>
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/SideEffects" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/SideEffects" className={styles.navbarlinks}>
                ReportSideEffect
                </Link>
              </li>              
            </ul>
          </div>
        </div>
        
      </nav>
    </div>
  );
}

export default withRouter(BfyNavbar);