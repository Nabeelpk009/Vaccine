import React, { Component } from 'react';
import Web3 from 'web3';
import VaxiChain from '../abis/VaxiChain.json';
import bg from './Assets/5.png';
import  MfrNavbar  from "./MfrNavbar";
//import { OrbitSpinner } from 'react-epic-spinners';

class Rules extends Component {

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

  AddRules(id, min_temp, max_temp, doses, manufaturedDate) {
    this.setState({ loading: true })
    this.state.vaxichain.methods.AddRules(id, min_temp, max_temp, doses, manufaturedDate).send({ from: this.state.account })
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
      Manufacture: []
    }

  this.AddRules = this.AddRules.bind(this)

  }
  render() {
    return (
      <div style={{backgroundImage: "url(" + bg + ")", height: "100%", backgroundPosition: "bottom", 
      backgroundSize: "cover", backgroundRepeat: 'no-repeat', resizeMode: 'cover', textAlign: "center"}}>
        <MfrNavbar color="#"/>    
      
      {/* { this.state.loading 
      ? 
        <div className="center mt-19">
            <OrbitSpinner
            style={{width: "100%"}}
              color='#251F82'
              size='200'
            />
            <div style={{paddingTop: 10, textAlign: "center", fontSize: 12, fontWeight: 600, color: "black"}}>Processing...</div>
          </div>
      : */}
      <div id="content" style={{width:800}} >
        <h1 style={{padding:40,width:750,paddingLeft:115}}>Register Vaccine Rules</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const vaccine_id = this.vaccine_id.value
          const  min_temp = this.min_temp.value
          const  max_temp = this.max_temp.value
          const  doses = this.doses.value
          const  manufaturedDate = this.manufaturedDate.value
          this.AddRules(vaccine_id, min_temp, max_temp, doses,manufaturedDate)
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
          <div className="form-group mr-sm-2" style={{width:650,paddingLeft:170}}>
            <input
              id="min_temp"
              type="text"
              ref={(input) => { this.min_temp = input }}
              className="form-control"
              placeholder="Minimum Temperature"
              required />
          </div>
          <div className="form-group mr-sm-2" style={{width:650,paddingLeft:170}}>
            <input
              id="max_temp"
              type="text"
              ref={(input) => { this.max_temp= input }}
              className="form-control"
              placeholder="Maximum Temperature"
              required />
          </div>
          <div className="form-group mr-sm-2" style={{width:650,paddingLeft:170}}>
            <input
              id="doses"
              type="text"
              ref={(input) => { this.doses = input }}
              className="form-control"
              placeholder="Number of Doses"
              required />
          </div>
          <div className="form-group mr-sm-2" style={{width:650,paddingLeft:170}}>
            <input
              id="manufaturedDate"
              type="text"
              ref={(input) => { this.manufaturedDate= input }}
              className="form-control"
              placeholder="Manufatured Date"
              required />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{width:150}}>Register</button>
        </form>
      </div>
      }
      </div>
    );
  }
}

export default Rules;
