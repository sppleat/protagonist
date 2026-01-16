"use client";

import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";

export default function DesignerCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 600,
      height: 700,
      backgroundColor: "#f0f0f0",
    });

    // Добавляем базовый мокап (футболку)
    fabric.Image.fromURL("/tshirt-base.png").then((img) => {
      img.set({
        selectable: false,
        evented: false,
        scaleX: 0.8,
        scaleY: 0.8,
      });
      fabricCanvas.add(img);
      fabricCanvas.sendToBack(img);
    });

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  // --- ФУНКЦИИ ИНСТРУМЕНТАРИЯ ---

  // 1. Загрузка своего изображения
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !canvas) return;

    const reader = new FileReader();
    reader.onload = (f) => {
      const data = f.target?.result as string;
      fabric.Image.fromURL(data).then((img) => {
        img.scaleToWidth(200);
        // Эффект "Multiply" для реалистичности наложения на ткань
        img.set({ globalCompositeOperation: "multiply" }); 
        canvas.add(img);
        canvas.setActiveObject(img);
      });
    };
    reader.readAsDataURL(file);
  };

  // 2. Управление слоями
  const moveForward = () => {
    const obj = canvas?.getActiveObject();
    if (obj) {
      obj.bringForward();
      canvas?.renderAll();
    }
  };

  // 3. Удаление выбранного
  const deleteObject = () => {
    const activeObjects = canvas?.getActiveObjects();
    if (activeObjects) {
      canvas?.remove(...activeObjects);
      canvas?.discardActiveObject();
    }
  };

  // 4. Применение фильтра (Ч/Б)
  const applyGrayscale = () => {
    const obj = canvas?.getActiveObject() as fabric.Image;
    if (obj && obj.type === "image") {
      obj.filters.push(new fabric.filters.Grayscale());
      obj.applyFilters();
      canvas?.renderAll();
    }
  };

  return (
    <div className="flex flex-row gap-8 p-4 bg-white rounded-xl shadow-lg">
      {/* Левая панель: Инструменты */}
      <div className="flex flex-col gap-4 w-48 bg-gray-50 p-4 rounded-lg border">
        <h3 className="font-bold text-gray-700">Инструменты</h3>
        
        <label className="cursor-pointer bg-blue-600 text-white p-2 rounded text-center hover:bg-blue-700 transition">
          Загрузить принт
          <input type="file" className="hidden" onChange={handleImageUpload} />
        </label>

        <button onClick={applyGrayscale} className="bg-gray-200 p-2 rounded hover:bg-gray-300">
          Сделать Ч/Б
        </button>

        <hr />

        <button onClick={moveForward} className="bg-gray-200 p-2 rounded hover:bg-gray-300">
          На слой выше
        </button>

        <button onClick={deleteObject} className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-200 mt-auto">
          Удалить
        </button>
      </div>

      {/* Центр: Холст */}
      <div className="border-4 border-gray-100 rounded-lg overflow-hidden shadow-inner">
        <canvas ref={canvasRef} />
      </div>

      {/* Правая панель: Инфо */}
      <div className="w-48 text-sm text-gray-500">
        <h3 className="font-bold text-gray-700 mb-2">Совет</h3>
        <p>Используйте режим наложения Multiply для того, чтобы принт выглядел как часть ткани.</p>
      </div>
    </div>
  );
}
