import Chat from "./Chat";
import SideBar from "./SideBar";

function ChatBotComponent() {
  return (
    <div className="flex h-screen justify-between w-screen">
      {/* <SideBar /> */}
      <Chat />
    </div>
  );
}

export default ChatBotComponent;