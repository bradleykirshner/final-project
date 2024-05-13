import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const GetRoomById = () => {
  const [roomId, setRoomId] = useState("");
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!roomId) {
      setError("Please enter a room ID");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/rooms/${roomId}`);
      if (response.ok) {
        const data = await response.json();
        setRoom(data);
        setError(null);
      } else if (response.status === 404) {
        setRoom(null);
        setError("Room not found");
      } else {
        throw new Error("Failed to fetch room");
      }
    } catch (error) {
      console.error("Error fetching room:", error);
      setError("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4">Get Room by ID</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Get Room
        </Button>
      </form>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography>Error: {error}</Typography>}
      {room && (
        <div>
          <Typography variant="h5">Room Details</Typography>
          <Typography>ID: {room._id}</Typography>
          <Typography>Name: {room.roomName}</Typography>
          <Typography>Room ID: {room.roomID}</Typography>
          <Typography>Type: {room.type}</Typography>
          <Typography>State: {room.state}</Typography>
        </div>
      )}
    </div>
  );
};

export default GetRoomById;
