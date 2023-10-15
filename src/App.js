import { Container, Row, Col } from 'react-bootstrap';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { getRequest } from './facade/request';

function App() {
  
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const userList = await getRequest("https://jsonplaceholder.typicode.com/users");
      const postList = await getRequest("https://jsonplaceholder.typicode.com/posts");
      const users = userList?.map(user => {
        const posts = postList.filter(post => post.userId === user.id);
        user.postCount = posts?.length ?? 0;
        return user;
      });
      setUsers(users);
    })();
  }, []);

  return (
    <div className="App">
      <h2 className='text-center'>Directory</h2>
      <Container>
        {users?.map(user => 
          <Row className='User' key={user?.id} onClick={() => navigate('/profile/'+user?.id)} >
            <Col>Name: {user?.name}</Col>
            <Col>Posts: {user?.postCount}</Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default App;
