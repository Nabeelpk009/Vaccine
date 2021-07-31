import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home  from './Home';
import Manufacture from './Manufacture';
import Distributor from './Distributor';
import VaccineCenter from './VaccineCenter';
import Doctor from './Doctor';
import Beneficiary from './Beneficiary';
import Vaccine from './Vaccine';
import Rules from './Rules';
import ArrivedVaccine from './ArrivedVaccine';
import DeliveredVaccine from './DeliveredVaccine';
import SideEffects from './SideEffects';
import Administering from './Administering';
import Tracking from './Tracking';
import TempMonitoring from './TempMonitoring';


class App extends Component {

  render() {

    return (
      <div className="App" style={{height:"100vh", width:"100vw"}}>

        <Router>
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/Manufacture" exact component={() => <Manufacture />} />
            <Route path="/Distributor" exact component={() => <Distributor />} />
            <Route path="/VaccineCenter" exact component={() => <VaccineCenter />} />
            <Route path="/Doctor" exact component={() => <Doctor />} />
            <Route path="/Beneficiary" exact component={() => <Beneficiary />} />
            <Route path="/Vaccine" exact component={() => <Vaccine />} />
            <Route path="/Rules" exact component={() => <Rules />} />
            <Route path="/ArrivedVaccine" exact component={() => <ArrivedVaccine />} />
            <Route path="/SideEffects" exact component={() => <SideEffects />} />  
            <Route path="/DeliveredVaccine" exact component={() => <DeliveredVaccine />} />
            <Route path="/Administering" exact component={() => <Administering />} />  
            <Route path="/Tracking" exact component={() => <Tracking />} />         
            <Route path="/TempMonitoring" exact component={() => <TempMonitoring />} />

          </Switch>
        </Router>
        
      </div>
    );
  }
}

export default App;














//   async loadBlockchainData() {
//     const web3 = window.web3
//     const accounts = await web3.eth.getAccounts()
//     this.setState({ account: accounts[0] })
//     const networkId = await web3.eth.net.getId()
//     const networkData = VaxiChain.networks[networkId]
//     if(networkData) {
//       const vaxichain = web3.eth.Contract(VaxiChain.abis, networkData.address)
//       this.setState({ vaxichain })
//       const manufactureCount = await vaxichain.methods.manufactureCount().call()
//       this.setState({ manufactureCount })
      

//       for (var i = 1; i <= manufactureCount; i++) {
//         const Manufacture = await vaxichain.methods.manufacture(i).call()
//         this.setState({
//           manufacture: [...this.state.manufacture, Manufacture]
//         })
//       }
//       this.setState({ loading: false}) 
//     } else {
//       window.alert('Marketplace contract not deployed to detected network.')
//     }
//   }

//   constructor(props) {
//     super(props)
//     this.state = {
//       account: '',
//       manufactureCount: 0,
//       manufacture: [],
//       loading: true
      
//     }


//   render() {
//     return (
//       <div id="content">
//         <Navbar account={this.state.account} />
//         <h1>Add Manufacture</h1>
//         <form onSubmit={(event) => {
//           event.preventDefault()
//           const licenceNo = this.licenceNo.value
//           const  name = this.name.value
//           const  location = this.location.value
//           //const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
//           this.props.AddManufacture(licenceNo, name, location)
//         }}>
//           <div className="form-group mr-sm-2">
//             <input
//               id="licenceNo"
//               type="text"
//               ref={(input) => { this.licenceNo = input }}
//               className="form-control"
//               placeholder="licenceNo"
//               required />
//           </div>
//           <div className="form-group mr-sm-2">
//             <input
//               id="name"
//               type="text"
//               ref={(input) => { this.name = input }}
//               className="form-control"
//               placeholder="Manufacture name"
//               required />
//           </div>
//           <div className="form-group mr-sm-2">
//             <input
//               id="location"
//               type="text"
//               ref={(input) => { this.location = input }}
//               className="form-control"
//               placeholder="location"
//               required />
//           </div>
//           <button type="submit" className="btn btn-primary">Register</button>
//         </form>
//       </div>
//     );
//   }
// }

// export default App;
