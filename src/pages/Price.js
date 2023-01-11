import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export default function Price(props){
    //array destructuring 
    //we can use coin anywhere as our state and setcoin can be used to change the state
    const [coin, setCoin] = useState('null')
    //our API from coinapi.io
    const apiKey = process.env.REACT_APP_API_KEY
    //Grab the current symbol from teh URL params
    const params = useParams()
    const symbol = params.symbol

    //create our URL using the other two variables
    //whenever someone asks you to use the api, the first place to go is to the documentation
    const url =`http://rest-sandbox.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${apiKey}`

    //function to fetch coin data

    //the fetch method takes one mandatory

    // //the modern new way
    // const getCoin = async () => {
    //     const response = await fetch(url);
    //     const data = await response.json();
    //     setCoin(data);
    //   };

    // //older way of fetching data using fetch
    // const getCoin = fetch(url)
    // //take response and turn it into json
    // .then(response => response.json())
    // //do things with the data
    // .then(data => console.log(data))

    //the modern way with error handling
    //try catch method where everything within the block will run and will not stop the program if it runs. it will just throw an error
    const getCoin = async () => {
        //run this try block first, if it fails it will throw an error with the catch
        try {
            const response = await fetch(url)
            const data = await response.json()
            //this line is changing our state so that it matches the data entered
            setCoin(data)
        } catch(error){
            console.error(error)
        }
    }
    //useEffect to run getCoin when component mounts
    //beta.reactjs.org
    //mounts = life cycle
    //unmounts = life cylce
    //updates = life cycles
    useEffect(() => {
        getCoin()
        //the second argument in useEffect is our dependency array
        //if the array is empty, this useEffect will only run once when the component mounts
        //anything that we put inside the dependency array, our use effect will watch for any changes in those dependencies
        //no dependency will rerender every time you change something and continuously make calls
    }, [])
    // loaded function for when data is fetched
  const loaded = () => {
    return (
      <div>
        <h1>
          {coin.asset_id_base}
        </h1>
        <h2>{coin.rate}</h2>
      </div>
    );
  };

  //function wfor when the daat doesnt exist 
  const loading = () => {
    return <h1>Loading...</h1>
  }
  return coin && coin.rate ? loaded() : loading()
}