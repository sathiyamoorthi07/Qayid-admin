import type { NextApiRequest } from "next";

export default function getIPCountry(request: Request | NextApiRequest) {
  const xff =
    request instanceof Request
      ? request.headers.get("cf-ipcountry")
      : request.headers["cf-ipcountry"];

  return xff ? (Array.isArray(xff) ? xff[0] : xff.split(",")[0]) : "";
}
