/**
 * @deprecated The method should not be used
 */
export default function schedulePlayerUpdate() {
  setInterval(async () => {
    try {
      console.log("Starting scheduled player update");
      const response = await fetch("/api/updatePlayers");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("Scheduled player update completed");
    } catch (error) {
      console.error("Error during scheduled player update:", error);
    }
  }, 5 * 60 * 1000);
}
