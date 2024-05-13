import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import GetAllRooms from './getAllRooms';
import GetRoomById from './getRoomById';
import CreateRoom from './createRoom';
import UpdateRoom from './updateRoom';
import DeleteRoom from './deleteRoom';
import PatchRoom from './patchRoom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GetAllRooms />
      <GetRoomById />
      <CreateRoom />
      <UpdateRoom />
      <DeleteRoom />
      <PatchRoom />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
