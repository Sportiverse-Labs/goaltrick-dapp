package main

import (
	"context"
	"log"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/ignite/cli/v28/ignite/pkg/cosmosclient"
	"os"
	"gopkg.in/yaml.v3"
	"time"
	"sportiverse/x/sportiverse/types"
)

type Account struct {
	Name string `yaml:"name"`
}

type Config struct {
	Accounts []Account `yaml:"accounts"`
}

func main() {

	// sportiverse blockchain

	ctx := context.Background()
	addressPrefix := "sportiverse"

	client, err := cosmosclient.New(ctx, cosmosclient.WithAddressPrefix(addressPrefix))
	if err != nil {
		log.Fatal(err)
	}

	// api

	api := gin.Default()

	api.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// isWorking

	api.GET("/api", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Sportiverse is running!",
			"client": client,
		})
	})

	// Wallet Info

	api.POST("/api/wallet-info", func(c *gin.Context) {
		var data struct {
			AccountName string `json:"accountName"`
		}

		if err := c.BindJSON(&data); err != nil {
			c.JSON(400, gin.H{"error": "Invalid request"})
			return
		}

		accountName := data.AccountName

		account, err := client.Account(accountName)
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to initialize account", "details": err.Error()})
			return
		}

		addr, err := account.Address(addressPrefix)
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to generate address", "details": err.Error()})
			return
		}

		c.JSON(200, gin.H{
			"message": "Wallet Info",
			"name":    data.AccountName,
			"address": addr,
		})
	})

	api.GET("/api/list-wallets", func(c *gin.Context) {

		file, err := os.Open("../../sportiverse/config.yml")
		if err != nil {
			log.Fatalf("Failed to open file: %v", err)
		}

		defer file.Close()

		var config Config
		decoder := yaml.NewDecoder(file)
		if err := decoder.Decode(&config); err != nil {
			log.Fatalf("Erro ao decodificar o YAML: %v", err)
		}

		var names []string
		for _, account := range config.Accounts {
			names = append(names, account.Name)
		}

		if len(names) < 1 {
			c.JSON(500, gin.H{"error": "Failed to generate list", "details": err.Error()})
			return
		}

		accountconc := make(map[string]string)

		for _, name := range names {
			accountName := name

			account, err := client.Account(accountName)
			if err != nil {
				c.JSON(500, gin.H{"error": "Failed to initialize account", "details": err.Error()})
				return
			}

			addr, err := account.Address(addressPrefix)
			if err != nil {
				c.JSON(500, gin.H{"error": "Failed to generate address", "details": err.Error()})
				return
			}

			accountconc[accountName] = addr
		}

		if len(accountconc) < 1 {
			c.JSON(500, gin.H{"error": "Failed to generate list", "details": err.Error()})
			return
		}

		c.JSON(200, gin.H{
			"message":      "Accounts",
			"All Accounts": accountconc,
		})
	})

	// Create Post

	api.POST("/api/create-post", func(c *gin.Context) {
		var data struct {
			AccountName string `json:"accountName"`
			Title       string `json:"title"`
			Body        string `json:"body"`
		}

		if err := c.BindJSON(&data); err != nil {
			c.JSON(400, gin.H{"error": "Invalid request"})
			return
		}

		accountName := data.AccountName

		account, err := client.Account(accountName)
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to initialize account", "details": err.Error()})
			return
		}

		addr, err := account.Address(addressPrefix)
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to generate address", "details": err.Error()})
			return
		}

		t := time.Now()
		str := t.Format(time.RFC3339)

		msg := &types.MsgCreatePost{
			Creator: addr,
			Title:   data.Title,
			Body:    data.Body,
			Timestamp:   str,
		}

		txResp, err := client.BroadcastTx(ctx, account, msg)
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to broadcast transaction", "details": err.Error()})
			return
		}

		c.JSON(200, gin.H{
			"message": "Post created",
			"tx":      txResp,
		})
	})



	api.Run(":5000")
}
