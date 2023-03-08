// importing mongoose for institution schema and collection
const mongoose = require(`mongoose`);

const transactionSchema = mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  receivingMedicalCenterName: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    required: true,
  },
  transactionAmount: {
    type: Number,
    required: true,
    unique: true
  },
  transactionCurrency: {
    type: String,
    required: true,
    enum: ["LYD", "USD", "EUR"]
  },
  transactionDate: {
    type: Date,
    required: true,
  },  
})

const topExpensesBySubscriberSchema = mongoose.Schema({
  subscriberId: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
    unique: true,
  },
  phonNumber: {
    type: String,
    required: true,
    unique: true,
  },
  dateJoined: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  claimAmount: {
    type: Number,
    required: true,
    unique: true
  },
  claimCurrency: {
    type: String,
    required: true,
    enum: ["LYD", "USD", "EUR"]
  },
  servicesCount: {
    type: Number,
    required: true,
  },  
})

const topExpensesByMedicalCenterSchema = mongoose.Schema({
  medicalCenterId: {
    type: String,
    required: true,
    unique: true,
  },
  medicalCenterName: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    required: true,
  },
  claimAmount: {
    type: Number,
    required: true,
    unique: true
  },
  claimCurrency: {
    type: String,
    required: true,
    enum: ["LYD", "USD", "EUR"]
  },
  claimStatus: {
    type: String,
    required: true,
    enum: ["Paid", "Under Review", "Processing", "Rejected"]
  },
  servicesCount: {
    type: Number,
    required: true,
  },  
})

const topExpensesByCitySchema = mongoose.Schema({
  cityName: {
    type: String,
    required: true,
    unique: true,
  },
  claimAmount: {
    type: Number,
    required: true,
    unique: true
  },
  claimCurrency: {
    type: String,
    required: true,
    enum: ["LYD", "USD", "EUR"]
  },
  medicalCentersCount: {
    type: Number,
    required: true,
  },
  servicesCount: {
    type: Number,
    required: true,
  },  
})

const monthlyStatisticsSchema = mongoose.Schema({
  month: {
    type: String,
    required: true,
    unique: true,
    enum: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  },
  subscriberCount:{
    type: Number,
    required: true,
  },
  medicalCentersCount: {
    type: Number,
    required: true,
  },
  servicesCount: {
    type: Number,
    required: true,
  },
  claimAmount: {
    type: Number,
    required: true,
    unique: true
  },
  claimCurrency: {
    type: String,
    required: true,
    enum: ["LYD", "USD", "EUR"]
  },  
  debtAmount: {
    type: Number,
    required: true,
  },
  debtCurrency: {
    type: String,
    required: true,
    enum: ["LYD", "USD", "EUR"]
  },
})

const annualStatisticsSchema = mongoose.Schema({
  year: {
    type: String,
    required: true,
    unique: true
  },
  subscriberCount:{
    type: Number,
    required: true,
  },
  medicalCentersCount: {
    type: Number,
    required: true,
  },
  servicesCount: {
    type: Number,
    required: true,
  },
  claimCount: {
    type: Number,
    required: true,
    unique: true
  },
  claimAmount: {
    type: Number,
    required: true,
    unique: true
  },
  claimCurrency: {
    type: String,
    required: true,
    enum: ["LYD", "USD", "EUR"]
  },  
  debtAmount: {
    type: Number,
    required: true,
  },
  debtCurrency: {
    type: String,
    required: true,
    enum: ["LYD", "USD", "EUR"]
  },
  monthlyStatistics: {
    type: [monthlyStatisticsSchema],
    required: true
  },
  expenseChart: {
    totalBudget: {type: Number, required: true},
    balance: {type: Number, required: true},
    totalExpenses: {type: Number, required: true},
    pendingExpenses: {type: Number, required: true},
    required: true,
  },

  topExpensesByCity:  {
    type: [topExpensesByCitySchema],
    required: true
  },

  topExpensesByMedicalCenter:  {
    type: [topExpensesByMedicalCenterSchema],
    required: true
  },

  topExpensesBySubscribers:  {
    type: [topExpensesBySubscriberSchema],
    required: true
  },

  transactions:  {
    type: [transactionSchema],
    required: true
  },
  
  


  
})

// institution schema or structure
const institutionStatisticsSchema = mongoose.Schema({
  institutionId: {
    type: String,
    required: true,
    unique: true
  },
  institutionStatus: {
    type: String,
    enum: ["active", "notActive"]
  },

  annualStatistics: {
    type: [annualStatisticsSchema],
    required: true
  },

  created: {
    createdBy: { type: String},
    dateCreated: { type: Date},
  },
  updated: {
    updatedBy: { type: String},
    dateUpdated: { type: Date},
  }
}, { collection: 'institutions' });

const institutionStatistics = mongoose.model(`institutions`, institutionStatistics);

// exporting institution collection
module.exports = institutionStatistics;
