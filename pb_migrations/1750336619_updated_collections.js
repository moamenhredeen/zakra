/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_601157786")

  // remove field
  collection.fields.removeById("relation2027077952")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_601157786")

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_486090712",
    "hidden": false,
    "id": "relation2027077952",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "bookmarks",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
