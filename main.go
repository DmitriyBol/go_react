package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"go_react/cmd/store"
	"log"
	"strconv"
)

func main() {
	todoStore, err := store.NewTodoStore("./database/db.json")
	if err != nil {
		log.Fatalf("Ошибка при инициализации хранилища: %v", err)
	}

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Authorization, Content-Type",
	}))

	app.Get("/", func(c *fiber.Ctx) error {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{"msg": "Hello World2"})
	})

	app.Get("/api/todos", func(c *fiber.Ctx) error {
		return c.Status(fiber.StatusOK).JSON(todoStore.GetAllTodos())
	})

	app.Post("/api/todos", func(c *fiber.Ctx) error {
		todo := &store.Todo{}

		if err := c.BodyParser(todo); err != nil {
			return err
		}

		if todo.Body == "" {
			return c.Status(400).JSON(fiber.Map{"msg": "Body is empty"})
		}

		todo.ID = todoStore.GenerateNewID()
		err := todoStore.AddNewTodo(*todo)
		if err != nil {
			return err
		}
		return c.Status(201).JSON(fiber.Map{"msg": "new todo successfully added"})
	})

	app.Get("/api/todos/:id", func(c *fiber.Ctx) error {
		idStr := c.Params("ID")

		id, err := strconv.Atoi(idStr)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Invalid ID format, must be an integer",
			})
		}

		if todo, ok := todoStore.GetTodo(id); ok {
			return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": todo})
		}
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"data": nil})
	})

	log.Fatal(app.Listen(":4000"))
}
