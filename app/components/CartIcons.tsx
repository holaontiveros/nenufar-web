type IconProps = {
  className?: string;
  title?: string;
};

function Icon({
  children,
  className,
  title,
}: IconProps & {children: React.ReactNode}) {
  return (
    <svg
      aria-hidden={title ? undefined : true}
      className={className}
      fill="none"
      role={title ? 'img' : undefined}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 8h14l-1 12H6L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </Icon>
  );
}

export function PencilIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m4 20 4.2-1 10.3-10.3a2.1 2.1 0 0 0-3-3L5.2 16 4 20Z" />
      <path d="m13.8 7.2 3 3" />
    </Icon>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3 5.5 6v5c0 4.2 2.8 8 6.5 10 3.7-2 6.5-5.8 6.5-10V6L12 3Z" />
      <path d="m9 12 2 2 4-4" />
    </Icon>
  );
}

export function SparklesIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m12 3 .8 3.2L16 7l-3.2.8L12 11l-.8-3.2L8 7l3.2-.8L12 3Z" />
      <path d="m6 14 .5 1.8L8.5 16l-2 .5L6 18.5l-.5-2L3.5 16l2-.2L6 14Z" />
      <path d="m18 14 .5 1.8 2 .2-2 .5-.5 2-.5-2-2-.5 2-.2.5-1.8Z" />
    </Icon>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7h16" />
      <path d="M10 11v5M14 11v5M9 7l1-3h4l1 3M6 7l1 13h10l1-13" />
    </Icon>
  );
}
