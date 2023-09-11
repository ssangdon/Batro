import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import Router from './Router';
import "./App.css";
import RecoilNexus from "recoil-nexus";
function App() {
  return (
    <RecoilRoot>
      <RecoilNexus />
      <div className='AppWrappper' >
        <Router />
      </div>
    </RecoilRoot>
  )
}

export default App;