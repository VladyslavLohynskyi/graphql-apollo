import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import "./App.css";
import { CREATE_USER } from "./mutations/user";
import { GET_ALL_USERS, GET_ONE_USER } from "./query/user";

function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const { data: oneUser, loading: loadingOneUser } = useQuery(GET_ONE_USER, {
    variables: { id: 1 },
  });
  const [newUser] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data]);
  if (loading) {
    return <h1>LOADING....</h1>;
  }
  const addUser = (e) => {
    e.preventDefault(); //to dont refresh webpage
    newUser({ variables: { input: { username, age } } }).then((res) => {
      console.log(res.data, res);
      setUsername("");
      setAge(0);
    });
  };
  const getAll = (e) => {
    e.preventDefault();
    refetch();
  };
  console.log(oneUser);
  return (
    <div className="App">
      <form>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
        />
        <input
          onChange={(e) => setAge(parseInt(e.target.value))}
          value={age}
          type="number"
        />
        <div>
          <button onClick={(e) => addUser(e)}>Create</button>
          <button onClick={(e) => getAll(e)}>Get</button>
        </div>
      </form>
      <div>
        {username} {age}
      </div>
      <div>
        {users.map((user) => (
          <div className="user" key={user.id}>
            {user.username} {user.age}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
