import { MessagesSquare } from "lucide-react";
const EmptyConversations = ({
  isSearchEnabled,
}: {
  isSearchEnabled: boolean;
}) => (
  <div className="flex flex-col items-center justify-center p-8 text-center">
    <div className="bg-indigo-100 p-4 rounded-full mb-4">
      <MessagesSquare
        className={isSearchEnabled ? "text-red-600" : "text-indigo-600"}
        size={32}
      />
    </div>
    <h3 className="text-lg font-medium text-gray-800">
      {isSearchEnabled ? "No conversations found" : "No Conversations yet"}
    </h3>
    {!isSearchEnabled && (
      <div>
        <p className="mt-1 text-gray-500 max-w-xs">
          Start a new conversation by clicking the button below
        </p>
        <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
          Start a chat
        </button>
      </div>
    )}
  </div>
);

export default EmptyConversations;
