import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [roomID, setRoomID] = useState("");
  const [type, setType] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!roomName || !roomID || !type || !state) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomName,
          roomID,
          type,
          state,
        }),
      });
      if (response.ok) {
        setSuccessMessage("Room successfully created");
        setError(null);
        setRoomName("");
        setRoomID("");
        setType("");
        setState("");
      } else {
        throw new Error("Failed to create room");
      }
    } catch (error) {
      console.error("Error creating room:", error);
      setError("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4">Create New Room</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Room ID"
          value={roomID}
          onChange={(e) => setRoomID(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Create Room
        </Button>
      </form>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography>Error: {error}</Typography>}
      {successMessage && <Typography>{successMessage}</Typography>}
    </div>
  );
};

export default CreateRoom;
