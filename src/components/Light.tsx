
interface LightProps {
  color: string;
  text: string;
  toggled?: boolean;
}

function Light({ color, text, toggled }: LightProps) {
  const textColor = toggled
    ? "#FFFFFF"
    : "#000000"
  
  const brightness = toggled
    ? 150
    : 50

  return (
    <div style={{
      backgroundColor: color,
      width: 100,
      height: 100,
      borderRadius: "50%",
      margin: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: textColor,
      filter: `brightness(${brightness}%)`
          }}>
      {text}
    </div>
  )
}

export default Light
