import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {getAuth,updateProfile} from "firebase/auth"
import {doc, updateDoc} from "firebase/firestore"
import {db} from "../firebase.config"
import {toast} from "react-toastify"

const Profile=()=>{
    const auth=getAuth()
    const [changeDetails,setChangeDetails]=useState(false);
    const [formData,setFormData]=useState({
        name:auth.currentUser.displayName,
        email:auth.currentUser.email
    });

    const {name,email}=formData

    const navigate=useNavigate();
    const onLogout=()=>{
        auth.signOut();
        navigate("/")
    }

    const onSubmit=async()=>{
        try {
            if(auth.currentUser.displayName!==name){
                // Update display name in fb
                await updateProfile(auth.currentUser,{
                    displayName:name
                })
            }

            // Update in firestore
            const userRef=doc(db,"users",auth.currentUser.uid)
            await updateDoc(userRef,{
                name
            })
        } catch (error) {
            toast.error("Could not update profile details")
        }
    }

    const onChange=(e)=>{
        const {id,value}=e.target;
        setFormData((preState)=>({
            ...preState,
            [id]:value
        }))
    }

    return <div className="profile">
        <header className="profileHeader">
            <p className="pageHeader">My Profile</p>
            <button type="button" className="logOut" onClick={onLogout}>
                Logout
            </button>
        </header>

        <main>
            <div className="profileDetailsHeader">
                <p className="profileDetailsText">
                    Personal Details
                </p>
                <p className="changePersonalDetails" onClick={()=>{
                    changeDetails && onSubmit();
                    setChangeDetails((prevState)=>!prevState)
                }}>
                    {changeDetails ? "done" : "change"}
                </p>
            </div>
            

            <div className="profileCard">
                <form >
                    <input 
                        type="text" 
                        id="name" 
                        className={changeDetails ? "profileNameActive" : "profileName"} 
                        disabled={!changeDetails}
                        value={name}
                        onChange={onChange}
                    />
                    <input 
                        type="email" 
                        id="email" 
                        className={changeDetails ? "profileEmailActive" : "profileEmail"} 
                        disabled={!changeDetails}
                        value={email}
                        onChange={onChange}
                    />
                </form>
            </div>
        </main>
    </div>;
}

export default Profile;