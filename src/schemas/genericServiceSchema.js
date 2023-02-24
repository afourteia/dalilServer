// importing mongoose for genericService schema and collection
const mongoose = require(`mongoose`);

// genericService schema or structure
const genericServiceSchema = mongoose.Schema(
  {
    // genericServiceId: { type: mongoose.ObjectId, unique: true },
    name: {
      type: String,
      required: [true, `please provide name`],
      unique: true,
    },

    // created: {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    // dateCreated: { type: Date},

    // },
    // updated: {
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    //   dateUpdated: { type: Date},
    // }
  },
  { timestamps: true }
  // { collection: 'genericServices' }
);

const genericService = mongoose.model(`genericServices`, genericServiceSchema);

// exporting genericService collection
module.exports = genericService;
