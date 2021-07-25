import React, { Component } from 'react';
import bg from './Assets/4.png';
import  BfyNavbar  from "./BfyNavbar";
import { LoopingRhombusesSpinner } from 'react-epic-spinners';
import VaxiChain from '../abis/VaxiChain.json'
import Web3 from 'web3';


class Beneficiary extends Component {

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
    } 
    else
     {
      window.alert('VaxiChain contract not deployed to detected network.')
    }
  }

  AddBeneficiary(name, age, gender, AdharID) {
    this.setState({ loading: true })
    this.state.vaxichain.methods.AddBeneficiary(name, age, gender, AdharID).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
      console.log(this.state.loading)
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      network: 'ETH',
      vaxichain: null,
      loading: false,
      //validManufacture: false,
      beneficiaryCount:0,
      Beneficiary: []
    }

 

  }



  render() {
    return (
      <div style={{backgroundImage: "url(" + bg + ")", height: "100%", backgroundPosition: "bottom", 
      backgroundSize: "cover", backgroundRepeat: 'no-repeat', resizeMode: 'cover', textAlign: "center"}}>
        <BfyNavbar color="#"/>    
      
      { this.state.loading 
      ? 
        <div className="center mt-19" style={{padding:40,width:650,paddingLeft:570}} >
            <LoopingRhombusesSpinner
            style={{width: "10%"}}
              color='#4285F4'
              size='25'
            />
            <div style={{paddingTop: 10, textAlign: "center", fontSize: 12, fontWeight: 600, color: "black"}}>Processing...</div>
          </div>
      :

      <div id="content" style={{width:800}}>
        <h1 style={{padding:40,width:650,paddingLeft:200}}>Register Beneficiary</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.name.value
          const age = this.age.value
          const gender = this.gender.value
          const AdharID = this.AdharID.value
          this.AddBeneficiary(name, age, gender, AdharID)
        }}>
          <div className="form-group mr-sm-2" style={{width:650,paddingLeft:170}}> 
            <input
              id="name"
              type="text"
              ref={(input) => { this.name = input }}
              className="form-control"
              placeholder="Beneficiary name"
              required />
          </div>
          <div className="form-group mr-sm-2" style={{width:650,paddingLeft:170}}>
            <input
              id="age"
              type="text"
              ref={(input) => { this.age = input }}
              className="form-control"
              placeholder="age"
              required />
          </div>
          <div className="form-group mr-sm-2" style={{width:650,paddingLeft:170}} >
            <input
              id="gender"
              type="text"
              ref={(input) => { this.gender = input }}
              className="form-control"
              placeholder="gender"
              required />
          </div>
          <div className="form-group mr-sm-2" style={{width:650,paddingLeft:170}}>
            <input
              id="AdharID"
              type="text"
              ref={(input) => { this.AdharID = input }}
              className="form-control"
              placeholder="AdharID"
              required />
          </div>
          <button type="submit" className="btn btn-primary"style={{width:150}} >Register</button>
        </form>
      </div>
      }
      </div>
    );
  }
}

export default Beneficiary;