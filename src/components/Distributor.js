import React, { Component } from 'react';
import bg from './Assets/6.png';
import DtrNavbar  from "./DtrNavbar";
//import { LoopingRhombusesSpinner } from 'react-epic-spinners';
import VaxiChain from '../abis/VaxiChain.json';
import Web3 from 'web3';

class Distributor extends Component {

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

  RegisterDistributor(dlicenceNo, dname) {
    this.setState({ loading: true })
    this.state.vaxichain.methods.RegisterDistributor(dlicenceNo, dname).send({ from: this.state.account })
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
      distributorCount:0,
      distributor: []
    }

  this.RegisterDistributor = this.RegisterDistributor.bind(this)

  }




  render() {
    return (
      <div style={{backgroundImage: "url(" + bg + ")", height: "100%", backgroundPosition: "bottom", 
      backgroundSize: "cover", backgroundRepeat: 'no-repeat', resizeMode: 'cover', textAlign: "center"}}>
        <DtrNavbar color="#"/>    
      
      {/* { this.state.loading 
      ? 
        <div className="center mt-19" style={{padding:40,width:650,paddingLeft:570}}>
            <LoopingRhombusesSpinner
            style={{width: "10%"}}
              color='#4285F4'
              size='25'
            />
            <div style={{paddingTop: 10, textAlign: "center", fontSize: 12, fontWeight: 600, color: "black"}}>Processing...</div>
          </div>
      : */}

      <div id="content" style={{width:650, paddingLeft:530}}>
        <h1 style={{padding:40,width:750,paddingLeft:120}}>Register Distributor</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const dlicenceNo = this.dlicenceNo.value
          const  dname = this.dname.value
          // const  phone = this.phone.value
          // const  emailID = this.emailID.value
          // const  location = this.location.value
          //const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          this.RegisterDistributor(dlicenceNo, dname)
        }}>
          <div className="form-group mr-sm-2"  style={{width:650,paddingLeft:170}}>
            <input
              id="dlicenceNo"
              type="text"
              ref={(input) => { this.dlicenceNo = input }}
              className="form-control"
              placeholder="licenceNo"
              required />
          </div>
          <div className="form-group mr-sm-2"  style={{width:650,paddingLeft:170}}>
            <input
              id="dname"
              type="text"
              ref={(input) => { this.dname = input }}
              className="form-control"
              placeholder="Distributor name"
              required />
          </div>
          {/* <div className="form-group mr-sm-2"  style={{width:650,paddingLeft:170}}>
            <input
              id="phone"
              type="text"
              ref={(input) => { this.phone = input }}
              className="form-control"
              placeholder="Phone NO"
              required />
          </div>
          <div className="form-group mr-sm-2"  style={{width:650,paddingLeft:170}}>
            <input
              id="emailID"
              type="text"
              ref={(input) => { this.emailID = input }}
              className="form-control"
              placeholder="Email ID"
              required />
          </div>
          <div className="form-group mr-sm-2"  style={{width:650,paddingLeft:170}}>
            <input
              id="location"
              type="text"
              ref={(input) => { this.location = input }}
              className="form-control"
              placeholder="Location"
              required />
          </div> */}
          <div className="buttn"  style={{width:650,paddingLeft:170}}>
          <button type="submit" className="btn btn-primary"  style={{width:150}}>Register</button>  
          </div>
        </form>
      </div>
      
      </div>
    );
  }
}

export default Distributor;









// import React, { Component } from 'react';
// import bg from './Assets/6.png';
// import  Navbar  from "./Navbar";
// import VaxiChain from '../abis/VaxiChain.json';
// import Web3 from 'web3';
// import { LoopingRhombusesSpinner } from 'react-epic-spinners';

// class Distributor extends Component {

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
//     const accounts = await web3.eth.getAccounts()

//     this.setState({ account: accounts[0] })
//     const networkId = await web3.eth.net.getId()
//     const networkData = VaxiChain.networks[networkId]

//     if(networkData) {
//       const vaxichain = web3.eth.Contract(VaxiChain.abi, networkData.address)
//       this.setState({ vaxichain })
//       this.setState({ loading: false})      
//       // this.setState({ network: "ETH" })
//       // this.setState({ account: accounts[0] })

//       // const manufactureCount = await vaxichain.methods.manufactureCount().call()
//       // this.setState({ manufactureCount })

//       // for (var i = 0; i < manufactureCount; i++) {
//       //   const manufacture = await vaxichain.methods.manufacture(i).call()
//       //   if(manufacture.isCreated){
//       //     this.setState({ manufacture })
//       //     console.log(this.state.manufacture)
//       //       this.setState({
//       //         validManufacture: true
//       //       })
//       //     }
//       //  }


//     //   var Manufacture = []
//     //   var manufactureCount = await this.state.vaxichain.methods.manufactureCount(this.state.account).call()
//     //   for(var i=0;i < manufactureCount; i++)
//     //   {
//     //     var m =  await this.state.vaxichain.methods.getManufacture(this.state.account,i).call()
//     //     Manufacture.push(m)
//     //   }
//     //   this.setState({ Manufacture })
    
    
//      } 
//     else
//      {
//       window.alert('VaxiChain contract not deployed to detected network.')
//      }
//   }

//   AddDistributor(licenceNo,name,phone, emailID, location) {
//     this.setState({ loading: true })
//     this.state.vaxichain.methods.AddDistributor(licenceNo,name,phone, emailID,location).send({ from: this.state.account })
//     .once('receipt', (receipt) => {
//       this.setState({ loading: false })
//       })
//   }

//   constructor(props) {
//     super(props)
//     this.state = {
//       account: '',
//       network: 'ETH',
//       vaxichain: null,
//       loading: false,
//       //validDistributor: false,
//       distributorCount:0,
//       Distributor: []
//     }

//   this.AddDistributor = this.AddDistributor.bind(this)

//   }


//   render() {

//     return (
//       <div style={{backgroundImage: "url(" + bg + ")", height: "100%", backgroundPosition: "bottom", 
//       backgroundSize: "cover", backgroundRepeat: 'no-repeat', resizeMode: 'cover', textAlign: "center"}}>
//         <Navbar color="#"/>    
      
//       { this.state.loading 
//       ? 
//         <div className="center mt-19" style={{padding:40,width:650,paddingLeft:570}}>
//             <LoopingRhombusesSpinner
//             style={{width: "10%"}}
//               color='#4285F4'
//               size='20'
//             />
//             <div style={{paddingTop: 10, textAlign: "center", fontSize: 12, fontWeight: 600, color: "black"}}>Processing...</div>
//           </div>
//       :
//       <div id="content" style={{width:650, paddingLeft:530}}>
//         <h1 style={{padding:40,width:750,paddingLeft:120}}>Register Distributor</h1>
//         <form onSubmit={(event) => {
//           event.preventDefault()
//           const licenceNo = this.licenceNo.value
//           const name = this.name.value
//           const phone = this.phone.value
//           const emailID = this.emailID.value
//           const location = this.location.value
//           this.AddDistributor(licenceNo, name,phone, emailID, location)
//         }}>

//           <div className="form-group mr-sm-2" style={{width:650,paddingLeft:170}}>
//             <input
//               id="licenceNo"
//               type="text"
//               ref={(input) => { this.licenceNo = input }}
//               className="form-control"
//               placeholder="licenceNo"
//               required />
//           </div>

//           <div className="form-group mr-sm-2" style={{width:650,paddingLeft:170}}>
//             <input
//               id="name"
//               type="text"
//               ref={(input) => { this.name = input }}
//               className="form-control"
//               placeholder="Distributor name"
//               required />
//           </div>

//           <div className="form-group mr-sm-2" style={{width:650,paddingLeft:170}}>
//             <input
//               id="phone"
//               type="text"
//               ref={(input) => { this.phone = input }}
//               className="form-control"
//               placeholder="Phone No"
//               required />
//           </div>

//           <div className="form-group mr-sm-2" style={{width:650,paddingLeft:170}}>
//             <input
//               id="emailID"
//               type="text"
//               ref={(input) => { this.emailID = input }}
//               className="form-control"
//               placeholder="Email ID"
//               required />
//           </div>

//           <div className="form-group mr-sm-2" style={{width:650,paddingLeft:170}}>
//             <input
//               id="location"
//               type="text"
//               ref={(input) => { this.location = input }}
//               className="form-control"
//               placeholder="location"
//               required />
//           </div>

//           <div className="buttn"  style={{width:650,paddingLeft:170}}>
//           <button type="submit" className="btn btn-primary"  style={{width:150}}>Register</button>  
//           </div>
//         </form>
//       </div>
//       }
//       </div>
//     );
//   }
// }

// export default Distributor;