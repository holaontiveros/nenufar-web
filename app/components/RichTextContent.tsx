import {RichText} from '@shopify/hydrogen';

function isRichTextValue(value: string) {
  try {
    const parsed: unknown = JSON.parse(value);
    return Boolean(
      parsed &&
        typeof parsed === 'object' &&
        'type' in parsed &&
        (parsed as {type?: unknown}).type === 'root',
    );
  } catch {
    return false;
  }
}

export function RichTextContent({
  className,
  value,
}: {
  className?: string;
  value?: string | null;
}) {
  if (!value) return null;

  if (isRichTextValue(value)) {
    return <RichText className={className} data={value} />;
  }

  return <span className={className}>{value}</span>;
}
