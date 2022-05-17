# mongoose-caching

this is a quite simple project, i just wrote quickly to hotfix another problem inside a project.

its a cache layer based on json objects which will create themselves inside the main structure of the project inside a folder called "cache". 

## how to use

```
import cache from 'mongoose-cache'

let myFoundObject = await cache.readInCache(IdentifierOfMyObject, SchemaIWantToUseOfMongoose, QueryForSchema, 1)  // 1 for findOne and 0 for find on mongoose
```

It saves the query if not existent or it serves the localstorage.

To change the path: 

```
cache.setPath(path) 
```


To delete the cache:

```
cache.clearCache() 
```