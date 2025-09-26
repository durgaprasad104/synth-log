// PasswordModal.tsx
import { useState } from "react";

export default function PasswordModal({ open, onClose, onSubmit }: {
  open: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
}) {
  const [password, setPassword] = useState("");
  return open ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <h2>Enter Password</h2>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-1 mt-2"
        />
        <div className="flex mt-4">
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
            onClick={() => {
              onSubmit(password);
              setPassword("");
            }}
          >
            Submit
          </button>
          <button
            className="bg-gray-300 px-3 py-1 rounded"
            onClick={() => {
              setPassword("");
              onClose();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
