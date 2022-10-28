# apollo-federation-demo
Sample repository to demo how to use apollo federation with required fields


Example query
```graphql
query orders {
  orders {
    id
    items {
      product {
        id
        sku
        name
        availability {
          isAvailable
        }
      }
      amount
    }
    availableProducts {
      id
      sku
      name
      availability {
        isAvailable
      }
    }
    
  }
}

```
Result
```json
{
  "data": {
    "orders": [
      {
        "id": "id",
        "items": [
          {
            "product": {
              "id": "1",
              "sku": "1",
              "name": "milk",
              "availability": {
                "isAvailable": false
              }
            },
            "amount": 2
          },
          {
            "product": {
              "id": "2",
              "sku": "2",
              "name": "coffee",
              "availability": {
                "isAvailable": true
              }
            },
            "amount": 3
          }
        ],
        "availableProducts": [
          {
            "id": "2",
            "sku": "2",
            "name": "coffee",
            "availability": {
              "isAvailable": true
            }
          }
        ]
      }
    ]
  }
}
```