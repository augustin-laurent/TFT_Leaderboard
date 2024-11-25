export async function updateTable() {
    try {
      console.log("Starting player update");
      await fetch("/api/updatePlayers");
      console.log("Player update completed");
    } catch (error) {
      console.error("Error during player update:", error);
    }
};
