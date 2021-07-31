import React, { Component } from 'react';
import Web3 from 'web3';
import bg from './Assets/11.png';
import  DtrNavbar  from "./DtrNavbar";
import { LoopingRhombusesSpinner } from 'react-epic-spinners';
import VaxiChain from '../abis/VaxiChain.json';

class DeliveredVaccine extends Component {


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

  ArrivedDistributor(id, arrived_date,distributor_id) {
    this.setState({ loading: true })
    this.state.vaxichain.methods.ArrivedDistributor(id, arrived_date,distributor_id).send({ from: this.state.account })
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

  this.ArrivedDistributor = this.ArrivedDistributor.bind(this)

  }


  render() {
    return (
      <div style={{backgroundImage: "url(" + bg + ")", height: "100%", backgroundPosition: "bottom", 
      backgroundSize: "cover", backgroundRepeat: 'no-repeat', resizeMode: 'cover', textAlign: "center"}}>
        <DtrNavbar color="#"/>    
      
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


      <div id="content" style={{width:650, paddingLeft:530}}>
        <h1 style={{padding:40,width:750,paddingLeft:120}}>Delivered Vaccine</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const id = this.id.value
          const arrived_date = this.arrived_date.value
          const distributor_id= this.distributor_id.value
          
          this.ArrivedDistributor(id, arrived_date,distributor_id)

        }}>
          <div className="form-group mr-sm-2" style={{width:650,paddingLeft:170}}>
            <input
              id="id"
              type="text"
              ref={(input) => { this.id = input }}
              className="form-control"
              placeholder="Vaccine ID"
              required />
          </div>
          <div className="form-group mr-sm-2" style={{width:650,paddingLeft:170}}>
            <input
              id="arrived_date"
              type="text"
              ref={(input) => { this.arrived_date = input }}
              className="form-control"
              placeholder="Vaccine Arrived Date"
              required />
          </div>
          <div className="form-group mr-sm-2" style={{width:650,paddingLeft:170}}>
            <input
              id="distributor_id"
              type="text"
              ref={(input) => { this.distributor_id = input }}
              className="form-control"
              placeholder="Distributor ID"
              required />
          </div>
    
          <div className="buttn"  style={{width:650,paddingLeft:170}}>
          <button type="submit" className="btn btn-primary"  style={{width:150}}>Submit</button>
          </div>
        </form>
      </div>
       }
      </div>
    );
  }
}

export default DeliveredVaccine;