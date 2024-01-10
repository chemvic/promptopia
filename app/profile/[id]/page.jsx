'use client';
import {useState, useEffect} from 'react';
import { usePathname, useSearchParams } from "next/navigation";
import Profile from '@components/Profile';


const UsersProfile = () => {
    const pathName = usePathname();
   const searchParams = useSearchParams();
   const userName =  searchParams.get('name');
    const [userPosts, setUserPosts] = useState([])

    useEffect(() =>{
          const userId = pathName.split('/profile/')[1];
          console.log(typeof(userId));
          const fetchPosts = async () =>{
          const response = await fetch(`/api/users/${userId}/posts`);
          const data = await response.json();
          setUserPosts(data);
        };
      
        if (userName) {
           fetchPosts();              
        };
      
      },[]);
  
  return (
    <Profile
        name={userName}
        desc={`Welcome to ${userName}'s profile page`}
        data={userPosts}       
    />
  )
}

export default UsersProfile;