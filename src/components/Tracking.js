import React, { Component } from 'react';
import bg from './Assets/4.png';
import  BfyNavbar  from "./BfyNavbar";
//import { LoopingRhombusesSpinner } from 'react-epic-spinners';
import VaxiChain from '../abis/VaxiChain.json'
import Web3 from 'web3';


class tracking extends Component {

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
    
     const vaccine = await vaxichain.methods.vaccine("01").call()
     console.log(vaccine)
      // const manufactureCount = await vaxichain.methods.manufactureCount().call()
      //   this.setState({ manufactureCount })

      //   for (i = 0; i < manufactureCount; i++) {
         // const Manufacture = await vaxichain.methods.manufacture().call()
          // if(Manufacture.isCreated){
          //  this.setState({ Manufacture })
          // console.log(this.state.Manufacture)
          // if(appointment.citizen === this.state.account){
          //   if(!appointment.vaccinated){
          //     this.setState({
          //       appointments: [...this.state.appointments, appointment]
          //     })
          //  }
          }
     
    else
     {
      window.alert('VaxiChain contract not deployed to detected network.')
    }
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
      Manufacture: []
    }

  }


  render() {
    return (
      <div style={{backgroundImage: "url(" + bg + ")", height: "100%", backgroundPosition: "bottom", 
      backgroundSize: "cover", backgroundRepeat: 'no-repeat', resizeMode: 'cover', textAlign: "center"}}>
        <BfyNavbar color="#"/>   
        {/* { this.state.Manufacture.map((Manufacture, key) => {
                return(
                  <div className="card mb-3" key={key} >
                    <div className="card-header">
                      <small className="text-muted"> Date:{(Manufacture.licenceNO.toString())}{(Manufacture.name.toString())} {(Manufacture.location.toString())}</small>

                    </div>
                  </div>
                )
              })} */}
      {/* { this.state.loading 
      ? 
        <div className="center mt-19" style={{padding:40,width:650,paddingLeft:570}} >
            <LoopingRhombusesSpinner
            style={{width: "10%"}}
              color='#4285F4'
              size='25'
            />
            <div style={{paddingTop: 10, textAlign: "center", fontSize: 12, fontWeight: 600, color: "black"}}>Processing...</div>
          </div>
      : */}

      <div id="content" style={{width:800}}>
        <h1 style={{padding:40,width:650,paddingLeft:200}}>Track Vaccine</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const vaccine_id = this.vaccine_id.value
          this.TrackVaccine(vaccine_id)
        }}>
          <div className="form-group mr-sm-2" style={{width:650,paddingLeft:170}}> 
            <input
              id="vaccine_id"
              type="text"
              ref={(input) => { this.vaccine_id = input }}
              className="form-control"
              placeholder="Vaccine ID"
              required />
          </div>
          <button type="submit" className="btn btn-primary"style={{width:150}} >Track</button>
        </form>
      </div>
      }
      </div>
    );
  }
}
export default tracking;