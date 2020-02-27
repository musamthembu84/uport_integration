import React, { Component } from 'react'
import '../../css/bootstrap.min.css'
import App from "../../App";

import Election from '../../../build/contracts/Election'
import Web3 from "web3";
class Home extends Component {

  componentWillMount() {
      this.loadBlockchainData()
  }
  async loadBlockchainData() {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
      const accounts = await web3.eth.getAccounts();
      this.setState({ account: accounts[0] });

      const networkID = await web3.eth.net.getId();
      const networkData = Election.networks[networkID];

      const election = web3.eth.Contract(Election.abi,networkData.address);
      this.setState({election});

      const candidateCount = await election.methods.candidatesCount().call();
      this.setState({candidateCount})

      //load all candidate
    for (let i =1; i<=candidateCount;i++){
         const allCandidates = await  election.methods.candidates(i).call();
         this.setState({
           candidates:[...this.state.candidates, allCandidates]
         })

    }

    console.log(this.state.candidates);
  }

  constructor(props){
      super(props);
      this.state = {
        account: '',
        candidateCount:0,
        candidates:[],
        voterID:''
      }
      this.castVote = this.castVote.bind(this);
  }

   castVote(candidate_id){
    this.state.election.methods.vote(candidate_id).send({from : this.state.account});
   }


   handleChange=(e)=>{
    this.setState({myId : e.target.value});
   }
  render() {
    return(


       <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="text-center">UJ SRC Elections</h1>
              <hr/>
              <br/>
              <div id="loader">
                <p className="text-center">Loading...</p>
              </div>

              <div id="content">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name </th>
                      <th scope="col">Votes</th>
                    </tr>
                  </thead>
                  <tbody id="candidatesResults">
                  {this.state.candidates.map((candidate,key)=> {
                    return (
                        <tr key={key}>
                          <th scope="row">{candidate.id.toString()}</th>
                          <td>{candidate.name}</td>
                          <td>{candidate.voteCount.toString()}</td>
                        </tr>
                    )
                  })}
                  </tbody>
                </table>
                <hr/>

                <form onSubmit={(event => {
                  event.preventDefault()
                  const candidatesSelect = this.state.myId;
                  console.log(candidatesSelect)
                  this.castVote(1,this.state.account);

                })}>
                  <div className="form-group">
                    <label htmlFor="candidatesSelect">Select Candidate Below</label>
                    <select  className="form-control" id="candidatesSelect"
                             value={this.state.myId}
                             onChange={this.handleChange}
                    >

                      {
                        this.state.candidates.map((candidate,key)=>{
                          return(

                           <option key={key} value={candidate.id.toString()}  onChange={this.onChange}> {candidate.name} </option>

                                )

                        })
                      }
                    </select>

                  </div>
                  <button type="submit" className="btn btn-primary">Vote</button>
                  <hr/>
                </form>

                <p id="accountAddress" className="text-center">Account {this.state.account} </p>
              </div>


            </div>
          </div>
        </div>
    )
  }
}

export default Home
