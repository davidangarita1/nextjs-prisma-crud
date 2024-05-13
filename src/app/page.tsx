import { TaskCard } from "@/components/TaskCard";
import { prisma } from "@/libs/prisma";

async function loadtesks() {
  return await prisma.task.findMany();
}

export const revalidate = 60;

export default async function HomePage() {
  const tasks = await loadtesks();

  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-3 gap-3 mt-10">
        {tasks.map((task: any) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}
