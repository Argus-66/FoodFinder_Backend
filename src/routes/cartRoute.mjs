import {Router} from 'express';
import Cart from '../mongoose/schemas/CartSchema.mjs'

let router = Router(); 

router.get('/cart', async (req, res) => {
    try {
        let email = req.query.email;
        console.log(email);
        
        let fullCart = await Cart.find({email});
        res.status(200).send(fullCart);
        console.log(fullCart);
    } catch (error) {
        console.log('Error getting users', error);
    }
})

router.post('/cart',
    async (req, res) => {
        console.log('Entered Post');
        let data = req.body;
        console.log(data);
        
        let newCart = new Cart(data);
        try {
            let savedCart = await newCart.save();
            console.log('Cart saved to databse');
            return res.status(201).send(savedCart);
        } catch (error) {
            console.log(error);
            return res.status(400).send({ message: error.message });
        }
    })
    router.delete('/cart', async (req, res) => {
        console.log(req.body);
        if(req.body._id) {
            let result = await Cart.deleteOne({_id: req.body._id});
            return res.status(200).send({ message: "Item Deleted Successfully" });
        }
        return res.status(404).send({ message:"Item not found" });
        
    })

    export default router;