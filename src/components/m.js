import React, { Component } from 'react';
import VaxiChain from '../abis/VaxiChain.json'
import {  } from 'react-bootstrap'
import Web3 from 'web3';
import Navbar from './Navbar'
import './App.css';
import logoonly from './logoonly.png';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = VaxiChain.networks[networkId]
    if(networkData) {
      const vaxichain = web3.eth.Contract(VaxiChain.abi, networkData.address)
      this.setState({ vaxichain })
      this.setState({ loading: false})

      var Manufacture = []
      var manufactureCount = await this.state.VaxiChain.methods.getmanufactureCount(this.state.account).call()
      for(var i=0;i < manufactureCount; i++)
      {
        var m =  await this.state.VaxiChain.methods.getManufacture(this.state.account,i).call()
        Manufacture.push(m)
      }
      this.setState({ Manufacture })
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      Manufacture: []
    }

  }
  
  render() {
    return (
        <body class="w3-light-grey">
        <Navbar />


        <nav class="w3-sidebar w3-collapse w3-white w3-animate-left" style={{ zIndex: "3", width: "300px" }} id="mySidebar"><br />
          <div class="w3-container w3-row">
            <div class="w3-col s4">
              <img src={require('./company.png')} alt=" " class="w3-square w3-margin-right" style={{ width: "46px" }} />
            </div>
            <div class="w3-col s8 w3-bar">
              <span>Welcome, <strong>{localStorage.getItem('userName')}</strong></span><br />
              
            </div>
          </div>
          <hr />
          <div class="w3-container">
            <h5>Dashboard</h5>
          </div>
          <div class="w3-bar-block">
            <a href="./Dashboard" class="w3-bar-item w3-button w3-padding"><i class="fa fa-database"></i>  Overview</a>
            <a href="./Products" class="w3-bar-item w3-button w3-padding" style={{ backgroundColor: "#292b2c", color: "#fff" }}><i class="fa fa-diamond fa-fw"></i>  Products</a>
            <a href="./Units" class="w3-bar-item w3-button w3-padding"><i class="fa fa-bullseye fa-fw"></i>  Units</a>
            <a href="./Profile" class="w3-bar-item w3-button w3-padding"><i class="fa fa-user fa-fw"></i>  Profile</a>
          </div>
        </nav>


        <div class="w3-overlay w3-hide-large w3-animate-opacity" onclick="w3_close()" style={{ cursor: "pointer" }} title="close side menu" id="myOverlay"></div>

        <div class="w3-main" style={{ marginLeft: "300px", marginTop: "43px" }}>

          <header class="w3-container" style={{ paddingTop: "22px" }}>
            <h5><b><i class="fa fa-shopping-basket"></i> Manufacture</b></h5>
          </header>

          <hr />


          <div class="w3-container">
            <h5>Manufacture</h5>
            <table class="w3-table w3-striped w3-bordered w3-border w3-hoverable w3-white">


              <thead>
                <tr>
                  <th></th>
                  <th>Product licenceNO</th>
                  <th>Product name</th>
                  <th>Product location</th>
                </tr>
              </thead>

              {
                this.state.Manufacture.map((Manufacture, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{Manufacture.licenceNO}</td>
                      <td>{Manufacture.name}</td>
                      <td>{Manufacture.location}</td>
                    </tr>
                  )
                })
              }

            </table>
            <br />
            <button class="w3-button" style={{ backgroundColor: "#292b2c", color: "#fff" }} onClick={(event) => { window.location.href = "./Add" }}>Add Manufacture  <i class="fa fa-arrow-right"></i></button>
          </div>

          <br />
          <footer class="w3-container w3-padding-16 w3-light-grey">
            <center>
              <img ref="logoonly" alt=" " src={logoonly} />
              <h4>VaxiChain</h4>
            </center>
          </footer>

        </div>



      </body>
    );
  }
}

export default App;