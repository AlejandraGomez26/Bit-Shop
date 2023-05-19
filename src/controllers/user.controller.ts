import Express from "express";
import mongoose from "mongoose";
import userModel from "../models/user.model";

export const getUsers = async (req: Express.Request, res: Express.Response)=>{
    try {
        
        const result = await userModel.find();
        return res.status(200).json({result});

    } catch (error) {
        console.log(error);
        return res.status(400).json({msg:"ha ocurrido un error", error});
    }
};




export const createUsers = async (req: Express.Request, res: Express.Response)=>{
    try {
        
        let newUser = req.body
        //validar si el usuario existe o no 
        const usuarioExiste = await userModel.findOne({username: newUser.username});
        if (usuarioExiste){
            return res.status(400).json({msg:"el usuario ya existe "})
        };
        //validar si el correo electronico existe o no 
        const emailExiste = await userModel.findOne({email: newUser.email});
        if (emailExiste){
            return res.status(400).json({msg:"el correo ya esta registrado "})
        };
        //Validar si es mayor de edad
        const edadMin = 18 
        const dateBirth = new Date(newUser.dateBirth)
        const edad = calcularEdad(dateBirth)
        if (edad < edadMin){
            return res.status(400).json({msg:"Debes ser mayor de edad"})
        }
        function calcularEdad(dateBirth: Date): number {
            const hoy = new Date();
            let edad = hoy.getFullYear() - dateBirth.getFullYear();
            const mes = hoy.getMonth() - dateBirth.getMonth();
          
            if (mes < 0 || (mes === 0 && hoy.getDate() < dateBirth.getDate())) {
              edad--;
            }
          
            return edad;
          }
        //crear el usuario 
        const userCreated = await userModel.create(newUser)

        if(userCreated) return res.status(201).json({msg: "Usuario creado "});
        throw "Ha ocurrido un error"

    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"ha ocurrido un error", error})
    }
};
//Actualizar Usuario
export const updateUser = async (req: Express.Request, res: Express.Response)=>{
    // {_id: 
    // dataToUpdate:[]
    // }

    try {
        let {dataToUpdate, _id} = req.body // recibe la data 
        const updateData = await userModel.findByIdAndUpdate(_id, dataToUpdate)

        return res.status(200).json({msg: "Usuario Actualizado "})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"ha ocurrido un error", error})
    }
}
//Eliminar Usuario
export const deleteUser = async (req: Express.Request, res: Express.Response) => {
    try {
      
      let {_id} = req.body
      const deleteData = await userModel.findByIdAndDelete(_id)
      return res.status(200).json ({msg: "El Usuario fue eliminado"})
  
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Ha ocurrido un error", error });
    }
  
  }
  //traer un usuario en especifico 
  export const findUser = async (req: Express.Request, res: Express.Response) => {
    try {
      
      let {_id} = req.body
      const findData = await userModel.findById(_id)
      return res.status(200).json ({msg: "usuario encontrado ",findData});
      
  
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Ha ocurrido un error", error });
    }
  
  }