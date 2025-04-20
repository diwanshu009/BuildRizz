import ChatView from "@/components/custom/ChatView";
import CodeView from "@/components/custom/CodeView";

export default function Page() {
    return (
        <div className="p-3 pr-5 mt-3 min-h-screen overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-1">
                    <ChatView />
                </div>
                <div className="md:col-span-2">
                    <CodeView />
                </div>
            </div>
        </div>
    );
}
