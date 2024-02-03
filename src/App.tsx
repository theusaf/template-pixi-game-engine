import "./App.css";
import * as PIXI from "pixi.js";
import { createContext, useRef, useEffect, useState, forwardRef } from "react";
import Game from "./Game";

const PixiAppContext = createContext<PIXI.Application | null>(null);

const PixiRenderer = forwardRef<HTMLCanvasElement>((props, ref) => {
  return <canvas ref={ref} {...props} />;
});

function App() {
  const pixiAppRef = useRef<HTMLCanvasElement>(null),
    [pixiApp, setPixiApp] = useState<PIXI.Application | null>(null);

  useEffect(() => {
    if (pixiAppRef.current) {
      const app = new PIXI.Application({
        backgroundAlpha: 0,
        antialias: true,
        resolution: 1,
        autoDensity: true,
        width: 1280,
        height: 720,
        view: pixiAppRef.current,
      });
      app.resizeTo = pixiAppRef.current;
      setPixiApp(app);
    }
  }, [pixiAppRef]);

  return (
    <PixiAppContext.Provider value={pixiApp}>
      <div id="pixi-engine" className="w-full relative flex content-center flex-col">
        <PixiRenderer ref={pixiAppRef} />
        <Game />
      </div>
    </PixiAppContext.Provider>
  );
}

export default App;
