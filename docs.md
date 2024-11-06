# Routes
<!--
**        endpoints
:::       errors
:::       responses
:::       status codes
:::       request params
-->

> '/users/:user_id'
  - methods: GET
  - params:
      - user_id: String
  - request:
      - body: N/A
  - responses:
      - code: 200
        body: user matching dataset
      - code: 404, 500
        body: error message

> '/users/:user_id/invoices/:invoice_id'
  - methods: GET
  - params:
      - user_id: String
      - invoice_id: String
  - request:
      - body: N/A
  - responses:
      - code: 200
        body: invoice matching dataset
      - code: 404, 500
        body: error message

> '/users/:user_id/shopping_list'
  - method: GET
  - params:
      - user_id: String
  - request:
      - body: N/A
  - responses:
      - code: 200
        body: shopping list matching dataset
      - code: 404, 500
        body: error message

> '/users'
  - method: POST
  - params: N/A
  - request:
      - body:
         - type: String (defaults to 'COMMON')
         - username: String
         - email: String
         - passkey: String
  - responses:
      - code: 201
        body: user id
      - code: 400, 500
        body: error message

> '/users/login'
  - method: POST
  - params: N/A 
  - request:
      - body:
         - email: String
         - passkey: String
  - responses:
      - code: 200
        body: token + user dataset
      - code: 400, 401, 404, 500
        body: error message

> '/users/:user_id/shopping_list/items'
  - method: POST
  - params:
      - user_id: String
  - request:
      - body:
         - product_name: String
         - quantity: Integer
  - responses:
      - code: 201
        body: N/A
      - code: 400, 500
        body: error message

> '/users/:user_id/invoices'
  - method: POST
  - params:
      - user_id: String
  - request:
      - body:
         - type: String ( BILL | COMPROVANT )
         - issuer: String
         - issued_date: String
         - due_date: String
         - amount: Integer
         - invoice_code: String
  - responses:
      - code: 201
        body: N/A
      - code: 400, 500
        body: error message

> '/users/:user_id/invoices/:invoice_id'
  - method: PATCH
  - params:
      - users_id: String
      - invoice_id: String
  - request:
      - body: any part of, or full, matching invoice
  - responses:
      - code: 200
        body: N/A
      - code: 400, 401, 404, 500
        body: error message
