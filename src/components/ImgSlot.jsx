export default function ImgSlot({ src, alt = '', fit = 'cover', aspect, className = '' }) {
  const style = {
    width: '100%',
    height: '100%',
    objectFit: fit,
    objectPosition: '50% 50%',
    aspectRatio: aspect || undefined,
    display: 'block',
  };
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center text-ink-4 text-xs ${className}`}
        style={{ width: '100%', height: '100%', background: 'var(--surface-3)' }}
      >
        {alt || 'Image'}
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" style={style} className={className} draggable={false} />;
}
