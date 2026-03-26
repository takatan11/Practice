type Todo={
id:number;
title:string;
completed:boolean;};
let nextId=0;
const todos:Todo[]=[];

const form=document.getElementById("new-todo-form") as HTMLFormElement;
const input=document.getElementById("new-todo-title")as HTMLInputElement;
const list=document.getElementById("todo-list") as HTMLUListElement;
form.addEventListener("submit",(e)=>{
     e.preventDefault();
     if(input.value==""){
          return ;
     }
     let todo:Todo={
          id:nextId++,
          title:input.value,
          completed:false
     };

     todos.push(todo);
     input.value="";
     const item=document.createElement("li");
     item.textContent=(todo.title);
     list.append(item);
})

