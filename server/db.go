package main

import (
	"fmt"
	"log"
	"os"

	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

func connectDB() *pg.DB {
	options := &pg.Options{
		User:     os.Getenv("DB_USER"),
		Password: os.Getenv("DB_PASSWORD"),
		Addr:     os.Getenv("DB_ADDRESS"),
		Database: os.Getenv("DB_DATABASE"),
	}

	var db *pg.DB = pg.Connect(options)
	if db == nil {
		log.Printf("Database connection failed.\n")
		os.Exit(100)
	}

	log.Printf("Connection successfull.")

	if err := createSchema(db); err != nil {
		log.Fatal(err)
	}
	return db
}

func createSchema(db *pg.DB) error {
	models := []interface{}{
		(*Post)(nil),
	}

	for _, model := range models {
		err := db.Model(model).CreateTable(&orm.CreateTableOptions{
			IfNotExists: true,
		})
		if err != nil {
			fmt.Println("err")
			return err
		}
	}
	return nil
}
