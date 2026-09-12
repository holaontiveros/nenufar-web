import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import {Link, type LinkProps} from 'react-router';

export type ActionVariant =
  | 'primary'
  | 'secondary'
  | 'whatsapp'
  | 'ghost'
  | 'icon'
  | 'choice'
  | 'stepper';

export type ActionSize = 'small' | 'medium' | 'large' | 'icon-sm' | 'icon-md';

type ActionPresentationProps = {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  size?: ActionSize;
  variant: ActionVariant;
};

function getActionClassName({
  className,
  fullWidth = false,
  size = 'medium',
  variant,
}: Omit<ActionPresentationProps, 'children'>) {
  return [
    'action',
    `action--${variant}`,
    `action--${size}`,
    fullWidth ? 'action--full-width' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

type ActionButtonProps = ActionPresentationProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

export function ActionButton({
  children,
  className,
  fullWidth,
  size,
  variant,
  ...props
}: ActionButtonProps) {
  return (
    <button
      {...props}
      className={getActionClassName({className, fullWidth, size, variant})}
    >
      {children}
    </button>
  );
}

type ActionAnchorProps = ActionPresentationProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export function ActionAnchor({
  children,
  className,
  fullWidth,
  size,
  variant,
  ...props
}: ActionAnchorProps) {
  return (
    <a
      {...props}
      className={getActionClassName({className, fullWidth, size, variant})}
    >
      {children}
    </a>
  );
}

type ActionLinkProps = ActionPresentationProps & Omit<LinkProps, 'className'>;

export function ActionLink({
  children,
  className,
  fullWidth,
  size,
  variant,
  ...props
}: ActionLinkProps) {
  return (
    <Link
      {...props}
      className={getActionClassName({className, fullWidth, size, variant})}
    >
      {children}
    </Link>
  );
}
