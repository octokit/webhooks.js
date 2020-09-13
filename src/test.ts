import { Webhooks } from "./";
const webhooks = new Webhooks({ secret: "fdsf" });

webhooks.on(["watch"], (p) => {
  p.payload;
});
