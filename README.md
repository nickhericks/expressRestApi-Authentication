# REST API Validation with Express - Full Stack JavaScript Techdegree

## Project objective
Exercise exploring how to validate data in an Express REST API application.

<!-- ## Techniques and concepts
- Promises
- Async/Await -->

## To view project
1. Download project.
2. Run 'npm install' in the command line.
3. Run 'npm start' in the command line.
4. Go to 'localhost:3000' in your browser.

<!-- ## Code example
```javascript
// Send a POST request to /quotes to CREATE a new quote
router.post("/quotes", asyncHandler( async (req, res) => {
  // throw new Error('Oh noooooooo!');
  if(req.body.author && req.body.quote) {
    const quote = await records.createQuote({
      quote: req.body.quote,
      author: req.body.author
    });
    res.status(201).json(quote);
  } else {
    res.status(400).json({message: 'Quote and author required.'});
  }  
}));
``` -->

## Acknowledgements
This project was built as part of the [Full Stack JavaScript Techdegree](https://join.teamtreehouse.com/techdegree/) offered by [Treehouse](https://teamtreehouse.com) :raised_hands:
