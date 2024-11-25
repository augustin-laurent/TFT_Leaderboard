import { Button } from "@/components/ui/button";
import { updateTable } from "@/lib/updateTable";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CheckCircleIcon, X } from "lucide-react";


interface UpdateButtonProps {
  fetchPlayers: () => void;
}

export function UpdateButton({ fetchPlayers }: UpdateButtonProps) {
  const { user } = useUser();
  const [updateSuccess, setUpdateSuccess] = useState<boolean | null>(null);

  const handleUpdate = async () => {
    if (user && user.publicMetadata && (user.publicMetadata.role === "approved" || user.publicMetadata.role === "admin")) {
      try {
        await updateTable();
        fetchPlayers();
        setUpdateSuccess(true);
      } catch (error) {
        console.error("Error updating players", error);
        setUpdateSuccess(false);
      }
    } else {
      console.log("User is not approved to update the table.");
    }
  };

  useEffect(() => {
    if (updateSuccess === true) {
      toast("Players updated successfully", {
        icon: <CheckCircleIcon className="text-green-500" />,
        duration: 5000
      });
      setUpdateSuccess(null);
    } else if (updateSuccess === false) {
      toast("An error occurred while updating the players", 
        { 
          icon: <X className="text-red-500" />,  
          duration: 5000 
        });
      setUpdateSuccess(null);
    }
  }, [updateSuccess]);

  return <Button onClick={handleUpdate}>Update Table</Button>;
}
