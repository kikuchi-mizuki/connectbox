import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CONNECT_BOX_CLARITY_ID } from "../constants";

const SCRIPT_ID = "ms-clarity";

function isConnectBoxPath(pathname: string) {
  return pathname === "/connect-box" || pathname.startsWith("/connect-box/");
}

/**
 * Connect Box（/connect-box 以下）専用の Microsoft Clarity。
 * 探偵LPの Clarity とは別プロジェクト。/detective では読み込まない。
 */
export default function ConnectBoxClarity() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isConnectBoxPath(pathname)) return;

    const existing = document.getElementById(SCRIPT_ID);
    if (existing?.dataset.clarityProject === CONNECT_BOX_CLARITY_ID) {
      return;
    }
    existing?.remove();

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.type = "text/javascript";
    script.dataset.clarityProject = CONNECT_BOX_CLARITY_ID;
    script.text = `(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CONNECT_BOX_CLARITY_ID}");`;
    document.head.appendChild(script);

    return () => {
      const current = document.getElementById(SCRIPT_ID);
      if (current?.dataset.clarityProject === CONNECT_BOX_CLARITY_ID) {
        current.remove();
      }
    };
  }, [pathname]);

  return null;
}
