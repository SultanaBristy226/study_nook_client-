export default function Spinner({ size = 'md', className = '' }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className={`${sizes[size]} ${className}`}>
      <div className="w-full h-full rounded-full border-4 border-slate-200 dark:border-slate-700 border-t-primary-600 animate-spin" />
    </div>
  );
}
