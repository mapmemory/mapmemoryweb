import PageBottomNavigation from "@/components/PageBottomNavigation";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-start h-full">
      <div className="py-5 w-full bg-[#554fff] absolute top-[-1.4rem] left-0 z-20 opacity-50 rounded-[50%]"></div>

      <div className="flex items-center justify-center">Erro 404</div>
      <div className="flex items-center justify-center">Página não encontrada. 😢</div>

      <PageBottomNavigation />
    </div>
  );
}
