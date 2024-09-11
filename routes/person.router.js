import express from 'express';
const router=express.Router();
//Schema

import PersonSchemaModel from '../modles/person.js';

//person save api
router.post("/", async (req, res) => {
    /*
      const data=req.body //assuming the request body contains the person data
      console.log(data);
  
      //Create the new person document using the Mongoose Model
      const newPerson=new PersonSchemaModel(data);
  
      //IT IS NOT GOOD WAY 
  
      // newPerson.name=data.name;
      // newPerson.age=data.age;
      // newPerson.work=data.work;
      // newPerson.mobile=data.mobile;
      // newPerson.email=data.email;
      // newPerson.address=data.address;
      // newPerson.salary=data.salary;
  
      //save the new person to database
      newPerson.save((error,person)=>{
          if(error){
              console.log('Error saving person data',error);
              res.status(501).json({error:"internal server error"});
          }else{
              console.log("data saved successfully");
              res.status(200).json(person);
          }
      })
          */
  
    try {
      const data = req.body;
  
      const newPerson = new PersonSchemaModel(data);
  
      //save data in database
      const savePerson = newPerson.save();
      // const savePerson=await PersonSchemaModel.create(newPerson);
      res.status(201).json({ status: "data saved successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Enternal server error" });
    }
  });


  //fetching dat of user
router.get("/", async (req, res) => {
    try {
      const data = await PersonSchemaModel.find();
  
      console.log("data fetch successfully");
      res.status(201).json(data);
    } catch (error) {
      console.log("error");
      res.status(501).json({ status: "internal server error" });
    }
  });



  
  //paramerter rised url
  router.get("/:workType", async (req, res) => {
    try {
      const workType = req.params.workType;
  
      // Validate workType
      if (["chef", "manager", "waiter"].includes(workType)) {
        // Fetch data based on workType
        const response = await PersonSchemaModel.find({ work: workType });
        
        // Check if data is empty
        if (response.length === 0) {
          console.log("Related work type person data is not stored");
          return res.status(200).json({ message: "No data found", data: response });
        } else {
          console.log("Response fetched");
          return res.status(200).json(response);
        }
      } else {
        // Invalid workType
        return res.status(404).json({ error: "Invalid work type" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });


  //updated api of person
  router.put('/:id', async (req, res) => {
    try {
      const personId = req.params.id; // Extract the ID from the URL
  
    
  
      const updatedPersonData = req.body; // Extract updated data from the request body
  
      // Update the person in the database
      const updatedPerson = await PersonSchemaModel.findByIdAndUpdate(
        personId,
        updatedPersonData,
        {
          new: true, // Return the updated document
          runValidators: true, // Run Mongoose validation
        }
      );
  
      // Handle case where person was not found
      if (!updatedPerson) {
        return res.status(404).json({ message: 'Person not found' });
      }
  
      // Respond with the updated person data
      res.status(200).json(updatedPerson);
    } catch (error) {
      console.error('Error updating person:', error); // Log the error
      res.status(500).json({ message: 'Internal server error' }); // Return a generic error message
    }
  });



  //person delete api
  router.delete('/:id',async(req, res)=>{
try {
  const personId= req.params.id;

  const response=await PersonSchemaModel.findByIdAndDelete(personId);
  if(!response){
    return res.status(404).json({message:"Pernot not found"});
  }
  return res.status(200).json({message:"Person deleted successfully"});
} catch (error) {
  return res.status(500).json({message:"Internal server error"});
}
  })
  

  export default router;