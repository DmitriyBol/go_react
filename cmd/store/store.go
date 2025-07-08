package store

import (
	"encoding/json"
	"fmt"
	"os"
)

type dbFormat struct {
	TodoList []Todo `json:"todoList"`
}

type TodoStore struct {
	todos    map[int]Todo
	filePath string
}

type Todo struct {
	ID        int    `json:"id"`
	Completed bool   `json:"completed"`
	Body      string `json:"body"`
}

func NewTodoStore(filePath string) (*TodoStore, error) {
	f, err := os.Open(filePath)
	if err != nil {
		return nil, fmt.Errorf("не удалось открыть файл с данными: %w", err)
	}

	var db dbFormat
	if err := json.NewDecoder(f).Decode(&db); err != nil {
		return nil, fmt.Errorf("не удалось декодировать JSON: %w", err)
	}

	todosMap := make(map[int]Todo, len(db.TodoList))
	for _, todo := range db.TodoList {
		todosMap[todo.ID] = todo
	}

	return &TodoStore{todos: todosMap, filePath: filePath}, nil
}

func (s *TodoStore) GetAllTodos() []Todo {
	todoList := make([]Todo, 0, len(s.todos))
	for _, todo := range s.todos {
		todoList = append(todoList, todo)
	}

	return todoList
}

func (s *TodoStore) AddNewTodo(newTodo Todo) error {
	if _, ok := s.todos[newTodo.ID]; ok {
		return fmt.Errorf("задача с ID %d уже существует", newTodo.ID)
	}

	s.todos[newTodo.ID] = newTodo

	todoList := make([]Todo, 0, len(s.todos))
	for _, todo := range s.todos {
		todoList = append(todoList, todo)
	}

	db := dbFormat{TodoList: todoList}
	jsonData, err := json.MarshalIndent(db, "", "  ")
	if err != nil {
		return fmt.Errorf("ошибка при кодировании в JSON: %w", err)
	}

	if err := os.WriteFile(s.filePath, jsonData, 0644); err != nil {
		return fmt.Errorf("ошибка при записи в файл: %w", err)
	}

	return nil
}

func (s *TodoStore) GetTodo(id int) (Todo, bool) {
	todo, ok := s.todos[id]
	return todo, ok
}

func (s *TodoStore) GenerateNewID() int {
	if len(s.todos) == 0 {
		return 1
	}

	maxID := 0
	for id := range s.todos {
		if id > maxID {
			maxID = id
		}
	}
	return maxID + 1
}
