import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

function PatchRoomComponent() {
  const [roomId, setRoomId] = useState("");
  const [patchData, setPatchData] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handlePatchRoom = async () => {
    try {
      const parsedPatchData = JSON.parse(patchData);
      const allowedKeys = ["roomName", "roomID", "type", "state"]; // Define allowed keys
      const invalidKeys = Object.keys(parsedPatchData).filter(
        (key) => !allowedKeys.includes(key)
      );
      if (invalidKeys.length > 0) {
        throw new Error(`Invalid fields: ${invalidKeys.join(", ")}`);
      }
      const response = await fetch(`http://localhost:3000/rooms/${roomId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedPatchData),
      });
      if (!response.ok) {
        throw new Error("Failed to update room");
      }
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Typography variant="h4">Patch Room</Typography>
      <TextField
        type="text"
        label="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        type="text"
        label="Patch Data (JSON)"
        value={patchData}
        onChange={(e) => setPatchData(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handlePatchRoom} variant="contained" color="primary">
        Patch Room
      </Button>
      <div>
        {message && <Typography>{message}</Typography>}
        {error && <Typography>Error: {error}</Typography>}
      </div>
    </div>
  );
}

export default PatchRoomComponent;
