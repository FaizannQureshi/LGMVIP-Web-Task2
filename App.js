import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Navbar = styled.nav`
  background-color: #333;
  padding: 10px;
  color: white;
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  max-height: 60px; 
`;

const BrandName = styled.h1`
  margin: 0;
`;

const Button = styled.button`
  background-color: #ec4b00;
  color: white;
  border: none;
  padding: 15px 20px;
  cursor: pointer;
  margin-left: 800px; 
  margin-bottom: 10px;
  margin-right: 30px;
  

`;

const Loader = styled.div`
  text-align: center;
  margin-top: 200px;
`;

const UserCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const UserCard = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
`;

function App() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://reqres.in/api/users?page=1');
      setUsers(response.data.data);
      setTimeout(() => setLoading(false), 1500);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar style={{maxHeight: '70px'}}>
        <BrandName style={{ paddingLeft: '25px'}}>Faiziology</BrandName>
        <Button onClick={getUsers} >Get Users</Button>
      </Navbar>
      {loading && <Loader><strong>Loading...</strong></Loader>}
      {!loading && ( // Only show UserCardGrid when loading is false
        <UserCardGrid>
          {users.map(user => (
            <UserCard key={user.id}>
              <img src={user.avatar} alt={user.first_name} />
              <h3>{`${user.first_name} ${user.last_name}`}</h3>
              <p>{user.email}</p>
            </UserCard>
          ))}
        </UserCardGrid>
      )}
    </div>
  );
}

export default App;
