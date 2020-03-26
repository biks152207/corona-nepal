import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const axios = require('axios');


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: 'Nepal',
      covid19Stats: [],
      lastChecked: null
    }
  }
  componentDidMount() {
    this.getResult(this.state.country);
  }



  getResult= (country) => {
    let url = "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats";
    if (country) {
      let params = {
        country
      }
      url = params ? url + "?" + Object.entries(params).map(e => e.join('=')).join('&') : url;
    }

    this.HTTP('get',url,null,{
      "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
      "x-rapidapi-key": "3bce6a71b0mshc678eb7c1d69a2bp145a52jsn67a3fd5b2b70"
    })
    .then((result) => {
      let { covid19Stats, lastChecked} = result.data.data;
      this.setState({covid19Stats, lastChecked:new Date(lastChecked).toLocaleDateString()})
    })

  }

  HTTP = (method, url, data, headers = null, fullUrl) => {
  return new Promise((resolve, reject) => {


    const query = {
      method: method,
      url: url
    }

    if (headers != null) {
      query.headers = headers;
    }
    if (method === 'post' || method === 'put' || method === 'delete') {
      query.data = data;
    }
    axios(query).then(function (response) {
      resolve(response);
    })
      .catch((error) => {
        reject(error)

      })
  })
}
render() {
  return (
    <main className="App">
      <h1>Corona Virus Update (Nepal)</h1>
      <table>
        <tr>
          <th>Country</th>
          <th>Confirmed Case</th>
          <th>Death</th>
          <th>Recorved</th>
          <th>Last Update</th>
        </tr>
        {this.state.covid19Stats && this.state.covid19Stats.length > 0 && this.state.covid19Stats.map((data, key) =>{
          return(
            <tr key={key}>
              <td>{data.country}</td>
              <td>{data.confirmed}</td>
              <td>{data.deaths}</td>
              <td>{data.recovered}</td>
              <td>{this.state.lastChecked}</td>
            </tr>
          )
        })}


      </table>
    </main>
  )
}

};
export default App;
