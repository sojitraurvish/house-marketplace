import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import {collection,getDocs,query,where,orderBy,limit,startAfter} from "firebase/firestore"
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { async } from "@firebase/util";


const Category=()=>{
    const [listings,setListings]=useState(null);
    const [loading,setLoading]=useState(true);

    const params=useParams();

    useEffect(()=>{
        const fetchListings=async()=>{
            try {
                
                // Get reference
                const listingRef=collection(db,"listing")
                
                //Create a query
                const q=query(
                    listingRef,
                    where("type","==",params.categoryName),
                    orderBy("timestamp","desc"),
                    limit(10))
                
                // Execute query
                const querySnap=await getDocs(q);
                // console.log(querySnap)
                let listings=[]

                querySnap.forEach((doc)=>{
                    console.log(doc.data())
                })

            } catch (error) {
                console.log(error);
            }
        }

        fetchListings();
    })
    return (
        <div>
            category
        </div>
    );
}

export default Category;