
interface LightProps {
  color: string;
  text: string;
  toggled?: boolean;
}

function adjustColor(color: string, amount: number) {
  const components = color.match(/\d+/g)?.map(Number);
  
  if (!components) {
    console.error("Invalid color");
    return;
  }

  for (let i = 0; i < 3; i++) {
      components[i] = Math.min(255, Math.max(0, components[i] + amount));
    }

  return `rgb(${components.join(',')})`;
}

function Light({ color, text, toggled }: LightProps) {
  const displayColor = toggled
    ? adjustColor(color, 100)
    : adjustColor(color, -100)
  
  const textColor = toggled
    ? "#FFFFFF"
    : "#000000"


  return (
    <div style={{
      backgroundColor: displayColor,
      width: 100,
      height: 100,
      borderRadius: "50%",
      margin: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: textColor
          }}>
      {text}
    </div>
  )
}

export default Light
