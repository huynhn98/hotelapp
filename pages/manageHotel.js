import Adminhotel from "../components/adminhotel"
import { withIronSession } from "next-iron-session";
import { useEffect, useState } from "react";
import {Button, Nav} from "react-bootstrap"
import Link from "next/link"

const manageHotel = ({user}) =>{


    const [hotels, setHotels] = useState(null);
    const fetchData = async () =>{
      const res = await fetch("/api/getAllHotels");
      const data = await res.json()
      setHotels(data.map((h) => <Adminhotel hotel={h}></Adminhotel>))
  }
    useEffect(() => {        
        fetchData();
    },[])
    
    
    

    if(!hotels){
        return(
            <div>
                Loading...
            </div>
        )
    }
    
    return(
        <div>
            <Link href="/addPage" passref>
                    <Button>Add</Button>
            </Link>
                    <Button>View Users</Button>
            {hotels}
        </div>
    )

}

export const getServerSideProps = withIronSession(
    async ({req, res}) => {
      const user = req.session.get("user");
      
      if(!user){
        return {
          redirect:{
            destination: '/LoginForm',
            permanent: false
          },
        }
  
      }
      return{props: user}


      
    },
    {
      cookieName: "hotel-cookie",
      cookieOptions: {
        secure: process.env.NODE_ENV === "production" ? true : false
      },
      password: "9KDjQvxpVRz1D3DWvLL5t9k3hOfZPw3i"
    }
  )
  export default manageHotel;