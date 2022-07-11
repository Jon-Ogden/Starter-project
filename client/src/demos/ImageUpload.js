import { useContext } from "react"
import { useResolvedPath } from "react-router-dom"
import { AuthContext } from "../providers/AuthProvider"
import SingleImageUpload from "./SingleImageUpload"




const ImageUpload = ()=>{
   const  {user, setUser} = useContext(AuthContext)
   return (
       <div>
           <h1>Image Upload Demos</h1>
           <hr />
           <h3>Welcome {user.name}, id:{user.id})</h3>
           <img src={user.image} className="image"/>
           <hr />
           <h1>DEMO of Just uploading a image... no other data</h1>
           <hr />
           <SingleImageUpload id={user.id}/>
           <p>{JSON.stringify(user)}</p>
       </div>
   )
}

export default ImageUpload