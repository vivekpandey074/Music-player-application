import "./styles.scss";
export default function ContentWrapper({children}) {
  return (
    <div className="contentWrapper">
      {children}
    </div>
  )
}
