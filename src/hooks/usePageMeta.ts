import { useEffect } from "react";
import { SITE_NAME } from "../constants";

export function usePageMeta({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  useEffect(() => {
    document.title = title === SITE_NAME ? SITE_NAME : `${title} | ${SITE_NAME}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description);
  }, [title, description]);
}
