export function TaskCard({task}) {
  return <div>
    <h1>{task.title}</h1>
    <button>
      X
    </button>
  </div>;
}

export default TaskCard;