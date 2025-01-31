import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserList = ({ data, onClose }) => {

  const navigate = useNavigate();
  const handleFollowerClick = (username) => {
    try {
      onClose(username);
      // navigate(`/profile/${username}`)
    } catch (error) {
      return;
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>{data?.title}</h2>
      {data?.list?.length ? (
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {data.list.map((follower, index) => (
            <li
              key={index}
              onClick={() => handleFollowerClick(follower)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                cursor: 'pointer',
                borderBottom: '1px solid #ccc',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9f9f9')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
            >
              <img
                src={follower || 'https://via.placeholder.com/50'} // Default avatar if none provided
                alt={`${follower}'s avatar`}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  marginRight: '15px',
                  objectFit: 'cover',
                }}
              />
              <span style={{ fontSize: '16px', color: '#555' }}>{follower}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div style={{ textAlign: 'center', color: '#999', marginTop: '20px' }}>
          No Data Found
        </div>
      )}
    </div>
  );
};

export default UserList;
