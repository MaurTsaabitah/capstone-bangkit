import Skill from "../models/skillModel.js";

// Controller for add Skill
export const addSkill = async (req, res) => {
    try {
    
    const { name } = req.body;

    const existingSkill = await Skill.findOne({ name });

    if (existingSkill) return res.status(400).json({error: 'Skill sudah ada'});

    // tambahkan skill baru
    const newSkill = new Skill({ name });

    await newSkill.save();    

    res.json({message: 'Skill berhasil ditambahkan'});

    } catch (error) {
        res.status(500).json({
            status: "error", 
            message: "Server error occurred", 
            error: {
                description: "An internal error occurred on the server"
            }
        });        
    } 
}

export const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (error) {
        res.status(500).json({
            status: "error", 
            message: "Server error occurred", 
            error: {
                description: "An internal error occurred on the server"
            }
        });
    }
}

