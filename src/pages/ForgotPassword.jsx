import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {

    const backendUrl = "https://hostel-bank-be-deepsalunkhee.vercel.app";
    const [email, setEmail] = useState("");
    const [sent,setSent]=useState(false)
    const navigate=useNavigate()

    const handleforgot=async (e)=>{
        e.preventDefault()
        try {
            const forgotres = await axios(`${backendUrl}/users/forgotpassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data:{
                    email:email
                }
            });
            console.log(forgotres); 
            if (forgotres.status === 200) {
                setSent(true)
                
                setTimeout(() => {
                   navigate("/signin")
                }, 5000);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    return (
        <div className="flex justify-center items-center h-screen">
          <div className="max-w-md mx-auto p-6 bg-grey-100 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold mb-4">Forgot Password</h1>
            <form>
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:border-blue-500"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <button 
                type="submit" 
                className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 transition duration-300 hover:bg-blue-600 focus:outline-none"
                onClick={handleforgot}
              >
                Submit
              </button>
            </form>
            {sent && <p className="mt-4 text-green-500">If this email has an account, a new password is sent to this email</p>}
          </div>
        </div>
      );
      
      
}

export default ForgotPassword
