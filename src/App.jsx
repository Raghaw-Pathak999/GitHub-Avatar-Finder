import { useState, useEffect } from 'react';
import axios from 'axios';
import useDebounce from './useDebounce'; // useDebounce hook import kiya
import './App.css'

function App() {
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  // Debounced username state variable
  const debouncedUsername = useDebounce(username, 500); // Debounce delay set kiya 500 milliseconds mein

  // Username input field ke liye handle karne wala function
  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  // GitHub API se data fetch karne ke liye function
  const handleSubmit = () => {
    axios.get(`https://api.github.com/users/${username}`)
      .then((response) => {
        const data = response.data;
        setAvatarUrl(data.avatar_url);
        setFollowersCount(data.followers);
        setFollowingCount(data.following);
      })
      .catch((error) => console.log(error));
  };

  // useEffect hook ka use debounce username ke liye
  useEffect(() => {
    if (debouncedUsername) {
      handleSubmit(); // Agar debouncedUsername hai, toh API request bhejo
    }
  }, [debouncedUsername]);

  return (
    <div className="App">
      <h1>Github Avatar Finder</h1>
      <input type="text" placeholder="Enter GitHub Username...." value={username} onChange={handleChange} />
      <button onClick={handleSubmit}>Search</button>
      <div className="avatar">
        {avatarUrl && <img src={avatarUrl} alt="Avatar" />}
      </div>
      <div className="counts">
        <p>Followers: <span>{followersCount}</span></p>
        <p>Following: <span>{followersCount}</span></p>
      </div>
    </div>
  );
}

export default App;
