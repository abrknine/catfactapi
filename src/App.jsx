import { useEffect, useState,useRef } from 'react'
import './App.css'
import axios from 'axios';
import LoadingBar from 'react-top-loading-bar';


function App() {
   const [ meow, setMeow] = useState([]);
   const [error, setError]=useState("");
   const [limit, setLimit] = useState(6);
   const ref = useRef(null);

   const getapiData = async()  => {
    try{
      const res = await axios.get('https://catfact.ninja/facts');
      setMeow(res.data.data);
    }
    catch(error){
      setError(error.message);
    }

   };


   useEffect(()=>{
    getapiData();
   },[])
   // this function again calling api
   const handleRefresh = () => {
    console.log('Button clicked!');
    setError("");
    setLimit(limit + 6);
    getapiData();
    
  }

  //  useEffect(() => {
  //    axios.get('https://catfact.ninja/facts')
  //      .then((res) => setMeow(res.data.data))
  //      .catch((error) => setError(error.message));
  //  }, []);

   
   return (
     <>
     <LoadingBar color='red'  ref={ref}/>
     {error !=="" && <h2>{error}</h2>
     } 
       <h1 className='head'> <u>Cat Facts</u> </h1>

       <div className='box'>
       {meow.slice(0,limit).map((fact, index, length) => (
         <div className='container' key={index}>
          <h4> Length:{fact.length}</h4>
           <p> Fact: {fact.fact}</p>

         </div>
       ))}
       </div>
       {/* <button onClick={handleRefresh} className='but' > Refresh</button> */}
       <input type="button" value="Refresh" onClick={handleRefresh} className="but" />
     </>
   )
}

export default App
