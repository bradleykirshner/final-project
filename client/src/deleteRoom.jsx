import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const DeleteRoom = () => {
  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/rooms/${roomId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setSuccessMessage("Room successfully deleted");
        setError(null);
      } else if (response.status === 404) {
        throw new Error("Room not found");
      } else {
        throw new Error("Failed to delete room");
      }
    } catch (error) {
      console.error("Error deleting room:", error);
      setError("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4">Delete Room</Typography>
      <TextField
        type="text"
        label="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleDelete} disabled={loading} variant="contained">
        Delete Room
      </Button>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography>Error: {error}</Typography>}
      {successMessage && <Typography>{successMessage}</Typography>}
    </div>
  );
};

export default DeleteRoom;
