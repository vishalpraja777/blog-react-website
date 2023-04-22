# This is the list of commands used in this project and a summary of the videos I followed to create this projec.
- Credits to 'The Net Ninja' Youtube channel

# Video 2: Creating a React Application
- To make the project:
```
npx create-react-app AppName
```
- To run the project:
```
npm run start
```
- To install all dependencies from pacakage.json:
 ```
 npm install
 ```
 - Delete the following files which are not important
 - - App.css
 - - App.test.js
 - - reportWebVitals.js
 - - setupTests.js
---
# Video 3: Components and Templets
- The js function uses JSX (Simlilar to HTML)
- Editing App.js file
---
# Video 4: Dynamic Value in templets
- Create variable outside return and use it in '{ }' in the return (JSX)
- Each varaible of any datatype will be converted to String
---
# Video 5: Multiple Components
- Create a component by creating a js file, import that file and nest in App.js
- That file contains a **sfc** - *Stateless Function Component*
---
# Video 6: Adding Styles
- Dynamic css using ' {{}} '
---
# Video 7: Click Events
- Create a function to handle click and call that function from the button
- To call a function from the button
```
<button onClick = {handleClick} >Click Me</button>
```
- To pass a parameter to the function
```
onClick = { () => functionName('Parameter') }
```
- event Parameter is passed by default as the first parameter, which stores information about the event
```
onClick = { (e) => functionName('Parameter',e) }
```
---
# Video 8: Using States (setState Hook)
- To use state, import the following line:
```
import { useState } from "react";
```
- To set a state variable, the 1st parameter is the variable name and the 2nd parameter is the funciton to change the variable:
```
const [name, setName] = useState('Vishal')
```
- To change the variable in onClick function:
```
setName('Vishal Prajapathi P');
```
---
# Video 9: React Dev Tools
- Used to view more information and debug
---
# Video 10: Outputting Lists
- To display a list we need to map and iterate it
```
{blogs.map((blog) => (
    <div className="blog-preview" key={blog.id}>
        <h2>{ blog.title }</h2>
        <p>Written byt { blog.author }</p>
    </div>
))}
```
---
# Video 11: Props
- To pass data from parent component to child component
```
// To send pros
<BlogList  blogs={blogs} />
// To receive props
const BlogList = (props) => {

    const blogs = props.blogs;
    ...
}
// Destructuring the props in the parentheses
const BlogList = ({blogs, title}) => {
    ...
}
```
---
# Video 12: Reusing Components
- To filter the contents
```
<BlogList  blogs={blogs.filter((blog) => blog.author === 'mario')} title="Mario's Blogs!" />
```
---
# Video 13: Functions as Props
- To use functions as props, same as passing the variables as props
```
<BlogList  blogs={blogs} title="All Blogs!" handleDelete={handleDelete}/>
```
---
# Video 14: useEffect Hook
- Runs on every render of the screen
```
// importing useEffect
import { useState, useEffect } from "react";
// useEffect function
useEffect(() => {
    console.log("Use Effect Ran");
})
```
---
# Video 15: useEffect Dependencies
- To run the useEffect function in only some specific variable change passed as second parameter
```
useEffect(() => {
    console.log("Use Effect Ran");
}, [blogs])
```
---
# Video 16: Using JSON Server
- To use json server run this command
```
npx json-server --watch data/db.json --port 8000
```
---
# Video 17: Fetching data with useEffect
- To fetch JSON data from url
```
useEffect(() => {
    fetch('http://localhost:8000/blogs')
    .then(res => {
        return res.json();
    })
    .then(data => {
        setBlogs(data)
    })
}, [])
```
---
# Video 18: Conditional Loading message
- To use conditional operator &&
```
{isPending && <div>Loading...</div>}
```
---
# Video 19: Handling Fetch errors
- To catch errors use the catch() function
- To check is the response returned is not error use the .ok variable on the response
```
useEffect(() => {
    fetch('http://localhost:8000/blogs')
    .then(res => {
        if(!res.ok){
            throw Error('could not fetch data for that resourse');
        }
        return res.json();
    })
    .then(data => {
        setBlogs(data);
        setIPendingBlogs(false);
        setError(null);
    })
    .catch(err => {
        setIPendingBlogs(false);
        setError(err.message);    
    })
}, [])
```
---
# Video 20: Custom Hook
- Custom hook function starts with a use keyword
- Creating the hook
- Also use loding state
```
import { useState, useEffect } from "react";

const useFetch = (url) => {

    const [data,setData] = useState(null)
    const [isPending,setIsPendingBlogs] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(url)
        .then(res => {
            if(!res.ok){
                throw Error('could not fetch data for that resourse');
            }
            return res.json();
        })
        .then(data => {
            setData(data);
            setIsPendingBlogs(false);
            setError(null);
        })
        .catch(err => {
            setIsPendingBlogs(false);
            setError(err.message);
        })
    }, [url])

    return {data, isPending, error}

}

export default useFetch;
```
- Using the hook
```
const {data: blogs, isPending, error} = useFetch('http://localhost:8000/blogs')
```
---
# Video 21: The React Router
- To install react router
```
npm install react-router-dom
```
- To use react router
```
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
function App() {

  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className="content">
          <Routes>
            <Route path='/' element={<Home/>}/>
          </Routes>
        </div>
      </div>
      </Router>
  );
}
```
---
# Video 22: Exact Match Route
- 
---
# Video 23: Router Links
- Importing Links
```
import { Link } from "react-router-dom";
```
- Replaces anchot tag
```
<Link to="/">Home</Link>
<Link to="/create">New Blog</Link>
```
---
# Video 24: useEffect Cleanup
- To cleanup the fetch
```
const useFetch = (url) => {

    const [data,setData] = useState(null)
    const [isPending,setIsPendingBlogs] = useState(true)
    const [error, setError] = useState(null)
useEffect(() => {

    const abortCont = new AbortController();

    setTimeout(() => {
        fetch(url, { signal: abortCont.signal })
        .then(res => {
            ...
        }
        )
        return () => abortCont.abort();
    }
    )
}
)
}
```
---
# Video 25: Route Parameters
- To use dynamic parameters in route, :id
```
<Routes>
    <Route path='/blogs/:id' element={<BlogDetails/>}/>
</Routes>
// TO call that route
<Link to={`/blogs/${blog.id}`}>
</Link>
```
---
# Video 27: Controlled Inputs (forms)
- Create a from with the required fields and add styling
- Using the onChange function to store the variable and dispaly the same variable
```
value={title}
onChange={(e) => setTitle(e.target.value)}
```
---
# Video 28: SubmitEvents
- Create a function to handle the submit and call from the function
```
const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };
    console.log(blog)
}
// Calling the function
<form onSubmit={handleSubmit}>
```
---
# Video 29: Making a POST Request
- To make a PSOT request
```
const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    setIsPending(true)

    // Making the POST request
    fetch('http://localhost:8000/blogs', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog)
    }).then( () => {
        console.log("new blog added");
        setIsPending(false);
    }
    )
}
```
---
# Video 30: Programatic Redirects
- Using history buttons to go back
- Import the useNavigate
```
import { useNavigate  } from 'react-router-dom'

// Using the navigate
fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then( () => {
            console.log("new blog added");
            setIsPending(false);
            // navigate.go(-1);
            navigate('/');
        })
```
---
# Video 31: Deleting Blogs
- To delet a blog or object from the database use the DELETE method
```
const handleClick = () => {
    fetch('http://localhost:8000/blogs,' + blog.id, {
        method: 'DELETE'
    }).then(() => {
        navigate('/')
    })
}
```
---
# Video 32: 404 Pages
- Create a 404 error page
- Route to that page using '*'
```
<Route path='*' element={<NotFound/>}/>
```
---