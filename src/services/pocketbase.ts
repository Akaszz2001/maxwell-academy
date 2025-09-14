import PocketBase from "pocketbase";

// Change this to your PocketBase server URL
const pb = new PocketBase("http://127.0.0.1:8090/");

// Persist auth state across page reloads
pb.authStore.loadFromCookie(document.cookie);

pb.authStore.onChange(() => {
  document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
});

export default pb;
