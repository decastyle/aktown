import { Skiper54 } from "./ui/skiper54";
export default function Hero() {
  return (
    <div className="w-full bg-background">
      <div className="container mx-auto">
        <div className="flex gap-8 py-8 lg:py-16 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col px-4">
            <h1 className="text-3xl md:text-6xl max-w-2xl font-regular font-[Kinetika]">
              Кто мы?
            </h1>
            <p className="text-base md:text-base leading-relaxed tracking-tight text-foreground max-w-2xl leading-7 [&:not(:first-child)]:mt-6">
              <p className="text-lg font-semibold mb-2">
                AKTOWN — это творческое объединение города Актау.
              </p>{" "}
              Мы — медиа-проект, объединяющий молодёжь. Создаём контент,
              организуем концерты и мероприятия. Вносим вклад в развитие
              общества через креативные проекты.
            </p>
          </div>
          <Skiper54 />
        </div>
      </div>
    </div>
  );
}
