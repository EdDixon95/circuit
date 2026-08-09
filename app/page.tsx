import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      Circuit is a climbing competition management system built with Next.js, Prisma, and Tailwind CSS. It allows climbing gyms to manage competitions, track climbers' progress, and generate results.
    </div>
  );
}
