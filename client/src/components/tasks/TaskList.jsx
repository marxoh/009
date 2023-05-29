//error: import { TaskCard }: me dice que ya esta importado
import TaskCard from "../tasks/TaskCard";

export function TaskList({ tasks }) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id}/>
      ))}
    </div>
  );
}
