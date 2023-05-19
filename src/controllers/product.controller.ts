import Express from "express";
import mongoose from "mongoose";
import productModel from "../models/product.model";

//Crear producto 
export const createProducts = async (req: Express.Request, res: Express.Response)=>{
    try {
        
        let newProduct = req.body
        const productCreated = await productModel.create(newProduct)

        if(productCreated) return res.status(201).json({msg: "Producto agregado "});
        throw "Ha ocurrido un error"

    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"ha ocurrido un error", error})
    }
};


//traer los productos
export const getProducts = async (req: Express.Request, res: Express.Response)=>{
    try {
        
        const result = await productModel.find();
        return res.status(200).json({result});

    } catch (error) {
        console.log(error);
        return res.status(400).json({msg:"ha ocurrido un error", error});
    }
};

//Actualizar Usuario
export const updateProducts = async (req: Express.Request, res: Express.Response)=>{
    // {_id: 
    // dataToUpdate:[]
    // }

    try {
        let {dataToUpdate, _id} = req.body // recibe la data 
        const updateData = await productModel.findByIdAndUpdate(_id, dataToUpdate)

        return res.status(200).json({msg: "Producto Actualizado "})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"ha ocurrido un error", error})
    }
}
// //Eliminar producto
export const deleteProducts = async (req: Express.Request, res: Express.Response) => {
    try {
      
      let {_id} = req.body
      const deleteData = await productModel.findByIdAndDelete(_id)
      return res.status(200).json ({msg: "El producto fue eliminado"})
  
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Ha ocurrido un error", error });
    }
  
  }
  //traer un producto en especifico 
  export const findProducts = async (req: Express.Request, res: Express.Response) => {
    try {
      
      let {_id} = req.body
      const findData = await productModel.findById(_id)
      return res.status(200).json ({msg: "producto encontrado ",findData});
      
  
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Ha ocurrido un error", error });
    }
  
  }

  // GENERAR FACTURA
  export const Factura = async (req: Express.Request, res: Express.Response) => {

    try {
      let idProduct = req.body;
      let arrayProducts: object[] = [];
      let suma: any = 0 ;

      for(let products of idProduct._id){
      try {
        const product = await productModel.findById(products,{
          _id: 0,
          name:1,
          price: 1,
        
        });
        if(product){
          suma = suma + product.price;
          arrayProducts.push(product);
          
        }
        
      } catch (error) {
       arrayProducts.push({msg:"No se encontro el id"})
  
      }
      

      
  
    }
    return res.status(200).json({Products: arrayProducts,TotalAmount: suma});
  }
     catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Ha ocurrido un error", error });
    }
  
  }

