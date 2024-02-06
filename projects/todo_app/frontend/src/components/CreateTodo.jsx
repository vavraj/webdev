import { useState } from "react";

export function CreateTodo() {
    // react query
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return <div>
        <input id="title" style={{
            margin: 10, padding: 10
        }} type="text" placeholder="title" onChange={function (e) {
            const value = e.target.value;
            setTitle(value);
        }} /><br />

        <input id="description" style={{
            margin: 10, padding: 10
        }} type="text" placeholder="description" onChange={function (e) {
            const value = e.target.value;
            setDescription(value);
        }} /><br />

        <button style={{
            margin: 10, padding: 10
        }} onClick={() => {
            
            fetch("http://localhost:3000/todo", {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    description: description
                }),
                headers: {
                    "Content-type": "application/json"
                }
            }).then(async function(res){
                const json=await res.json();
                alert("todo added");
            })
        }
        } > Add todo </button>
    </div>
}