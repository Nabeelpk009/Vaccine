import React, { Component } from 'react';
import  { Link } from 'react-router-dom'
import { withRouter } from "react-router";
import styles from './App.module.css';
import bg from './Assets/1.png'
import logo from './Assets/Logo.png';

class Main extends Component {
  render() {
    return (
      <div style={{backgroundImage: "url(" + bg + ")", height: "100%", backgroundPosition: "bottom", 
      backgroundSize: "cover", backgroundRepeat: 'no-repeat', resizeMode: 'cover', textAlign: "center"}}>
        <br></br>
        <img src={logo} style={{height: 200}} className={styles.center} alt="Logo"/>
        <br></br>
        <p>Please select your category</p>
        <div  className={styles.center} style={{textAlign: "center", width: "46%"}}>
          <Link to="/Manufacture"><button type="button" style={{margin: "auto", marginLeft: 10, marginRight: 10}} class="btn btn-info">Manufacture</button></Link>
          <Link to="/Distributor"><button type="button" style={{margin: "auto", marginLeft: 10, marginRight: 10}} class="btn btn-info">Distributor</button></Link>
          <Link to="/VaccineCenter"><button type="button" style={{margin: "auto", marginLeft: 10, marginRight: 10}} class="btn btn-info">VaccineCenter</button></Link>
          <Link to="/Doctor"><button type="button" style={{margin: "auto", marginLeft: 10, marginRight: 10}} class="btn btn-info">Doctor</button></Link>
          <Link to="/Beneficiary"><button type="button" style={{margin: "auto", marginLeft: 10, marginRight: 10}} class="btn btn-info">Beneficiary</button></Link>
          
        </div>

        

      </div>
    );
  }
}

const MainWithRouter = withRouter(Main);

export default MainWithRouter;











// import React, { Component } from 'react';
// import Web3 from 'web3';
// import Identicon from 'identicon.js';
// import './App.css';
// import Verify from '../abis/VaxiChain.json'
// import Navbar from './Navbar'
// import bg from './bg.jpg';
// import logo from './logo.png';
// import sky from './sky.jpg';
// import './w3.css';

// class Home extends Component {

//   async componentWillMount() {
//     await this.loadWeb3()
//     await this.loadBlockchainData()
//   }

//   async loadWeb3() {
//     if (window.ethereum) {
//       window.web3 = new Web3(window.ethereum)
//       await window.ethereum.enable()
//     }
//     else if (window.web3) {
//       window.web3 = new Web3(window.web3.currentProvider)
//     }
//     else {
//       window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
//     }
//   }

//   async loadBlockchainData() {
//     const web3 = window.web3
//     // Load account
//     const accounts = await web3.eth.getAccounts()
//     this.setState({ account: accounts[0] })
//     // Network ID
//     const networkId = await web3.eth.net.getId()
//     const networkData = VaxiChain.networks[networkId]
//     if(networkData) {
//       const vaxichain = web3.eth.Contract(VaxiChain.abi, networkData.address)
//       this.setState({ vaxichain })
      
//       this.setState({ loading: false})
//     } else {
//       window.alert('Vaxichain contract not deployed to detected network.')
//     }
//   }

//   async direct() {
    
//     var exists = await this.state.vaxichain.methods.address_exists(this.state.account).call();
    
//     if(exists)
//     {
//       if(this.state.account == localStorage.getItem('session') )
//       {
//         window.location.href="./Dashboard";
//       }
//       else
//       {
//       localStorage.setItem('session', "0");
//       window.location.href="./Login";
//       }
//     }
//     else
//     {
//     localStorage.setItem('session', "0");
//     window.location.href="./Register";
//     }

//   }

  

//   constructor(props) {
//     super(props)
//     this.state = {
//       loginStatus:false,

//       account: '',
//       vaxichain: null,
//       unitCount: 0,
//       units: [],
//       loading: true
//     }

//   }

// render() {
//   return (
    

//     <div style={{backgroundImage:  `url(${bg})`,
//     backgroundPosition: 'center',
//     backgroundSize: 'cover',
//     minHeight:'100%'}}>
      
//       <title>W3.CSS Template</title>
//       <meta charSet="UTF-8" />
//       <meta name="viewport" content="width=device-width, initial-scale=1" />
//       <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
//       <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway" />
//       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
//       <style dangerouslySetInnerHTML={{__html: "\nbody,h1,h2,h3,h4,h5,h6 {font-family: \"Raleway\", sans-serif}\n\nbody, html {\n  height: 100%;\n  line-height: 1.8;\n}\n\n/* Full height image header */\n.bgimg-1 {\n  background-position: center;\n  background-size: cover;\n  background-image: url(\"/w3images/mac.jpg\");\n  min-height: 100%;\n}\n\n.w3-bar .w3-button {\n  padding: 16px;\n}\n" }} />
//       {/* Sidebar on small screens when clicking the menu icon */}
      
      
//       <div><br /><br /><br /><br /></div>
      

//       <header className="bgimg-1 w3-display-container w3-grayscale-min" id="home">
//         <div className="w3-display-left w3-text-white" style={{padding: '48px'}}>
//           <span className="w3-jumbo w3-hide-small">Protect your brand with AuthPlanet</span><br />
//           <span className="w3-xxlarge w3-hide-large w3-hide-medium">Protect your brand with AuthPlanet</span><br />
//           <span className="w3-large">Brand protection and next level consumer services <i class="fa fa-th-large"></i></span><br/>
          
//           <p><a href="null" onClick={(event) => {
//             event.preventDefault();
//             this.direct();
//           }
//           } className="w3-button w3-white w3-padding-large w3-large w3-margin-top w3-opacity w3-hover-opacity-off">Get now</a></p>
//         </div> 
//         <div className="w3-display-bottomleft w3-text-grey w3-large" style={{padding: '24px 48px'}}>
//           <i className="fa fa-facebook-official w3-hover-opacity" />
//           <i className="fa fa-instagram w3-hover-opacity" />
//           <i className="fa fa-snapchat w3-hover-opacity" />
//           <i className="fa fa-pinterest-p w3-hover-opacity" />
//           <i className="fa fa-twitter w3-hover-opacity" />
//           <i className="fa fa-linkedin w3-hover-opacity" />
//         </div>

        
//       <div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></div>
//       <div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></div> 
//       </header>
//       {/* About Section */}

//       <div class="w3-display-bottomright w3-animate-fading">  
//       <img src={logo} alt="Alps" style={{ maxWidth:'100%',height:'auto'}} />
//       </div>
      
     
  
     
//       {/* Promo Section "Statistics" */}
//       <div className="w3-container w3-row w3-center w3-dark-grey w3-padding-64">
//         <div className="w3-quarter">
//           <span className="w3-xxlarge">14+</span>
//           <br />Partners
//         </div>
//         <div className="w3-quarter">
//           <span className="w3-xxlarge">55+</span>
//           <br />Projects Done
//         </div>
//         <div className="w3-quarter">
//           <span className="w3-xxlarge">89+</span>
//           <br />Happy Clients
//         </div>
//         <div className="w3-quarter">
//           <span className="w3-xxlarge">150+</span>
//           <br />Meetings
//         </div>
//       </div>
    
//     </div>
//   );
// }
// }

// export default Home;
