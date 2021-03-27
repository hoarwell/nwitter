import { React, useEffect, useState } from 'react';
import AppRouter from 'component/Router';
import { authService } from 'fbase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);

  useEffect(()=>{
    authService.onAuthStateChanged((user) => {
      console.log(user)
      if(user){ // 만약 user 상태 변경이 감지되면 
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  })

  return (
    // 초기화 false면 AppRouter 숨김
    <div className="App">
      { init ? <AppRouter isLoggedIn = { isLoggedIn } /> : "initializing..."}
      <footer>&copy; nwitter { new Date().getFullYear }</footer>
    </div>
  );
}

export default App;
