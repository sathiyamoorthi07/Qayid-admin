import type { NextApiRequest } from "next";

export default function getIsMobile(request: Request | NextApiRequest) {
  const xff =
    request instanceof Request
      ? request.headers.get("sec-ch-ua-mobile")
      : request.headers["sec-ch-ua-mobile"];

  const isMobile = xff ? (Array.isArray(xff) ? xff[0] : xff.split(",")[0]) : "";
  return isMobile == "?1";
}
