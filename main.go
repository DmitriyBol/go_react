package main

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"go_react/src/productStore"
	"go_react/src/todoStore"
	"log"
	"strconv"
)

func main() {
	todoStoreSrc, err := todoStore.NewTodoStore("./database/db.json")
	if err != nil {
		log.Fatalf("Ошибка при инициализации хранилища: %v", err)
	}

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Authorization, Content-Type",
	}))

	// ---

	app.Get("/api/todos", func(c *fiber.Ctx) error {
		return c.Status(fiber.StatusOK).JSON(todoStoreSrc.GetAllTodos())
	})
	app.Post("/api/todos", func(c *fiber.Ctx) error {
		todo := &todoStore.Todo{}

		if err := c.BodyParser(todo); err != nil {
			return err
		}

		if todo.Body == "" {
			return c.Status(400).JSON(fiber.Map{"msg": "Body is empty"})
		}

		todo.ID = todoStoreSrc.GenerateNewID()
		err := todoStoreSrc.AddNewTodo(*todo)
		if err != nil {
			return err
		}
		return c.Status(201).JSON(fiber.Map{"msg": "new todo successfully added"})
	})
	app.Delete("/api/todos", func(c *fiber.Ctx) error {
		todo := &todoStore.Todo{}

		if err := c.BodyParser(todo); err != nil {
			return err
		}

		err := todoStoreSrc.DeleteTodo(todo.ID)
		if err != nil {
			return err
		}

		return c.Status(200).JSON(fiber.Map{"msg": "todo successfully removed"})
	})
	app.Patch("/api/todos", func(c *fiber.Ctx) error {
		todo := &todoStore.Todo{}

		if err := c.BodyParser(todo); err != nil {
			return err
		}

		err := todoStoreSrc.UpdateTodoCompletedStatus(todo.ID)
		if err != nil {
			return err
		}

		return c.Status(200).JSON(fiber.Map{"msg": "todo successfully updated"})
	})
	app.Get("/api/todos/:id", func(c *fiber.Ctx) error {
		idStr := c.Params("ID")

		id, err := strconv.Atoi(idStr)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Invalid ID format, must be an integer",
			})
		}

		if todo, ok := todoStoreSrc.GetTodo(id); ok {
			return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": todo})
		}
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"data": nil})
	})

	app.Get("/api/products", func(c *fiber.Ctx) error {
		limitStr := c.Query("limit")
		limit := 10

		fmt.Println(123123123)

		if limitStr != "" {
			parsedLimit, err := strconv.Atoi(limitStr)
			if err == nil && parsedLimit > 0 {
				limit = parsedLimit
			}
		}

		data, err := productStore.GetProductsData(limit)
		if err != nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"msg": "products not found"})
		}

		return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": data})
	})

	log.Fatal(app.Listen(":4000"))
}
