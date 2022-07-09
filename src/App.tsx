import React, { useEffect, useRef } from 'react';
import './App.scss';
import { Stage } from './class/Stage';

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if(!canvasRef.current) {
      return;
    }

    new Stage(canvasRef.current);
  }, []);

  return (
    <main className="app">
      <canvas id="canvas" className="app-canvas" ref={canvasRef}/>
    </main>
  );
}

export default App;
