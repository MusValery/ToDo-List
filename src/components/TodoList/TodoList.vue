<template>
  <div class="todo">
    <div class="todo__add">
      <input
        v-model="newTodoText"
        type="text"
        placeholder="What is the new task?"
        class="todo__add_text"
        @keyup.enter="addTodo(newTodoText)"
      />
      <span @click="addTodo(newTodoText)"><svg-icon name="add"/></span>
    </div>
    <div class="todo__wrapper">
      <table class="todo__wrapper_list">
        <tr class="todo__wrapper_list_header">
          <th>Task</th>
          <th>Remove</th>
          <th>Checked</th>
          <th>Edit</th>
        </tr>
        <tr
          class="todo__wrapper_list_body"
          v-for="(todo, index) in todos"
          :key="index"
          :class="{ line: todo.checked }"
        >
          <td v-if="!todo.editMode">
            {{ todo.text }}
          </td>
          <td v-else>
            <input
              type="text"
              v-model="editedText"
              class="edit_todo"
              placeholder="Edit task"
              @keyup.enter="confirmEditedTask(todo, index)"
            />
          </td>
          <td>
            <span @click="removeTask(index)"><svg-icon name="remove"/></span>
          </td>
          <td>
            <input type="checkbox" v-model="todo.checked" class="checkbox" />
          </td>
          <td>
            <span @click="editTask(todo)"><svg-icon name="edit"/></span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Todoapp",
  data() {
    return {
      todos: [
        {
          text: "Learn Vue",
          checked: false,
          editMode: false,
        },
        {
          text: "Learn English",
          checked: false,
          editMode: false,
        },
      ],
      newTodoText: "",
      editedText: ""
    };
  },

  mounted() {
    let newTodos = localStorage.getItem("todo");
    if (newTodos) {
      this.todos = JSON.parse(newTodos) || [];
    }
  },
  methods: {
    // remove task
    removeTask(index) {
      this.todos.splice(index, 1);
      localStorage.setItem("todo", JSON.stringify(this.todos));
    },
    // add new task
    addTodo(text) {
      if (this.newTodoText !== "") {
        this.todos.push({
          text: text,
          checked: false,
          editMode: false,
        });
        localStorage.setItem("todo", JSON.stringify(this.todos));
        this.newTodoText = "";
      } else {
        alert("Don't add empty task");
      }
    },
    // open input to edit task
    editTask(todo) {
      todo.editMode = true;
    },
    // save edited task
    confirmEditedTask(todo, index) {
      this.todos[index].text = this.editedText;
      todo.editMode = false;
      localStorage.setItem("todo", JSON.stringify(this.todos));
    },
  },
};
</script>

<style lang="sass" scoped>
.todo
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  gap: 20px

.todo__add
  display: flex
  align-items: center

.todo__add_text
  margin: 20px
  padding: 10px
  border-radius: 15px

.todo__wrapper
  width: 70%

.todo__wrapper_list_header
  background-color: #D2F0F9
  height: 40px

.todo__wrapper_list_body
  background-color: #E8F6FA
  text-align: center
  height: 45px

.todo__wrapper_list
  width: 100%

.checkbox
  width: 20px
  height: 20px

.edit_todo
  padding: 3px
  height: 20px
  border-radius: 10px
</style>
