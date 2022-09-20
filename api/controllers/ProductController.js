/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
const axios = require('axios');
module.exports = {
    /**
     * `ProductController.create()`
     */
    create: function (req, res) {
        console.log("Inside create..............");
        let reqParams = req.params.all();
        console.log("Inside create..............req.params = " + JSON.stringify(reqParams));

        if(reqParams["_method"] === "put") this.update(req, res);
        else if(reqParams["_method"] === "delete") this.delete(req, res);
        else if(reqParams["_method"] === "get") this.search(req, res);
        else if(req.param("pid") == null || !req.param("pid")) {
            return res.view("product/new", {
                status: 'Error',
                errorType: 'not-found',
                statusDescription: 'No product found with pid',
                title: 'Add a new product',
                product: {
                    pid: "",
                    name: "",
                    price: "",
                    productImageUrl: ""
                }
            });
        } else {
            var _newProduct = {
                pid: req.param("pid"),
                name: req.param("name"),
                price: req.param("price"),
                productImageUrl: req.param("imageUrl")
            };
            return Product.create(_newProduct).then(function (_product) {
                console.log("product created: " + JSON.stringify(_product));
                return res.redirect("product");
            }).catch(function (err) {
                console.error("Error on productService.createproduct");
                console.error(err);
                console.error(JSON.stringify(err));
                return res.view("product/new", {
                    product: _newProduct,
                    status: 'Error',
                    statusDescription: err,
                    title: 'Add a new product'
                });
            });
        }

    },
    /**
     * `ProductController.update()`
     */
    update: function (req, res) {
        console.log("Inside update..............");

        return Product.update({pid: req.param("pid")}, {
            name: req.param("name"),
            price: req.param("price"),
            productImageUrl: req.param("imageUrl")
        }).then(function (_product) {
            console.log("Inside update Found ........");
            return res.redirect("product");
        }).catch(function (err) {
            console.error("Error on productService.updateproduct");
            console.error(err);

            return Product.find().where({pid: req.param("pid")}).then(function (_product) {
                if (_product && _product.length > 0) {
                    return res.view("product/edit", {
                        product: _product[0],
                        status: 'Error',
                        errorType: 'validation-error',
                        statusDescription: err,
                        title: 'Product Details'
                    });
                } else {
                    return res.view('500', {message: "Sorry, no product found with pid - " + req.param("pid")});
                }
            }).catch(function (err) {
                return res.view('500', {message: "Sorry, no product found with pid - " + req.param("pid")});
            });
        });

    },
    /**
     * `ProductController.delete()`
     */
    delete: function (req, res) {
        console.log("Inside delete..............");
        var _pid = req.param("pid");
        console.log("Inside delete.............. _pid = " + _pid);

        return Product.find().where({pid: _pid}).then(function (_product) {
            if (_product && _product.length > 0) {

                _product[0].destroy().then(function (_product) {
                    console.log("Deleted successfully!!! _product = " + _product);
                    return res.redirect("product");
                }).catch(function (err) {
                    console.error(err);
                    return res.redirect("product");
                });
            } else {
                return res.view('500', {message: "Sorry, no product found with pid - " + req.param("pid")});
            }
        }).catch(function (err) {
            return res.view('500', {message: "Sorry, no product found with pid - " + req.param("pid")});
        });


    },
    /**
     * `ProductController.find()`
     */
    find: function (req, res) {
        console.log("Inside find..............");
        var _pid = req.params.pid;
        console.log("Inside find.............. _pid = " + _pid);

        return Product.find().where({pid: _pid},{sort: 'pid ASC'}).then(function (_product) {

            if (_product && _product.length > 0) {
                console.log("Inside find Found .... _product = " + JSON.stringify(_product));
                return res.view("product/edit", {
                    status: 'OK',
                    title: 'Product Details',
                    statusDescription: '',
                    product: _product[0]
                });
            } else {
                console.log("Inside find NOT Found .... ");
                return res.view("product/edit", {
                    status: 'Error',
                    errorType: 'not-found',
                    statusDescription: 'No product found with pid, ' + _pid,
                    title: 'Product Details'
                });
            }
        }).catch(function (err) {
            console.log("Inside find ERROR .... ");
            return res.view("product/edit", {
                status: 'Error',
                errorType: 'not-found',
                statusDescription: 'No product found with pid, ' + _pid,
                title: 'Product Details'
            });
        });
    },
    /**
     * `ProductController.findall()`
     */
    findall: function (req, res) {
        console.log("Inside findall..............");

        return Product.find({sort: 'pid ASC'}).then(function (products) {
            console.log("productService.findAll -- products = " + JSON.stringify(products));
            return res.view("product/list", {
                status: 'OK',
                title: 'List of Products',
                products: products
            });
        }).catch(function (err) {
            console.error("Error on productService.findAll");
            console.error(err);
            return res.view('500', {message: "Sorry, an error occurd - " + err});
        });
    },
    /**
     * `ProductController.findall()`
     */
    new : function (req, res) {
        console.log("Inside new..............");
        return res.view("product/new", {
            product: {
                pid: "",
                name: "",
                price: "",
                productImageUrl: ""
            },
            status: 'OK',
            title: 'Add a New Product'
        });
    },
    showFind: function (req, res) {
        console.log("Inside showFind..............");
        res.view("product/find", {
            status: 'OK',
            title: 'Flickr Images',
            search: "",
            products: ""
        });
    },

    resetData: function (req, res) {
        ProductService.preloadData();
        return res.redirect("product");
    },

    

    search: function (req, res) {
        console.log("Inside default Search..............");
        var _search = req.param("search");
        _search = _search.toString().replace(/(\s*,?\s*)*$/, "")
        console.log("Inside default Search.............." + _search);

        axios({
            url: "https://www.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&tags="+ _search,
            method: "get",
        })
        .then(response => {
            console.log("Inside default Found ........");
            return res.view("product/find", {
                status: 'OK',
                title: 'Flickr Images',
                search: "",
                products: response.data.items
            });
        })
        .catch((err) => {
            console.log("Inside find ERROR .... ");
            return res.view("product/find", {
                status: 'Error',
                errorType: 'not-found',
                title: 'Flickr Images',
                search: "",
                products: "",
                statusDescription: 'No product found',
            });
        });
    },

};

