import {useContext,useEffect} from 'react'
import {useSearchParams,useNavigate} from'react-router-dom'
import './Verify.css'
import axios from'axios'
import {StoreContext} from '../../context/StoreContext'
import Loader from '../../components/Loader/Loader'


const Verify = () => {

   

    const [SearchParams,setSearchParams] = useSearchParams()

    const success = SearchParams.get("success")
    const orderId = SearchParams.get("orderId")

    const navigate = useNavigate()

    console.log(success,orderId )
    const {url} =useContext(StoreContext)

    const verifyPayment = async()=>{
        try {
            const response = await axios.post(url+"/api/order/verify",{success,orderId})
            if(response.data.message==='Not Paid')
                navigate('/')
            else
                navigate('/myorders')
            
        } catch (error) {
           console.log(error);
            
        }
        

    }
     useEffect(()=>{
        verifyPayment()

    },[])
    return (
    <Loader/>
  )
}

export default Verify