import express from "express"

export const app = express();

app.get("/",(req,res)=>{
    res.json({ status: "CraftMyPrep Backend Running 🚀", time: new Date().toISOString() });
})