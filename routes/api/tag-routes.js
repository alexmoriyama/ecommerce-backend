const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags= await Tag.findAll ({
      include: [{
          model:Product,through:ProductTag
        }],
    }); 
  res.json(tags)
} catch(err){
  console.log(err);
  res.status(500).json({msg:"error occurred",err})
}
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where:{
      id:req.params.id
    },
    include: [{
      model:Product,through:ProductTag
    }],
  }).then(tags=>{
    if(!tags){
        return res.status(404).json({msg:"no tag with that id in database!"})
    }
    res.json(tags)
}).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
})
});

router.post('/', (req, res) => {
  Tag.create(req.body)
  .then(tags=>res.json(tags)).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;