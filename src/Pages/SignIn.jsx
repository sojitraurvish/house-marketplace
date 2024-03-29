import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import {getAuth,signInWithEmailAndPassword} from "firebase/auth"
import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg"
import visibilityIcon from "../assets/svg/visibilityIcon.svg"
import OAuth from "../components/OAuth";

const SignIn=()=>{
    const [showPassword,setShowPassword]=useState(false);
    const [formData,setFormData]=useState({
        email:"",
        password:""
    })
    const {email,password}=formData

    const navigate=useNavigate()

    const onChange=(e)=>{
        const {id,value}=e.target;
        setFormData((prevState)=>({
            ...prevState,
            [id]:value
        }))
        
    }

    const onSubmit=async(e)=>{
        e.preventDefault();

        try {
            const auth =getAuth()

            const userCredential=await signInWithEmailAndPassword(auth,email,password)

            if(userCredential.user){
                navigate("/")
            }
        } catch (err) {
            switch(err.code){
                
                case "auth/wrong-password":
                    // alert("incorrect password for email");
                    toast.error("incorrect password for email")
                break;

                case "auth/user-not-found":
                    // alert("no user associated with this email");
                    toast.error("no user associated with this email")
                break;

                default:
                    toast.error(err)
                    
            }
             
        }
    }

    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">
                        Welcome Back!
                    </p>
                </header>

                <form onSubmit={onSubmit}>
                    <input 
                        type="email" 
                        className="emailInput" 
                        placeholder="Email" 
                        id="email" 
                        value={email}
                        onChange={onChange}
                    />

                    <div className="passwordInputDiv">
                        <input 
                            type={showPassword ? "text" : "password"}
                            className="passwordInput"
                            placeholder="Password"
                            id="password"
                            value={password}
                            onChange={onChange}
                         />
                         <img 
                            src={visibilityIcon} 
                            alt="show password" 
                            className="showPassword" 
                            onClick={()=>setShowPassword((prevState)=>!prevState)}
                        />
                    </div>

                    <Link 
                        to="/forgot-password"
                        className="forgotPasswordLink">
                            Forgot Password
                    </Link>

                    <div className="signInBar">
                        <p className="singInText">
                             Sign In
                        </p>
                        <button className="signInButton">
                            <ArrowRightIcon fill="#ffffff" width="34px" height="34px"/>
                        </button>
                    </div>
                </form>
                <OAuth/>

                <Link to="/sign-up" className="registerLink">
                    Sign Up Instead
                </Link>
            </div>
        </>
    );
}

export default SignIn;