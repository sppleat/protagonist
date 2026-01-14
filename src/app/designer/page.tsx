import DesignerCanvas from "@/components/DesignerCanvas";

export default function DesignerPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8">Дизайнер одежды</h1>
      </div>
      
      <div className="w-full flex justify-center">
        {/* Твой основной компонент с холстом */}
        <DesignerCanvas />
      </div>
    </main>
  );
}