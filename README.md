# Backend Talkdesk technical challenge

Written in `JavaScript` and `Node.js`

------
## Running the code

```sh
$ node my_script input_file
```
Like so:
```sh
$ node challenge.js input.txt
```

## Considerations

- There's no input validation/sanitation, meaning that if the input file does not follow the struture defined in the guidelines the script will fail and return a generic error message.
- It assumes the call times do not span over diferent days
- `happy day scenarios only :)`

### Structure
- challengs.js file: 
  - contains the 'main' function that performs the heavy lifting (parsing data and creating objects, then calculates the final amount owned)
- call.js:
  - has the Call class definition (setters, getters and method to calculate the cost)


## The Challenge:

Given a list of calls with the following format:
    time_of_start;time_of_finish;call_from;call_to

And the following rules:

 - The first 5 minutes of each call are billed at 5 cents per minute
 - The remainer of the call is billed at 2 cents per minute
 - The caller with the highest total call duration of the day will not be charged (i.e., the caller that has the highest total call duration among all of its calls)

Calculate the total cost for these calls.