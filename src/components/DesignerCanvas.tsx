"use client"
import React, { useEffect, useRef, useState } from 'react';

export default function DesignerCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<any>(null);

  useEffect(() => {
    import('fabric').then((fabricModule) => {
      if (canvasRef.current && !canvas) {
        const fabricCanvas = new fabricModule.Canvas(canvasRef.current, {
          width: 600,
          height: 500,
          backgroundColor: '#ffffff',
        });
        setCanvas(fabricCanvas);
      }
    });
  }, []);

  // Функция удаления выбранного объекта
  const deleteSelected = () => {
    if (canvas) {
      const activeObjects = canvas.getActiveObjects();
      canvas.discardActiveObject();
      canvas.remove(...activeObjects);
    }
  };

  // Функция добавления текста
  const addText = () => {
    if (canvas) {
      import('fabric').then((fabricModule) => {
        const text = new fabricModule.IText('Напишите текст', {
          left: 100,
          top: 100,
          fontSize: 20,
          fontFamily: 'Arial'
        });
        canvas.add(text);
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Панель инструментов */}
      <div className="flex gap-2 bg-gray-100 p-2 rounded-lg border">
        <button onClick={addText} className="px-4 py-1 bg-white border rounded hover:bg-gray-50 text-xs font-bold uppercase">Текст</button>
        <button onClick={deleteSelected} className="px-4 py-1 bg-white border border-red-200 text-red-500 rounded hover:bg-red-50 text-xs font-bold uppercase">Удалить</button>
        <button onClick={() => canvas?.clear()} className="px-4 py-1 bg-white border rounded hover:bg-gray-50 text-xs font-bold uppercase">Очистить всё</button>
      </div>

      {/* Холст */}
      <div className="border shadow-2xl bg-white">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}