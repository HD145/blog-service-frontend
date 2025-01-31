import React from 'react'
import ProfileView from '../../components/Profile/profile-view'
import { useParams } from 'react-router-dom'

const ProfilePage = () => {
    const user = useParams();
  return (
    <ProfileView user={user}/>
  )
}

export default ProfilePage