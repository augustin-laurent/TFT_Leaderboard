import axios from "axios";

export async function updateTable() {
    try {
      console.log("Starting player update");
      await axios.get("/api/updatePlayers");
      console.log("Player update completed");
    } catch (error) {
      console.error("Error during player update:", error);
    }
};
