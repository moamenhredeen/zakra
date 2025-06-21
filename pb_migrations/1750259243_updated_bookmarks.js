/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_486090712")

  // update collection data
  unmarshal({
    "listRule": "user.id = @request.auth.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_486090712")

  // update collection data
  unmarshal({
    "listRule": ""
  }, collection)

  return app.save(collection)
})
