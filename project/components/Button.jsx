export default function Button({ children, onClick, className, variant = 'default' }) {
  const base =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white'
  const variants = {
    ghost: 'bg-transparent hover:bg-gray-800',
    default: 'bg-gray-800 hover:bg-gray-700',
  }
  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant] || variants.default} ${className}`}>
      {children}
    </button>
  )
}
