import { Button, Col, Container, Row } from 'react-bootstrap';
import './Profile.css';
import Post from './Post';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getRequest } from './facade/request';

let timerId;
function Profile() {
  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [time, setTime] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    (async() => {
      const user = await getRequest("https://jsonplaceholder.typicode.com/users/"+userId);
      const posts = await getRequest("https://jsonplaceholder.typicode.com/posts?userId="+userId);
      const countries = await getRequest("https://worldtimeapi.org/api/timezone");
      setUser(user);
      setPosts(posts);
      setCountries(countries);
      setCountry(countries[0]);
    })();
  }, [userId]);

  useEffect(() => {
    country && (async() => {
      const data = await getRequest("http://worldtimeapi.org/api/timezone/"+country);
      const now = data.datetime?.split("T")[1]?.split(".")[0];
      setTime(now);
    })();
  }, [country]);

  const continueTimer = () => {
      let [hr, min, sec] = time.split(":");
      sec = parseInt(sec) + 1;
      if(sec >= 60) {
        sec = 1;
        min = parseInt(min) + 1;
      }
      if(min >= 60) {
        min = 0;
        hr = parseInt(hr) + 1;
      }
      if(hr > 23) {
        hr = 0;
      }
      setTime(`${hr}:${min}:${sec}`);
  }

  useEffect(() => {
    time && (() => {
      timerId = setInterval(continueTimer, 1000);
    })();
    return () => {
      clearInterval(timerId);
    }
  }, [time])

  const handlePauseStart = () => {
    if(timerId) {
      clearInterval(timerId);
      timerId = undefined;
      return;
    }
    timerId = setInterval(continueTimer, 1000);
  }

  return (
    <div className="Profile">
      <Container>
        <div className="Time">
          <Row>
            <Col>
              <select onChange={(e) => setCountry(e.target.value)}>
                {countries?.map(country => <option value={country} key={country}>{country}</option>)}
              </select>
            </Col>
            <Col>
              {time?.split(":").map((c => parseInt(c) < 10 ? "0"+parseInt(c) : c)).join(":")}
            </Col>
            <Col>
              <Button onClick={handlePauseStart}>Pause/Start</Button>
            </Col>
          </Row>
        </div>
        <div className='Profile__header'>
            <Button onClick={() => navigate('/')}>Back</Button>
            <h2>Profile Page</h2>
        </div>
        { user && <Row className='UserInfo'>
            <Col>
                <div>
                    {user?.name}
                </div>
                <div>
                    {user?.username} | {user?.company?.catchPhrase}
                </div>
            </Col>
            <Col>
                <div>
                  {user?.address && `${user?.address?.street} ${user?.address?.suite} ${user?.address?.city}`}
                </div>
                <div>
                    {user?.email} | {user?.phone}
                </div>
            </Col>
        </Row>}
        <Row>
            {posts?.map(post => <Col sm={4}  key={post?.id} ><Post post={post} /></Col>)}
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
