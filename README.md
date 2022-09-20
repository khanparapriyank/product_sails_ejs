# product_sails_ejs

## Getting Stared

:::Project Details:::
 - Language: NodeJs
 - FrameWork: SailsJs
 - Database: MongoDB
 - ORM: Sails Waterline ORM
 - Flickr API call for Image retrival


To make it easy first clone project from GitHub Repository.
Afterward execute Following Command in  command prompt:

```
cd existingrepo
npm install
```

For Local mongodb setup,
 if you do not have mongodb install then install from (https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-4.4.16-signed.msi)

Run mongodb in local system. (Project will connect to localhost/local mongodb server)
NOTE: You can change connection in connection.js file from config/connection.

To run application 
```
sails lift
```

Run application with defined PORT 1337, Open [http://localhost:1337] in browser.

Main functionality using APIs:

1. Product List
2. Add a New Product
3. Delete Product
4. Update Product
5. Search Image Using Flickr

Additional functionalities using APIs: 

1. Worked with ejs engine for Product UI
2. Inital Load with some Products
3. Sort eachtime Products list 

To help with better entry init-data/products.js file in project.
