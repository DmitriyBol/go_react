package productStore

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

type Product struct {
	ID                   int        `json:"id"`
	Title                string     `json:"title"`
	Description          string     `json:"description"`
	Category             string     `json:"category"`
	Price                float64    `json:"price"`
	DiscountPercentage   float64    `json:"discountPercentage"`
	Rating               float64    `json:"rating"`
	Stock                int        `json:"stock"`
	Tags                 []string   `json:"tags"`
	Brand                string     `json:"brand"`
	SKU                  string     `json:"sku"`
	Weight               int        `json:"weight"`
	Dimensions           Dimensions `json:"dimensions"`
	WarrantyInformation  string     `json:"warrantyInformation"`
	ShippingInformation  string     `json:"shippingInformation"`
	AvailabilityStatus   string     `json:"availabilityStatus"`
	Reviews              []Review   `json:"reviews"`
	ReturnPolicy         string     `json:"returnPolicy"`
	MinimumOrderQuantity int        `json:"minimumOrderQuantity"`
	Meta                 Meta       `json:"meta"`
	Images               []string   `json:"images"`
	Thumbnail            string     `json:"thumbnail"`
}

type Dimensions struct {
	Width  float64 `json:"width"`
	Height float64 `json:"height"`
	Depth  float64 `json:"depth"`
}

type Review struct {
	Rating        int       `json:"rating"`
	Comment       string    `json:"comment"`
	Date          time.Time `json:"date"`
	ReviewerName  string    `json:"reviewerName"`
	ReviewerEmail string    `json:"reviewerEmail"`
}

type Meta struct {
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
	Barcode   string    `json:"barcode"`
	QRCode    string    `json:"qrCode"`
}

type Response struct {
	Products []Product `json:"products"`
	Total    int       `json:"total"`
	Skip     int       `json:"skip"`
	Limit    int       `json:"limit"`
}

func GetProductsData(limit int) ([]Product, error) {
	url := fmt.Sprintf("https://dummyjson.com/products?limit=%d", limit)

	resp, err := http.Get(url)
	if err != nil {
		return nil, fmt.Errorf("ошибка при выполнении GET-запроса: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("неожиданный статус-код: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("ошибка при чтении тела ответа: %w", err)
	}

	var apiResponse Response
	if err := json.Unmarshal(body, &apiResponse); err != nil {
		return nil, fmt.Errorf("ошибка при декодировании JSON: %w", err)
	}
	return apiResponse.Products, nil
}
