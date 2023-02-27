import { useEffect, useState } from "react";
import { generateToken } from "./lib/generateToken";
import { startOdin } from "./lib/odin";

function App() {

  const [user, setUser] = useState('')
  const [connect, setConnect] = useState(false)

  useEffect(() => {
    console.log(user);
  }, [user])

  const connectOdin = async() => {
    let token = await generateToken(user)
    startOdin(token)
    setConnect(true)
  }
  
  return (
    <div>
      <h1>Hola mundo</h1>
      <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
      <button onClick={connectOdin}>Connect</button>
      {connect && <p style={{color: 'green'}}>Conected</p>}
    </div>
  );
}

export default App;
