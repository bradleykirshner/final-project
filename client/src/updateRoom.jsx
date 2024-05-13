import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const UpdateRoomById = () => {
  const [roomId, setRoomId] = useState("");
  const [roomData, setRoomData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/rooms/${roomId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roomData),
      });
      if (response.ok) {
        setSuccessMessage("Room successfully updated");
        setError(null);
      } else if (response.status === 404) {
        throw new Error("Room not found");
      } else {
        throw new Error("Failed to update room");
      }
    } catch (error) {
      console.error("Error updating room:", error);
      setError("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  const handleRoomDataChange = (e) => {
    const inputData = e.target.value;
    console.log("Input Data:", inputData); // Log input data
    try {
      const parsedData = JSON.parse(inputData);
      setRoomData(parsedData);
      setError(null); // Reset error if parsing is successful
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Update Room by ID</Typography>
      <TextField
        type="text"
        label="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        type="text"
        label="Put Data (JSON) *make sure to update all fields"
        onChange={handleRoomDataChange}
        fullWidth
        margin="normal"
      />
      <Button
        onClick={handleUpdate}
        disabled={loading}
        variant="contained"
        color="primary"
      >
        Update Room
      </Button>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography>Error: {error}</Typography>}
      {successMessage && <Typography>{successMessage}</Typography>}
    </div>
  );};

export default UpdateRoomById;
