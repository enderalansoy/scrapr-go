/*
* Name: main.js
*	Description: Gin server and API endpoints configurations.
* Author: enderalansoy
 */

package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/yhat/scrape"
	"golang.org/x/net/html"
	"golang.org/x/net/html/atom"
)

func main() {
	// Initialize gin router
	router := gin.Default()

	// Allow all origins
	router.Use(cors.Default())

	router.Static("/home", "./public")

	// Router group that holds all API endpoints
	api := router.Group("/")
	{
		api.GET("/api", scrapePage)
	}

	// Port definition
	router.Run(":3001")
}

// Function to execute the scrape API
func scrapePage(c *gin.Context) {

	// Get 'url' as query:
	url := c.Query("url")

	// GET html content from 'url'
	resp, err := http.Get(url)
	if err != nil {
		panic(err)
	}

	// Parse the html content and return as 'root'
	root, err := html.Parse(resp.Body)
	if err != nil {
		panic(err)
	}

	// Select tags from 'root' and return as 'title'
	title, ok := scrape.Find(root, scrape.ByTag(atom.Title))
	if ok {
		c.JSON(http.StatusOK, gin.H{"title": scrape.Text(title)})
	}
}
