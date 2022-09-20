var productsRepo = require('../../init-data/products.js');
//import productsList from '/init-data/products';

module.exports = {
    preloadData: function () {
        console.log(">>>>>>>>>>>>>>> preloading data.......");
        for (var _idx = 0; _idx < productsRepo.productList.length; _idx++) {

            var __product = productsRepo.productList[_idx];
            console.log(">>>>>>>>>>>>>>>>>>>> " + JSON.stringify(__product));

            Product.findOrCreate({pid: __product.pid}, __product).then(function (_product) {
                console.log("product created: " + JSON.stringify(_product));
            }).catch(function (err) {
                console.error("Error on productService.preloadData");
                console.error(err);
                console.error(JSON.stringify(err));
            });
        }
    }
};