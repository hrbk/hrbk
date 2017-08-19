# Client

# Server
## index.js
<a name="port"></a>

### port
Port is set either to the process.env.PORT given by Heroku or defaults to 3000

# Database
<dl>
<dt><a href="#config.js">config.js</a></dt>
<dt><a href="#helpers.js">helpers.js</a></dt>
<dt><a href="#index.js">index.js</a></dt>
</dl>

<a name="config.js"></a>
## config.js

Exports a function that returns a query to create a users table if it does not exit, then creates a profiles table if it does not exist. Errors fall through the promise chain to console log an error message.

<a name="helpers.js"></a>
## helpers.js

### Functions

<dl>
<dt><a href="#find">find(query, table, callback)</a></dt>
<dd><p>A simple find function for the MySql database.</p>
</dd>
<dt><a href="#addUser">addUser(email, userphoto, firstname, lastname, password, callback)</a></dt>
<dd><p>addUser function that passes given information into the users database table.</p>
</dd>
<dt><a href="#addListing">addListing(userObj)</a></dt>
<dd><p>If the information regarding a user&#39;s home or listing is being passed through as a single object rather than through separate parameters, use addListing</p>
</dd>
<dt><a href="#filterByCity">filterByCity(city, callback)</a></dt>
<dd><p>filterByCity function that can provide listing information from the profiles table of the database based on a specific United States city. Plans to include international cities will be implemented in the near future.</p>
</dd>
<dt><a href="#filterByOption">filterByOption(column, option, callback)</a></dt>
<dd><p>filterByOption allows you to specify the column and additional options to query. For example, passing &#39;city&#39; and &#39;San Francisco&#39; will yield listings from San Francisco.</p>
</dd>
</dl>

<a name="find"></a>

#### find(query, table, callback)
A simple find function for the MySql database.


| Param | Type | Description |
| --- | --- | --- |
| query | <code>String</code> | Depending on the table, a string representing the column to retrieve. The available options for the users table: 'id', 'email', 'userphoto', 'firstname', 'lastname', password, 'salt'. For the profiles table: 'id', 'userid', 'address', 'city', 'state', 'zipcode', 'title', 'description', 'photopath'. Pass in '*' for all columns. |
| table | <code>String</code> | One of two tables that can be queried. Either 'users' or 'profiles'. |
| callback | <code>function</code> | A callback applied to the results of the query on the database. Can be implemented when the 'find' function is called to manipulate the resulting data. |

<a name="addUser"></a>

#### addUser(email, userphoto, firstname, lastname, password, callback)
addUser function that passes given information into the users database table.


| Param | Type | Description |
| --- | --- | --- |
| email | <code>String</code> | An email address associated with the user. |
| userphoto | <code>String</code> | A url path to an image file or image url used for the thumbnail on the listings page. |
| firstname | <code>String</code> | The first name of the user. There are no usernames, and specific identification is tied to email and name combinations. |
| lastname | <code>String</code> | The last name of the user. |
| password | <code>String</code> | The password provided by the user. An early mvp-adopted model before hashing and salt are implemented. |
| callback | <code>function</code> | Two types of callbacks that can be invoked, depending on whether an error has occurred or addition to the database was successful. |

<a name="addListing"></a>

#### addListing(userObj)
If the information regarding a user's home or listing is being passed through as a single object rather than through separate parameters, use addListing

| Param | Type | Description |
| --- | --- | --- |
| userObj | <code>Object</code> | An object containing the pertinent user information for the users table in the database. The keys of the object should be: 'id', 'address', 'city', 'zipcode', 'title', 'description', 'photopath'. Note that a separate query should eventually be created with the user's email address to find the user's id to link the information between user and profile together in the database. |

<a name="filterByCity"></a>

#### filterByCity(city, callback)
filterByCity function that can provide listing information from the profiles table of the database based on a specific United States city. Plans to include international cities will be implemented in the near future.

| Param | Type | Description |
| --- | --- | --- |
| city | <code>String</code> | A city within the United States. This should have been properly formatted by Google Autocomplete Places to reduce possible issues of typos or syntactical errors. No further formatting of this parameter should be necessary. Searching by a zipcode to include radius-wide search may be implemented in the near future.] |
| callback | <code>function</code> | Two types of callbacks that can be invoked, depending on whether an error has occurred or addition to the database was successful. |

<a name="filterByOption"></a>

#### filterByOption(column, option, callback)
filterByOption allows you to specify the column and additional options to query. For example, passing 'city' and 'San Francisco' will yield listings from San Francisco.

| Param | Type | Description |
| --- | --- | --- |
| column | <code>String</code> | Any of the columns from profile table of the database: 'id', 'userid', 'address', 'city', 'state', 'zipcode', 'title', 'description', 'photopath'. Recommended columns for use are 'city', 'zipcode', and 'state'. |
| option | <code>String/Number</code> | Any specificity towards the column parameter. The parameter can either be a string or number, depending on which column is being used. |
| callback | <code>function</code> | Two types of callbacks that can be invoked, depending on whether an error has occurred or addition to the database was successful. |

<a name="index.js"></a>
## index.js

### Constants

<dl>
<dt><a href="#connection">connection</a></dt>
<dd><p>mysql connection; change the host, user, database, and add a password  for the database as necessary to establish a connection.</p>
</dd>
<dt><a href="#db">db</a></dt>
<dd><p>Promisifies the entire object by going through the object&#39;s properties and creating an async equivalent of each function on the object and its prototype chain.</p>
</dd>
</dl>

<a name="connection"></a>

#### connection
mysql connection; change the host, user, database, and add a password  for the database as necessary to establish a connection.

<a name="db"></a>

#### db
Promisifies the entire object by going through the object's properties and creating an async equivalent of each function on the object and its prototype chain.
