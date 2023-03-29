package main

type Post struct {
	TableName   struct{} `sql:"tb_casestudy"`
	ID          string   `json:"id"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Createdate  string   `json:"createdate"`
	Imgurl      string   `json:"imgurl"`
}
