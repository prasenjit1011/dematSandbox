const Product = require('../models/product');

exports.getProductList = (req, res, next)=>{
    console.log('-: Welcome to product listing page :-');
    console.log('Token', req.csrfToken());

    Product.find()
            .then(data=>{
                res.render('./product/list', {csrfToken:req.csrfToken(), productlist:data});
            })
            .catch(err=>console.log(err));
}


exports.getProductDetails = (req, res, next) => {
    console.log('-: Product Details :-');

    id = req.params.id;
    Product.findById(id)
            .then(data => {
                res.render('./product/details', {shopdata:data})
            })
            .catch(err=>console.log(err));
}


exports.addProduct = (req, res, next)=>{
    console.log('-: Product added successfully! :-');

    const productName   = req.body.productName;
    const productPrice  = req.body.productPrice;
    const productDetail = req.body.productDetail;
    const ProductData   = req.file;
    const productImage  = ProductData.filename;//ProductData.destination+'/'+
    
    const product = new Product({name: productName, price: productPrice, description:productDetail, imageUrl: productImage });
    return product.save()
            .then(result=>{
                console.log(result);
                res.redirect('/product/list');
            })
            .catch(err=>console.log(err));

}


exports.deleteProduct = (req, res, next) => {
    console.log('-: Product Deleted :-');

    id = req.params.id;
    Product.findOneAndDelete(id)
            .then(result=>{
                res.redirect('/product/list');
            })
            .catch();
}
