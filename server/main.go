package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/google/uuid"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal(err)
	}

	r := mux.NewRouter()

	r.HandleFunc("/api/posts", createPost).Methods("POST")
	r.HandleFunc("/api/posts", getPosts).Methods("GET")
	r.HandleFunc("/api/posts/{id}", getPostById).Methods("GET")
	r.HandleFunc("/api/posts/{id}", deletePost).Methods("DELETE")
	r.HandleFunc("/api/posts/{id}", updatePost).Methods("PATCH")

	db := connectDB()
	defer db.Close()

	// Starting Server
	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(
		handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS", "DELETE", "PATCH"}),
		handlers.AllowedOrigins([]string{"*"}),
	)(r)))
}

// Create Post
func createPost(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Connection
	db := connectDB()
	defer db.Close()

	// Creating the post instance
	post := &Post{
		ID: uuid.New().String(),
	}

	// Decoding req
	err := json.NewDecoder(r.Body).Decode(post)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Inserting into db
	_, err = db.Model(post).Insert()
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Response
	json.NewEncoder(w).Encode(post)

}

// Get Posts
func getPosts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Connection
	db := connectDB()
	defer db.Close()

	// Creating posts slice
	var posts []Post
	if err := db.Model(&posts).Select(); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Response
	json.NewEncoder(w).Encode(posts)

}

// Getting individual post by id
func getPostById(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Retrieving Id
	vars := mux.Vars(r)
	myId := vars["id"]

	// Connection
	db := connectDB()
	defer db.Close()

	// Creating the post instance
	post := &Post{ID: myId}
	if err := db.Model(post).WherePK().Select(); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Response
	json.NewEncoder(w).Encode(post)
}

// Delete post
func deletePost(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Retrieving Id
	vars := mux.Vars(r)
	myId := vars["id"]

	// Connection
	db := connectDB()
	defer db.Close()

	/*
		Creating the post instance
		post := &Post{ID: myId}
		res, err := db.Model(post).WherePK().Delete()
	*/

	// Creating the post instance
	post := &Post{}
	res, err := db.Model(post).Where("id = ?", myId).Delete()
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Response(empty res)
	json.NewEncoder(w).Encode(res)
}

// Update post (patch)
func updatePost(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Retrieving Id
	vars := mux.Vars(r)
	myId := vars["id"]

	// Connection
	db := connectDB()
	defer db.Close()

	// Creating the post instance
	post := &Post{ID: myId}

	_ = json.NewDecoder(r.Body).Decode(&post)

	// id stays same, date update as well
	_, err := db.Model(post).WherePK().Set("title = ?, description = ?, createdate = ?, imgurl = ?", post.Title, post.Description, post.Createdate, post.Imgurl).Update()
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Response
	json.NewEncoder(w).Encode(post)
}
