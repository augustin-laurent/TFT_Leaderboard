import axios from "axios";

export default function schedulePlayerUpdate() {
  setInterval(async () => {
    try {
      console.log("Starting scheduled player update");
      await axios.get("/api/updatePlayers");
      console.log("Scheduled player update completed");
    } catch (error) {
      console.error("Error during scheduled player update:", error);
    }
  }, 5 * 60 * 1000);
}