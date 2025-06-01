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

	ctx := context.Background()
	addressPrefix := "cosmos"

	client, err := cosmosclient.New(ctx, cosmosclient.WithAddressPrefix(addressPrefix))
	if err != nil {
		log.Fatal(err)
	}

	api := gin.Default()

	api.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:1234"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	api.GET("/api", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Sportiverse is running!",
			"client": client,
		})
	})

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
			"message":      "Wallets",
			"All Wallets": accountconc,
		})
	})

	api.POST("/api/create-account", func(c *gin.Context) {
		var data struct {
			AccountName string `json:"accountName"`
			hashAccount  string `json:"hashAccount"`
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

		msg := &types.MsgCreateAccount{
			Creator: addr,
			HashAccount: data.hashAccount,
		}

		txResp, err := client.BroadcastTx(ctx, account, msg)
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to broadcast transaction", "details": err.Error()})
			return
		}

		c.JSON(200, gin.H{
			"message": "Account created",
			"tx":      txResp,
		})
	})

	api.GET("/api/list-accounts", func(c *gin.Context) {
		queryClient := types.NewQueryClient(client.Context())
		queryResp, err := queryClient.AccountAll(ctx, &types.QueryAllAccountRequest{})
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to generate list", "details": err.Error()})
			return
		}

		c.JSON(200, gin.H{
			"message":   "Accounts",
			"All accounts": queryResp,
		})
	})

	api.POST("/api/list-account", func(c *gin.Context) {
		var data struct {
			Id uint64 `json:"Id"`
		}

		if err := c.BindJSON(&data); err != nil {
			c.JSON(400, gin.H{"error": "Invalid request"})
			return
		}

		queryClient := types.NewQueryClient(client.Context())
		queryResp, err := queryClient.Account(ctx, &types.QueryGetAccountRequest{Id: data.Id})
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to find wallet", "details": err.Error()})
			return
		}

		mes := data.Id;

		c.JSON(200, gin.H{
			"message": mes,
			"Account":    queryResp,
		})
	})

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

	api.GET("/api/list-posts", func(c *gin.Context) {

		queryClient := types.NewQueryClient(client.Context())
		queryResp, err := queryClient.PostAll(ctx, &types.QueryAllPostRequest{})
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to generate list", "details": err.Error()})
			return
		}

		c.JSON(200, gin.H{
			"message":   "Posts",
			"All posts": queryResp,
		})
	})

	api.POST("/api/create-comment", func(c *gin.Context) {
		var data struct {
			AccountName string `json:"accountName"`
			Body        string `json:"body"`
			PostId      string `json:"postId"`
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

		msg := &types.MsgCreateComment{
			Creator: addr,
			Body:    data.Body,
			PostId:  data.PostId,
		}

		txResp, err := client.BroadcastTx(ctx, account, msg)
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to broadcast transaction", "details": err.Error()})
			return
		}

		mes := "Comment created";

		c.JSON(200, gin.H{
			"message": mes,
			"tx":      txResp,
		})
	})


	api.POST("/api/list-post-comments", func(c *gin.Context) {

		var data struct {
			PostId string `json:"postId"`
		}

		if err := c.BindJSON(&data); err != nil {
			c.JSON(400, gin.H{"error": "Invalid request"})
			return
		}

		queryClient := types.NewQueryClient(client.Context())
		queryResp, err := queryClient.CommentAll(ctx, &types.QueryAllCommentRequest{})
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to generate list post", "details": err.Error()})
			return
		}

		listPostComments := []types.Comment{}

		for i := range queryResp.Comment {
			if data.PostId == queryResp.Comment[i].PostId {
				listPostComments = append(listPostComments, queryResp.Comment[i])
			}
		}

		mes := "Comments from Posts";

		c.JSON(200, gin.H{
			"message": mes,
			"Comment": listPostComments,
		})
	});

	api.POST("/api/create-like", func(c *gin.Context) {
		var data struct {
			AccountName string `json:"accountName"`
			PostId      string `json:"postId"`
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

		msg := &types.MsgCreateLike{
			Creator: addr,
			PostId:  data.PostId,
		}

		txResp, err := client.BroadcastTx(ctx, account, msg)
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to broadcast transaction", "details": err.Error()})
			return
		}

		mes := "Like created in post"

		c.JSON(200, gin.H{
			"message": mes,
			"tx":      txResp,
		})
	})

	api.POST("/api/list-post-likes", func(c *gin.Context) {
		var data struct {
			PostId string `json:"postId"`
		}

		if err := c.BindJSON(&data); err != nil {
			c.JSON(400, gin.H{"error": "Invalid request"})
			return
		}

		queryClient := types.NewQueryClient(client.Context())
		queryResp, err := queryClient.LikeAll(ctx, &types.QueryAllLikeRequest{})
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to generate list post", "details": err.Error()})
			return
		}

		listPostLikes := []string{}

		for i := range queryResp.Like {
			if data.PostId == queryResp.Like[i].PostId {
				listPostLikes = append(listPostLikes, queryResp.Like[i].Creator)
			}
		}

		mes := "Likes of Post"

		c.JSON(200, gin.H{
			"message":          mes,
			"Numbers of likes": len(listPostLikes),
			"Likes":            listPostLikes,
		})
	})

	api.POST("/api/delete-like", func(c *gin.Context) {
		var data struct {
			AccountName string `json:"accountName"`
			PostId      string `json:"postId"`
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

		queryClient := types.NewQueryClient(client.Context())
		queryResp, err := queryClient.LikeAll(ctx, &types.QueryAllLikeRequest{})
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to generate list post", "details": err.Error()})
			return
		}

		var id uint64

		for i := range queryResp.Like {
			if addr == queryResp.Like[i].Creator {
				if data.PostId == queryResp.Like[i].PostId {
					id = queryResp.Like[i].Id
					break
				}
			}
		}

		msg := &types.MsgDeleteLike{
			Creator: addr,
			Id:      id,
		}

		txResp, err := client.BroadcastTx(ctx, account, msg)
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to broadcast transaction", "details": err.Error()})
			return
		}

		mes := "Like deleted in post"

		c.JSON(200, gin.H{
			"message": mes,
			"tx":      txResp,
		})
	})


	api.Run(":5000")
}
