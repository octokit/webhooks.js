import { Webhooks } from "./";
const webhooks = new Webhooks({ secret: "fdsf" });

webhooks.on(["check_run"], (p) => {
  p.payload;
});
