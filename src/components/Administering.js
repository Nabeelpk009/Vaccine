import React, { Component } from 'react';
import bg from './Assets/5.png';
import  DrNavbar  from "./DrNavbar";
import VaxiChain from '../abis/VaxiChain.json';
import Web3 from 'web3';
import { LoopingRhombusesSpinner } from 'react-epic-spinners';

class Administering extends Component {

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
  
        // const manufactureCount = await vaxichain.methods.manufactureCount().call()
        // this.setState({ manufactureCount })
  
        // for (var i = 0; i < manufactureCount; i++) {
        //   const manufacture = await vaxichain.methods.manufacture(i).call()
        //   if(manufacture.isCreated){
        //     this.setState({ manufacture })
        //     console.log(this.state.manufacture)
        //       this.setState({
        //         validManufacture: true
        //       })
        //     }
        //  }
  
  
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
  
    Vaccinated(AdharID, doctorID, vaccinated_date, vaccine_center) {
      this.setState({ loading: true })
      this.state.vaxichain.methods.Vaccinated(AdharID, doctorID, vaccinated_date, vaccine_center).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
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
        vaccineCenterCount:0,
        VaccineCenter: []
      }
  
    this.Vaccinated = this.Vaccinated.bind(this)
  
    }
  


  render() {
    return (
      <div style={{backgroundImage: "url(" + bg + ")", height: "100%", backgroundPosition: "bottom", 
      backgroundSize: "cover", backgroundRepeat: 'no-repeat', resizeMode: 'cover', textAlign: "center"}}>
        <DrNavbar color="#"/>    
      
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
      <div id="content" style={{width:800}} >
        <h1 style={{padding:40,width:750,paddingLeft:115}}>Vaccination Details</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const AdharID = this.AdharID.value
          const  doctorID = this.doctorID.value
          const  vaccinated_date = this.vaccinated_date.value
          const  vaccine_center = this.vaccine_center.value
          this.Vaccinated(AdharID, doctorID, vaccinated_date, vaccine_center)
        }}>
          <div className="form-group mr-sm-2" style={{width:650,paddingLeft:170}}>
            <input
              id="AdharID"
              type="text"
              ref={(input) => { this.AdharID = input }}
              className="form-control"
              placeholder="Beneficiary Adhar ID"
              required />
          </div>
          <div className="form-group mr-sm-2" style={{width:650,paddingLeft:170}}>
            <input
              id="doctorID"
              type="text"
              ref={(input) => { this.doctorID = input }}
              className="form-control"
              placeholder="Doctor ID"
              required />
          </div>
          <div className="form-group mr-sm-2" style={{width:650,paddingLeft:170}}>
            <input
              id="vaccinated_date"
              type="text"
              ref={(input) => { this.vaccinated_date= input }}
              className="form-control"
              placeholder="Vaccinated Date"
              required />
          </div>
          <div className="form-group mr-sm-2" style={{width:650,paddingLeft:170}}>
            <input
              id="vaccine_center"
              type="text"
              ref={(input) => { this.vaccine_center = input }}
              className="form-control"
              placeholder="Vaccine Center Name"
              required />
          </div>
          <button type="submit" className="btn btn-primary" style={{width:150}}>Submit</button>
        </form>
      </div>
      }
      </div>
    );
  }
}

export default Administering;
