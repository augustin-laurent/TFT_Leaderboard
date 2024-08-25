import { Button } from "@/components/ui/button";
import { updateTable } from "@/lib/updateTable";
import { useUser } from "@clerk/nextjs";

export function UpdateButton() {
  const { user } = useUser();

  const handleUpdate = async () => {
    if (user.publicMetadata.role === "approved" || user.publicMetadata.role === "admin") {
      await updateTable();
    } else {
      console.log("User is not approved to update the table.");
    }
  };

  return <Button onClick={handleUpdate}>Update Table</Button>;
}
