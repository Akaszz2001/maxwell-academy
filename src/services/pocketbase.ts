import PocketBase from "pocketbase";

// Change this to your PocketBase server URL
const pb = new PocketBase("https://julie-kodak-cute-oil.trycloudflare.com");

// Persist auth state across page reloads
pb.authStore.loadFromCookie(document.cookie);

pb.authStore.onChange(() => {
  document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
});

export default pb;
