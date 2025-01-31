import React, { useEffect, useState } from 'react';
import { Card, CardContent, Avatar, Typography, Box, Button, Grid, Link } from '@mui/material';
import axios from 'axios';
import endpoint from '../../common/config/endpoints';
import { axiosPoint } from '../../common/config/axios';
import BlogView from '../Blog/blog-view';
import useAuthContext from '../../common/hooks/use-context';
import { useLoader } from '../../common/wrappers/MuiLoader';
import { showSnackbar } from '../../common/wrappers/Snackbar';
import MuiModal from '../../common/wrappers/MuiModal';
import UserList from './user-list';
import { useNavigate } from 'react-router-dom';
import OtpView from '../../common/Otp';
import ForgotPassword from '../../common/ForgotPassword';

const ProfileView = ({ user }) => {

    const { showLoader, hideLoader } = useLoader();
    const [userProfileData, setUserProfileData] = useState(null)
    const [userListData, setUserListData] = useState(null)
    const userDetails = useAuthContext();
    const navigate = useNavigate();
    const [otpViewFlag, setOtpViewFlag] = useState(false);
    const [passFlag, setPassFlag] = useState(false);

    const [followStatus, setFollowStatus] = useState(null);

    const [username, setUsername] = useState(null);

    const loadData = async () => {
        const [userDataResponse, blogDataResponse] = await Promise.all([
            axios.post(endpoint([axiosPoint.USER, axiosPoint.userData]), {
                "username": username ?? user?.id
            }),
        ]);

        setUserProfileData({
            userDataResponse: userDataResponse?.data,
        })

        setFollowStatus(userDataResponse?.data?.followers.includes(userDetails?.username));
    }

    const handleFollowUser = async (data) => {
        try {
            showLoader();
            console.log(data);
            const response = await axios.post(endpoint([axiosPoint.USER, axiosPoint.followUser]), {
                "userIdToFollow": user?.id,
            }, { withCredentials: true });
            loadData();
            hideLoader();
        } catch (error) {
            hideLoader();
            showSnackbar(error?.response?.data, "error");
            return;
        }
    }

    const handleUnFollowUser = async (data) => {
        try {
            showLoader();
            const response = await axios.post(endpoint([axiosPoint.USER, axiosPoint.unfollowUser]), {
                "userIdToUnfollow": user?.id,
            }, { withCredentials: true });
            loadData();
            hideLoader();
        } catch (error) {
            hideLoader();
            showSnackbar(error?.response?.data, "error");
            return;
        }
    }

    useEffect(() => {
        loadData();
    }, [username])

    const handleSendMail = async () => {
        try {
            showLoader();
            const response = await axios.post(endpoint([axiosPoint.USER, axiosPoint.sendMail]), { username: userDetails?.username },
                { withCredentials: true }
            )
            setOtpViewFlag(true)
            hideLoader();
        } catch {

        }
    }

    return (
        <>
            <Card sx={{ maxWidth: 300, margin: 'auto', textAlign: 'center' }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <Avatar
                            alt={user.username}
                            src={user.profileImage}
                            sx={{ width: 100, height: 100 }}
                        />
                    </Box>
                    <Typography variant="h5" component="div">
                        {userProfileData?.userDataResponse?.username}
                    </Typography>
                    <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                        <Grid item>
                            <Typography sx={{ cursor: "pointer" }} variant="body2" onClick={() => setUserListData({ list: userProfileData?.userDataResponse?.followers, title: "Followers" })}> <strong>Followers:</strong> {userProfileData?.userDataResponse?.followers.length || 0} </Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{ cursor: "pointer" }} variant="body2" onClick={() => setUserListData({ list: userProfileData?.userDataResponse?.following, title: "Following" })}> <strong>Following:</strong> {userProfileData?.userDataResponse?.following.length || 0} </Typography>
                        </Grid>
                    </Grid>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        {userProfileData?.userDataResponse?.email}
                    </Typography>
                    {
                        (user?.id !== userDetails?.username) ? <Button onClick={() => followStatus ? handleUnFollowUser() : handleFollowUser()} variant="contained" color="primary" sx={{ mt: 2 }} >
                            {
                                followStatus ? "Unfollow" : "Follow"
                            }
                        </Button>
                            : (
                                <Link onClick={() => handleSendMail()}>Change Password</Link>
                            )
                    }
                </CardContent>
            </Card>

            <Box sx={{ marginTop: 5 }}>
                <BlogView userId={username ?? user?.id} />
            </Box>

            <MuiModal maxWidth="sm" open={userListData !== null} handleClose={() => setUserListData(null)} component={<UserList data={userListData} onClose={(username) => {
                setUserListData(null); navigate(`/profile/${username}`); setUsername(username)
            }} />} />

            <MuiModal maxWidth="sm" open={otpViewFlag} handleClose={() => setOtpViewFlag(false)} component={<OtpView onClose={() => {
                setOtpViewFlag(false);
                setPassFlag(true)
            }} />} />

            <MuiModal maxWidth="sm" open={passFlag} handleClose={() => setPassFlag(false)} component={<ForgotPassword onClose={() => {
                setPassFlag(false)
            }} />} />
        </>
    );
};

export default ProfileView;
