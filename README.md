# Using this Starter Project
First, go to database.yml and replace auth_template with your project name everywhere it appears

Make sure to run bundle and yarn on the back end and front end respectively

# Image upload
## Rails setup for image upload

1. create .env file (add our keys from cloudinary to our project (authenticate))
   * add .env to .gitignore and add .env.example to show other user what keys they need

   .env
   ```
   CLOUD_NAME=valuefromcloudianary
   API_KEY=valuefromcloudianary
   API_SECRET=valuefromcloudianary
   ```

2. GEMS
    cloudinary - so we can interact cloudinary
    dotenv-rails - .env and makes those var ascessable through our app

    ```ruby
    gem 'cloudinary'

    group :development, :test do
       gem 'dotenv-rails'
    end
```
3. add config/cloudinary.yml file to rails project  

```ruby
development:
  cloud_name: <%= ENV['CLOUD_NAME'] %>
  api_key: <%= ENV['API_KEY'] %>
  api_secret: <%= ENV['API_SECRET'] %>
production:
  cloud_name: <%= ENV['CLOUD_NAME'] %>
  api_key: <%= ENV['API_KEY'] %>
  api_secret: <%= ENV['API_SECRET'] %>
test:
  cloud_name: <%= ENV['CLOUD_NAME'] %>
  api_key: <%= ENV['API_KEY'] %>
  api_secret: <%= ENV['API_SECRET'] %>
```

* reminders
  - bundle after adding gems
  - rails db:migrate after adding models
  - restart server after adding adding config/cloudinary.yml, and upadate .env file, adding gems


### usage of cloudinary in rails

```ruby

# getting file from client
file = somehowgetfilefromclient might be (params[:file])
begin
  cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true, resource_type: :auto)
  # if succesfull
  cloud_image[":secure_url"] # this link to the url..

  # so you at this point have the url to image stored in cloudinary do whatever you want with it
 
rescue => e
  # if this is unsucessfully saved to cloudinary than we will come here
  # and e will give us an idea about why it didn't
end
```

# Rails walk through

### instructions for cloning a guthub project
```
$ git clone <ssh-link> project-folder-name
$ cd project-folder-name

// rails
$ bundle // installs ruby gems
$ rails db:create
$ rails db:migrate  // create and migrate database
$ rails db:seed // if there is a seed file

$ rails s -p 3001

##react
$ cd client
$ yarn
$ yarn start
```
### setup

- to create a new project

```
#we are using postgresql as db
# --api renders app to send JSON
$ rails new project-name-here -d postgresql --api
$ cd project-name-here

$ git add .
$ git commit -m'message here'
*push to github if applicable

$ rails db:create
$ rails s -p 3001
(control + c to stop server)
```
go to [localhost](http://localhost:3001)

# Models

```
#to generate model
$ rails g model model-name-here key:datatype key:datatype... (name:string price:float)
#this creates a migration file (the instructions to create the table in the DB)

# After creation, you must migrate 
$ rails db:migrtate

#to delete a model
$ rails d model model-name
```

# Controllers
```
$ rails g controller api/(plural of whatever your model name is)
```
* note on api and routes
```ruby
  #all of the routes in here will be prepended with '/api'
  #controller needs to be in the api folder in the controller folder
  namespace :api do
    resources :dishes
  end
```

# Seeding DB
this is useful to have some default dummy
```
rails db:seed
```
add faker to gemfile to add mroe realistic data

```ruby
gem 'faker', :git => 'https://github.com/faker-ruby/faker.git', :branch => 'master'
```
* remember when adding a gem, stop your server and run 'bundle'
* remember if using faker to add this to seeds file
```ruby
require 'faker'
```

# setup react
in your rails directory

```
$ yarn create react-app client
$ cd client
$ yarn add axios react-router-dom
$ yarn start
```

in package.json
```
"proxy":"http://localhost:3001"
```

set up react router in index.js
```javascript
import {BrowserRouter} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

to use Routes
```javascript
// in its own .js file
import { link, Outlet } from "react-router-dom";

const PageWrapper = () => {
  return (
    <div className="app-container">
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/model1">Model1</Link>
        <Link to="/model2">Model2</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

// in App.js
import { Routes } from "react-router-dom";
import PageWrapper from "./PageWrapper";

export default function App() {
    return (
        <Routes>
            <Route element ={<PageWrapper />}>
                <Route index element={<Home />}>
                <Route path="/Model1" element={<Model1 />} />
                <Route path="/Model2" element={<Model2 />} />
                <Route>
            </Route>
        </Routes>
    )
}
```
see [James' example](https://codesandbox.io/s/silent-bird-imbpzz?file=/src/PageWrapper.js:0-346)

# CRUD Actioins

// GENERAL CRUD

// 1.READ ALL
// When the component mounts get the data to show
// we do this in a useEffect and we do our axios call axios.get('api/x')
// then we setState  setX(res.data)

// 1.READ Single thing
// When the component mounts get the data to show
// we do this in a useEffect and we do our axios call axios.get('api/x/1')
// then we setState setX(res.data)

// 2 .Create Single thing
// I get the data from the form
// then we do an axios call  axios.post.('api/x', datafromform)
// then we add thing to state setX([...x, res.data])

// 3 .Update Single thing
// I get the data from the form
// then we do an axios call  axios.put('api/x/1', datafromform)
// then we update thing to state setX(x.map(t=> t.id === res.data.id ?  res.data.id : t))

// 3 .Delete a Single thing
// I get the id of thing to delete
// then we do an axios call  axios.delete('api/x/idIget')
// then we remove thing from state setX(x.filter(t=> t.id !== idIget))