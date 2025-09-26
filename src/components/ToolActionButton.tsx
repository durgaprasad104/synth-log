// In your Tool management component (ToolList.tsx, ToolEditor.tsx, etc.)
import { useState } from "react";
import PasswordModal from "./PasswordModal";

function ToolActionButton(props) {
  const [pwOpen, setPwOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<null | (() => void)>(null);
  const handleRequirePassword = (action: () => void) => {
    setPendingAction(() => action);
    setPwOpen(true);
  };

  const handlePasswordSubmit = (entered: string) => {
    setPwOpen(false);
    if (entered === "durgaprasad" && pendingAction) {
      pendingAction();
    } else {
      alert("Incorrect password!");
    }
  };

  return (
    <>
      {/* Example usage for Add/Edit/Delete */}
      <button onClick={() => handleRequirePassword(props.onAdd)}>Add Tool</button>
      <button onClick={() => handleRequirePassword(props.onEdit)}>Edit Tool</button>
      <button onClick={() => handleRequirePassword(props.onDelete)}>Delete Tool</button>

      <PasswordModal
        open={pwOpen}
        onClose={() => setPwOpen(false)}
        onSubmit={handlePasswordSubmit}
      />
    </>
  );
}
