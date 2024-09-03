import { Button } from "@/components/ui/button";
import { updateTable } from "@/lib/updateTable";
import { useUser } from "@clerk/nextjs";

interface UpdateButtonProps {
  fetchPlayers: () => void;
}

export function UpdateButton({ fetchPlayers }: UpdateButtonProps) {
  const { user } = useUser();

  const handleUpdate = async () => {
    if (user && user.publicMetadata && (user.publicMetadata.role === "approved" || user.publicMetadata.role === "admin")) {
      await updateTable();
      fetchPlayers();
    } else {
      console.log("User is not approved to update the table.");
    }
  };

  return <Button onClick={handleUpdate}>Update Table</Button>;
}
