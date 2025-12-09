// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import { useState, useEffect } from 'react';
import keycloak from './keycloak';
import './App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Update state based on Keycloak
    setAuthenticated(keycloak.authenticated || false);
    
    if (keycloak.tokenParsed) {
      setUsername(keycloak.tokenParsed.preferred_username || '');
    }
    
    setLoading(false);

    // // Optional: Set up token refresh
    // keycloak.onTokenExpired = () => {
    //   keycloak.updateToken(30).then((refreshed) => {
    //     if (refreshed) {
    //       console.log('Token refreshed');
    //     }
    //   }).catch(() => {
    //     console.log('Failed to refresh token');
    //   });
    // };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>My React App with Keycloak</h1>
      
      {!authenticated ? (
        <div>
          <p>You are not logged in</p>
          <button onClick={() => keycloak.login()}>
            Login
          </button>
        </div>  
      ) : (
        <div>
          <p>Welcome, {username}!</p>
          <p>Email: {keycloak.tokenParsed?.email}</p>
          <button onClick={() => keycloak.logout()}>
            Logout
          </button>
          
          {/* Example: Show the access token (for debugging)
          <details>
            <summary>Debug Info</summary>
            <pre style={{ textAlign: 'left', fontSize: '12px' }}>
              Token: {keycloak.token?.substring(0, 50)}...
            </pre>
          </details> */}
        </div>
      )}
    </div>
  );
}

export default App;