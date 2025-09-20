import Institution from "../models/InstitutionModel.js";

export const addInstitution = async (req, res) => {
    try {
        if(req.user.role != "admin"){
            return res.status(403).json({
                message: "Access denied - Admins only"
            })
        }

        const {name, address} = req.body

        if(!name || !address){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const existingInstitution = await Institution.findOne({ name })
        if(existingInstitution){
            return res.status(400).json({
                message: "Institution already exists"
            })
        }

        const newInstitution = await Institution.create({name, address})

        return res.status(201).json({
            message: "Institution added successfully",
            newInstitution
        })
    } catch (error) {
        console.log("Error in add institution controller", error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const getInstitutions = async(req, res) => {
    try {
        const institutions = await Institution.find().select("name address");
        return res.status(200).json({ institutions })
    } catch (error) {
        console.log("Error in get institution controller", error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}