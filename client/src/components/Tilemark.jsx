export default function Tilemark() {
  return (
    <span className="tilemark">
      <i></i><i></i><i></i><i></i>
    </span>
  )
}

export function Brand({ className }) {
  return (
    <div className={className ? `brand ${className}` : 'brand'}>
      <img src="/assets/img/logo-mark.png" alt="Zulfishan" className="brand-logo" />
      Zulfishan
    </div>
  )
}
