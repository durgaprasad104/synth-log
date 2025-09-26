import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function PasswordModal({ open, onClose, onSubmit }: {
  open: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
}) {
  const [password, setPassword] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
      <div className="bg-[#15181d] rounded-lg shadow-lg p-6 w-full max-w-xs flex flex-col items-center">
        <h2 className="text-lg font-semibold text-white mb-4">Enter Password</h2>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-3 py-2 bg-[#292d36] text-white rounded border border-gray-700 mb-4"
          placeholder="Password"
          autoFocus
        />
        <div className="flex w-full gap-2">
          <Button
            className="flex-1"
            variant="outline"
            onClick={() => {
              onSubmit(password);
              setPassword("");
            }}
          >
            Submit
          </Button>
          <Button
            className="flex-1"
            variant="destructive"
            onClick={() => {
              setPassword("");
              onClose();
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
