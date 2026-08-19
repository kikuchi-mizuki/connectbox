import { LINE_URL } from "../constants";

function LineMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="1.35em"
      height="1.35em"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M12 2C6.253 2 1.5 5.798 1.5 10.5c0 4.21 3.743 7.74 8.782 8.418.342.074.806.226.923.411.107.17.07.436.034.61l-.154.943c-.05.278-.224 1.088.953.593 1.178-.496 6.314-3.718 8.612-6.362C22.289 13.006 22.5 11.79 22.5 10.5 22.5 5.798 17.747 2 12 2z"
      />
    </svg>
  );
}

export default function CtaButton({
  className = "",
  children = "まずは15分、LINEで相談する",
}: {
  className?: string;
  children?: string;
}) {
  return (
    <a
      className={`btn btn--line ${className}`.trim()}
      href={LINE_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      <LineMark className="btn__icon" />
      <span>{children}</span>
    </a>
  );
}
