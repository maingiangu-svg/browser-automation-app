import { task, wait } from "@trigger.dev/sdk";

export const helloWorldTask = task({
  id: "hello-world",
  maxDuration: 300,
  run: async (payload: { message?: string }) => {
    console.log("Hello world!", payload);
    
    // Giả lập tác vụ chạy ngầm mất 5 giây
    await wait.for({ seconds: 5 });

    return {
      message: "Task finished",
      receivedPayload: payload,
    };
  },
});