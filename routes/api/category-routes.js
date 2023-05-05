const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  try {
    const categories= await Category.findAll ({
      include: [Product],
    }); 
  //   if(categories.length===0){
  //     return res.status(404).json({msg:"no Category in database!"})
  // }
  res.json(categories)
} catch(err){
  console.log(err);
  res.status(500).json({msg:"error occurred",err})
}
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id).then(categories=>{
    if(!categories){
        return res.status(404).json({msg:"no Category with that id in database!"})
    }
    res.json(categories)
}).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
})
});

router.post('/', (req, res) => {
  Category.create(req.body)
  .then(categories=>res.json(categories)).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
  });
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where:{
      id:req.params.id
    }
  })
  .then(categories=>res.json(categories)).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
  });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where:{
      id:req.params.id
    }
  })
  .then(categories=>res.json(categories)).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
  });
});

module.exports = router;