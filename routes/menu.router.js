import express from 'express';
const router=express.Router();
//Schema
import MenuItemModel from './../modles/menu.js';

  //MENU Save API
router.post("/", async (req, res) => {
    try {
      const data = req.body;
      const newData = new MenuItemModel(data);
      const menu = await MenuItemModel.create(newData);
      if (menu) {
        return res
          .status(201)
          .json({ message: "Menu Item Saved Successfully", menu: menu });
      } else {
        return res.status(500).json({ message: "Internal server error" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  //get menu api
  router.get("/", async (req, res) => {
    try {
      // const condition_obj=url.parse(req.url,true).query;
  
      const data = await MenuItemModel.find();
      if (data.length > 0) {
        // Check if data array is not empty
        return res.status(200).json({
          success: true,
          message: "Data fetched successfully",
          menu: data,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Data not found",
        });
      }
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

  
// Parameterized URL
router.get('/:tasteType', async (req, res) => {
    const tasteType = req.params.tasteType; // Fix parameter name
  
    try {
      // Validate tasteType
      if (['Sweet', 'Spicy', 'Sour'].includes(tasteType)) {
        // Fetch data based on tasteType
        const response = await MenuItemModel.find({ taste: tasteType });
  
        // Check if data is empty
        if (response.length === 0) {
          console.log('Entered taste type menu item is not available');
          return res.status(200).json({ message: "No data found" });
        } else {
          console.log('Menu items fetched successfully');
          return res.status(200).json(response);
        }
      } else {
        // Invalid tasteType
        return res.status(400).json({ error: "Invalid taste type" }); // Changed to 400 Bad Request
      }
    } catch (error) {
      console.error('Error fetching menu items:', error); // Improved error logging
      return res.status(500).json({ error: "Internal Server Error" }); // Changed to 500 Internal Server Error
    }
  });
  
  

  export default router;