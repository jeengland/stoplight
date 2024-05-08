import Light from "./components/Light";

const colorMap = {
  "red": "rgb(255, 0, 0)",
  "yellow": "rgb(255, 255, 0)",
  "green": "rgb(0, 128, 0)",
};

function App() {
  

  return (
    <div style={{
      width: 150,
      height: 390,
      backgroundColor: "black",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "10px"
    }}>
      <Light color={colorMap.red} text="red" />
      <Light color={colorMap.yellow} text="yellow" />
      <Light color={colorMap.green} text="green" toggled />
    </div>
  )
}

export default App
