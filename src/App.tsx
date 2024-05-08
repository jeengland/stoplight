import { useEffect, useState } from "react";
import Light from "./components/Light";


interface ColorMap {
  [key: string]: string; 
}

const colorMap: ColorMap = {
  red: "rgb(255, 0, 0)",
  yellow: "rgb(255, 255, 0)",
  green: "rgb(0, 128, 0)",
};

interface LightsState {
    [colorName: string]: LightData;
}

interface LightData {
    position: number;
    color: string;
}

interface LightSequenceItem {
    colors: (string[] | "off");
    duration: number;
}

interface LightOptions {
    [key: string]: { 
        lights: Record<string, LightData>; 
        sequence: LightSequenceItem[];
    }
}

const lightOptions: LightOptions = {
  "standard": { 
    lights: {"red": {"position": 1, "color": "red"}, "yellow": {"position": 2, "color": "yellow"}, "green": {"position": 3, "color": "green"}},
    sequence: [{"colors": ["green"], "duration": 3000}, {"colors": ["yellow"], "duration": 1000}, {"colors": ["red"], "duration": 2000}]
  },
  "emergency": {
    lights: {"red": {"position": 1, "color": "red"}, "yellow": {"position": 2, "color": "yellow"}, "green": {"position": 3, "color": "green"}},
    sequence: [{"colors": ["red"], "duration": 1000}, {"colors": "off", "duration": 1000}]
  },
  "protectedTurn": {
    lights: { "red": { "position": 1, "color": "red" }, "yellow": { "position": 2, "color": "yellow" }, "green": { "position": 3, "color": "green" }, "specialGreen": { "position": 4, "color": "#20F7B2" } },
    sequence: [{"colors": ["red"], "duration": 1000}, {"colors": ["yellow"], "duration": 1000}, {"colors": ["specialGreen"], "duration": 5000}]
  }
}; 



function App() {
  const [lightsData, setLightsData] = useState<LightsState>({})
  const [sequenceData, setSequenceData] = useState<LightSequenceItem[]>([])
  const [activeColors, setActiveColors] = useState<string[]>([]); 
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0); 
  

  useEffect(() => {
    const option = lightOptions.emergency

    setLightsData(option.lights)
    setSequenceData(option.sequence)
  }, [])

  useEffect(() => {
    if (sequenceData.length === 0) return;

    const step = sequenceData[currentStepIndex];

    if (step.colors == "off") {
        setActiveColors([]);
    } else {
        setActiveColors(step.colors);
    }

    const nextChangeInterval = step.duration;
    const timeoutId = setTimeout(() => {
        setCurrentStepIndex((currentStepIndex + 1) % sequenceData.length);
    }, nextChangeInterval);

    return () => clearTimeout(timeoutId); 
}, [currentStepIndex, sequenceData]);


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
      {Object.entries(lightsData).map(([key, value]) => (
        <Light key={key} color={colorMap[value.color]} text={key} toggled={activeColors.includes(value.color)} /> 
    ))}
    </div>
  )
}

export default App
