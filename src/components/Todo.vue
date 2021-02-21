<template>
  <div class="container my-3">
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">待辦事項</span>
      </div>
      <input
        type="text"
        class="form-control"
        placeholder="準備要做的任務"
        v-model.trim="todo"
        @keyup.enter="addTodo"
      >
      <div class="input-group-append">
        <button class="btn btn-primary" type="button" @click="addTodo">新增</button>
      </div>
    </div>
    <div class="card text-center">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
              @click="status = 'all'"
              :class="{'active': status === 'all'}"
            >全部</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
              @click="status = 'ing'"
              :class="{'active': status === 'ing'}"
            >進行中</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
              @click="status = 'finished'"
              :class="{'active': status === 'finished'}"
            >已完成</a>
          </li>
        </ul>
      </div>
      <ul class="list-group list-group-flush text-left">
        <li
          class="list-group-item"
          v-for="item in filtertodos"
          :key="item.id"
          @dblclick="edittodo(item)"
        >
          <div class="d-flex" v-if="item.id !== temptodo.id">
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                :id="item.id"
                v-model="item.completed"
              >
              <label
                class="form-check-label"
                :for="item.id"
                :class="{'completed':item.completed}"
              >{{item.text}}</label>
            </div>
            <button
              type="button"
              class="close ml-auto"
              aria-label="Close"
              @click="deletetodo(item)"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <input
            type="text"
            class="form-control"
            v-model="temptext"
            v-if="item.id === temptodo.id"
            @keyup.enter="donetodo(item)"
            @keyup.esc="canceltodo"
            @blur="focusState = false" 
            v-focus="focusState"
          >
        </li>
      </ul>
      <div class="card-footer d-flex justify-content-between">
        <span>還有 {{ingtodo}} 筆任務未完成</span>
        <a href="#" @click="removealltodos">清除所有任務</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [
        {
          id: "1",
          text: "first",
          completed: false
        },
        {
          id: "2",
          text: "second",
          completed: true
        },
        {
          id: "3",
          text: "third",
          completed: true
        }
      ],
      todo: "",
      status: "all",
      temptodo: {},
      temptext: '',
      focusState: false
    };
  },

  methods: {
    addTodo() {
      const time = new Date().getTime();
      if (!this.todo) {
        return;
      } else {
        this.todos.push({
          id: time,
          text: this.todo,
          completed: false
        });
      }
      this.todo = "";
    },
    removealltodos() {
        this.todos = [];
    },
    deletetodo(item) {
        const findtodo = this.todos.findIndex(element => element.id == item.id)
        this.todos.splice(findtodo,1)
    },
    edittodo(item) {
        this.temptodo = item;
        this.temptext = this.temptodo.text;
        this.focusState = true
    },
    donetodo(item) {
        item.text = this.temptext
        this.temptodo = {};
        this.temptext = '';
    },
    canceltodo() {
        this.temptodo = {};
    },
  },

  computed: {
    filtertodos() {
      if (this.status === "all") {
        return this.todos;
      } else if (this.status === "ing") {
        let newtodos = [];
        this.todos.forEach(element => {
          if (element.completed === false) {
            newtodos.push(element);
          }
        });
        return newtodos;
      } else if (this.status === "finished") {
        let newtodos = [];
        this.todos.forEach(element => {
          if (element.completed === true) {
            newtodos.push(element);
          }
        });
        return newtodos;
      }
    },
    ingtodo() {
        let ingtodo = 0;
        this.todos.forEach(element => {
            if(element.completed === false) {
                ingtodo += 1;
            }
        });
        return ingtodo;
    }
  },

  directives: {
    focus: {
        inserted: function (el, {value}) {
            if (value) {
                el.focus();
            }
        }
    }
},
};
</script>

<style lang="scss">
.completed {
  text-decoration: line-through;
}
</style>