import React, { Component } from 'react';
import bg from './Assets/2.png';
import  MfrNavbar  from "./MfrNavbar";
import './App.css';
//import styles from './App.module.css';
import { LoopingRhombusesSpinner } from 'react-epic-spinners';
import VaxiChain from '../abis/VaxiChain.json';
//import {  } from 'react-bootstrap'
import Web3 from 'web3';
//import './App.module.css';
//import logoonly from './logoonly.png';
import './Vaccine';
import './Rules';

class Manufacture extends Component {


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
      // this.setState({ network: "ETH" })
      // this.setState({ account: accounts[0] })

      const manufactureCount = await vaxichain.methods.manufactureCount().call()
      //this.setState({ manufactureCount })
      // console.log(this.state.manufactureCount)
      for (var i = 0; i < manufactureCount; i++) {
        const manufacture = await vaxichain.methods.manufacture(i).call()
        if(manufacture.isCreated){
      //     this.setState({ manufacture })
          console.log(this.state.manufacture)
      //       this.setState({
      //         validManufacture: true
      //       })
           }
        }


    //   var Manufacture = []
    //   var manufactureCount = await this.state.vaxichain.methods.manufactureCount(this.state.account).call()
    //   for(var i=0;i < manufactureCount; i++)
    //   {
    //     var m =  await this.state.vaxichain.methods.getManufacture(this.state.account,i).call()
    //     Manufacture.push(m)
    //   }
    //   this.setState({ Manufacture })
    
    
     } 
    else
     {
      window.alert('VaxiChain contract not deployed to detected network.')
    }
  }

  AddManufacture(licenceNo,name,location) {
    this.setState({ loading: true })
    this.state.vaxichain.methods.AddManufacture(licenceNo,name,location).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({loading: false })
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
      manufactureCount:0,
      manufacture: []
    }

  this.AddManufacture = this.AddManufacture.bind(this)

  }


  render() {

    return (
      <div style={{backgroundImage: "url(" + bg + ")", height: "100%", backgroundPosition: "bottom", 
      backgroundSize: "cover", backgroundRepeat: 'no-repeat', resizeMode: 'cover', textAlign: "center"}}>
        <MfrNavbar color="#"/>    
      
      { this.state.loading 
      ? 
        <div className="center mt-19" style={{padding:40,width:650,paddingLeft:570}}>
            < LoopingRhombusesSpinner
            style={{width: "10%"}}
              color='#4285F4'
              size='25'
            />
            <div style={{paddingTop: 10, textAlign: "center", fontSize: 20, fontWeight: 600, color: "black"}}>Processing...</div>
          </div>
      :

      <div id="content" style={{width:800}} >
        <h1 style={{padding:40,width:650,paddingLeft:200}}> Register Manufacture </h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const licenceNo = this.licenceNo.value
          const  name = this.name.value
          const  location = this.location.value
          //const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          this.AddManufacture(licenceNo, name, location)
        }}>

          <div className="form-group mr-sm-2" style={{width:650,paddingLeft:170}} >
            <input
              id="licenceNo"
              type="text"
              ref={(input) => { this.licenceNo = input }}
              className="form-control"
              placeholder="licenceNo"
              required />
          </div>

          <div className="form-group mr-sm-2" style={{width:650,paddingLeft:170}} >
            <input
              id="name"
              type="text"
              ref={(input) => { this.name = input }}
              className="form-control"
              placeholder="Manufacture name"
              required />
          </div>

          <div className="form-group mr-sm-2" style={{width:650,paddingLeft:170}}>
            <input
              id="location"
              type="text"
              ref={(input) => { this.location = input }}
              className="form-control"
              placeholder="location"
              required />
          </div >
          
          <button type="submit" className="btn btn-primary" style={{width:150}}  >Register</button>
        </form>
      </div>
      }
      </div>  
    );
  }
}

export default Manufacture;
