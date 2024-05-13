import React, { useState, useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

const GetAllRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch("http://localhost:3000/rooms");
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Rooms:", data); // Add console log statement
        setRooms(data);
      } else {
        throw new Error("Failed to fetch rooms");
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleRefresh = () => {
    fetchRooms();
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Rooms List
      </Typography>
      {rooms.length === 0 ? (
        <Typography variant="body1">No rooms available</Typography>
      ) : (
        <List
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {rooms.map((room) => (
            <ListItem key={room._id} style={{ margin: "0px" }}>
              <ListItemText
                primary={room.roomName}
                secondary={`ID: ${room._id}, Room ID: ${room.roomID}, Type: ${room.type}, State: ${room.state}`}
              />
            </ListItem>
          ))}
        </List>
      )}
      <Button
        onClick={handleRefresh}
        type="submit"
        variant="contained"
        color="primary"
      >
        Refresh Data
      </Button>
    </div>
  );
};

export default GetAllRooms;
