export function Todos({todos}){
    return <div>
        {todos.map(function(todo){
            return <div>
                <h1>Title:{todo.title}</h1>
                <h1>Descriptioin:{todo.description}</h1>
                <h1>{todo.completed==true?"completed":"Mark as complete"}</h1>
            </div>
        })}
        </div>
}